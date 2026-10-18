// ==================== GENERIC VIDEO — MAIN WORLD (tầng mạng + hook play thật) ====================
// Chạy "world":"MAIN" — cùng ngữ cảnh JS với trang (giống content-main-world.js của YouTube).
//
// MỤC TIÊU:
//   - Bổ SUNG, không thay generic-video-adblock.js (isolated: DOM skip / seek-end / mute).
//   - Hook HTMLMediaElement.play + jwplayer THẬT (isolated không ghi đè được prototype trang).
//   - Chặn fetch/XHR VAST–IMA–ad network còn lọt DNR (URL động / cùng host lạ).
//
// KHÔNG port từ YouTube:
//   - ytInitialPlayerResponse / adPlacements / clientScreen spoof / ytcfg / playabilityStatus
//   → chỉ đúng YouTube; đưa sang site khác dễ gãy player / DRM / login.
//
// AN TOÀN:
//   - Bỏ qua trusted hosts (bank, Google, GitHub, x.ai…).
//   - Không đụng blob: / MediaSource của phim chính chỉ vì src không khớp ad pattern.
//   - URL block hẹp (VAST/IMA/adservice…), không block mọi "ad" trong path.
(function () {
  'use strict';
  if (window.__jdGenericVideoMain) return;
  window.__jdGenericVideoMain = true;

  const h = (location.hostname || '').toLowerCase();
  const isTrustedPage =
    /^(?:.*\.)?(?:github\.com|githubusercontent\.com|x\.ai|grok\.com|google\.com|accounts\.google\.com|googleapis\.com|gstatic\.com|youtube\.com|youtu\.be|microsoft\.com|live\.com|office\.com|apple\.com|icloud\.com|facebook\.com|twitter\.com|x\.com)$/i.test(
      h
    ) ||
    /\.(gov\.vn|edu\.vn)$/i.test(h) ||
    /(vietcombank|techcombank|mbbank|acb|tpbank|vpbank|bidv|agribank|vietinbank)\.com\.vn$/i.test(h);
  if (isTrustedPage) return;
  // YouTube có stack riêng — không chạy file này trên YT (manifest cũng exclude).

  // ----- Pattern mạng QC video (hẹp, chủ động — không chờ report từng site) -----
  const AD_NET_URL_RE =
    /doubleclick\.net|googlesyndication\.com|googleadservices\.com|adservice\.google|pagead2\.|securepubads\.|googletagservices\.com|imasdk\.googleapis\.com|\/ima3\.js|\/ima3\.|googleads\.g\.doubleclick|pagead\/|\/ad_status\.js|\/pagead\/adview|\/pcs\/view|vast\.|\/vast\/|vmap\.xml|vpaid|adserver|adsystem|preroll|midroll|\/ads\/vast|advertising\.com|adnxs\.com|adsrvr\.org|moatads\.com|spotx(change)?\.|teads\.tv|exoclick\.com|juicyads\.com|popads\.net|popcash\.net|propellerads|trafficjunky|adsterra|hilltopads|admaven|evadav|richads|zeropark|cm88\d{2}\.(?:co|com)/i;

  const shouldBlockAdNetworkUrl = (url) => {
    if (!url) return false;
    try {
      const s = String(typeof url === 'string' ? url : url.url || url).toLowerCase();
      if (!s || s.startsWith('blob:') || s.startsWith('data:')) return false;
      return AD_NET_URL_RE.test(s);
    } catch (e) {
      return false;
    }
  };

  // Class player đang chiếu QC — nhiều họ (JW / VJS / IMA / Flowplayer / Plyr / XPlayer…)
  // Không phụ thuộc 1 khung. Iframe: manifest all_frames → mỗi frame chạy MAIN riêng.
  const AD_PLAYER_CLASS_RE =
    /jw-flag-ads|jw-flag-ad|jw-ads|ima-ad|ima-ads|vjs-ad-playing|vjs-ad-loading|vjs-ad-|ad-playing|ads-playing|vast-ad|vpaid|fp-ad|fp-ad-playing|plyr--ads|plyr__ad|xplayer-ads|ad-mode|ad-showing|google-ima|video-ads|ad-interrupting|ytad-showing/i;

  const videoNearAdPlayer = (video) => {
    try {
      let el = video;
      for (let i = 0; i < 16 && el; i++, el = el.parentElement) {
        const cn =
          typeof el.className === 'string'
            ? el.className
            : (el.getAttribute && el.getAttribute('class')) || '';
        if (AD_PLAYER_CLASS_RE.test(cn)) return true;
        try {
          if (
            el.getAttribute &&
            (el.getAttribute('data-ad-state') === 'playing' || el.getAttribute('data-ad-playing') === 'true')
          ) {
            return true;
          }
        } catch (e) {}
      }
    } catch (e) {}
    return false;
  };

  const forceEndVideo = (video) => {
    if (!video) return;
    try {
      video.muted = true;
      video.volume = 0;
    } catch (e) {}
    try {
      const d = video.duration;
      if (isFinite(d) && d > 0 && video.currentTime < d) {
        video.currentTime = d;
        try {
          video.dispatchEvent(new Event('ended'));
        } catch (e) {}
      }
    } catch (e) {}
  };

  // ========== 1) Hook play THẬT (MAIN) — isolated không làm được ==========
  try {
    const proto = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
    if (proto && !proto.__jdGvMainPlayHooked) {
      const nativePlay = proto.play;
      proto.play = function () {
        try {
          const src = (this.currentSrc || this.src || '') + '';
          if (shouldBlockAdNetworkUrl(src) || videoNearAdPlayer(this)) {
            forceEndVideo(this);
          }
        } catch (e) {}
        return nativePlay.apply(this, arguments);
      };
      proto.__jdGvMainPlayHooked = true;
    }
  } catch (e) {}

  // ========== 2) fetch — chặn request ad network, giả response rỗng ==========
  try {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      let url = '';
      try {
        if (typeof input === 'string') url = input;
        else if (input && input.url) url = input.url;
        else if (input && typeof input.toString === 'function') url = input.toString();
      } catch (e) {}
      if (shouldBlockAdNetworkUrl(url)) {
        // VAST hay XML — trả VAST rỗng; còn lại JSON rỗng
        const isVast = /vast|vmap|vpaid|ima/i.test(url);
        const body = isVast
          ? '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"></VAST>'
          : '{}';
        const type = isVast ? 'application/xml' : 'application/json';
        return Promise.resolve(
          new Response(body, { status: 200, statusText: 'OK', headers: { 'Content-Type': type } })
        );
      }
      return nativeFetch(input, init);
    };
  } catch (e) {}

  // ========== 3) XHR — cùng policy ==========
  try {
    const nativeOpen = XMLHttpRequest.prototype.open;
    const nativeSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
      try {
        this.__jdGvBlockAd = shouldBlockAdNetworkUrl(url);
        this.__jdGvUrl = url;
      } catch (e) {
        this.__jdGvBlockAd = false;
      }
      return nativeOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function (body) {
      if (this.__jdGvBlockAd) {
        const url = String(this.__jdGvUrl || '');
        const isVast = /vast|vmap|vpaid|ima/i.test(url);
        const resp = isVast
          ? '<?xml version="1.0" encoding="UTF-8"?><VAST version="3.0"></VAST>'
          : '{}';
        try {
          Object.defineProperties(this, {
            status: { value: 200, configurable: true },
            statusText: { value: 'OK', configurable: true },
            readyState: { value: 4, configurable: true },
            responseText: { value: resp, configurable: true },
            response: { value: resp, configurable: true }
          });
        } catch (e) {}
        queueMicrotask(() => {
          try {
            if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
            if (typeof this.onload === 'function') this.onload();
            try {
              this.dispatchEvent(new Event('readystatechange'));
            } catch (e) {}
            try {
              this.dispatchEvent(new Event('load'));
            } catch (e) {}
          } catch (e) {}
        });
        return;
      }
      return nativeSend.apply(this, arguments);
    };
  } catch (e) {}

  // ========== 4) jwplayer global (MAIN) — skip ad events sớm ==========
  try {
    const hookJw = (player) => {
      if (!player || player.__jdGvMainJw) return;
      player.__jdGvMainJw = true;
      const skip = () => {
        try {
          if (typeof player.skip === 'function') player.skip();
        } catch (e) {}
        try {
          const vast = player.getPlugin && player.getPlugin('vast');
          if (vast && typeof vast.skip === 'function') vast.skip();
        } catch (e) {}
        try {
          player.trigger && player.trigger('adSkipped');
          player.trigger && player.trigger('adComplete');
        } catch (e) {}
        try {
          const el = player.getContainer && player.getContainer();
          const v = el && el.querySelector && el.querySelector('video');
          forceEndVideo(v);
        } catch (e) {}
      };
      ['adPlay', 'adImpression', 'adStarted', 'adBlock', 'beforePlay', 'adTime'].forEach((ev) => {
        try {
          player.on && player.on(ev, skip);
        } catch (e) {}
      });
    };

    let currentJw = window.jwplayer;
    const wrapJw = (fn) => {
      if (typeof fn !== 'function' || fn.__jdGvWrapped) return fn;
      const wrapped = function () {
        const inst = fn.apply(this, arguments);
        try {
          hookJw(inst);
        } catch (e) {}
        return inst;
      };
      try {
        Object.keys(fn).forEach((k) => {
          try {
            wrapped[k] = fn[k];
          } catch (e) {}
        });
      } catch (e) {}
      wrapped.__jdGvWrapped = true;
      return wrapped;
    };

    if (typeof currentJw === 'function') {
      window.jwplayer = wrapJw(currentJw);
    }
    try {
      Object.defineProperty(window, 'jwplayer', {
        configurable: true,
        enumerable: true,
        get() {
          return currentJw;
        },
        set(v) {
          currentJw = wrapJw(v);
        }
      });
      if (typeof currentJw === 'function') currentJw = wrapJw(currentJw);
    } catch (e) {
      if (typeof currentJw === 'function') window.jwplayer = wrapJw(currentJw);
    }

    let n = 0;
    const iv = setInterval(() => {
      n++;
      try {
        if (typeof window.jwplayer === 'function') {
          document.querySelectorAll('.jwplayer[id]').forEach((el) => {
            try {
              hookJw(window.jwplayer(el.id));
            } catch (e) {}
          });
        }
      } catch (e) {}
      if (n > 40) clearInterval(iv);
    }, 50);
  } catch (e) {}
})();
