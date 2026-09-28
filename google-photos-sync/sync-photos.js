/**
 * Google Photos Sync Script (Modern Picker API & Media Archive)
 * 
 * Uses Google Photos Picker API (the official 2025/2026 Google Photos API)
 * to let you select photos & videos from your Google Photos library,
 * downloads them at ultra-high quality, optimizes them into WebP,
 * and updates the Visual Archive gallery.
 * 
 * Usage:
 *   node sync-photos.js
 */

import { google } from 'googleapis';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import open from 'open';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = join(__dirname, 'credentials.json');
const TOKEN_PATH = join(__dirname, 'tokens.json');
const OUTPUT_DIR = join(__dirname, '..', 'public', 'visual-archive');
const VIDEOS_DIR = join(OUTPUT_DIR, 'videos');
const MANIFEST_PATH = join(OUTPUT_DIR, 'manifest.json');

/**
 * Authenticate with OAuth2
 */
function getAuthClient() {
  if (!existsSync(CREDENTIALS_PATH) || !existsSync(TOKEN_PATH)) {
    console.error('❌  Missing credentials or tokens. Run `node setup-oauth.js` first.');
    process.exit(1);
  }

  const credentialsRaw = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const clientCreds = credentialsRaw.installed || credentialsRaw.web;
  const tokens = JSON.parse(readFileSync(TOKEN_PATH, 'utf-8'));

  const oauth2Client = new google.auth.OAuth2(
    clientCreds.client_id,
    clientCreds.client_secret,
    'http://localhost:3847'
  );

  oauth2Client.setCredentials(tokens);

  oauth2Client.on('tokens', (newTokens) => {
    const merged = { ...tokens, ...newTokens };
    writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
    console.log('🔄  Access token refreshed.');
  });

  return oauth2Client;
}

/**
 * Main Google Photos Picker session flow
 */
async function selectPhotosViaPicker(accessToken) {
  console.log('🚀  Creating Google Photos Picker session...');

  const sessionRes = await fetch('https://photospicker.googleapis.com/v1/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!sessionRes.ok) {
    const errData = await sessionRes.json().catch(() => ({}));
    if (sessionRes.status === 403) {
      console.error('\n❌  Google Photos Picker API is not enabled or scope is missing.');
      console.error('Please ensure:');
      console.error('1. You enabled "Google Photos Picker API" in Google Cloud Console:');
      console.error('   https://console.cloud.google.com/apis/library/photospicker.googleapis.com');
      console.error('2. You ran `node setup-oauth.js` to grant permissions.\n');
    }
    throw new Error(errData.error?.message || `HTTP ${sessionRes.status}`);
  }

  const session = await sessionRes.json();
  const sessionId = session.id;
  const pickerUrl = session.pickerUri;

  console.log('');
  console.log('══════════════════════════════════════════════════════════');
  console.log('📸  GOOGLE PHOTOS SELECTOR IS READY!');
  console.log('══════════════════════════════════════════════════════════');
  console.log('');
  console.log('▶▶▶  OPEN THIS LINK TO SELECT YOUR PHOTOS & VIDEOS:');
  console.log('');
  console.log(`  ${pickerUrl}`);
  console.log('');
  console.log('👉  Select all the photos/videos you want to feature,');
  console.log('    then click "Done" in Google Photos.');
  console.log('');
  console.log('⏳  Waiting for your selection...');

  // Automatically open picker in browser
  open(pickerUrl).catch(() => {});

  // Poll for completion (mediaItemsSet === true)
  const startTime = Date.now();
  const timeoutMs = 15 * 60 * 1000; // 15 mins timeout

  while (Date.now() - startTime < timeoutMs) {
    await new Promise(r => setTimeout(r, 2500));

    const pollRes = await fetch(`https://photospicker.googleapis.com/v1/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!pollRes.ok) continue;
    const pollData = await pollRes.json();

    if (pollData.mediaItemsSet) {
      console.log('✅  Selection confirmed! Fetching items...');
      break;
    }
  }

  // Fetch picked media items
  const items = [];
  let pageToken = '';

  do {
    const url = `https://photospicker.googleapis.com/v1/mediaItems?sessionId=${sessionId}&pageSize=100${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const itemsRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!itemsRes.ok) break;
    const itemsData = await itemsRes.json();
    if (itemsData.mediaItems) {
      items.push(...itemsData.mediaItems);
    }
    pageToken = itemsData.nextPageToken || '';
  } while (pageToken);

  // Clean up session
  fetch(`https://photospicker.googleapis.com/v1/sessions/${sessionId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` }
  }).catch(() => {});

  return items;
}

/**
 * Process and download an image
 */
async function processImage(item, index, total, accessToken) {
  const filename = `photo_${String(index + 1).padStart(3, '0')}.webp`;
  const outputPath = join(OUTPUT_DIR, filename);
  const thumbFilename = `thumb_${String(index + 1).padStart(3, '0')}.webp`;
  const thumbPath = join(OUTPUT_DIR, thumbFilename);

  const mediaFile = item.mediaFile || {};
  const baseUrl = mediaFile.baseUrl || item.baseUrl;

  if (!baseUrl) {
    console.error(`  ⚠️  No baseUrl found for item ${item.id}. Item keys: ${Object.keys(item).join(', ')}`);
    return null;
  }

  const fullUrl = `${baseUrl}=w2048-h2048`;

  console.log(`  [${index + 1}/${total}] 🖼️  Downloading photo: ${mediaFile.filename || item.id.slice(0, 12)}...`);

  try {
    const res = await fetch(fullUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    const metadata = await sharp(buffer).metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 800;

    // Full optimized image
    await sharp(buffer)
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(outputPath);

    // Thumbnail
    await sharp(buffer)
      .resize({ width: 480, height: 480, fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(thumbPath);

    return {
      id: item.id,
      type: 'photo',
      filename,
      thumbFilename,
      originalFilename: mediaFile.filename || null,
      width,
      height,
      orientation: width > height ? 'landscape' : height > width ? 'portrait' : 'square',
      aspectRatio: Number((width / height).toFixed(2))
    };
  } catch (err) {
    console.error(`  ⚠️  Failed to process item: ${err.message}`);
    return null;
  }
}

/**
 * Process and download a video
 */
async function processVideo(item, index, total, accessToken) {
  mkdirSync(VIDEOS_DIR, { recursive: true });
  const filename = `video_${String(index + 1).padStart(3, '0')}.mp4`;
  const outputPath = join(VIDEOS_DIR, filename);

  const mediaFile = item.mediaFile || {};
  const baseUrl = mediaFile.baseUrl || item.baseUrl;

  if (!baseUrl) {
    console.error(`  ⚠️  No baseUrl found for video ${item.id}`);
    return null;
  }

  const videoUrl = `${baseUrl}=dv`;
  console.log(`  [${index + 1}/${total}] 🎥 Downloading video: ${mediaFile.filename || filename}...`);

  try {
    const res = await fetch(videoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(outputPath, buffer);

    return {
      id: item.id,
      type: 'video',
      filename: `videos/${filename}`,
      originalFilename: mediaFile.filename || null,
      sizeBytes: buffer.length
    };
  } catch (err) {
    console.error(`  ⚠️  Failed to download video: ${err.message}`);
    return null;
  }
}

/**
 * Main Sync Pipeline
 */
async function main() {
  console.log('');
  console.log('📸  Google Photos → Visual Archive Sync');
  console.log('═'.repeat(50));

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const authClient = getAuthClient();
  const tokenResponse = await authClient.getAccessToken();
  const token = tokenResponse.token;

  if (!token) {
    console.error('❌  Could not get access token. Run `node setup-oauth.js` to re-authorize.');
    process.exit(1);
  }

  // Use Picker API
  const items = await selectPhotosViaPicker(token);

  if (!items || items.length === 0) {
    console.log('\n📭  No items selected or session ended.');
    process.exit(0);
  }

  console.log(`\n📦  Selected ${items.length} total items. Processing...\n`);

  const manifestItems = [];
  let photoCount = 0;
  let videoCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const mediaFile = item.mediaFile || {};
    const mime = mediaFile.mimeType || item.mimeType || 'image/jpeg';

    if (mime.startsWith('video/')) {
      videoCount++;
      const result = await processVideo(item, i, items.length, token);
      if (result) manifestItems.push(result);
    } else {
      photoCount++;
      const result = await processImage(item, i, items.length, token);
      if (result) manifestItems.push(result);
    }

    // Gentle delay to avoid rate limits
    if (i < items.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Load existing manifest if present to preserve any custom labels
  let existingManifest = {};
  if (existsSync(MANIFEST_PATH)) {
    try {
      existingManifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch {}
  }

  const manifestData = {
    syncedAt: new Date().toISOString(),
    photoCount: manifestItems.filter(i => i.type === 'photo').length,
    videoCount: manifestItems.filter(i => i.type === 'video').length,
    items: manifestItems,
    photos: manifestItems.filter(i => i.type === 'photo') // Backwards compatibility with gallery
  };

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifestData, null, 2));

  console.log('');
  console.log('═'.repeat(50));
  console.log(`🎉  Successfully synced ${manifestItems.length} media items!`);
  console.log(`   📸  Photos: ${photoCount}`);
  console.log(`   🎥  Videos: ${videoCount} (saved to public/visual-archive/videos/)`);
  console.log(`📄  Manifest updated at: ${MANIFEST_PATH}`);
  console.log('═'.repeat(50));
  console.log('');
}

main().catch(err => {
  console.error('\n❌  Sync Error:', err.message);
  process.exit(1);
});
