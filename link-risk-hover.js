// ==================== LINK RISK HOVER v2 — xem trước nội dung & rủi ro khi rê chuột lên link ====================
// Tầng 1: tín hiệu domain (phishing / malware / ads / trusted) từ background.
// Tầng 2: background tải HTML trang đích (không cookie, không chạy JS) và phân tích tĩnh:
//         tiêu đề, mô tả, loại nội dung, quảng cáo, JS đáng ngờ, form lừa đảo, file tải về...
// Tự giải link bọc của Google / Bing / DuckDuckGo / Yahoo / Facebook để biết ĐÍCH THẬT.
(function () {
  'use strict';
  if (window.top !== window.self) return;
  if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) return;

  const CUR_HOST = (location.hostname || '').toLowerCase();
  {
    const JD_GOV_EDU_RE = /(?:^|\.)(?:gov|mil|edu|int)$|(?:^|\.)(?:gov|gob|gouv|govt|gv|go|gub|gouvernement|overheid|government|admin|ac|edu|nic)\.[a-z]{2}$|(?:^|\.)(?:gc\.ca|canada\.ca|europa\.eu|admin\.ch|bund\.de|bund\.at|service-public\.fr|gosuslugi\.ru)$|(?:^|\.)state\.[a-z]{2}\.us$/i;
    const isVnBank = /(?:vietcombank|techcombank|mbbank|acb|tpbank|vpbank|bidv|agribank|vietinbank|sacombank|hdbank|shb|vib|msb|seabank|ocb|eximbank|lpbank|namabank|abbank)\.(?:com\.)?vn$/i.test(CUR_HOST);
    if (JD_GOV_EDU_RE.test(CUR_HOST) || isVnBank) return;
  }

  // ===== CHỈ HOẠT ĐỘNG TRÊN TRANG KẾT QUẢ TÌM KIẾM (Google / Bing / DuckDuckGo / Yahoo / Brave / Coc Coc / Yandex / Ecosia / Startpage) =====
  const SERP = (function () {
    const h = CUR_HOST.replace(/^www\./, '');
    const path = location.pathname || '';
    const q = location.search || '';
    if (/^google\.[a-z.]+$/.test(h)) return (path === '/search' || /[?&]q=/.test(q) && path.indexOf('/search') === 0) ? 'google' : null;
    if (h === 'bing.com' || h.endsWith('.bing.com')) return path.indexOf('/search') === 0 ? 'bing' : null;
    if (h === 'duckduckgo.com' || h === 'html.duckduckgo.com') return /[?&]q=/.test(q) || h === 'html.duckduckgo.com' ? 'ddg' : null;
    if (h === 'search.yahoo.com') return path.indexOf('/search') === 0 ? 'yahoo' : null;
    if (h === 'search.brave.com') return path.indexOf('/search') === 0 ? 'brave' : null;
    if (h === 'coccoc.com') return path.indexOf('/search') === 0 ? 'generic' : null;
    if (h === 'yandex.com' || h === 'yandex.ru') return path.indexOf('/search') === 0 ? 'generic' : null;
    if (h === 'ecosia.org') return path.indexOf('/search') === 0 ? 'generic' : null;
    if (h === 'startpage.com') return /\/(do\/)?s(earch|p\/search)/.test(path) ? 'generic' : null;
    return null;
  })();
  if (!SERP) return;
  // Webmail: KHÔNG tải trước link (tránh kích hoạt link xác nhận/hủy đăng ký)
  const IS_WEBMAIL = /(^|\.)(mail\.google\.com|outlook\.(live|office|office365)\.com|mail\.yahoo\.com|webmail\.|mail\.)/i.test(CUR_HOST);

  let lang = 'en';
  let scanEnabled = true;

  const I18N = {
    en: {
      titleSafe: 'Looks safe', titleClean: 'No bad signs found', titleCaution: 'Caution', titleDanger: 'HIGH RISK', titleUnknown: 'Checking…',
      realDest: 'Real destination', via: 'via', host: 'Destination',
      sec_content: 'Page content', sec_ads: 'Ads', sec_js: 'Code & behaviour', sec_domain: 'Domain signals',
      scanning: 'Reading page content…',
      adsMain: 'Ordinary ads: {list} (normal on mainstream sites)', adsAggr: 'Aggressive ad network: {list} — often pop-ups / redirects / malware',
      titleUnsure: 'Unclear', tipUnresolved: 'Cannot tell where this link goes — check the URL under the result title before clicking.', partialNote: 'Still reading the rest of the page…', unresolvedHost: 'redirect link',
      g_domain: 'Domain', g_ads: 'Ads', g_js: 'Scripts', g_beh: 'Behaviour', g_data: 'Forms & data',
      domUnknown: 'No data on this domain',
      domNotTrusted: 'Not on the extension’s trusted list (unknown site — neutral, not a warning)',
      domNotBlocked: 'Not on the extension’s blocklist / phishing list', behClean: 'No forced popup / redirect / download seen', dataClean: 'No sensitive form or data capture seen',
      f_perm: 'Asks for camera / mic / location access',
      resolving: 'Search-engine redirect — resolving real destination…',
      unresolved: 'Could not determine the real destination (search-engine redirect). Use the URL shown under the result title.',
      scanBlocked: 'Site blocks automated reading (HTTP {n}) — content preview unavailable',
      scanTimeout: 'Page too slow to read — content preview unavailable',
      scanError: 'Could not read page — content preview unavailable',
      scanPrivate: 'Local/private address — not scanned',
      scanNotHtml: 'Not a web page ({t})',
      scanSkipped: 'Not scanned (could trigger an action such as logout/confirm/unsubscribe)',
      scanOff: 'Content scan is turned off',
      noTitle: '(no title)',
      botWall: 'This site uses anti-bot protection (e.g. Cloudflare), so its content cannot be read here. Showing the description from the search result instead.', fromSerp: 'From search result', wellKnown: 'Well-known, established website', titleLimited: 'Content could not be read', tipLimited: 'The site blocks automated reading, so scripts/ads could not be checked. The domain is not on any block or phishing list. Open only if you trust the source.', tipSafeLimited: 'Well-known site. It blocks automated reading, so page scripts/ads were not scanned.', notChecked: 'Not checked — the site blocks automated reading', guessed: 'guessed from site name', guessNote: 'Destination guessed from the site name shown by Google — not verified', tpList: 'Third-party scripts: {list}',
      adsNone: 'No ads found in the page HTML',
      adsSome: '{n} ad network(s): {list}',
      adsense: '{n} Google ad slot(s)',
      scriptsInfo: '{a} external scripts ({b} from third-party domains), {c} inline scripts',
      jsClean: 'No suspicious code pattern found',
      noSignals: 'No strong risk signal on this domain.',
      cat_adult: 'Adult content (18+)', cat_gambling: 'Gambling / betting', cat_prize: 'Prize / free-gift bait (often a scam)',
      cat_piracy: 'Pirated movies / cracks', cat_crypto: 'Crypto / get-rich pitch', cat_loan: 'Quick-loan offers',
      tipSafe: 'Known trusted or official domain.',
      tipClean: 'Nothing dangerous seen in the HTML. Static check only — still be careful with passwords/OTP.',
      tipCaution: 'Suspicious signs. Do not enter passwords/OTP/card; do not install anything.',
      tipDanger: 'Dangerous. Do NOT open. Never enter passwords, OTP or card details; do not download anything.',
      tipUnknown: 'Domain not in our lists. Open only if you trust the source.',
      sameSite: 'Same site / organisation as the current page',
      adsNetwork: 'Known ad / redirect network', shortener: 'Link shortener (real destination hidden)',
      phishing: 'Possible brand impersonation / phishing', malware: 'Known malware distribution domain',
      blocked: 'Domain previously blocked by this extension', softTrust: 'Previously scored as legitimate',
      trusted: 'Trusted major platform / bank / gov', susTld: 'Suspicious / cheap TLD often used by scams',
      loginPath: 'URL suggests login / verify / OTP page', affiliate: 'Affiliate / gambling-style URL pattern',
      loading: 'Checking…',
      f_miner: 'Hidden crypto-miner code', f_exfil: 'Sends data to Telegram/Discord webhook (data theft)',
      f_fakeAlert: 'Fake virus alert / "update your browser" bait', f_dlExe: 'Links to executable files ({n}): .apk/.exe…',
      f_formCross: 'Form submits to another domain: {x}', f_passHttp: 'Password field on a NON-HTTPS page',
      f_passForm: 'Has a password field — do not type unless you are sure', f_cardForm: 'Has card / OTP input fields',
      f_packed: 'Packed eval() script — hides real code', f_obf: 'Obfuscated JavaScript',
      f_b64Exec: 'Decodes base64 then executes it', f_hexStr: 'Long hex-escaped strings (code hiding)',
      f_unescapeWrite: 'document.write(unescape()) — classic injection', f_popunder: 'Opens ad tab/popup on click (popunder) ({n})',
      f_redirect: 'Auto-redirects via JS / meta refresh', f_push: 'Asks for notification permission (push spam)',
      f_clipboard: 'Hooks the clipboard (can swap copied text/wallet)', f_backTrap: 'Traps the Back button',
      f_hiddenIframe: 'Hidden iframe(s) ({n})', f_extSus: 'Loads script from suspicious source: {x}',
      f_noHttps: 'Page is not HTTPS', f_thinJs: 'Almost empty page, content loaded by JS — cannot preview',
      f_redirected: 'Redirected to another domain: {x}', f_download: 'This link downloads a file ({x})',
      f_catWarn_gambling: 'Gambling page — high scam/fraud rate', f_catWarn_prize: 'Prize bait — likely scam',
      truncated: 'Only the first part of the page was analysed.',
      disclaimer: 'Static HTML check, no cookies, JS not executed. Not a guarantee.'
    },
    vi: {
      titleSafe: 'Có vẻ an toàn', titleClean: 'Chưa thấy dấu hiệu xấu', titleCaution: 'Cần thận trọng', titleDanger: 'RỦI RO CAO', titleUnknown: 'Đang kiểm tra…',
      realDest: 'Đích thật', via: 'qua', host: 'Đích đến',
      sec_content: 'Nội dung trang', sec_ads: 'Quảng cáo', sec_js: 'Mã & hành vi', sec_domain: 'Tín hiệu domain',
      scanning: 'Đang đọc nội dung trang…',
      adsMain: 'Quảng cáo thông thường: {list} (bình thường ở site lớn)', adsAggr: 'Mạng quảng cáo hung hăng: {list} — hay gây popup / chuyển hướng / mã độc',
      titleUnsure: 'Chưa rõ', tipUnresolved: 'Chưa biết link này dẫn tới đâu — hãy xem URL dưới tiêu đề kết quả trước khi bấm.', partialNote: 'Đang đọc tiếp phần còn lại của trang…', unresolvedHost: 'link chuyển hướng',
      g_domain: 'Tên miền', g_ads: 'Quảng cáo', g_js: 'Mã JS', g_beh: 'Hành vi', g_data: 'Form & dữ liệu',
      domUnknown: 'Chưa có dữ liệu về tên miền này',
      domNotTrusted: 'Chưa nằm trong danh sách tin cậy của extension (site lạ — chỉ là trung tính, chưa phải cảnh báo)',
      domNotBlocked: 'Không nằm trong danh sách chặn / lừa đảo của extension', behClean: 'Không thấy popup / chuyển hướng / tải file ép buộc', dataClean: 'Không thấy form nhạy cảm hay thu thập dữ liệu',
      f_perm: 'Xin quyền camera / mic / vị trí',
      resolving: 'Link chuyển hướng của công cụ tìm kiếm — đang xác định đích thật…',
      unresolved: 'Không xác định được đích thật (link chuyển hướng của Google/Bing). Hãy xem URL hiển thị dưới tiêu đề kết quả.',
      scanBlocked: 'Site chặn đọc tự động (HTTP {n}) — không xem trước được nội dung',
      scanTimeout: 'Trang phản hồi quá chậm — không xem trước được',
      scanError: 'Không đọc được trang — không xem trước được',
      scanPrivate: 'Địa chỉ nội bộ — không quét',
      scanNotHtml: 'Không phải trang web ({t})',
      scanSkipped: 'Không quét để tránh vô tình kích hoạt hành động (đăng xuất/xác nhận/hủy đăng ký…)',
      scanOff: 'Đang tắt quét nội dung',
      noTitle: '(không có tiêu đề)',
      botWall: 'Trang này có chống bot (vd. Cloudflare) nên không đọc được nội dung. Đang hiện mô tả lấy từ kết quả tìm kiếm.', fromSerp: 'Từ kết quả tìm kiếm', wellKnown: 'Website nổi tiếng, chính chủ đã biết', titleLimited: 'Không đọc được nội dung', tipLimited: 'Trang chặn công cụ đọc tự động nên chưa kiểm tra được mã JS/quảng cáo. Tên miền không nằm trong danh sách chặn hay lừa đảo. Chỉ mở nếu bạn tin nguồn.', tipSafeLimited: 'Site nổi tiếng. Trang chặn đọc tự động nên chưa quét mã JS/quảng cáo bên trong.', notChecked: 'Chưa kiểm tra được — trang chặn đọc tự động', guessed: 'đoán từ tên site', guessNote: 'Đích được đoán từ tên site Google hiển thị — chưa xác minh', tpList: 'Script bên thứ ba: {list}',
      adsNone: 'Không thấy quảng cáo trong HTML',
      adsSome: '{n} mạng quảng cáo: {list}',
      adsense: '{n} vị trí quảng cáo Google',
      scriptsInfo: '{a} script ngoài ({b} từ domain bên thứ ba), {c} script nhúng',
      jsClean: 'Không thấy mẫu mã đáng ngờ',
      noSignals: 'Chưa có tín hiệu rủi ro mạnh trên domain này.',
      cat_adult: 'Nội dung người lớn (18+)', cat_gambling: 'Cờ bạc / cá độ', cat_prize: 'Mồi trúng thưởng / quà miễn phí (hay là lừa đảo)',
      cat_piracy: 'Phim lậu / crack', cat_crypto: 'Tiền ảo / làm giàu nhanh', cat_loan: 'Vay tiền nhanh',
      tipSafe: 'Domain tin cậy hoặc chính chủ đã biết.',
      tipClean: 'HTML chưa có gì nguy hiểm. Đây chỉ là kiểm tra tĩnh — vẫn cẩn thận với mật khẩu/OTP.',
      tipCaution: 'Có dấu hiệu đáng ngờ. Không nhập mật khẩu/OTP/thẻ, không cài đặt gì.',
      tipDanger: 'NGUY HIỂM. Đừng mở. Tuyệt đối không nhập mật khẩu, OTP, thẻ; không tải file nào.',
      tipUnknown: 'Domain chưa có trong danh sách. Chỉ mở nếu bạn tin nguồn.',
      sameSite: 'Cùng site / cùng tổ chức với trang hiện tại',
      adsNetwork: 'Mạng quảng cáo / chuyển hướng đã biết', shortener: 'Link rút gọn (đích thật bị ẩn)',
      phishing: 'Có thể giả mạo thương hiệu / lừa đảo', malware: 'Domain phát tán mã độc đã biết',
      blocked: 'Domain từng bị extension này chặn', softTrust: 'Trước đó được chấm là site chính thống',
      trusted: 'Nền tảng lớn / ngân hàng / gov đã tin cậy', susTld: 'TLD rẻ / đáng ngờ thường dùng cho scam',
      loginPath: 'Đường dẫn gợi ý trang đăng nhập / xác minh / OTP', affiliate: 'Mẫu URL kiểu affiliate / cờ bạc',
      loading: 'Đang kiểm tra…',
      f_miner: 'Có mã đào coin ngầm (cryptominer)', f_exfil: 'Gửi dữ liệu ra Telegram/Discord webhook (đánh cắp thông tin)',
      f_fakeAlert: 'Giả cảnh báo virus / ép "cập nhật trình duyệt"', f_dlExe: 'Có link tới file thực thi ({n}): .apk/.exe…',
      f_formCross: 'Form gửi dữ liệu sang domain khác: {x}', f_passHttp: 'Ô mật khẩu trên trang KHÔNG có HTTPS',
      f_passForm: 'Có ô nhập mật khẩu — đừng nhập nếu không chắc chắn', f_cardForm: 'Có ô nhập thẻ / OTP',
      f_packed: 'JS đóng gói eval() — che giấu mã thật', f_obf: 'JavaScript bị làm rối (obfuscated)',
      f_b64Exec: 'Giải mã base64 rồi chạy', f_hexStr: 'Chuỗi hex dài (giấu mã)',
      f_unescapeWrite: 'document.write(unescape()) — kiểu chèn mã kinh điển', f_popunder: 'Mở tab/popup quảng cáo khi bấm (popunder) ({n})',
      f_redirect: 'Tự chuyển hướng bằng JS / meta refresh', f_push: 'Xin quyền thông báo (spam push)',
      f_clipboard: 'Can thiệp clipboard (có thể thay nội dung/ví khi copy)', f_backTrap: 'Chặn nút Back',
      f_hiddenIframe: 'Iframe ẩn ({n})', f_extSus: 'Tải script từ nguồn đáng ngờ: {x}',
      f_noHttps: 'Trang không dùng HTTPS', f_thinJs: 'Trang gần như trống, nội dung nạp bằng JS — không xem trước được',
      f_redirected: 'Bị chuyển sang domain khác: {x}', f_download: 'Link này tải file về ngay ({x})',
      f_catWarn_gambling: 'Trang cờ bạc — tỉ lệ lừa đảo rất cao', f_catWarn_prize: 'Mồi trúng thưởng — nhiều khả năng lừa đảo',
      truncated: 'Chỉ phân tích phần đầu của trang.',
      disclaimer: 'Kiểm tra HTML tĩnh, không cookie, không chạy JS. Không phải bảo đảm tuyệt đối.'
    }
  };
  const t = (k, p) => {
    let s = (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
    if (p) for (const key in p) s = s.replace('{' + key + '}', p[key]);
    return s;
  };

  try {
    chrome.storage.local.get(['appLanguage', 'linkScanEnabled'], (r) => {
      if (r && r.appLanguage) lang = r.appLanguage === 'vi' ? 'vi' : 'en';
      if (r && r.linkScanEnabled === false) scanEnabled = false;
    });
    chrome.storage.onChanged.addListener((c, area) => {
      if (area !== 'local') return;
      if (c.appLanguage) lang = c.appLanguage.newValue === 'vi' ? 'vi' : 'en';
      if (c.linkScanEnabled) scanEnabled = c.linkScanEnabled.newValue !== false;
    });
  } catch (e) {}

  // ---------------------------------------------------------------- panel
  const PANEL_W = 400;
  const panel = document.createElement('div');
  panel.id = 'jd-link-risk-panel';
  panel.setAttribute('data-jd-own-ui', '1');
  panel.setAttribute('aria-hidden', 'true');
  panel.style.cssText = [
    'position:fixed', 'left:0', 'top:0', 'z-index:2147483646', 'display:none',
    'width:' + PANEL_W + 'px', 'max-width:calc(100vw - 20px)', 'box-sizing:border-box', 'padding:12px 14px',
    'border-radius:12px', 'font:13px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
    'box-shadow:0 14px 44px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.08)',
    'pointer-events:none', 'color:#f5f5f5', 'background:rgba(22,24,28,.97)', 'text-align:left'
  ].join(';');

  const LEVEL_STYLE = {
    safe: { bar: '#22c55e', icon: '✓', bg: 'rgba(34,197,94,.18)', fg: '#4ade80' },
    clean: { bar: '#2dd4bf', icon: '✓', bg: 'rgba(45,212,191,.16)', fg: '#5eead4' },
    caution: { bar: '#f59e0b', icon: '!', bg: 'rgba(245,158,11,.18)', fg: '#fbbf24' },
    danger: { bar: '#ef4444', icon: '✕', bg: 'rgba(239,68,68,.22)', fg: '#f87171' },
    unknown: { bar: '#94a3b8', icon: '…', bg: 'rgba(148,163,184,.15)', fg: '#cbd5e1' }
  };
  const SEV_COLOR = { 3: '#f87171', 2: '#fbbf24', 1: '#94a3b8' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function sec(title, inner) {
    return `<div style="margin-top:9px"><div style="font-size:11px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;opacity:.55;margin-bottom:3px">${esc(title)}</div>${inner}</div>`;
  }
  function line(text, color, dot) {
    return `<div style="font-size:12px;margin:2px 0;display:flex;gap:6px"><span style="color:${color || '#94a3b8'};flex:none">${dot || '•'}</span><span style="min-width:0;word-break:break-word">${esc(text)}</span></div>`;
  }

  // ---------------------------------------------------------------- state
  const RANK = { unknown: 0, safe: 1, clean: 1, caution: 2, danger: 3 };
  const domainCache = new Map(); // host -> {at,data}
  const scanCache = new Map();   // url  -> {at,data}
  const DOMAIN_TTL = 5 * 60 * 1000, SCAN_TTL = 10 * 60 * 1000;
  let state = null;          // trạng thái link đang hover
  let activeAnchor = null;
  let hoverTimer = null;
  let token = 0;
  let mx = 0, my = 0;
  let visible = false;

  function finalLevel(s) {
    let lvl = (s.domain && s.domain.level) || 'unknown';
    const sc = s.scan && s.scan.ok && !isBotWall(s.scan) ? s.scan : null;
    if (sc) {
      const cr = sc.risk === 'danger' ? 'danger' : sc.risk === 'caution' ? 'caution' : 'clean';
      if (RANK[cr] > RANK[lvl]) lvl = cr;
      else if (lvl === 'unknown' && cr === 'clean') lvl = 'clean';
    }
    if (s.domain && s.domain.trusted && lvl !== 'danger' && lvl !== 'caution') lvl = 'safe';
    if (lvl === 'unknown' && s.sameSite) lvl = 'safe';
    if (!s.domain && !sc) lvl = 'unknown';
    return lvl;
  }

  function scanFailText(sc) {
    switch (sc.reason) {
      case 'blocked': return t('scanBlocked', { n: sc.status || '' });
      case 'timeout': return t('scanTimeout');
      case 'private': return t('scanPrivate');
      case 'unresolved': return t('unresolved');
      case 'nothtml': return t('scanNotHtml', { t: sc.contentType || '?' });
      default: return t('scanError');
    }
  }

  const ICON = { ok: ['✓', '#4ade80'], warn: ['⚠', '#fbbf24'], bad: ['⛔', '#f87171'], info: ['ℹ', '#60a5fa'], wait: ['⏳', '#94a3b8'] };
  const GROUP = {
    miner: 'js', packed: 'js', obf: 'js', b64Exec: 'js', hexStr: 'js', unescapeWrite: 'js', extSus: 'js',
    popunder: 'beh', redirect: 'beh', redirected: 'beh', push: 'beh', backTrap: 'beh', hiddenIframe: 'beh', thinJs: 'beh', dlExe: 'beh', download: 'beh',
    formCross: 'data', passForm: 'data', passHttp: 'data', cardForm: 'data', exfil: 'data', clipboard: 'data', noHttps: 'data', perm: 'data'
  };

  function adName(n) {
    const m = { doubleclick: 'Google DoubleClick', googlesyndication: 'Google AdSense', adsbygoogle: 'Google AdSense', googleadservices: 'Google Ads', taboola: 'Taboola', outbrain: 'Outbrain', adnxs: 'Xandr', revcontent: 'Revcontent', mgid: 'MGID', adskeeper: 'Adskeeper' };
    return m[String(n).toLowerCase()] || n;
  }
  function row(status, label, items) {
    const ic = ICON[status] || ICON.info;
    const tint = { ok: 'rgba(34,197,94,.09)', info: 'rgba(96,165,250,.10)', warn: 'rgba(245,158,11,.13)', bad: 'rgba(239,68,68,.17)', wait: 'rgba(148,163,184,.08)' }[status] || 'rgba(148,163,184,.08)';
    return `<div style="display:flex;gap:8px;padding:6px 8px;margin:4px 0;border-left:4px solid ${ic[1]};background:${tint};border-radius:4px 8px 8px 4px">
      <span style="width:16px;flex:none;color:${ic[1]};text-align:center;font-size:14px;font-weight:800;line-height:1.2">${ic[0]}</span>
      <div style="width:82px;flex:none;font-size:11px;font-weight:800;color:#e2e8f0;padding-top:2px;text-transform:uppercase;letter-spacing:.3px">${esc(label)}</div>
      <div style="flex:1;min-width:0;font-size:12px;word-break:break-word">${items.map((x) => `<div style="margin:1px 0;color:${x.c || '#f1f5f9'}">${esc(x.text)}</div>`).join('')}</div>
    </div>`;
  }
  function statusOf(list) {
    if (!list.length) return 'ok';
    return list.some((x) => x.sev >= 3) ? 'bad' : list.some((x) => x.sev === 2) ? 'warn' : 'info';
  }
  function findingItem(f) {
    const key = f.k === 'catWarn' ? 'f_catWarn_' + f.extra : 'f_' + f.k;
    return { text: t(key, { n: f.n, x: f.extra }), c: f.sev >= 3 ? '#fca5a5' : f.sev === 2 ? '#fcd34d' : '#93c5fd', sev: f.sev };
  }

  function render() {
    if (!state) return;
    const s = state;
    const level = finalLevel(s);
    const st = LEVEL_STYLE[level] || LEVEL_STYLE.unknown;
    const settled = s.scanState !== 'loading' || !!s.domain;
    let titleKey = { safe: 'titleSafe', clean: 'titleClean', caution: 'titleCaution', danger: 'titleDanger', unknown: 'titleUnknown' }[level];
    let tipKey = { safe: 'tipSafe', clean: 'tipClean', caution: 'tipCaution', danger: 'tipDanger', unknown: 'tipUnknown' }[level];
    if (level === 'unknown' && settled) titleKey = 'titleUnsure';
    const limited = !!(s.scan && isBotWall(s.scan));
    if (limited && level === 'unknown' && !s.guessed) { titleKey = 'titleLimited'; tipKey = 'tipLimited'; }
    if (limited && level === 'safe') tipKey = 'tipSafeLimited';
    if (s.unresolvedFailed && level === 'unknown') tipKey = 'tipUnresolved';
    const botWall = !!(s.scan && isBotWall(s.scan));
    const sc = s.scan && s.scan.ok && !botWall ? s.scan : null;
    const isHttps = /^https:/i.test(s.url || '');

    // ---------- HEADER: kết luận + đích thật
    const via = s.guessed ? `<span style="opacity:.55;font-size:11px"> · ${esc(t('guessed'))}</span>` : s.wrapped ? `<span style="opacity:.55;font-size:11px"> · ${esc(t('realDest'))} (${esc(t('via'))} ${esc(s.wrapped)})</span>` : '';
    const hostLine = s.unresolved
      ? `<div style="font-size:12px;opacity:.7">${esc(t('resolving'))}</div>`
      : s.unresolvedFailed
      ? `<div style="font-size:12px;opacity:.7">${esc(s.wrapped || '')} ${esc(t('unresolvedHost'))}</div>`
      : `<div style="font-size:14px;font-weight:700;word-break:break-all;line-height:1.3"><span title="${isHttps ? 'HTTPS' : 'HTTP'}" style="color:${isHttps ? '#4ade80' : '#f87171'};font-size:12px">${isHttps ? '🔒' : '🔓'}</span> ${esc(s.host)}</div>
         ${s.pathHint ? `<div style="font-size:11px;opacity:.5;word-break:break-all;margin-top:1px">${esc(s.pathHint.slice(0, 90))}</div>` : ''}`;

    const header = `
      <div style="display:flex;gap:10px;align-items:stretch">
        <div style="width:5px;border-radius:5px;background:${st.bar};flex:none"></div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${st.bg};color:${st.fg};font-weight:800;font-size:12px;flex:none">${st.icon}</span>
            <strong style="font-size:15px;letter-spacing:.2px;color:${st.fg}">${esc(t(titleKey))}</strong>${via}
          </div>
          ${hostLine}
        </div>
      </div>`;

    // ---------- THẺ NỘI DUNG TRANG
    let page = '';
    if (sc && sc.isDownload) {
      page = `<div style="margin-top:9px;padding:8px 10px;border-radius:8px;background:rgba(239,68,68,.15);color:#fca5a5;font-size:12px">⛔ ${esc(t('f_download', { x: sc.contentType || 'file' }))}</div>`;
    } else if (sc) {
      const alerts = (sc.findings || []).filter((f) => f.k === 'fakeAlert' || f.k === 'catWarn').map(findingItem);
      const chips = (sc.categories || []).map((c) => {
        const warn = c === 'adult' || c === 'gambling' || c === 'prize';
        return `<span style="font-size:11px;padding:2px 8px;border-radius:999px;background:${warn ? 'rgba(245,158,11,.2)' : 'rgba(148,163,184,.18)'};color:${warn ? '#fbbf24' : '#cbd5e1'}">${esc(t('cat_' + c))}</span>`;
      }).join('');
      const d = (sc.desc || sc.snippet || '').slice(0, 220);
      page = `<div style="margin-top:9px;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.06)">
        <div style="font-size:13px;font-weight:700;word-break:break-word;line-height:1.3">${esc(sc.title || t('noTitle'))}</div>
        ${d ? `<div style="font-size:12px;opacity:.78;margin-top:3px;word-break:break-word;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(d)}</div>` : ''}
        ${chips ? `<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">${chips}</div>` : ''}
        ${alerts.map((x) => `<div style="margin-top:5px;font-size:12px;color:${x.c}">${x.sev >= 3 ? '⛔' : '⚠'} ${esc(x.text)}</div>`).join('')}
      </div>`;
    } else if (s.serp && (botWall || s.scanState === 'loading' || s.scanState === 'fail' || s.scanState === 'idle')) {
      const sd = (s.serp.desc || '').slice(0, 220);
      const note = botWall ? t('botWall') : (s.scanState === 'loading' ? (s.unresolved ? t('resolving') : t('scanning')) : '');
      page = `<div style="margin-top:9px;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.06)">
        <div style="font-size:13px;font-weight:700;word-break:break-word;line-height:1.3">${esc(s.serp.title || t('noTitle'))}</div>
        ${sd ? `<div style="font-size:12px;opacity:.78;margin-top:3px;word-break:break-word;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(sd)}</div>` : ''}
        ${note ? `<div style="margin-top:5px;font-size:11px;opacity:.6">${botWall ? 'ℹ' : '⏳'} ${esc(note)}</div>` : ''}
      </div>`;
    } else {
      let msg = '', ic = '⏳';
      if (s.scanState === 'loading') msg = s.unresolved ? t('resolving') : t('scanning');
      else if (s.scanState === 'skipped') { msg = t('scanSkipped'); ic = '•'; }
      else if (s.scanState === 'off') { msg = t('scanOff'); ic = '•'; }
      else if (s.scanState === 'fail' && s.scan) { msg = scanFailText(s.scan); ic = 'ℹ'; }
      if (msg) page = `<div style="margin-top:9px;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.06);font-size:12px;opacity:.85">${ic} ${esc(msg)}</div>`;
    }

    // ---------- BẢNG KIỂM TRA (luôn hiện đủ các mục để biết đã kiểm tra gì)
    let rows = '';
    // 1. Domain
    if (!s.unresolved) {
      const dr = s.domainReasons || [];
      const items = dr.length ? dr.map((r) => ({ text: r.text, c: r.bad ? '#fcd34d' : (r.c || '#86efac') })) : [{ text: t('domUnknown'), c: '#cbd5e1' }];
      const dl = s.domain && s.domain.level;
      const stDom = dl === 'danger' ? 'bad' : (dl === 'caution' || dr.some((r) => r.bad)) ? 'warn' : (dl === 'safe' || (s.domain && s.domain.trusted)) ? 'ok' : 'info';
      rows += row(stDom, t('g_domain'), items);
    }
    if (sc && !sc.isDownload) {
      const fs = (sc.findings || []).filter((f) => f.k !== 'fakeAlert' && f.k !== 'catWarn').slice().sort((x, y) => y.sev - x.sev);
      const by = { js: [], beh: [], data: [] };
      fs.forEach((f) => { const g = GROUP[f.k]; if (g) by[g].push(f); });

      // 2. Quảng cáo
      const a = sc.ads || {};
      const aggr = a.aggressive || [];
      const main = (a.mainstream || (aggr.length ? [] : (a.networks || [])));
      const adItems = [];
      let adSt = 'ok';
      if (aggr.length) {
        adSt = aggr.length >= 3 ? 'bad' : 'warn';
        adItems.push({ text: t('adsAggr', { list: aggr.map(adName).join(', ') }), c: adSt === 'bad' ? '#fca5a5' : '#fcd34d' });
      }
      if (main.length || a.adsense > 0) {
        if (adSt === 'ok') adSt = 'info';
        const names = main.map(adName);
        if (a.adsense > 0 && names.indexOf('Google AdSense') < 0) names.push('Google AdSense');
        adItems.push({ text: t('adsMain', { list: names.join(', ') }), c: '#93c5fd' });
      }
      rows += row(adSt, t('g_ads'), adItems.length ? adItems : [{ text: t('adsNone'), c: '#86efac' }]);

      // 3. Mã JS
      const scr = sc.scripts || {};
      const jsInfo = { text: t('scriptsInfo', { a: scr.external || 0, b: scr.thirdPartyCount || 0, c: scr.inline || 0 }) + ((scr.thirdParty || []).length ? ' — ' + t('tpList', { list: scr.thirdParty.join(', ') }) : ''), c: '#94a3b8' };
      rows += row(statusOf(by.js), t('g_js'), by.js.length ? by.js.map(findingItem).concat([jsInfo]) : [{ text: t('jsClean'), c: '#86efac' }, jsInfo]);

      // 4. Hành vi
      rows += row(statusOf(by.beh), t('g_beh'), by.beh.length ? by.beh.map(findingItem) : [{ text: t('behClean'), c: '#86efac' }]);

      // 5. Form & dữ liệu
      rows += row(statusOf(by.data), t('g_data'), by.data.length ? by.data.map(findingItem) : [{ text: t('dataClean'), c: '#86efac' }]);
    }

    if (botWall) rows += row('info', t('g_js'), [{ text: t('notChecked'), c: '#cbd5e1' }]);
    const foot = (sc && sc.partial ? t('partialNote') + ' ' : '') + (sc && sc.truncated ? t('truncated') + ' ' : '') + t('disclaimer');
    panel.innerHTML = `
      ${header}
      ${page}
      <div style="margin-top:8px">${rows}</div>
      <div style="font-size:12px;line-height:1.4;padding:8px 10px;border-radius:8px;margin-top:6px;background:${st.bg};color:#f8fafc;font-weight:${level === 'danger' ? 700 : 500}">${esc(t(tipKey))}</div>
      <div style="margin-top:5px;font-size:10px;opacity:.4">${esc(foot)}</div>`;
    show();
  }

  // Vị trí THÔNG MINH: neo theo khung của link (không chạy theo chuột), chọn phía còn đủ chỗ để thấy TRỌN panel
  function anchorRect() {
    if (state && state.anchorEl) {
      try {
        const rects = state.anchorEl.getClientRects();
        for (const r of rects) if (mx >= r.left - 2 && mx <= r.right + 2 && my >= r.top - 2 && my <= r.bottom + 2) return r;
        const r0 = state.anchorEl.getBoundingClientRect();
        if (r0 && r0.width) return r0;
      } catch (e) {}
    }
    return { left: mx, right: mx, top: my, bottom: my };
  }
  function place() {
    const pad = 10, gap = 14;
    const vw = window.innerWidth, vh = window.innerHeight;
    const w = Math.min(PANEL_W, vw - 2 * pad);
    panel.style.width = w + 'px';
    panel.style.zoom = '1';
    const h = panel.offsetHeight || 260;
    const r = anchorRect();
    const clampX = (x) => Math.max(pad, Math.min(x, vw - w - pad));
    const clampY = (y) => Math.max(pad, Math.min(y, vh - h - pad));

    const cand = {
      above: { space: r.top - pad - gap, x: clampX(mx - 40), y: r.top - gap - h },
      below: { space: vh - r.bottom - pad - gap, x: clampX(mx - 40), y: r.bottom + gap },
      right: { space: vh - 2 * pad, fitW: vw - r.right - pad - gap >= w, x: r.right + gap, y: clampY(my - h / 2) },
      left: { space: vh - 2 * pad, fitW: r.left - pad - gap >= w, x: r.left - gap - w, y: clampY(my - h / 2) }
    };
    const vertFirst = cand.above.space >= cand.below.space ? ['above', 'below'] : ['below', 'above'];
    let order = vertFirst.concat(['right', 'left']);
    if (state && state.side && order.indexOf(state.side) > 0) order = [state.side].concat(order.filter((k) => k !== state.side)); // giữ phía cũ nếu còn vừa
    let pick = null;
    for (const k of order) {
      const c = cand[k];
      const fits = (k === 'above' || k === 'below') ? c.space >= h : (c.fitW && h <= vh - 2 * pad);
      if (fits) { pick = k; break; }
    }
    let zoom = 1;
    if (!pick) {
      // Không phía nào đủ chỗ: dùng phía rộng nhất và thu nhỏ vừa khung hình
      pick = cand.above.space >= cand.below.space ? 'above' : 'below';
      const avail = Math.max(120, cand[pick].space);
      zoom = Math.min(1, avail / h, (vh - 2 * pad) / h);
    }
    if (state) state.side = pick;
    const c = cand[pick];
    let x = c.x, y = c.y;
    if (zoom < 1) {
      panel.style.zoom = String(zoom);
      const hh = h * zoom;
      y = pick === 'above' ? Math.max(pad, r.top - gap - hh) : Math.min(r.bottom + gap, vh - hh - pad);
      x = clampX(x);
      // zoom làm toạ độ left/top bị nhân theo -> chia lại
      x = x / zoom; y = y / zoom;
    } else {
      y = Math.max(pad, Math.min(y, vh - h - pad));
    }
    panel.style.left = x + 'px';
    panel.style.top = y + 'px';
  }
  function show() {
    panel.style.display = 'block';
    panel.style.opacity = '1';
    visible = true;
    place();
  }
  function hide() {
    panel.style.display = 'none';
    visible = false;
  }

  if (document.documentElement) document.documentElement.appendChild(panel);
  else document.addEventListener('DOMContentLoaded', () => document.documentElement.appendChild(panel), { once: true });

  // ---------------------------------------------------------------- link helpers
  // Chỉ nhận LINK KẾT QUẢ tìm kiếm — bỏ qua header, menu, ứng dụng Google, "Show more", sidebar, footer...
  const NON_RESULT_AREA = 'header, nav, footer, form, [role="navigation"], [role="banner"], [role="dialog"], [role="menu"], [role="search"], #gb, #searchform, #appbar, #top_nav, #hdtb, #botstuff, #fbar, #footcnt, #b_header, #b_footer, .b_scopebar, #header, #footer, .header, .footer, g-popup, g-scrolling-carousel';
  const RESULT_BOX = {
    google:  '.MjjYud, .tF2Cxc, .g, .vt6azd, [data-snc], [data-hveid][data-ved]',
    bing:    'li.b_algo, .b_algo',
    ddg:     'article[data-testid="result"], li[data-layout="organic"], .result, .results_links, .web-result',
    yahoo:   '.algo, .dd.algo, #web li, .algo-sr',
    brave:   '.snippet, #results .snippet, [data-type="web"]',
    generic: '.result, .serp-item, .organic, .b-serp-item, [data-testid*="result"], article, li'
  };
  function isResultLink(a) {
    try {
      if (!SERP) return false;
      if (a.closest(NON_RESULT_AREA)) return false;
      const box = a.closest(RESULT_BOX[SERP] || RESULT_BOX.generic);
      if (!box) return false;
      // Link nội bộ của chính công cụ tìm kiếm (không phải link bọc / link ra ngoài) -> bỏ
      let u;
      try { u = new URL(a.href, location.href); } catch (e) { return false; }
      const sameEngine = u.hostname.replace(/^www\./, '') === CUR_HOST.replace(/^www\./, '') ||
        (SERP === 'google' && /(^|\.)google\.[a-z.]+$/.test(u.hostname)) ||
        (SERP === 'bing' && /(^|\.)bing\.com$/.test(u.hostname) && !/^\/(ck\/a|aclk)/.test(u.pathname));
      if (sameEngine) {
        // Google: chỉ link bọc /url?... hoặc /goto?... mới là kết quả thật
        const wrapped = SERP === 'google' && /^\/(url|goto|aclk)$/.test(u.pathname);
        if (!wrapped) return false;
      }
      // Phải là link TIÊU ĐỀ / URL / thumbnail của kết quả: có h3|h2|cite trong link, hoặc box chứa cite/title tương ứng
      if (a.querySelector('h1, h2, h3, h4, cite, [role="heading"]')) return true;
      if (a.closest('h1, h2, h3, h4, [role="heading"]')) return true;
      if (a.querySelector('img, svg, video') && box.querySelector('cite, h2, h3, [role="heading"]')) return true;
      if (box.querySelector('cite') && a.querySelector('cite, span')) return true;
      return false;
    } catch (e) { return false; }
  }

  function getAnchor(el) {
    try {
      if (!el || el.nodeType !== 1) return null;
      if (el === panel || (panel.contains && panel.contains(el))) return null;
      const a = el.closest && el.closest('a[href], area[href]');
      if (!a) return null;
      const href = a.href || a.getAttribute('href') || '';
      if (!href || /^(javascript:|#|mailto:|tel:|blob:|data:|sms:)/i.test(href)) return null;
      if (!isResultLink(a)) return null;
      return a;
    } catch (e) { return null; }
  }

  // Đọc URL hiển thị (thẻ <cite>) trong khối kết quả tìm kiếm
  function visibleUrlFromAnchor(a) {
    try {
      // 1) Thuộc tính ping của Google chứa URL thật: ping="/url?...&url=https://site..."
      const ping = a.getAttribute('ping') || '';
      if (ping) {
        const m = /[?&]url=([^&\s]+)/.exec(ping);
        if (m) {
          const real = new URL(decodeURIComponent(m[1]));
          if (/^https?:$/.test(real.protocol) && !/(^|\.)google\.[a-z.]+$/.test(real.hostname)) return real;
        }
      }
      let cite = a.querySelector('cite');
      if (!cite) {
        const box = a.closest('[data-hveid], .MjjYud, .tF2Cxc, .g, li.b_algo, .result');
        if (box) cite = box.querySelector('cite');
      }
      if (!cite) {
        // thumbnail video / thẻ phụ: leo lên tối đa 8 cấp, lấy khối chỉ chứa ĐÚNG 1 cite
        let el = a.parentElement;
        for (let i = 0; i < 8 && el && !cite; i++, el = el.parentElement) {
          const cs = el.querySelectorAll('cite');
          if (cs.length === 1) cite = cs[0];
          else if (cs.length > 1) break;
        }
      }
      if (!cite) return null;
      let txt = (cite.textContent || '').replace(/\u200b/g, '').trim();
      txt = txt.split(/\s+[›»>]\s*|\s+/)[0];
      if (!txt) return null;
      if (!/^https?:\/\//i.test(txt)) txt = 'https://' + txt;
      const url = new URL(txt);
      if (!url.hostname || url.hostname.indexOf('.') === -1) return null;
      if (/(^|\.)google\.[a-z.]+$/.test(url.hostname)) return null;
      return url;
    } catch (e) { return null; }
  }

  // Cùng tổ chức: drive.google.com <-> google.com.vn (cùng tên + đuôi hợp lệ phổ biến, loại đuôi rẻ như .tk/.xyz)
  function sldOf(h) {
    const p = String(h || '').toLowerCase().split('.');
    if (p.length < 2) return null;
    let i = p.length - 2;
    if (p.length >= 3 && /^(com|net|org|edu|gov|co|ac)$/.test(p[p.length - 2])) i = p.length - 3;
    return { name: p[i], tld: p.slice(i + 1).join('.') };
  }
  function sameOrg(a, b) {
    const x = sldOf(a), y = sldOf(b);
    if (!x || !y || x.name !== y.name || x.name.length < 4) return false;
    const okTld = (t) => /^(com|net|org|edu|gov|info)(\.[a-z]{2})?$|^co\.[a-z]{2}$|^[a-z]{2}$/.test(t) && !/^(tk|ml|ga|cf|gq|cc|ws|top|xyz)$/.test(t);
    return okTld(x.tld) && okTld(y.tld);
  }

  // Giải link bọc của search engine / mạng xã hội -> đích thật
  function resolveReal(a) {
    let u;
    try { u = new URL(a.href, location.href); } catch (e) { return null; }
    const h = u.hostname.toLowerCase();
    let real = null, via = '';
    try {
      if (/(^|\.)google\.[a-z.]+$/.test(h) && u.pathname === '/url') { real = u.searchParams.get('q') || u.searchParams.get('url'); via = 'Google'; }
      else if (/(^|\.)bing\.com$/.test(h) && u.pathname.indexOf('/ck/') === 0) {
        const p = u.searchParams.get('u');
        if (p && /^a1/.test(p)) {
          let b = p.slice(2).replace(/-/g, '+').replace(/_/g, '/');
          while (b.length % 4) b += '=';
          real = atob(b); via = 'Bing';
        }
      }
      else if (/(^|\.)duckduckgo\.com$/.test(h) && u.pathname.indexOf('/l/') === 0) { real = u.searchParams.get('uddg'); via = 'DuckDuckGo'; }
      else if (/(^|\.)yahoo\.com$/.test(h)) { const m = /\/RU=([^/]+)\//.exec(u.pathname); if (m) { real = decodeURIComponent(m[1]); via = 'Yahoo'; } }
      else if (/(^|\.)facebook\.com$/.test(h) && u.pathname === '/l.php') { real = u.searchParams.get('u'); via = 'Facebook'; }
      else if (/(^|\.)coccoc\.com$/.test(h) && u.searchParams.get('url')) { real = u.searchParams.get('url'); via = 'Cốc Cốc'; }
    } catch (e) { real = null; }
    if (real) {
      try {
        const r = new URL(real);
        if (/^https?:$/.test(r.protocol)) return { url: r, via };
      } catch (e) {}
    }
    // Google /goto?url=TOKEN (token mã hóa) hoặc /url không có q: lấy domain hiển thị trong kết quả
    const isSearchWrap = (/(^|\.)google\.[a-z.]+$/.test(h) && (u.pathname === '/goto' || u.pathname === '/url' || u.pathname === '/aclk'))
      || (/(^|\.)bing\.com$/.test(h) && u.pathname.indexOf('/ck/') === 0);
    if (isSearchWrap) {
      const vis = visibleUrlFromAnchor(a);
      if (vis) return { url: vis, via: /bing/.test(h) ? 'Bing' : 'Google' };
      return { url: u, via: /bing/.test(h) ? 'Bing' : 'Google', unresolved: true };
    }
    return { url: u, via: '' };
  }

  function assessLocalHints(url, host) {
    const out = [];
    const u = String(url || '').toLowerCase(), h = String(host || '').toLowerCase();
    if (/(?:^|\.)(?:bit\.ly|tinyurl\.com|cutt\.ly|t\.co|goo\.gl|ow\.ly|is\.gd|shorturl\.at|rebrand\.ly|rb\.gy|s\.id)$/i.test(h)) out.push({ key: 'shortener', weight: 1 });
    if (/\.(xyz|top|icu|cfd|buzz|click|link|monster|rest|tk|ml|ga|cf|gq|cyou|work|fun)$/i.test(h)) out.push({ key: 'susTld', weight: 1 });
    if (/\/(?:login|signin|sign-in|verify|otp|password|secure|account[-_]?update|captcha)/i.test(u)) out.push({ key: 'loginPath', weight: 1 });
    if (/(?:utm_medium=popunder|clickid=|\/afu\.php|\/aff\.php|new88|sc88|hi88|cm88|qq88|789bet)/i.test(u)) out.push({ key: 'affiliate', weight: 2 });
    return out;
  }

  const NO_SCAN_PATH = /(unsubscribe|opt-?out|logout|log-out|signout|sign-out|verify|confirm|activate|activation|reset|magic|token=|delete|remove|revoke|approve|redeem|one-?time)/i;

  function safeSend(msg, cb, retry) {
    try {
      chrome.runtime.sendMessage(msg, (resp) => {
        if (chrome.runtime.lastError || resp === undefined) {
          // service worker đang ngủ / vừa khởi động -> thử lại 1 lần
          if (retry > 0) return setTimeout(() => safeSend(msg, cb, retry - 1), 150);
          return cb(null);
        }
        cb(resp);
      });
    } catch (e) { cb(null); }
  }

  // ---------------------------------------------------------------- xem trước tức thì từ chính kết quả tìm kiếm
  function serpInfo(a) {
    try {
      const box = a.closest(RESULT_BOX[SERP] || RESULT_BOX.generic) || a.parentElement;
      if (!box) return null;
      const clean = (x) => (x || '').replace(/\s+/g, ' ').trim();
      let title = '';
      const h = a.querySelector('h1, h2, h3, h4, [role="heading"]') || (a.closest('h1, h2, h3, h4, [role="heading"]')) || box.querySelector('h3, h2, [role="heading"]');
      title = clean(h && h.textContent) || clean(a.getAttribute('aria-label')) || clean(a.textContent);
      let snip = '';
      const sel = ['.VwiC3b', '[data-sncf]', '.b_caption p', '.b_lineclamp2', '.b_lineclamp3', '.b_lineclamp4', '[data-result="snippet"]', '[data-testid="result-snippet"]', '.result__snippet', '.compText', '.snippet-description', '.snippet-content', '.s-desc', 'p'];
      for (const q of sel) {
        const el = box.querySelector(q);
        const tx = clean(el && el.textContent);
        if (tx && tx.length > 25 && tx !== title) { snip = tx; break; }
      }
      if (!snip) {
        const all = clean(box.innerText || box.textContent);
        snip = all.replace(title, '').slice(0, 260);
      }
      if (!title && !snip) return null;
      return { title: title.slice(0, 140), desc: snip.slice(0, 260) };
    } catch (e) { return null; }
  }
  const SITE_HOSTS = { 'reddit': 'reddit.com', 'youtube': 'youtube.com', 'quora': 'quora.com', 'wikipedia': 'wikipedia.org', 'facebook': 'facebook.com', 'instagram': 'instagram.com', 'tiktok': 'tiktok.com', 'pinterest': 'pinterest.com', 'linkedin': 'linkedin.com', 'medium': 'medium.com', 'stack overflow': 'stackoverflow.com', 'stackoverflow': 'stackoverflow.com', 'github': 'github.com', 'x': 'x.com', 'twitter': 'twitter.com', 'amazon': 'amazon.com', 'imdb': 'imdb.com', 'netflix': 'netflix.com', 'spotify': 'spotify.com', 'tripadvisor': 'tripadvisor.com' };
  function guessHostFromSerp(info, a) {
    try {
      const box = a.closest(RESULT_BOX[SERP] || RESULT_BOX.generic);
      if (!box) return null;
      const nameEl = box.querySelector('.VuuXrf, .byrV5b cite, cite');
      let nm = (nameEl && nameEl.textContent || '').split(/[·›»|]/)[0].trim().toLowerCase();
      if (!nm) return null;
      if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(nm)) return nm;
      return SITE_HOSTS[nm] || null;
    } catch (e) { return null; }
  }
  const BOT_TITLE_RE = /^(just a moment|attention required|access denied|checking (your )?browser|verifying you are human|verify you are human|are you (a )?human|please wait|one moment|ddos protection|security check|request blocked|403 forbidden|error 1020|human verification|pardon our interruption|bot verification|vui lòng chờ|đang kiểm tra)/i;
  const BOT_BODY_RE = /(enable javascript and cookies to continue|checking if the site connection is secure|verify you are human|cf-browser-verification|cloudflare ray id|needs to review the security of your connection|captcha)/i;
  function isBotWall(sc) {
    if (!sc) return false;
    if (!sc.ok) return sc.reason === 'blocked' && [401, 403, 429, 503].indexOf(sc.status) >= 0;
    const ti = (sc.title || '').trim();
    const ds = (sc.desc || sc.snippet || '');
    if (BOT_TITLE_RE.test(ti)) return true;
    if (BOT_BODY_RE.test(ds)) return true;
    if (sc.status === 403 || sc.status === 503 || sc.status === 429) return !ti || ti.length < 40;
    return false;
  }

  // ---------------------------------------------------------------- main flow
  function startAssess(anchor) {
    const r = resolveReal(anchor);
    if (!r) return;
    const u = r.url;
    const host = u.hostname.toLowerCase();
    if (!host) return;

    const unresolved = !!r.unresolved;
    const sameSite = !unresolved && (host === CUR_HOST || sameOrg(host, CUR_HOST));
    const my_token = ++token;
    const s = {
      host, url: u.href, reqUrl: u.href, sameSite, wrapped: r.via, unresolved, anchorEl: anchor, side: null,
      pathHint: (u.pathname + u.search).replace(/^\/$/, ''),
      domain: null, domainReasons: [], scan: null, scanState: 'idle', serp: serpInfo(anchor)
    };
    state = s;
    const alive = () => token === my_token && state === s && activeAnchor === anchor;

    let local = unresolved ? [] : assessLocalHints(u.href, host);

    const applyDomain = (resp) => {
      const reasons = [];
      if (sameSite) reasons.push({ text: t('sameSite') });
      if (resp && resp.ok) {
        if (resp.trusted) reasons.push({ text: t('trusted') });
        if (resp.softTrust) reasons.push({ text: t('softTrust') });
        if (resp.wellKnown && !resp.trusted) reasons.push({ text: t('wellKnown') });
        if (resp.adsNetwork) reasons.push({ text: t('adsNetwork'), bad: true });
        if (resp.blocked) reasons.push({ text: t('blocked'), bad: true });
        if (resp.phishing) reasons.push({ text: t('phishing') + (resp.brand ? ' (' + resp.brand + ')' : ''), bad: true });
        if (resp.malware) reasons.push({ text: t('malware'), bad: true });
      }
      local.forEach((x) => reasons.push({ text: t(x.key), bad: true }));
      const isTrusted = !!(resp && resp.ok && (resp.trusted || resp.softTrust || resp.wellKnown));
      if (!sameSite && !isTrusted) reasons.push({ text: t('domNotTrusted'), c: '#93c5fd' });
      if (!reasons.some((x) => x.bad)) reasons.push({ text: t('domNotBlocked'), c: '#86efac' });
      s.domainReasons = reasons;

      let level = (resp && resp.ok && resp.level) || 'unknown';
      if (level === 'unknown' && local.some((x) => x.weight >= 2)) level = 'caution';
      if (s.guessed) {
        // Đích chỉ là đoán -> không được kết luận "an toàn"
        if (level === 'safe') level = 'unknown';
        reasons.push({ text: t('guessNote'), c: '#93c5fd' });
      }
      s.domain = { level, trusted: !!(resp && resp.ok && resp.trusted) && !s.guessed };
    };

    // --- Tầng 1: domain (có cache)
    const dc = domainCache.get(host);
    let domainReady = Promise.resolve();
    if (unresolved) {
      // không đánh giá domain của Google/Bing — chờ biết đích thật
    } else if (dc && Date.now() - dc.at < DOMAIN_TTL) {
      applyDomain(dc.data);
    } else {
      domainReady = new Promise((resolve) => {
        safeSend({ action: 'jdAssessLinkRisk', hostname: host, url: u.href }, (resp) => {
          if (resp && resp.ok) domainCache.set(host, { at: Date.now(), data: resp });
          if (alive()) applyDomain(resp);
          resolve();
        }, 1);
      });
    }

    // --- Quyết định có quét nội dung không
    let skip = null;
    if (!scanEnabled) skip = 'off';
    else if (sameSite) skip = 'same';
    else if (IS_WEBMAIL || NO_SCAN_PATH.test(u.pathname + u.search)) skip = 'skipped';

    if (skip === 'same') { s.scanState = 'none'; }
    else if (skip) { s.scanState = skip; }
    else {
      const sc = scanCache.get(u.href);
      if (sc && Date.now() - sc.at < SCAN_TTL) {
        s.scan = sc.data; s.scanState = sc.data.ok ? 'done' : 'fail';
        if (unresolved) {
          if (sc.data.finalHost && !/(^|\.)(google|bing)\.[a-z.]+$/.test(sc.data.finalHost)) {
            s.unresolved = false; s.host = sc.data.finalHost; s.pathHint = ''; s.url = sc.data.finalUrl;
            local = assessLocalHints(sc.data.finalUrl, sc.data.finalHost);
            safeSend({ action: 'jdAssessLinkRisk', hostname: sc.data.finalHost, url: sc.data.finalUrl }, (d) => {
              if (alive()) { applyDomain(d); render(); }
            }, 1);
          } else {
            s.unresolved = false; s.unresolvedFailed = true;
          }
        }
      } else {
        s.scanState = 'loading';
      }
    }
    if (dc && Date.now() - dc.at < DOMAIN_TTL) { /* đã có domain */ } else if (!s.domain) { /* chưa có: render trạng thái chờ */ }
    render();

    // Domain và quét nội dung chạy SONG SONG (trước đây quét phải chờ domain xong)
    domainReady.then(() => { if (alive()) render(); });
    if (s.scanState === 'loading') {
      safeSend({ action: 'jdScanLinkPage', url: u.href, wrapper: unresolved }, (resp) => {
        if (!resp) resp = { ok: false, reason: 'error' };
        if (unresolved && resp.finalHost && !/(^|\.)(google|bing)\.[a-z.]+$/.test(resp.finalHost)) {
          // Đã biết đích thật sau khi theo redirect -> đánh giá domain đích
          s.unresolved = false; s.host = resp.finalHost; s.pathHint = ''; s.url = resp.finalUrl;
          local = assessLocalHints(resp.finalUrl, resp.finalHost);
          safeSend({ action: 'jdAssessLinkRisk', hostname: resp.finalHost, url: resp.finalUrl }, (d) => {
            if (alive()) { applyDomain(d); render(); }
          });
        } else if (unresolved && (!resp.ok || /(^|\.)(google|bing)\.[a-z.]+$/.test(resp.finalHost || ''))) {
          resp = { ok: false, reason: 'unresolved' };
          const g = guessHostFromSerp(s.serp, anchor);
          if (g) {
            s.unresolved = false; s.host = g; s.pathHint = ''; s.url = 'https://' + g + '/'; s.guessed = true;
            local = assessLocalHints(s.url, g);
            safeSend({ action: 'jdAssessLinkRisk', hostname: g, url: s.url }, (d) => { if (alive()) { applyDomain(d); render(); } });
          } else { s.unresolved = false; s.unresolvedFailed = true; }
        }
        if (resp.ok || resp.reason === 'blocked' || resp.reason === 'nothtml') scanCache.set(u.href, { at: Date.now(), data: resp });
        if (!alive()) return;
        if (!resp.ok && s.scan && s.scan.partial) { s.scan.partial = false; s.scan.truncated = true; s.scanState = 'done'; render(); return; }
        s.scan = resp;
        s.scanState = resp.ok ? 'done' : 'fail';
        // Link bị chuyển sang domain khác -> cập nhật tín hiệu domain đích cuối
        render();
      }, 1);
    }
  }

  // Kết quả quét SỚM từ background (tiêu đề/mô tả/quảng cáo) — hiện ngay, bản đầy đủ sẽ thay sau
  try {
    chrome.runtime.onMessage.addListener((msg) => {
      if (!msg || msg.action !== 'jdScanPartial' || !state) return;
      if (msg.url !== state.reqUrl || state.scanState !== 'loading' || !msg.data) return;
      state.scan = msg.data;
      render();
    });
    chrome.runtime.sendMessage({ action: 'jdPing' }, () => { void chrome.runtime.lastError; }); // đánh thức service worker sớm
  } catch (e) {}

  function leave() {
    activeAnchor = null;
    state = null;
    token++;
    if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
    hide();
  }

  // Logic KHÔNG phụ thuộc cặp mouseover/mouseout -> không bị "chỉ hiện 1 lần"
  let raf = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    const a = getAnchor(e.target);
    if (!a) {
      if (activeAnchor) leave();
      return;
    }
    if (a !== activeAnchor) {
      leave();
      activeAnchor = a;
      hoverTimer = setTimeout(() => {
        hoverTimer = null;
        if (activeAnchor === a) startAssess(a);
      }, 25);
      return;
    }
    // panel neo cố định theo link, không chạy theo chuột -> dễ đọc
  }, true);

  document.documentElement.addEventListener('mouseleave', leave);
  document.addEventListener('mousedown', leave, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') leave(); }, true);
  document.addEventListener('scroll', () => { if (visible || activeAnchor) leave(); }, { capture: true, passive: true });
  window.addEventListener('blur', leave);
  window.addEventListener('resize', () => { if (visible) place(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) leave(); });
})();
