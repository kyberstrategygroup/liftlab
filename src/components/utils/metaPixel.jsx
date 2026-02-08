// Meta Pixel Event Tracking Helper

const eventQueue = [];
let fbqReady = false;

// Initialize fbq readiness checker
if (typeof window !== 'undefined') {
  const checkFbq = () => {
    if (window.fbq) {
      fbqReady = true;
      // Flush queued events
      while (eventQueue.length > 0) {
        const { eventName, params, isCustom } = eventQueue.shift();
        if (isCustom) {
          window.fbq('trackCustom', eventName, params);
        } else {
          window.fbq('track', eventName, params);
        }
      }
    } else {
      setTimeout(checkFbq, 100);
    }
  };
  checkFbq();
}

/**
 * Track a Meta Pixel event with deduplication
 * @param {string} eventName - Standard event name (Lead, Purchase, ViewContent, etc.)
 * @param {object} params - Event parameters
 * @param {boolean} isCustom - Whether this is a custom event
 */
export function trackMetaEvent(eventName, params = {}, isCustom = false) {
  if (typeof window === 'undefined') return;

  // Create dedupe key
  const pathname = window.location.pathname;
  const dedupeKey = `meta_${eventName}_${JSON.stringify(params)}_${pathname}`;

  // Check if already fired in this session
  if (sessionStorage.getItem(dedupeKey)) {
    console.log(`Meta Pixel: Event ${eventName} already fired for this session, skipping`);
    return;
  }

  // Mark as fired
  sessionStorage.setItem(dedupeKey, 'true');

  // Fire event
  if (fbqReady && window.fbq) {
    if (isCustom) {
      window.fbq('trackCustom', eventName, params);
    } else {
      window.fbq('track', eventName, params);
    }
    console.log(`Meta Pixel: Tracked ${eventName}`, params);
  } else {
    // Queue for when fbq is ready
    eventQueue.push({ eventName, params, isCustom });
    console.log(`Meta Pixel: Queued ${eventName}`, params);
  }
}

/**
 * Track PageView - called on route changes
 * Use sparingly, already tracked by base pixel on initial load
 */
export function trackPageView() {
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname + window.location.search;
  const lastPath = sessionStorage.getItem('meta_last_pageview');

  // Only fire if path changed
  if (lastPath !== currentPath) {
    sessionStorage.setItem('meta_last_pageview', currentPath);
    
    if (fbqReady && window.fbq) {
      window.fbq('track', 'PageView');
      console.log('Meta Pixel: PageView tracked for', currentPath);
    }
  }
}