/**
 * Google Photos OAuth2 Setup Script
 * 
 * Run this ONCE to authorize access to your Google Photos.
 * It will open a browser window for Google OAuth consent,
 * then save tokens locally for the sync script.
 * 
 * Usage: node setup-oauth.js
 */

import { google } from 'googleapis';
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import open from 'open';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const TOKEN_PATH = join(__dirname, 'tokens.json');

// Scopes for Google Photos (both Picker API and Library API)
const SCOPES = [
  'https://www.googleapis.com/auth/photospicker.mediaitems.readonly',
  'https://www.googleapis.com/auth/photoslibrary.readonly'
];

async function main() {
  // 1. Check for credentials.json
  if (!existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌  Missing credentials.json!');
    console.error('');
    console.error('Follow these steps to create it:');
    console.error('');
    console.error('  1. Go to https://console.cloud.google.com/');
    console.error('  2. Create a new project (or select existing)');
    console.error('  3. Enable the "Photos Library API":');
    console.error('     → APIs & Services → Library → Search "Photos Library API" → Enable');
    console.error('  4. Create OAuth 2.0 credentials:');
    console.error('     → APIs & Services → Credentials → Create Credentials → OAuth client ID');
    console.error('     → Application type: "Desktop app"');
    console.error('     → Download the JSON file');
    console.error('  5. Rename it to "credentials.json" and place it in this directory:');
    console.error(`     ${CREDENTIALS_PATH}`);
    console.error('');
    console.error('  ⚠️  If this is a new project, you also need to configure the OAuth consent screen:');
    console.error('     → APIs & Services → OAuth consent screen');
    console.error('     → User Type: External (or Internal if using Google Workspace)');
    console.error('     → Add your email as a test user');
    console.error('');
    process.exit(1);
  }

  // 2. Load client credentials
  const credentialsRaw = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const clientCreds = credentialsRaw.installed || credentialsRaw.web;

  if (!clientCreds) {
    console.error('❌  Invalid credentials.json format. Expected "installed" or "web" key.');
    process.exit(1);
  }

  const { client_id, client_secret } = clientCreds;

  // 3. Use localhost redirect for Desktop OAuth
  const REDIRECT_PORT = 3847;
  const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

  // 4. Generate auth URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'select_account consent',  // Force account selection and consent
    login_hint: 'gutkarsh09@gmail.com'
  });

  console.log('\n🔐  Google Photos Authorization');
  console.log('═'.repeat(50));
  console.log('');
  console.log('▶▶▶  OPEN THIS LINK IN YOUR BROWSER:');
  console.log('');
  console.log(`  ${authUrl}`);
  console.log('');
  console.log('Then sign in with Google and click "Allow".');
  console.log('Waiting for authorization...');
  console.log('');

  // 5. Start local server to receive OAuth callback (accepts ANY path)
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      // Accept any path — Google may redirect to / or /callback or anything
      const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
      const authCode = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      // Ignore requests without code or error (e.g., favicon)
      if (!authCode && !error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body style="font-family: system-ui; text-align: center; padding: 60px; background: #09090b; color: #fafafa;"><h2>Waiting for Google authorization...</h2></body></html>');
        return;
      }

      if (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html><body style="font-family: system-ui; text-align: center; padding: 60px; background: #09090b; color: #fafafa;">
            <h2 style="color: #ef4444;">❌ Authorization Denied</h2>
            <p>${error}</p>
            <p>You can close this tab.</p>
          </body></html>
        `);
        server.close();
        reject(new Error(`OAuth error: ${error}`));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html><body style="font-family: system-ui; text-align: center; padding: 60px; background: #09090b; color: #fafafa;">
          <h2 style="color: #34d399;">✅ Authorization Successful!</h2>
          <p>Google Photos access granted. You can close this tab and return to the terminal.</p>
        </body></html>
      `);
      server.close();
      resolve(authCode);
    });

    server.listen(REDIRECT_PORT, () => {
      console.log(`🌐  Local callback server listening on http://localhost:${REDIRECT_PORT}`);
      // Also try opening browser automatically
      open(authUrl).catch(() => {});
    });

    // Timeout after 30 minutes
    setTimeout(() => {
      server.close();
      reject(new Error('Authorization timed out (30 minutes). Try again.'));
    }, 30 * 60 * 1000);
  });

  // 6. Exchange code for tokens
  console.log('Exchanging authorization code for tokens...');
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // 7. Save tokens
  writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('');
  console.log('✅  Tokens saved to tokens.json');
  console.log('');

  // 8. Quick test — verify API connectivity
  try {
    const pickerRes = await fetch('https://photospicker.googleapis.com/v1/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    if (pickerRes.ok) {
      const session = await pickerRes.json();
      console.log('🎉  Google Photos Picker API verified and working!');
      // Clean up test session
      if (session.id) {
        await fetch(`https://photospicker.googleapis.com/v1/sessions/${session.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${tokens.access_token}` }
        }).catch(() => {});
      }
    } else {
      const errData = await pickerRes.json();
      console.log('ℹ️  Picker API test response:', errData.error?.message || pickerRes.statusText);
    }
  } catch (err) {
    console.log('ℹ️  Connection test skipped:', err.message);
  }

  console.log('');
  console.log('Next step: Run `npm run sync` to fetch your best photos!');
  console.log('');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
