#!/usr/bin/env node
/**
 * inspect-url.mjs — soi trang bị khóa F12
 * Dùng: node inspect-url.mjs <url>
 * Cần: npm i playwright && npx playwright install chromium
 */
import { chromium } from 'playwright';

const url = process.argv[2];
if (!url || !/^https?:\/\//i.test(url)) {
  console.error('Cách dùng: node inspect-url.mjs <https://...>');
  process.exit(1);
}

const logs = [];
const net = [];

const browser = await chromium.launch({
  headless: true, // đổi false nếu muốn nhìn trình duyệt
  args: ['--disable-blink-features=AutomationControlled']
});

const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  viewport: { width: 1365, height: 900 }
});

const page = await context.newPage();

page.on('console', (msg) => {
  logs.push({ type: msg.type(), text: msg.text() });
});
page.on('pageerror', (err) => {
  logs.push({ type: 'pageerror', text: String(err && err.message ? err.message : err) });
});
page.on('requestfailed', (req) => {
  net.push({
    kind: 'failed',
    url: req.url(),
    error: req.failure() && req.failure().errorText
  });
});

// Inject sớm — trước script trang (giống document_start)
await page.addInitScript(() => {
  const nativeSetInterval = window.setInterval;
  const nativeSetTimeout = window.setTimeout;
  const wrap = (native) =>
    function (fn, ms) {
      try {
        if (typeof fn === 'function' && /debugger/.test(Function.prototype.toString.call(fn))) {
          return 0;
        }
      } catch (e) {}
      return native.apply(this, arguments);
    };
  window.setInterval = wrap(nativeSetInterval);
  window.setTimeout = wrap(nativeSetTimeout);

  try {
    Object.defineProperty(window, 'outerWidth', {
      get() {
        return window.innerWidth;
      },
      configurable: true
    });
    Object.defineProperty(window, 'outerHeight', {
      get() {
        return window.innerHeight;
      },
      configurable: true
    });
  } catch (e) {}
});

let gotoError = null;
try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
} catch (e) {
  gotoError = String(e && e.message ? e.message : e);
}

// Chờ SPA / player
await page.waitForTimeout(3500);

const report = await page
  .evaluate(() => {
    const cs = (el) => {
      try {
        return getComputedStyle(el);
      } catch (e) {
        return null;
      }
    };
    const htmlCs = cs(document.documentElement);
    const bodyCs = cs(document.body);
    const videos = [...document.querySelectorAll('video')].map((v) => ({
      src: (v.currentSrc || v.src || '').slice(0, 120),
      w: v.videoWidth,
      h: v.videoHeight,
      paused: v.paused,
      readyState: v.readyState
    }));
    const iframes = [...document.querySelectorAll('iframe')].slice(0, 15).map((f) => ({
      src: (f.src || '').slice(0, 120),
      id: f.id || '',
      className: String(f.className || '').slice(0, 60)
    }));

    // Tìm container có thanh cuộn gần video (nếu có)
    let scrollNearVideo = null;
    const v0 = document.querySelector('video');
    if (v0) {
      let el = v0;
      for (let i = 0; i < 8 && el; i++, el = el.parentElement) {
        const s = cs(el);
        if (!s) continue;
        if (/(auto|scroll)/.test(s.overflow + s.overflowY + s.overflowX)) {
          scrollNearVideo = {
            tag: el.tagName + (el.id ? '#' + el.id : ''),
            className: String(el.className || '').slice(0, 60),
            overflow: s.overflow,
            overflowY: s.overflowY,
            overflowX: s.overflowX
          };
          break;
        }
      }
    }

    return {
      title: document.title,
      href: location.href,
      readyState: document.readyState,
      videoCount: videos.length,
      videos,
      iframeCount: document.querySelectorAll('iframe').length,
      iframes,
      htmlOverflow: htmlCs && htmlCs.overflow,
      htmlOverflowY: htmlCs && htmlCs.overflowY,
      bodyOverflow: bodyCs && bodyCs.overflow,
      bodyOverflowY: bodyCs && bodyCs.overflowY,
      scrollNearVideo,
      scriptCount: document.scripts.length,
      hasDebuggerInInline: [...document.scripts].some((s) =>
        /debugger/.test(s.textContent || '')
      )
    };
  })
  .catch((e) => ({ evaluateError: String(e) }));

console.log('\n========== REPORT ==========');
console.log(JSON.stringify({ url, gotoError, report }, null, 2));

console.log('\n========== CONSOLE / PAGEERROR (tối đa 40) ==========');
console.log(JSON.stringify(logs.slice(0, 40), null, 2));

console.log('\n========== REQUEST FAILED (tối đa 20) ==========');
console.log(JSON.stringify(net.slice(0, 20), null, 2));

await browser.close();