import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollRestorationManager
 *
 * Guarantees seamless scroll restoration across all pages:
 * 1. Tracks and preserves scroll positions per history entry key & pathname.
 * 2. On BACK / POP navigation: immediately restores the exact scroll position where the user left off.
 *    Uses an rAF check loop to ensure content layout is ready before restoring, avoiding premature clamps.
 * 3. On PUSH navigation (clicking forward to a new page or essay): resets to top (0, 0).
 * 4. Sets history.scrollRestoration = 'manual' to prevent browser native conflicts with React rendering.
 */
export default function ScrollRestorationManager() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP', 'PUSH', 'REPLACE'
  const scrollPosMap = useRef(new Map());
  const isRestoringRef = useRef(false);

  // Configure browser scroll restoration behavior
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Save scroll position as user scrolls, and when leaving page
  useEffect(() => {
    let ticking = false;

    const saveCurrentPosition = () => {
      // Don't overwrite saved position while an automated restoration is in progress
      if (isRestoringRef.current) return;
      const y = window.scrollY;
      scrollPosMap.current.set(location.key, y);
      try {
        sessionStorage.setItem('scroll_key_' + location.key, y.toString());
        sessionStorage.setItem('scroll_path_' + location.pathname, y.toString());
      } catch {
        // Safe fail for private browsing or storage quota
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          saveCurrentPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      saveCurrentPosition();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key, location.pathname]);

  // Handle route transitions
  useEffect(() => {
    let cancelFrame = false;

    if (navType === 'POP') {
      // User navigated back or forward
      isRestoringRef.current = true;

      // Look up position by history entry key, then fallback to pathname
      const savedKeyY = scrollPosMap.current.get(location.key) ??
        parseInt(sessionStorage.getItem('scroll_key_' + location.key) || '-1', 10);

      const fallbackPathY = parseInt(sessionStorage.getItem('scroll_path_' + location.pathname) || '-1', 10);

      const targetY = savedKeyY >= 0 ? savedKeyY : (fallbackPathY >= 0 ? fallbackPathY : 0);

      if (targetY > 0) {
        let attempts = 0;
        const maxAttempts = 25; // Try over ~350ms across animation frames

        const tryScroll = () => {
          if (cancelFrame) return;

          const scrollable = document.documentElement.scrollHeight - window.innerHeight;

          // If document has enough height to reach targetY, or we've waited enough:
          if (scrollable >= targetY || attempts >= maxAttempts) {
            window.scrollTo({
              top: targetY,
              left: 0,
              behavior: 'instant'
            });
            // Double check after a brief microtask
            setTimeout(() => {
              if (!cancelFrame && Math.abs(window.scrollY - targetY) > 5) {
                window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
              }
              isRestoringRef.current = false;
            }, 50);
          } else {
            attempts++;
            requestAnimationFrame(tryScroll);
          }
        };

        requestAnimationFrame(tryScroll);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        isRestoringRef.current = false;
      }
    } else if (navType === 'PUSH') {
      // User clicked a new link forward -> always start at top of new page
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      isRestoringRef.current = false;
    }

    return () => {
      cancelFrame = true;
    };
  }, [location.key, location.pathname, navType]);

  return null;
}
