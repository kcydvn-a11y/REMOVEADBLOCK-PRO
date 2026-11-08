// injected.js - MAIN World v2.2.1 (Universe Smart)
// Toàn site • An toàn site chính thống • Bắt màn đen / gate-click / popunder / timer / full script
// v2.2.1: siết false positive black-screen (bỏ layout .container/.content) + gate (chỉ tín hiệu mạnh)
(() => {
  if (window.__jdInjectedReady) return;
  const previousReadyDescriptor = Object.getOwnPropertyDescriptor(window, '__jdInjectedReady');
  const previousStopDescriptor = Object.getOwnPropertyDescriptor(window, '__jdInjectedStop');
  window.__jdInjectedReady = true;

  const restoreActions = [];
  let captureEnabled = true;
  let resourceObserver = null;
  const pageStartTs = (typeof performance !== 'undefined' && performance.timing && performance.timing.navigationStart)
    ? performance.timing.navigationStart
    : Date.now();

  const previousCaptureGlobals = {
    networkLogs: window.__jdYtAdNetLog,
    resourceTimings: window.__jdResourceTimings,
    mediaLogs: window.__jdMediaLogs,
    debuggerTrap: Object.getOwnPropertyDescriptor(window, '__hasDebuggerTrap')
  };

  const MAX_LOG = 320;
  const MAX_RESOURCE_TIMINGS = 280;
  const MAX_MEDIA = 80;
  const MAX_GLOBAL = 40;
  const MAX_CLICK = 50;
  const MAX_TIMER = 80;
  const MAX_OVERLAY_SIGNAL = 30;

  window.__jdYtAdNetLog = [];
  window.__jdResourceTimings = [];
  window.__jdMediaLogs = [];
  const captureNetworkLogs = window.__jdYtAdNetLog;
  const captureResourceTimings = window.__jdResourceTimings;
  const captureMediaLogs = window.__jdMediaLogs;

  const clickTraces = [];
  const timerLog = [];
  const overlaySignals = []; // màn đen / full-page overlay signals

  // ========== WHITELIST SITE CHÍNH THỐNG (không bao giờ coi là ad) ==========
  const FIRST_PARTY_SAFE = /(?:^|\.)(?:youtube\.com|youtu\.be|googlevideo\.com|ytimg\.com|ggpht\.com|gstatic\.com|google\.com|google\.[a-z]{2,3}|googleapis\.com|googleusercontent\.com|accounts\.google\.com|accounts\.youtube\.com|facebook\.com|fbcdn\.net|vimeo\.com|vimeocdn\.com|cloudflare\.com|jsdelivr\.net|unpkg\.com|jquery\.com|bootstrapcdn\.com|fontawesome\.com|twimg\.com|twitter\.com|x\.com|netflix\.com|nflxvideo\.net|spotify\.com|scdn\.co|apple\.com|icloud\.com|microsoft\.com|office\.com|live\.com|bing\.com|github\.com|githubusercontent\.com|stackoverflow\.com|reddit\.com|redd\.it|wikipedia\.org|wikimedia\.org|amazon\.com|amazonaws\.com|paypal\.com|stripe\.com|bank|gov\.[a-z]{2,3})$/i;

  // ========== REGEX MẠNH + THÔNG MINH ==========
  const NET_AD_REG = /ad|ads|banner|pop|popup|popunder|analytics|tracker|tracking|beacon|pixel|doubleclick|googlesyndication|pagead|adservice|adsystem|adsterra|propeller|exoclick|juicyads|adcash|popads|adnxs|taboola|outbrain|mgid|prebid|adsbygoogle|googletag|gtm|ga\.|google-analytics|hotjar|mixpanel|amplitude|segment|scorecardresearch|facebook\.net\/tr|cloudflareinsights|log_event|telemetry|collect|ptracking|virtualadview|ad_impression|ad_break|report_ad|instream|get_midroll|adunit|\/ad_|\.adsense\.|adserver|hilltopads|a-ads|clksite|bebi|youtubei\/v1\/ad|pagead\/adview|pcs\/view|enforcement|adblock|partnerwide|googleadservices|tpc\.googlesyndication|adsrvr|advertising|adn\.|adtech|underclick|clickunder|interstitial|\/do2\/|catfish|banner-view|ad-detector|ad_status|marvelous-respond|lost-spray|linkroyal|cm88|qq88|sc88|hi88|new88|i9bet|clickadu|trafficjunky|trafficfactory|plugrush|admaven|popcash|popmyads|decisive-wait|acquirecardedsullen|agileskincare|popunder_url|GATE|xnPop|xnHta/i;
  const NET_VAST_REG = /\bvast\b|\bvmap\b|\bvpaid\b|ima3|imasdk|adtag|ad_tag|ad-tag|csai|ssai|tvc\.xml|admanager|securepubads|pubads|openrtb|bid-?request|\/vast(\?|\.|$)|ima\.googleapis|dai\.google/i;
  const NET_VIDEO_REG = /videoplayback|googlevideo|\.m3u8|\.mpd|\.mp4|\.webm|\.m4s\b|\.ts\b|manifest|playlist\.m3u8|index\.m3u8|chunklist|segment|hls|dash|blob:|mediasource|phncdn|phprcdn|cdn\.pornhub|video\.google|ytimg\.com\/video|rr\d+---sn-|googlevideo\.com/i;
  const NET_IFRAME_REG = /iframe|embed|player|vast|ima|adserver|doubleclick|googlesyndication|accounts\.youtube|RotateCookies/i;
  const GLOBAL_AD_REG = /jwplayer|hls|plyr|videojs|player|adblock|canrunads|fuckadblock|blockadblock|popns|_pop|counter|config|__adblock|adsbygoogle|googletag|ytplayer|ytinitial|prebid|pbjs|adfox|adman|adserver|popunder|popads|exoclick|juicyads|propeller|ima|vast|vmap|vpaid|adModule|adBreak|ytAd|__yt/i;
  const KNOWN_CLOAK_TOKENS = /cupbearergrowllurch|warkedmalie|astronautlividlyreformer|xcas\.(com|net)|yetansd|ozlinedsp|onaudience|wakuhyfeserucu/i;
  // Script ad: mở rộng + bắt pattern gate/popunder
  const AD_SCRIPT_HINT = /marvelous-respond|decisive-wait|acquirecardedsullen|agileskincare|AD_URL|popunder|popunder_url|cm88|qq88|hi88|new88|sc88|i9bet|bit\.ly|linkroyal|workers\.dev|catfish|banner-view|GATE|xnPop|xnHta|xn_app|offered\s*=|bindTo\s*:|TARGET_CLASSES|localStorage.*Pop|lsSet\s*\(/i;

  function isFirstPartySafe(url) {
    try {
      const host = new URL(url, location.href).hostname.toLowerCase();
      return FIRST_PARTY_SAFE.test(host);
    } catch (e) { return false; }
  }

  function isLikelyCloakedDomain(rawUrl) {
    try {
      const u = new URL(rawUrl, location.href);
      const host = u.hostname.toLowerCase();
      if (FIRST_PARTY_SAFE.test(host)) return false; // an toàn
      if (KNOWN_CLOAK_TOKENS.test(host)) return true;
      const sld = host.replace(/^www\./, '').split('.').slice(-2, -1)[0] || '';
      if (/^\d{1,4}[a-z]{2,10}$/i.test(sld)) return true;
      if (/^[a-z]{13,}$/i.test(sld)) return true;
      return false;
    } catch (e) {
      return false;
    }
  }

  function shouldLogUrl(url) {
    if (!url) return false;
    const s = String(url);
    // Không log first-party an toàn trừ khi rõ ràng là ad endpoint
    if (isFirstPartySafe(s) && !/\/ad|pagead|doubleclick|googlesyndication|adservice/i.test(s)) {
      return false;
    }
    return (
      NET_AD_REG.test(s) ||
      NET_VAST_REG.test(s) ||
      NET_VIDEO_REG.test(s) ||
      NET_IFRAME_REG.test(s) ||
      isLikelyCloakedDomain(s) ||
      s.startsWith('blob:')
    );
  }

  function relativeTime() {
    return Math.round((Date.now() - pageStartTs));
  }

  function pushNetLog(type, url, extra = {}) {
    if (!captureEnabled || !url) return null;
    const entry = {
      type,
      url: String(url).slice(0, 1200),
      time: Date.now(),
      rel: relativeTime(),
      ...extra
    };
    window.__jdYtAdNetLog.push(entry);
    if (window.__jdYtAdNetLog.length > MAX_LOG) window.__jdYtAdNetLog.shift();
    return entry;
  }

  function finishRequest(entry, outcome, details = {}) {
    if (!captureEnabled || !entry) return;
    const completedAt = Date.now();
    Object.assign(entry, {
      outcome,
      completedAt,
      durationMs: completedAt - (entry.time || completedAt)
    }, details);
  }

  function errorMessage(error) {
    try {
      if (!error) return 'unknown';
      if (typeof error === 'string') return error.slice(0, 200);
      return String(error.message || error.name || error).slice(0, 200);
    } catch (e) {
      return 'Unknown request error';
    }
  }

  function pushMediaLog(kind, detail = {}) {
    if (!captureEnabled) return;
    try {
      window.__jdMediaLogs.push({
        kind,
        time: Date.now(),
        rel: relativeTime(),
        ...detail
      });
      if (window.__jdMediaLogs.length > MAX_MEDIA) window.__jdMediaLogs.shift();
    } catch (e) {}
  }

  // ========== 0. Click-trace thật (v2.2 – thêm pointer-events + z-index + full-page check) ==========
  function captureClick(e) {
    if (!captureEnabled) return;
    try {
      const pts = (document.elementsFromPoint && document.elementsFromPoint(e.clientX, e.clientY)) || [];
      const els = pts.slice(0, 6).map((el) => {
        let r = { width: 0, height: 0 }, cs = {};
        try {
          r = el.getBoundingClientRect();
          cs = getComputedStyle(el);
        } catch (_) {}
        const area = (r.width || 0) * (r.height || 0);
        const vw = window.innerWidth || 1;
        const vh = window.innerHeight || 1;
        const coversMost = area > (vw * vh * 0.6);
        return {
          tag: el.tagName,
          id: (el.id || '').slice(0, 60),
          class: String(el.className || '').slice(0, 140),
          href: String(el.href || (el.getAttribute && el.getAttribute('href')) || '').slice(0, 300),
          rect: Math.round(r.width) + 'x' + Math.round(r.height),
          zIndex: cs.zIndex || '',
          pointerEvents: cs.pointerEvents || '',
          opacity: cs.opacity || '',
          position: cs.position || '',
          coversMostViewport: coversMost
        };
      });
      // Phát hiện màn đen / overlay phủ khi click
      const top = els[0];
      if (top && top.coversMostViewport && (
        top.tag === 'DIV' || top.tag === 'SECTION' || top.tag === 'A'
      ) && (parseFloat(top.opacity) < 0.15 || top.pointerEvents === 'none' || /overlay|mask|blocker|trap|black|dark|shade/i.test(top.class + top.id))) {
        overlaySignals.push({
          time: Date.now(),
          rel: relativeTime(),
          kind: 'click-on-full-overlay',
          element: top
        });
        if (overlaySignals.length > MAX_OVERLAY_SIGNAL) overlaySignals.shift();
      }

      clickTraces.push({
        time: Date.now(),
        rel: relativeTime(),
        x: e.clientX,
        y: e.clientY,
        button: e.button,
        targetHref: String((e.target && e.target.href) || '').slice(0, 300),
        elements: els
      });
      if (clickTraces.length > MAX_CLICK) clickTraces.shift();
    } catch (_) {}
  }
  try {
    document.addEventListener('click', captureClick, true);
    document.addEventListener('auxclick', captureClick, true);
    restoreActions.push(() => {
      document.removeEventListener('click', captureClick, true);
      document.removeEventListener('auxclick', captureClick, true);
    });
  } catch (_) {}

  // ========== 1. fetch ==========
  const origFetch = window.fetch;
  if (typeof origFetch === 'function') {
    const wrappedFetch = function (...args) {
      let url = '';
      try {
        if (typeof args[0] === 'string') url = args[0];
        else if (args[0] instanceof Request) url = args[0].url;
        else if (args[0] && typeof args[0].url === 'string') url = args[0].url;
      } catch (e) {}
      let method = 'GET';
      try {
        if (args[0] instanceof Request) method = args[0].method || method;
        if (args[1] && args[1].method) method = args[1].method;
      } catch (e) {}
      const entry = shouldLogUrl(url)
        ? pushNetLog('fetch', url, {
            method: String(method).toUpperCase().slice(0, 16),
            outcome: 'pending'
          })
        : null;
      let p;
      try {
        p = origFetch.apply(this, args);
      } catch (error) {
        finishRequest(entry, 'failed', {
          failureReason: 'synchronous-error',
          error: errorMessage(error)
        });
        throw error;
      }
      if (entry) {
        p.then((res) => {
          if (!res) {
            finishRequest(entry, 'unknown');
            return;
          }
          let contentType = '';
          try { contentType = (res.headers && res.headers.get('content-type')) || ''; } catch (e) {}
          finishRequest(entry, res.ok ? 'success' : 'http-error', {
            status: res.status,
            contentType: contentType.slice(0, 80),
            redirected: !!res.redirected,
            type: res.type || ''
          });
        }, (error) => {
          const msg = errorMessage(error);
          const isAbort = /abort/i.test(msg);
          const isNetwork = /network|failed to fetch|load failed|net::/i.test(msg);
          finishRequest(entry, 'failed', {
            failureReason: isAbort ? 'aborted' : (isNetwork ? 'network-error' : 'browser-reported-error'),
            error: msg
          });
        });
      }
      return p;
    };
    window.fetch = wrappedFetch;
    restoreActions.push(() => {
      if (window.fetch === wrappedFetch) window.fetch = origFetch;
    });
  }

  // ========== 2. XHR ==========
  const xhrRequests = new WeakMap();
  const origOpen = XMLHttpRequest.prototype.open;
  const wrappedXhrOpen = function (method, url, ...rest) {
    try {
      xhrRequests.set(this, {
        url: typeof url === 'string' ? url : (url && url.href ? url.href : String(url || '')),
        method: String(method || '').toUpperCase(),
        openTime: Date.now()
      });
    } catch (e) {}
    return origOpen.apply(this, [method, url, ...rest]);
  };
  XMLHttpRequest.prototype.open = wrappedXhrOpen;
  restoreActions.push(() => {
    if (XMLHttpRequest.prototype.open === wrappedXhrOpen) XMLHttpRequest.prototype.open = origOpen;
  });

  const origSend = XMLHttpRequest.prototype.send;
  const wrappedXhrSend = function (...args) {
    let entry = null;
    try {
      const request = xhrRequests.get(this);
      if (request && shouldLogUrl(request.url)) {
        entry = pushNetLog('xhr', request.url, {
          method: request.method,
          outcome: 'pending'
        });
        this.addEventListener('loadend', () => {
          try {
            const status = this.status;
            let contentType = '';
            try { contentType = this.getResponseHeader('content-type') || ''; } catch (e) {}
            if (status === 0) {
              finishRequest(entry, 'failed', {
                status,
                failureReason: 'status-zero-unclassified',
                contentType: contentType.slice(0, 80)
              });
            } else {
              finishRequest(entry, status >= 400 ? 'http-error' : 'success', {
                status,
                contentType: contentType.slice(0, 80),
                responseType: this.responseType || ''
              });
            }
          } catch (e) {
            finishRequest(entry, 'unknown');
          }
        }, { once: true });
        this.addEventListener('error', () => {
          finishRequest(entry, 'failed', { failureReason: 'xhr-error-event' });
        }, { once: true });
        this.addEventListener('abort', () => {
          finishRequest(entry, 'failed', { failureReason: 'aborted' });
        }, { once: true });
      }
    } catch (e) {}
    try {
      return origSend.apply(this, args);
    } catch (error) {
      finishRequest(entry, 'failed', {
        failureReason: 'synchronous-error',
        error: errorMessage(error)
      });
      throw error;
    }
  };
  XMLHttpRequest.prototype.send = wrappedXhrSend;
  restoreActions.push(() => {
    if (XMLHttpRequest.prototype.send === wrappedXhrSend) XMLHttpRequest.prototype.send = origSend;
  });

  // ========== 3. sendBeacon ==========
  if (navigator && typeof navigator.sendBeacon === 'function') {
    const origBeacon = navigator.sendBeacon;
    const wrappedBeacon = function (url, data) {
      let entry = null;
      try {
        if (typeof url === 'string' && shouldLogUrl(url)) {
          entry = pushNetLog('beacon', url, { method: 'POST', outcome: 'pending' });
        }
      } catch (e) {}
      const accepted = origBeacon.apply(this, arguments);
      finishRequest(entry, accepted ? 'accepted' : 'rejected');
      return accepted;
    };
    navigator.sendBeacon = wrappedBeacon;
    restoreActions.push(() => {
      if (navigator.sendBeacon === wrappedBeacon) navigator.sendBeacon = origBeacon;
    });
  }

  // ========== 4. Image src + setAttribute ==========
  try {
    const origImageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    if (origImageSrc && origImageSrc.set) {
      const wrappedImageSrcSetter = function (value) {
        try {
          if (value && shouldLogUrl(String(value))) {
            pushNetLog('img', value, {
              w: this.width || 0,
              h: this.height || 0,
              outcome: 'initiated'
            });
          }
        } catch (e) {}
        return origImageSrc.set.call(this, value);
      };
      Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: wrappedImageSrcSetter,
        get() { return origImageSrc.get.call(this); },
        configurable: true
      });
      restoreActions.push(() => {
        if (Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.set === wrappedImageSrcSetter) {
          Object.defineProperty(HTMLImageElement.prototype, 'src', origImageSrc);
        }
      });
    }
  } catch (e) {}

  const origSetAttribute = Element.prototype.setAttribute;
  const wrappedSetAttribute = function (name, value) {
    try {
      const tag = (this.tagName || '').toUpperCase();
      if (tag === 'IMG' && (name === 'src' || name === 'data-src') && value && shouldLogUrl(String(value))) {
        pushNetLog('img-attr', value, { outcome: 'initiated' });
      }
      if (tag === 'IFRAME' && (name === 'src' || name === 'data-src') && value && shouldLogUrl(String(value))) {
        pushNetLog('iframe-attr', value, { outcome: 'initiated' });
      }
      if (tag === 'VIDEO' || tag === 'SOURCE' || tag === 'AUDIO') {
        if ((name === 'src' || name === 'data-src') && value) {
          pushMediaLog('media-attr-src', {
            tag,
            attr: name,
            url: String(value).slice(0, 500)
          });
          if (shouldLogUrl(String(value))) {
            pushNetLog('media-src', value, { tag, outcome: 'initiated' });
          }
        }
      }
    } catch (e) {}
    return origSetAttribute.apply(this, arguments);
  };
  Element.prototype.setAttribute = wrappedSetAttribute;
  restoreActions.push(() => {
    if (Element.prototype.setAttribute === wrappedSetAttribute) {
      Element.prototype.setAttribute = origSetAttribute;
    }
  });

  // ========== 5. dynamic script ==========
  try {
    const origScriptSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
    if (origScriptSrc?.set) {
      const wrappedScriptSrcSetter = function (value) {
        try {
          if (value && shouldLogUrl(String(value))) {
            pushNetLog('script', value, { outcome: 'initiated' });
          }
        } catch (e) {}
        return origScriptSrc.set.call(this, value);
      };
      Object.defineProperty(HTMLScriptElement.prototype, 'src', {
        ...origScriptSrc,
        set: wrappedScriptSrcSetter
      });
      restoreActions.push(() => {
        if (Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src')?.set === wrappedScriptSrcSetter) {
          Object.defineProperty(HTMLScriptElement.prototype, 'src', origScriptSrc);
        }
      });
    }
  } catch (e) {}

  // ========== 6. WebSocket ==========
  if (typeof WebSocket === 'function') {
    const OrigWebSocket = WebSocket;
    const WrappedWebSocket = function (url, protocols) {
      try {
        if (url && shouldLogUrl(String(url))) {
          pushNetLog('ws', url, { outcome: 'initiated' });
        }
      } catch (e) {}
      return new OrigWebSocket(url, protocols);
    };
    WrappedWebSocket.prototype = OrigWebSocket.prototype;
    WrappedWebSocket.CONNECTING = OrigWebSocket.CONNECTING;
    WrappedWebSocket.OPEN = OrigWebSocket.OPEN;
    WrappedWebSocket.CLOSING = OrigWebSocket.CLOSING;
    WrappedWebSocket.CLOSED = OrigWebSocket.CLOSED;
    window.WebSocket = WrappedWebSocket;
    restoreActions.push(() => {
      if (window.WebSocket === WrappedWebSocket) window.WebSocket = OrigWebSocket;
    });
  }

  // ========== 7. window.open + STACK ==========
  try {
    const origWindowOpen = window.open;
    const wrappedWindowOpen = function (url, target, features) {
      let stack = '';
      try { stack = (new Error().stack || '').slice(0, 900); } catch (_) {}
      try {
        pushNetLog('window.open', url || 'about:blank', {
          outcome: 'attempted',
          eventKind: 'popup-attempt',
          target: (target || '').toString().slice(0, 40),
          features: (features || '').toString().slice(0, 120),
          stack
        });
      } catch (e) {}
      return origWindowOpen.apply(this, arguments);
    };
    window.open = wrappedWindowOpen;
    restoreActions.push(() => {
      if (window.open === wrappedWindowOpen) window.open = origWindowOpen;
    });
  } catch (e) {}

  // ========== 7b. createObjectURL + MediaSource ==========
  try {
    const origCreateObjectURL = URL.createObjectURL;
    if (typeof origCreateObjectURL === 'function') {
      const wrappedCreateObjectURL = function (obj) {
        const url = origCreateObjectURL.apply(this, arguments);
        try {
          const t = (obj && obj.type) ? String(obj.type) : '';
          if (t.indexOf('video') !== -1 || t.indexOf('audio') !== -1) {
            pushNetLog('blob-media', url, { mediaType: t, outcome: 'created' });
            pushMediaLog('blob-created', { url: String(url).slice(0, 200), mediaType: t });
          } else if (typeof MediaSource !== 'undefined' && obj instanceof MediaSource) {
            pushNetLog('blob-mediasource', url, { outcome: 'created' });
            pushMediaLog('mediasource-created', { url: String(url).slice(0, 200) });
            try {
              const origAddSourceBuffer = obj.addSourceBuffer.bind(obj);
              obj.addSourceBuffer = function (mime) {
                pushMediaLog('mediasource-addbuffer', {
                  mime: String(mime || '').slice(0, 120),
                  url: String(url).slice(0, 200)
                });
                return origAddSourceBuffer(mime);
              };
            } catch (e) {}
          } else {
            pushMediaLog('blob-other', { url: String(url).slice(0, 200), type: t });
          }
        } catch (e) {}
        return url;
      };
      URL.createObjectURL = wrappedCreateObjectURL;
      restoreActions.push(() => {
        if (URL.createObjectURL === wrappedCreateObjectURL) {
          URL.createObjectURL = origCreateObjectURL;
        }
      });
    }
  } catch (e) {}

  // ========== 7c. iframe src ==========
  try {
    const origIframeSrc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');
    if (origIframeSrc && origIframeSrc.set) {
      const wrappedIframeSrcSetter = function (value) {
        try {
          if (value && shouldLogUrl(String(value))) {
            pushNetLog('iframe', value, { outcome: 'initiated' });
          }
        } catch (e) {}
        return origIframeSrc.set.call(this, value);
      };
      Object.defineProperty(HTMLIFrameElement.prototype, 'src', {
        set: wrappedIframeSrcSetter,
        get() { return origIframeSrc.get.call(this); },
        configurable: true
      });
      restoreActions.push(() => {
        if (Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src')?.set === wrappedIframeSrcSetter) {
          Object.defineProperty(HTMLIFrameElement.prototype, 'src', origIframeSrc);
        }
      });
    }
  } catch (e) {}

  // ========== 7d. HTMLMediaElement src ==========
  try {
    const mediaProto = HTMLMediaElement && HTMLMediaElement.prototype;
    if (mediaProto) {
      const origMediaSrc = Object.getOwnPropertyDescriptor(mediaProto, 'src');
      if (origMediaSrc && origMediaSrc.set) {
        const wrappedMediaSrc = function (value) {
          try {
            pushMediaLog('media-src-set', {
              tag: (this.tagName || '').toLowerCase(),
              url: String(value || '').slice(0, 500),
              paused: !!this.paused,
              muted: !!this.muted,
              rate: this.playbackRate
            });
            if (value && shouldLogUrl(String(value))) {
              pushNetLog('media-src', value, { tag: this.tagName, outcome: 'initiated' });
            }
          } catch (e) {}
          return origMediaSrc.set.call(this, value);
        };
        Object.defineProperty(mediaProto, 'src', {
          set: wrappedMediaSrc,
          get() { return origMediaSrc.get.call(this); },
          configurable: true
        });
        restoreActions.push(() => {
          if (Object.getOwnPropertyDescriptor(mediaProto, 'src')?.set === wrappedMediaSrc) {
            Object.defineProperty(mediaProto, 'src', origMediaSrc);
          }
        });
      }
    }
  } catch (e) {}

  // ========== 7e. Timer registry THÔNG MINH (v2.2) ==========
  // Bắt timer dài (>= 5s) hoặc callback chứa từ khóa ad/popunder/GATE
  // An toàn: không log timer của site chính thống thông thường
  try {
    const origSetTimeout = window.setTimeout;
    const origSetInterval = window.setInterval;
    const shouldLogTimer = (fn, ms) => {
      try {
        const delay = Number(ms) || 0;
        if (typeof fn !== 'function') return false;
        const src = (fn.toString() || '').slice(0, 300);
        // Luôn log nếu có dấu hiệu ad/popunder/gate
        if (AD_SCRIPT_HINT.test(src)) return true;
        if (/window\.open|location\s*=|location\.href|location\.assign|location\.replace|popunder|GATE|xnPop|xnHta/i.test(src)) return true;
        // Timer rất dài (>= 30s) trên site không phải first-party lớn → đáng nghi
        if (delay >= 30000 && !FIRST_PARTY_SAFE.test(location.hostname)) return true;
        // Timer 5–90s có từ khóa redirect/open
        if (delay >= 5000 && delay <= 120000 && /open|redirect|href|assign|replace/i.test(src)) return true;
        return false;
      } catch (_) { return false; }
    };
    window.setTimeout = function (fn, ms, ...rest) {
      try {
        if (shouldLogTimer(fn, ms || 0)) {
          timerLog.push({
            type: 'timeout',
            ms: ms || 0,
            src: String(fn).slice(0, 220),
            time: Date.now(),
            rel: relativeTime()
          });
          if (timerLog.length > MAX_TIMER) timerLog.shift();
        }
      } catch (_) {}
      return origSetTimeout.apply(this, arguments);
    };
    window.setInterval = function (fn, ms, ...rest) {
      try {
        if (shouldLogTimer(fn, ms || 0)) {
          timerLog.push({
            type: 'interval',
            ms: ms || 0,
            src: String(fn).slice(0, 220),
            time: Date.now(),
            rel: relativeTime()
          });
          if (timerLog.length > MAX_TIMER) timerLog.shift();
        }
      } catch (_) {}
      return origSetInterval.apply(this, arguments);
    };
    restoreActions.push(() => {
      window.setTimeout = origSetTimeout;
      window.setInterval = origSetInterval;
    });
  } catch (_) {}

  // ========== 8. PerformanceObserver ==========
  try {
    if (typeof PerformanceObserver === 'function') {
      resourceObserver = new PerformanceObserver((list) => {
        if (!captureEnabled) return;
        for (const entry of list.getEntries()) {
          try {
            if (entry.name && shouldLogUrl(entry.name)) {
              pushNetLog('perf', entry.name, {
                initiatorType: entry.initiatorType || '',
                duration: Math.round(entry.duration),
                transferSize: entry.transferSize || 0,
                encodedBodySize: entry.encodedBodySize || 0,
                outcome: 'observed'
              });
            }
            window.__jdResourceTimings.push({
              name: String(entry.name).slice(0, 1200),
              type: entry.initiatorType || entry.entryType,
              time: Date.now(),
              rel: relativeTime(),
              duration: Math.round(entry.duration),
              transferSize: entry.transferSize || 0,
              encodedBodySize: entry.encodedBodySize || 0
            });
            if (window.__jdResourceTimings.length > MAX_RESOURCE_TIMINGS) {
              window.__jdResourceTimings.shift();
            }
          } catch (e) {}
        }
      });
      resourceObserver.observe({ type: 'resource', buffered: true });
    }
  } catch (e) {}

  // ========== 9. Global vars (giảm rác) ==========
  function inspectGlobalJS() {
    const globals = [];
    try {
      const keys = Object.keys(window);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (GLOBAL_AD_REG.test(key) && !/onanimation|ontransition|onwebkit|onmoz|onms|onpointer/i.test(key)) {
          try {
            const val = window[key];
            let preview = '';
            try {
              if (val == null) preview = String(val);
              else if (typeof val === 'object') preview = Object.prototype.toString.call(val).slice(0, 80);
              else preview = String(val).slice(0, 150);
            } catch (e) { preview = '[unreadable]'; }
            globals.push({ key, type: typeof val, preview });
          } catch (e) {}
          if (globals.length >= MAX_GLOBAL) break;
        }
      }
    } catch (e) {}
    return globals;
  }

  function snapshotYtPlayer() {
    try {
      const p = document.querySelector('#movie_player, .html5-video-player');
      if (!p) return null;
      const v = p.querySelector('video') || document.querySelector('video.html5-main-video, video');
      return {
        classes: String(p.className || '').slice(0, 400),
        hasAdShowing: /\bad-showing\b|\bad-interrupting\b/i.test(p.className || ''),
        hasAdCreated: /\bad-created\b/i.test(p.className || ''),
        video: v ? {
          paused: !!v.paused,
          muted: !!v.muted,
          volume: v.volume,
          rate: v.playbackRate,
          currentTime: isFinite(v.currentTime) ? Math.round(v.currentTime * 10) / 10 : null,
          src: String(v.src || v.currentSrc || '').slice(0, 300)
        } : null
      };
    } catch (e) {
      return null;
    }
  }

  // ========== Full ad-script + phát hiện GATE / popunder pattern (v2.2.1) ==========
  // Siết: chỉ coi là gate-ad khi có tín hiệu mạnh (AD_URL/popunder + domain lạ, bindTo+TARGET, xnPop/xnHta)
  function collectAdScripts() {
    const out = [];
    try {
      document.querySelectorAll('script').forEach((s) => {
        const src = s.src || '';
        const txt = (s.textContent || '').trim();
        if (!src && !txt) return;
        const combined = src + ' ' + txt;
        const isAd = AD_SCRIPT_HINT.test(combined);
        if (!isAd) return;

        const hasAdUrl = /AD_URL\s*=\s*['"][^'"]+['"]/i.test(txt);
        const hasPopunderUrl = /popunder_url\s*[:=]\s*['"][^'"]+['"]/i.test(txt);
        // GATE thật: classList.add(GATE) / xnPop / xnHta / bindTo + TARGET_CLASSES — KHÔNG chỉ chữ "gate" trong comment
        const hasGateStrong =
          /classList\.add\s*\(\s*['"]?GATE['"]?\s*\)|xnPop|xnHta|bindTo\s*:\s*['"][^'"]+['"]\s*,\s*TARGET_CLASSES|TARGET_CLASSES\s*[:=]/i.test(txt) ||
          (/\bGATE\b/.test(txt) && (hasAdUrl || hasPopunderUrl || /popunder|window\.open\s*\(/i.test(txt)));
        const hasLocalStoragePop = /localStorage\.(?:get|set)Item\s*\(\s*['"][^'"]*(?:Pop|Hta|Miss|GATE|popunder)[^'"]*['"]|lsSet\s*\(\s*['"][^'"]*(?:Pop|Hta|Miss)/i.test(txt);
        const hasStepMs = /STEP_MS|RESTART_MS|90\s*\*\s*1000|30\s*\*\s*60\s*\*\s*1000/i.test(txt);
        const hasWindowOpen = /window\.open\s*\(/i.test(txt);
        const hasLocationAssign = /location\s*(=\s*|\.href\s*=|\.assign|\.replace)/i.test(txt);
        // Domain lạ trong script
        const scriptUrls = (txt.match(/https?:\/\/[^\s"'`<>]+/g) || []).slice(0, 30);
        const hasCloakUrl = scriptUrls.some((u) => {
          try {
            return isLikelyCloakedDomain(u) || /acquirecardedsullen|agileskincare|marvelous-respond|decisive-wait|linkroyal|workers\.dev|cm88|qq88|hi88|new88|sc88|i9bet/i.test(u);
          } catch (_) { return false; }
        });

        const patterns = {
          hasAdUrl,
          hasPopunderUrl,
          hasGate: hasGateStrong,
          hasLocalStoragePop,
          hasStepMs,
          hasWindowOpen,
          hasLocationAssign,
          hasCloakUrl
        };

        out.push({
          type: src ? 'external' : 'inline',
          src: src.slice(0, 400),
          fullText: txt.slice(0, 5000),
          urls: scriptUrls,
          patterns
        });
      });
    } catch (_) {}
    return out.slice(0, 14);
  }

  // ========== Black-screen / full overlay scanner (v2.2.1) ==========
  // Siết: bỏ layout bình thường (.container/.content), yêu cầu fixed/absolute + z cao hoặc trap thật
  function scanBlackScreenSignals() {
    const signals = [];
    try {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      const LAYOUT_SAFE = /^(?:container|content|wrapper|main|page|site|layout|inner|outer|row|col|section-inner|body-inner|app|root)$/i;
      const candidates = document.querySelectorAll('div, section, a, aside');
      const max = Math.min(candidates.length, 120);
      for (let i = 0; i < max; i++) {
        const el = candidates[i];
        try {
          const cls = String(el.className || '').trim();
          const id = (el.id || '').trim();
          // Bỏ class/id layout thông thường
          if (LAYOUT_SAFE.test(cls) || LAYOUT_SAFE.test(id)) continue;
          if (/\b(container|content|wrapper|main-content|page-content|site-content)\b/i.test(cls) &&
              !/overlay|mask|blocker|trap|black|shade|modal|backdrop|gate|popup/i.test(cls + id)) {
            continue;
          }
          const r = el.getBoundingClientRect();
          const area = r.width * r.height;
          if (area < vw * vh * 0.55) continue; // chặt hơn: >= 55% viewport
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          const pos = cs.position || '';
          if (pos !== 'fixed' && pos !== 'absolute') continue; // chỉ fixed/absolute
          const opacity = parseFloat(cs.opacity);
          const zInt = parseInt(cs.zIndex, 10) || 0;
          const bg = (cs.backgroundColor || '') + (cs.backgroundImage || '');
          const isDark = /rgba?\(\s*0\s*,\s*0\s*,\s*0|rgb\(\s*0\s*,\s*0\s*,\s*0\)|#000\b|black/i.test(bg) || opacity < 0.15;
          const highZ = zInt >= 999 || zInt >= 1000;
          const peNone = cs.pointerEvents === 'none';
          const looksTrap = /overlay|mask|blocker|trap|black|dark|shade|backdrop|gate|fullscreen-cover/i.test(cls + id);
          // Chỉ báo khi: (dark + highZ) hoặc (trap name + full cover) hoặc (peNone + highZ + full)
          const isSignal =
            (isDark && highZ) ||
            (looksTrap && (isDark || highZ)) ||
            (peNone && highZ && area > vw * vh * 0.7);
          if (!isSignal) continue;
          signals.push({
            tag: el.tagName,
            id: id.slice(0, 60),
            class: cls.slice(0, 120),
            rect: Math.round(r.width) + 'x' + Math.round(r.height),
            opacity: String(opacity),
            zIndex: cs.zIndex || '',
            pointerEvents: cs.pointerEvents || '',
            position: pos,
            background: bg.slice(0, 80),
            reason: (isDark && highZ) ? 'dark-highz-full' : (looksTrap ? 'named-trap-full' : 'pointer-none-highz-full')
          });
          if (signals.length >= 8) break;
        } catch (_) {}
      }
    } catch (_) {}
    return signals;
  }

  try { window.__hasDebuggerTrap = false; } catch (e) {}

  // ========== 10. Deep inspect v2.2 ==========
  const deepInspectHandler = (event) => {
    if (event.source !== window) return;
    if (event.data && event.data.action === 'JD_REQUEST_DEEP_INSPECT') {
      try {
        const adScripts = collectAdScripts();
        const blackScreen = scanBlackScreenSignals();
        // v2.2.1: gate thật = hasGate mạnh HOẶC (popunder/AD_URL + cloak) HOẶC (localStoragePop + cloak/step)
        const gateDetected = adScripts.some(s => {
          if (!s.patterns) return false;
          const p = s.patterns;
          if (p.hasGate) return true;
          if ((p.hasPopunderUrl || p.hasAdUrl) && (p.hasCloakUrl || p.hasWindowOpen)) return true;
          if (p.hasLocalStoragePop && (p.hasCloakUrl || p.hasStepMs || p.hasWindowOpen)) return true;
          return false;
        });
        const hasStepTimer = adScripts.some(s => s.patterns && s.patterns.hasStepMs);

        window.postMessage({
          action: 'JD_RESPONSE_DEEP_INSPECT',
          deepData: {
            globalVars: inspectGlobalJS(),
            networkLogs: (window.__jdYtAdNetLog || []).slice(-160),
            resourceTimings: (window.__jdResourceTimings || []).slice(-100),
            mediaLogs: (window.__jdMediaLogs || []).slice(-60),
            ytPlayerSnapshot: snapshotYtPlayer(),
            hasDebuggerTrap: !!window.__hasDebuggerTrap,
            clickTraces: clickTraces.slice(-35),
            timerLog: timerLog.slice(-50),
            adScripts: adScripts,
            overlaySignals: overlaySignals.slice(-20),
            blackScreenSignals: blackScreen,
            smartHints: {
              gateClickDetected: gateDetected,
              stepTimerInScript: hasStepTimer,
              firstPartySafeHost: FIRST_PARTY_SAFE.test(location.hostname || ''),
              host: (location.hostname || '').slice(0, 80)
            },
            timestamp: Date.now(),
            pageStartTs,
            captureActive: true,
            version: '2.2.1'
          }
        }, '*');
      } catch (e) {}
    }
  };
  window.addEventListener('message', deepInspectHandler);

  // ========== Stop sạch ==========
  window.__jdInjectedStop = () => {
    if (!captureEnabled) return;
    captureEnabled = false;
    window.removeEventListener('message', deepInspectHandler);
    try { resourceObserver?.disconnect(); } catch (e) {}
    for (let i = restoreActions.length - 1; i >= 0; i--) {
      try { restoreActions[i](); } catch (e) {}
    }
    if (window.__jdYtAdNetLog === captureNetworkLogs) {
      if (previousCaptureGlobals.networkLogs === undefined) delete window.__jdYtAdNetLog;
      else window.__jdYtAdNetLog = previousCaptureGlobals.networkLogs;
    }
    if (window.__jdResourceTimings === captureResourceTimings) {
      if (previousCaptureGlobals.resourceTimings === undefined) delete window.__jdResourceTimings;
      else window.__jdResourceTimings = previousCaptureGlobals.resourceTimings;
    }
    if (window.__jdMediaLogs === captureMediaLogs) {
      if (previousCaptureGlobals.mediaLogs === undefined) delete window.__jdMediaLogs;
      else window.__jdMediaLogs = previousCaptureGlobals.mediaLogs;
    }
    try {
      if (window.__hasDebuggerTrap === false) {
        if (previousCaptureGlobals.debuggerTrap) {
          Object.defineProperty(window, '__hasDebuggerTrap', previousCaptureGlobals.debuggerTrap);
        } else {
          delete window.__hasDebuggerTrap;
        }
      }
    } catch (e) {}
    if (window.__jdInjectedStop === stopCapture) {
      if (previousStopDescriptor) Object.defineProperty(window, '__jdInjectedStop', previousStopDescriptor);
      else delete window.__jdInjectedStop;
    }
    if (window.__jdInjectedReady === true) {
      if (previousReadyDescriptor) Object.defineProperty(window, '__jdInjectedReady', previousReadyDescriptor);
      else delete window.__jdInjectedReady;
    }
  };
  const stopCapture = window.__jdInjectedStop;
})();
