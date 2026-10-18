const i18n = {
    en: {
        status: "Stealth Engine Active",
		btnCopyDom: "Copy DOM",
        btnCopyDomTitle: "Copy current page DOM report",
        btnFixOverlay: "Fix Overlay",
        btnFixOverlayTitle: "Remove overlay & unlock page scroll",
        resetBtn: "Reset Engine",
        resetBtnShort: "Reset",
        resetLoading: "Restarting core engine...",
        resetSuccess: "System updated successfully!",
        updateAvailable: "🚀 NEW UPDATE AVAILABLE! CLICK TO DOWNLOAD",
        reloadTabBtnShort: "Reload",
        donateBtnShort: "Donate",
        pauseBtn: "Pause",
        pauseBtnResume: "Resume",
        pauseTooltip: "Pause ALL ad blocking instantly (network + hiding) on the current tab - no reload needed. YouTube's dedicated blocking stays on.",
        pauseResumeTooltip: "Resume ad blocking instantly on the current tab",
        pauseToastOn: "⏸ Ad blocking paused instantly",
        pauseToastOff: "▶ Ad blocking resumed instantly",
        aggressiveModeLabel: "Aggressive auto-detect",
        aggressiveModeDesc: "Catches more disguised/responsive banners automatically, at a small extra risk of hiding real content by mistake. Off by default. Reload open tabs to apply.",
        aggressiveModeToastOn: "🔥 Aggressive auto-detect ON — reload tabs to apply",
        aggressiveModeToastOff: "Aggressive auto-detect OFF — reload tabs to apply",
        titleFeatures: "CORE FEATURES",
        f1: "Completely blocks pre-roll/mid-roll video ads, banners and sponsored ads — not just on YouTube, but on ANY movie/video site.",
        f2: "Auto-detects fake bank/social-media/e-wallet sites with a self-learning algorithm — catches brand-new impersonation domains never seen on any blocklist before, PLUS flags financial-scam pages by content (OTP/password form + scam language) even when they don't impersonate any known brand.",
        f3: "Instant warning when a known malware-distributing site is detected, plus automatic flag/block of risky downloaded files.",
        f4: "3-mode Element Zapper: Left-click to instantly destroy any ad that slips through, Right-click to open a smart panel listing every layer at that spot with live preview so you pick exactly what to remove, Alt+Ctrl+Right-click to protect real content forever — every action is logged so you can export it to share with the developer.",
        f5: "Blocks popup/popunder windows and click-hijack links that wrap a real video or button to redirect you to gambling/affiliate sites — detected by structure, no need to know the target domain in advance.",
        f6: "Advanced fingerprint cloaking: fakes AudioContext/WebGL/Canvas/hardware info, AND disguises every faked function's .toString()/.name/.length to look exactly native — passes even sophisticated bank/Cloudflare-grade anti-fraud scanners.",
        f7: "Actively defeats video freezing and background bandwidth throttling — auto-forces playback to resume when stuck.",
        f8: "Instant Pause: turn OFF all ad blocking on the current tab immediately, no page reload — flip it back on just as instantly when you're done.",
        f9: "Exclude an entire site with one right-click when a page breaks before a proper fix ships — no waiting for an update, re-enable it anytime from the same menu.",
        titleAlgo: "MULTI-LAYER ALGORITHM",
        thMechanism: "Mechanism",
        thDesc: "Protection Layer Description",
        t1: "Fuzzy-matching algorithm (edit-distance + homograph detection) that spots brand-impersonation domains on sight — no blocklist needed to catch a brand-new fake site.",
        t2: "Records a signature (domain/class/size) for every ad you zap and scores it for confidence — kept as exportable data for now, not yet auto-applied to unreviewed sites until it's been properly vetted.",
        t3: "Flags a real video wrapped or overlaid by an outbound link as hijacking — by structure, not by domain — so it still works even when the scam redirect changes every time.",
        t4: "Masks AudioContext, WebGL, Canvas, and hardware metadata with a stable per-session fake fingerprint to defeat bot/anti-adblock detection.",
        t5: "Every faked browser function reports back .toString()/.name/.length identical to the real native function — defeats even scripts that inspect for tampering, not just ones checking the returned value.",
        t6: "Allows only 1 new window per genuine click (\"click-token\" tracking) and blocks links/videos disguised to redirect you to gambling or affiliate sites.",
        author: "Author:",
        donate: "Project Maintenance (Vietcombank)",
        reloadTabBtn: "Reload current page",
        titleZapper: "ELEMENT ZAPPER (DESTROYED ITEMS)",
        zapperDesc: "Items you manually removed with the 🎯 crosshair button on this site.",
        zapKeysHint: "🔴 Left-click: destroy · 🔵 Right-click: open the layer-picker panel (preview, tick, only saved on Confirm) · 🟢 Alt+Ctrl+Right-click: protect forever (never auto-removed)",
        zapLoading: "Loading...",
        zapNoData: "Not available on this page (chrome:// page, or no ads zapped yet).",
        zapEmpty: "No destroyed elements on this site yet.",
        zapUnknownDate: "Before this feature existed",
        zapBucketToday: "Today",
        zapBucketYesterday: "Yesterday",
        zapBucketLast7: "Last 7 days",
        zapBucketLast30: "Last 30 days",
        zapBucketOlder: "Older",
        zapRestoreBtn: "Restore",
        restoreAllBtn: "Restore all DESTROYED items",
        zapDestroyedGroupTitle: "🗑️ Destroyed — click Restore to bring back",
        zapProtectedGroupTitle: "🟢 Protected — click Unprotect to let it be auto-removed again",
        zapProtectedToggle: "See protected items on this site",
        zapUnprotectAllBtn: "Unprotect ALL on this site",
        zapUnprotectBtn: "✕ Unprotect",
        zapProtectedNoLabel: "(no description)",
        zapProtectedEmpty: "Nothing protected on this site yet.",
        tabDestroyed: "🗑️ Destroyed",
        tabProtected: "🟢 Protected",
        tabExcluded: "🚫 Excluded",
        zapExcludedDesc: "Right-click ANYWHERE on a page (no need to activate the Zapper) → \"Exclude this page from REMOVEADBLOCK PRO\" to turn off every ad-blocking content script for that domain, applied instantly with no reload needed. Click the same menu item again (now labeled \"Re-enable...\") to turn it back on anytime.",
        zapExcludedEmpty: "No site excluded yet. Right-click any page to exclude it.",
        zapUnexcludeAllBtn: "Re-enable ALL excluded sites",
        zapUnexcludeBtn: "✕ Re-enable",
        zapUnexcludeBtnShort: "Re-enable",
        zapProtectedTodayToggle: "🌐 See all protected items on every site",
        zapUnprotectAllToday: "Unprotect ALL sites today",
        zapTodayHostCountProtected: "{n} protected",
        zapUnprotectBtnShort: "Unprotect",
        zapTodayToggle: "🌐 See all destroyed items on every site",
        zapTodayHostCount: "{n} destroyed",
        zapRestoreBtnShort: "Restore",
        zapRestoreAllToday: "Restore ALL sites from today",
        zapTodayEmpty: "Nothing destroyed on any site today yet.",
        zapExportBtn: "Export data",
        zapImportBtn: "Import data",
        zapIoDesc: "One file: zapped items · protected · excluded sites · learned whitelist/blacklist. Share with the author or another PC.",
        zapExportToast: "Exported {n} items (+ config)!",
        zapImportToast: "Imported {imp}, rejected {rej}, patterns {pat}, excluded {exc}, allow+{allow}/block+{block}!",
        zapImportError: "Invalid file — could not import.",
        donateBtn: "Support this project",
        donateTitle: "❤️ SUPPORT THIS PROJECT",
        donateDownload: "⬇ Save QR image",
        donateCaption: "Scan the QR code to help fund project maintenance.",
        donateCopiedAccount: "Account number copied!",
        donateCopiedEmail: "Email copied!"
    },
    vi: {
        status: "Hệ thống tàng hình đang chạy",
		btnCopyDom: "Copy DOM",
        btnCopyDomTitle: "Copy báo cáo DOM trang hiện tại",
        btnFixOverlay: "Fix Màn Che",
        btnFixOverlayTitle: "Xóa màn che & Mở khóa thanh cuộn",
        resetBtn: "Cập Nhật Hệ Thống",
        resetBtnShort: "Cập nhật",
        resetLoading: "Đang khởi động lại lõi...",
        resetSuccess: "Hệ thống đã được cập nhật!",
        updateAvailable: "🚀 CÓ BẢN CẬP NHẬT MỚI! BẤM ĐỂ TẢI VỀ",
        reloadTabBtnShort: "Reload",
        donateBtnShort: "Ủng hộ",
        pauseBtn: "Tạm dừng",
        pauseBtnResume: "Tiếp tục",
        pauseTooltip: "Tạm dừng TOÀN BỘ việc chặn quảng cáo (mạng + ẩn) tức thì trên tab hiện tại - không cần tải lại trang. Riêng YouTube vẫn chặn như bình thường.",
        pauseResumeTooltip: "Bật lại chặn quảng cáo tức thì trên tab hiện tại",
        pauseToastOn: "⏸ Đã tạm dừng tức thì",
        pauseToastOff: "▶ Đã bật lại tức thì",
        aggressiveModeLabel: "Tự nhận diện mạnh (Aggressive)",
        aggressiveModeDesc: "Bắt thêm banner ngụy trang/co giãn responsive tự động, đổi lại rủi ro nhỏ ẩn nhầm nội dung thật tăng nhẹ. Mặc định TẮT. Cần tải lại (F5) các tab đang mở để áp dụng.",
        aggressiveModeToastOn: "🔥 Đã bật tự nhận diện mạnh — tải lại tab để áp dụng",
        aggressiveModeToastOff: "Đã tắt tự nhận diện mạnh — tải lại tab để áp dụng",
        titleFeatures: "TÍNH NĂNG CỐT LÕI",
        f1: "Chặn triệt để quảng cáo video pre-roll/mid-roll, banner và quảng cáo tài trợ — không chỉ trên YouTube mà trên MỌI trang xem phim/video khác.",
        f2: "Tự động phát hiện web giả mạo ngân hàng, mạng xã hội, ví điện tử... bằng thuật toán tự học — bắt được cả domain giả mạo hoàn toàn MỚI, chưa từng có trong bất kỳ danh sách nào, CỘNG THÊM phát hiện trang scam tài chính theo nội dung (form xin OTP/mật khẩu + ngôn từ lừa đảo) dù không hề giả danh thương hiệu nào.",
        f3: "Cảnh báo tức thời khi phát hiện trang phát tán virus/mã độc đã biết, kèm tự động cảnh báo/chặn file tải về có nguy cơ chứa mã độc.",
        f4: "Ống Ngắm 3 chế độ: Chuột TRÁI để tiêu diệt hẳn quảng cáo lọt lưới, Chuột PHẢI để mở bảng thông minh liệt kê mọi lớp tại điểm bấm kèm xem trước thời gian thực để bạn tự chọn đúng lớp cần xoá, Alt+Ctrl+Chuột PHẢI để miễn trừ vĩnh viễn nội dung thật — mọi thao tác đều được ghi lại để bạn xuất file chia sẻ cho tác giả.",
        f5: "Chặn cửa sổ popup/popunder và link click-hijack bọc quanh nút/video thật để đá bạn sang trang cờ bạc/affiliate — nhận diện theo cấu trúc, không cần biết trước domain đích.",
        f6: "Nguỵ trang dấu vân tay nâng cao: giả mạo AudioContext/WebGL/Canvas/thông tin phần cứng, ĐỒNG THỜI làm cho .toString()/.name/.length của mọi hàm bị giả mạo trông y hệt hàm gốc trình duyệt — qua mặt được cả bộ quét chống gian lận tinh vi cỡ ngân hàng/Cloudflare.",
        f7: "Chủ động vô hiệu hoá đóng băng video và bóp băng thông chạy ngầm — tự động ép phát lại khi bị kẹt.",
        f8: "Tạm dừng tức thì: tắt NGAY toàn bộ việc chặn quảng cáo trên tab hiện tại, không cần tải lại trang — bật lại cũng tức thì y hệt khi xong việc.",
        f9: "Loại trừ hẳn 1 trang chỉ bằng 1 cú chuột phải khi trang đó bị ảnh hưởng trước khi kịp có bản vá — không cần chờ cập nhật, bật lại bất cứ lúc nào từ đúng menu đó.",
        titleAlgo: "THUẬT TOÁN ĐA TẦNG",
        thMechanism: "Cơ Chế",
        thDesc: "Mô Tả Lớp Bảo Vệ",
        t1: "Thuật toán so khớp mờ (khoảng cách chỉnh sửa + phát hiện ký tự giả dạng Unicode) nhận diện ngay web giả mạo thương hiệu — không cần danh sách vẫn bắt được domain giả mạo hoàn toàn mới.",
        t2: "Ghi lại 'chữ ký' (domain/class/kích thước) mỗi lần bạn tiêu diệt quảng cáo và chấm điểm tin cậy — hiện chỉ là dữ liệu xuất được, CHƯA tự áp dụng lên các trang chưa kiểm chứng cho tới khi được rà soát kỹ.",
        t3: "Nhận diện click-hijack theo CẤU TRÚC (video thật bị link ngoài bọc/đè lên), không cần biết trước domain đích — vẫn hoạt động dù link lừa đảo đổi domain liên tục mỗi lần.",
        t4: "Ẩn dữ liệu AudioContext, WebGL, Canvas và phần cứng bằng 1 dấu vân tay giả ổn định suốt phiên để qua mặt bộ quét bot/chống-adblock.",
        t5: "Mọi hàm bị giả mạo đều trả lời .toString()/.name/.length y hệt hàm gốc trình duyệt — qua mặt được cả script chuyên soi dấu hiệu bị can thiệp, không chỉ script kiểm tra giá trị trả về.",
        t6: "Chỉ cho phép mở 1 cửa sổ mới cho mỗi cú bấm thật (theo dõi bằng \"click-token\"), chặn link/video giả dạng để đá bạn sang trang cờ bạc hoặc affiliate.",
        author: "Tác giả:",
        donate: "Duy trì dự án (Vietcombank)",
        reloadTabBtn: "Reload trang hiện tại",
        titleZapper: "ỐNG NGẮM (ĐÃ TIÊU DIỆT)",
        zapperDesc: "Những phần tử bạn đã tự bấm nút 🎯 để xoá thủ công trên trang này.",
        zapKeysHint: "🔴 Chuột trái: xoá hẳn · 🔵 Chuột phải: mở bảng chọn lớp cần xoá (xem trước, tick, Đồng ý mới lưu) · 🟢 Alt+Ctrl+Chuột phải: miễn trừ vĩnh viễn (không bao giờ tự xoá)",
        zapLoading: "Đang tải...",
        zapNoData: "Không dùng được trên trang này (trang chrome://, hoặc chưa tiêu diệt gì).",
        zapEmpty: "Trang này chưa tiêu diệt gì cả.",
        zapUnknownDate: "Trước khi có tính năng này",
        zapBucketToday: "Hôm nay",
        zapBucketYesterday: "Hôm qua",
        zapBucketLast7: "7 ngày qua",
        zapBucketLast30: "30 ngày qua",
        zapBucketOlder: "Cũ hơn",
        zapRestoreBtn: "Khôi phục",
        restoreAllBtn: "Khôi phục tất cả mục ĐÃ XOÁ",
        zapDestroyedGroupTitle: "🗑️ Đã xoá — bấm Khôi phục để cho hiện lại",
        zapProtectedGroupTitle: "🟢 Đã miễn trừ — bấm Bỏ miễn trừ để cho tự xoá lại như bình thường",
        zapProtectedToggle: "Xem danh sách đã miễn trừ trên trang này",
        zapUnprotectAllBtn: "Bỏ miễn trừ TẤT CẢ trên trang này",
        zapUnprotectBtn: "✕ Bỏ miễn trừ",
        zapProtectedNoLabel: "(không có mô tả)",
        zapProtectedEmpty: "Trang này chưa miễn trừ gì cả.",
        tabDestroyed: "🗑️ Đã xoá",
        tabProtected: "🟢 Đã miễn trừ",
        tabExcluded: "🚫 Đã loại trừ",
        zapExcludedDesc: "Chuột phải BẤT KỲ ĐÂU trên trang (không cần bật Ống Ngắm) → \"Loại trừ trang này khỏi REMOVEADBLOCK PRO\" để tắt hẳn mọi content script chặn quảng cáo cho đúng domain đó, áp dụng ngay không cần tải lại. Bấm lại đúng mục đó (đổi tên thành \"Bật lại...\") để bật lại bất cứ lúc nào.",
        zapExcludedEmpty: "Chưa loại trừ trang nào cả. Chuột phải trên trang bất kỳ để loại trừ.",
        zapUnexcludeAllBtn: "Bật lại TẤT CẢ trang đã loại trừ",
        zapUnexcludeBtn: "✕ Bật lại",
        zapUnexcludeBtnShort: "Bật lại",
        zapProtectedTodayToggle: "🌐 Xem tất cả mục đã miễn trừ trên mọi trang",
        zapUnprotectAllToday: "Bỏ miễn trừ TẤT CẢ trang hôm nay",
        zapTodayHostCountProtected: "{n} đã miễn trừ",
        zapUnprotectBtnShort: "Bỏ miễn trừ",
        zapTodayToggle: "🌐 Xem tất cả mục đã xoá trên mọi trang",
        zapTodayHostCount: "{n} đã tiêu diệt",
        zapRestoreBtnShort: "Khôi phục",
        zapRestoreAllToday: "Khôi phục TẤT CẢ trang hôm nay",
        zapTodayEmpty: "Hôm nay chưa tiêu diệt gì ở bất kỳ trang nào.",
        zapExportBtn: "Xuất dữ liệu",
        zapImportBtn: "Nhập dữ liệu",
        zapIoDesc: "Một file: đã xoá · miễn trừ · loại trừ · whitelist/blacklist đã học. Gửi tác giả hoặc máy khác.",
        zapExportToast: "Đã xuất {n} mục (+ cấu hình)!",
        zapImportToast: "Nhập {imp}, bỏ {rej}, mẫu {pat}, loại trừ {exc}, allow+{allow}/block+{block}!",
        zapImportError: "File không hợp lệ — không thể nhập.",
        donateBtn: "Ủng hộ dự án",
        donateTitle: "❤️ ỦNG HỘ DỰ ÁN",
        donateDownload: "⬇ Lưu ảnh QR về máy",
        donateCaption: "Quét mã QR để ủng hộ kinh phí duy trì dự án.",
        donateCopiedAccount: "Đã sao chép số tài khoản!",
        donateCopiedEmail: "Đã sao chép email!"
    }
};

let currentLang = 'en';
let githubDownloadUrl = "https://github.com/ThaiThongSJ/REMOVEADBLOCK-YOUTUBE-PRO";
let hasNewVersion = false;
let latestVersion = ""; // Biến lưu số phiên bản mới phục vụ khóa lặp

// Toast dùng chung (trước đây chỉ khai báo cục bộ trong khối Donate) - dùng lại cho cả Pause.
function showToast(text) {
    let toast = document.querySelector('.donate-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'donate-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 1600);
}

function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (i18n[lang][key]) el.title = i18n[lang][key];
    });

    if (hasNewVersion) {
        document.getElementById('resetBtnText').textContent = i18n[lang].updateAvailable;
    } else {
        document.getElementById('resetBtnText').textContent = i18n[lang].resetBtn;
    }

    applyPauseLanguage();

    document.getElementById('langToggleBtn').textContent = lang === 'en' ? 'VN' : 'EN';
}

// ==================== GIAO DIỆN SÁNG/TỐI (THEME) ====================
// THEO YÊU CẦU NGƯỜI DÙNG: "công nghệ nạp 1 lần, không phải render hoài, dùng được mãi mãi để không bị
// lag hay tốn tài nguyên" - applyTheme() CHỈ gắn/gỡ đúng 1 class ('theme-light') lên <body> một lần duy
// nhất mỗi khi gọi (lúc mở popup + lúc bấm nút đổi) - không có setInterval/setTimeout lặp lại, không tự
// gọi lại chính nó. Toàn bộ việc đổi màu sau đó do CSS thuần xử lý qua biến số (xem :root/body.theme-
// light trong popup.css) - trình duyệt chỉ vẽ lại đúng 1 lần ngay lúc đổi class, không có chi phí nào
// tồn tại thêm sau đó dù mở popup bao lâu.
function applyTheme(theme) {
    document.body.classList.toggle('theme-light', theme === 'light');
    const btn = document.getElementById('themeToggleBtn');
    // Nút hiện icon của TRẠNG THÁI SẼ CHUYỂN TỚI nếu bấm (giao diện tối -> hiện mặt trời gợi ý "bấm để
    // sáng lên", giao diện sáng -> hiện mặt trăng gợi ý "bấm để tối lại") - quy ước quen thuộc của hầu
    // hết app có nút đổi theme.
    if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}
document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const next = document.body.classList.contains('theme-light') ? 'dark' : 'light';
    applyTheme(next);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ appTheme: next });
    }
});

if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['appTheme'], (result) => {
        // Mặc định vẫn là giao diện TỐI hiện tại (không đổi trải nghiệm cũ của ai chưa từng bấm chọn) -
        // chỉ áp dụng "sáng" khi người dùng đã TỰ TAY chọn trước đó.
        applyTheme(result && result.appTheme === 'light' ? 'light' : 'dark');
    });
    chrome.storage.local.get(['appLanguage', 'updateInfo'], (result) => {
        if (result.updateInfo && result.updateInfo.latest_version) {
            const currentVersion = chrome.runtime.getManifest().version;
            if (result.updateInfo.latest_version !== currentVersion) {
                hasNewVersion = true;
                latestVersion = result.updateInfo.latest_version; // Gán phiên bản đích
                const btn = document.getElementById('resetEngineBtn');
                btn.classList.add('has-update'); 
                
                if (result.updateInfo.download_url) {
                    githubDownloadUrl = result.updateInfo.download_url;
                }
            }
        }

        if (result.appLanguage) applyLanguage(result.appLanguage);
        else applyLanguage('en');
    });
} else {
    applyLanguage('en');
}

document.getElementById('langToggleBtn').addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'vi' : 'en';
    applyLanguage(nextLang);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ appLanguage: nextLang });
    }
    if (typeof loadZapDaysPanel === 'function') loadZapDaysPanel();
});

document.getElementById('resetEngineBtn').addEventListener('click', function() {
    const btn = this;
    const textSpan = document.getElementById('resetBtnText');

    if (hasNewVersion) {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({ url: githubDownloadUrl });
        } else {
            window.open(githubDownloadUrl, '_blank');
        }

        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({ action: "clearUpdateBadge", version: latestVersion }, (response) => {
                hasNewVersion = false;
                btn.classList.remove('has-update');
                textSpan.textContent = i18n[currentLang].resetBtn; 
                btn.style.background = ""; 
                btn.style.boxShadow = "";
            });
        }
    } else {
        btn.classList.add('loading');
        textSpan.textContent = i18n[currentLang].resetLoading;

        setTimeout(() => {
            if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.reload) {
                // Ghi lại các tab YouTube đang mở TRƯỚC khi tự reload extension - service worker
                // sẽ tự đọc lại danh sách này ngay khi khởi động lại (xem background.js) và tự
                // reload các tab đó, để content script mới được nạp lại mà người dùng không cần
                // tự bấm "Reload trang hiện tại" thêm 1 lần nữa sau khi cập nhật.
                // Nút Update CHỈ để kiểm tra/cài bản extension mới - không còn kiêm nhiệm gì thêm
                // với dữ liệu tự học của Ống Ngắm nữa (đã bỏ lời gọi zapperForceBackup trước đây) -
                // dữ liệu đó tự lưu vào IndexedDB liên tục theo thời gian thực + đã có sẵn nút Xuất
                // riêng, không cần gắn thêm vào đây, tránh gây hiểu lầm 1 nút làm 2 việc không liên
                // quan tới nhau.
                if (chrome.tabs) {
                    chrome.tabs.query({ url: ["*://*.youtube.com/*", "*://*.m.youtube.com/*"] }, (tabs) => {
                        const ids = (tabs || []).map(t => t.id).filter(id => typeof id === 'number');
                        chrome.storage.local.set({ pendingReloadTabIds: ids }, () => chrome.runtime.reload());
                    });
                } else {
                    chrome.runtime.reload();
                }
            } else {
                textSpan.textContent = i18n[currentLang].resetSuccess;
                btn.style.background = "#10b981";
                btn.classList.remove('loading');
            }
        }, 600);
    }
});

// ==================== TẠM DỪNG CHẶN QUẢNG CÁO (PAUSE) - TỨC THÌ, KIỂU ZAPPER ====================
// LỊCH SỬ (để hiểu vì sao thiết kế lại): lần đầu đổi heuristic-adblock.js/generic-video-adblock.js
// thành "async function" + đọc cờ TRƯỚC khi chạy bất cứ gì - gây vòng lặp tự tải lại trang thật trên
// dantri.com.vn (nghi do độ trễ tạo khoảng hở cho site phản ứng). Đã revert. THIẾT KẾ LẠI ĐÚNG THEO YÊU
// CẦU NGƯỜI DÙNG: học theo nguyên lý của chính Zapper - không "đặt cờ rồi tải lại trang hy vọng đọc
// đúng", mà GỬI LỆNH TRỰC TIẾP cho content script của tab đang mở để nó tự thao tác NGAY LẬP TỨC lên
// DOM hiện có (gỡ toàn bộ CSS ẩn + hiện lại phần tử đã ẩn bằng JS, y hệt cách nút miễn trừ vẫn làm) -
// không cần tải lại trang, không có độ trễ round-trip storage nào, và không đụng gì tới phần khởi động
// đồng bộ quan trọng của content script (CSS chống chớp nháy/bait chống-adblock vẫn luôn chạy ngay từ
// đầu, không đổi) nên không lặp lại rủi ro đã gặp. Lần tải trang MỚI (tab khác/F5) vẫn tự đọc đúng cờ
// từ storage bình thường (xem cuối heuristic-adblock.js/generic-video-adblock.js).
let enginePaused = false;

function applyPauseLanguage() {
    const btn = document.getElementById('pauseEngineBtn');
    const textSpan = document.getElementById('pauseBtnText');
    if (!btn || !textSpan) return;
    if (enginePaused) {
        textSpan.textContent = i18n[currentLang].pauseBtnResume;
        btn.title = i18n[currentLang].pauseResumeTooltip;
        btn.classList.add('is-paused');
    } else {
        textSpan.textContent = i18n[currentLang].pauseBtn;
        btn.title = i18n[currentLang].pauseTooltip;
        btn.classList.remove('is-paused');
    }
}

if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['enginePaused'], (result) => {
        enginePaused = !!result.enginePaused;
        applyPauseLanguage();
    });
}

document.getElementById('pauseEngineBtn').addEventListener('click', () => {
    if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) return;
    const nextPaused = !enginePaused;
    chrome.runtime.sendMessage({ action: "setEnginePaused", paused: nextPaused }, (response) => {
        if (chrome.runtime.lastError || !response || !response.ok) return;
        enginePaused = nextPaused;
        applyPauseLanguage();
        showToast(nextPaused ? i18n[currentLang].pauseToastOn : i18n[currentLang].pauseToastOff);
        // THIẾT KẾ LẠI THEO ĐÚNG NGUYÊN LÝ CỦA ZAPPER (theo yêu cầu người dùng): không còn "đặt cờ rồi
        // tải lại trang hy vọng lần sau đọc đúng" (cách cũ vừa chậm vừa từng dính nghi vấn liên quan tới
        // sự cố vòng lặp reload) - gửi lệnh TRỰC TIẾP cho content script của tab đang mở
        // (heuristic-adblock.js/generic-video-adblock.js đã có sẵn `chrome.runtime.onMessage` lắng nghe
        // "jdSetPaused") để nó tự gỡ/khôi phục NGAY LẬP TỨC trên DOM hiện tại - tức thì thật sự, không
        // cần tải lại trang, không có độ trễ nào. Không gửi được (VD trang chrome://, hoặc content
        // script chưa kịp nạp) thì coi như chưa áp dụng được cho tab NÀY - lần tải trang sau vẫn tự đọc
        // đúng cờ từ storage như bình thường, không mất tác dụng vĩnh viễn.
        if (chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs && tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'jdSetPaused', paused: nextPaused }, () => {
                        void chrome.runtime.lastError;
                    });
                }
            });
        }
    });
});

// ==================== CHẾ ĐỘ NHẬN DIỆN MẠNH (AGGRESSIVE) - TẮT MẶC ĐỊNH ====================
// Công tắc riêng cho heuristic-adblock.js: khi bật, nới lỏng thêm 1 số ngưỡng đã có sẵn (khớp theo
// tỷ lệ khung hình thay vì chỉ pixel tuyệt đối, kể cả với các kiểm tra 1-tín-hiệu vốn cố tình giữ
// chặt) để bắt thêm banner ngụy trang/responsive - đổi lại rủi ro ẩn nhầm nội dung thật tăng nhẹ.
// Đọc trực tiếp ở content script (không qua network rule như Pause) nên đổi công tắc chỉ áp dụng
// cho các tab mở SAU đó/tải lại - không thể áp dụng ngay cho tab đang mở (content script đã chạy
// xong từ document_start).
const aggressiveToggle = document.getElementById('aggressiveModeToggle');
if (aggressiveToggle && typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['aggressiveAdBlock'], (result) => {
        aggressiveToggle.checked = !!result.aggressiveAdBlock;
    });
    aggressiveToggle.addEventListener('change', () => {
        const next = aggressiveToggle.checked;
        chrome.storage.local.set({ aggressiveAdBlock: next }, () => {
            showToast(next ? i18n[currentLang].aggressiveModeToastOn : i18n[currentLang].aggressiveModeToastOff);
        });
    });
}

// ==================== RELOAD TRANG HIỆN TẠI ====================
document.getElementById('reloadTabBtn').addEventListener('click', () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0]) chrome.tabs.reload(tabs[0].id);
        });
    }
});

// ==================== ỐNG NGẮM: XEM & KHÔI PHỤC THEO NGÀY ====================
let activeTabId = null;

// Gom theo NHÓM THỜI GIAN TƯƠNG ĐỐI (Hôm nay/Hôm qua/7 ngày qua/30 ngày qua/Cũ hơn) thay vì liệt kê
// từng ngày cụ thể - dùng lâu dài (hàng trăm/nghìn ngày) thì danh sách theo ngày riêng lẻ sẽ phình
// to vô hạn, không còn thực dụng (VD dùng 1000 ngày thì 1000 dòng). Gom nhóm giữ danh sách luôn gọn
// tối đa 6 dòng dù dùng bao lâu.
const ZAP_BUCKET_ORDER = ['today', 'yesterday', 'last7', 'last30', 'older', 'unknown'];
const ZAP_BUCKET_LABEL_KEY = {
    today: 'zapBucketToday',
    yesterday: 'zapBucketYesterday',
    last7: 'zapBucketLast7',
    last30: 'zapBucketLast30',
    older: 'zapBucketOlder',
    unknown: 'zapUnknownDate'
};

// THEO YÊU CẦU NGƯỜI DÙNG: mỗi dòng nhóm ngày ("Hôm nay"/"Hôm qua"/"7 ngày qua"/...) phải TỰ ĐÓNG/MỞ
// RIÊNG - trước đây bấm 1 lần hiện HẾT mọi nhóm cùng lúc, nếu nhóm "Hôm nay" có nhiều mục thì phải
// cuộn qua hết mới tới được nhóm "7 ngày qua". Giờ mặc định TẤT CẢ nhóm đều ĐÓNG (chỉ hiện dòng tóm
// tắt kèm mũi tên), bấm ĐÚNG dòng nào thì CHỈ dòng đó mở ra, các dòng khác không bị ảnh hưởng - dùng
// chung cho cả 4 danh sách (2 tab × danh sách theo trang + danh sách mọi trang).
function appendBucketGroup(listEl, labelText, count) {
    const header = document.createElement('div');
    header.className = 'zap-day-row zap-bucket-header';
    header.innerHTML = `<span class="zap-date">${labelText} (${count})</span><span class="zap-today-arrow">▾</span>`;
    const body = document.createElement('div');
    body.style.display = 'none';
    body.style.margin = '2px 0 6px';
    header.addEventListener('click', () => {
        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : 'block';
        header.classList.toggle('open', !isOpen);
    });
    listEl.appendChild(header);
    listEl.appendChild(body);
    // Gắn thẳng tham chiếu header lên body - để removeRowOptimistically() bên dưới lấy lại được header
    // đúng của bucket đó mà không cần đổi chữ ký hàm này ở mọi nơi đang gọi (vẫn trả về `body` như cũ).
    body.__jdBucketHeader = header;
    return body;
}

// THEO Ý TƯỞNG NGƯỜI DÙNG ĐỀ XUẤT: thay vì hỏi lại dữ liệu từ storage/DB rồi render lại cả danh sách
// (có độ trễ + rủi ro đua thời gian như đã gặp), CẬP NHẬT GIAO DIỆN NGAY TẠI CHỖ lúc bấm nút - xoá thẳng
// đúng dòng đó khỏi DOM ngay lập tức, đồng thời giảm số đếm trên tiêu đề nhóm ngày, gỡ luôn cả nhóm nếu
// trống, và hiện lại thông báo "chưa có gì" nếu danh sách trống hẳn. Việc xoá dữ liệu thật ở storage/DB
// vẫn chạy song song bên dưới (để đúng dữ liệu khi mở lại popup sau này), nhưng KHÔNG còn quyết định gì
// tới việc hiển thị ngay lúc bấm - loại bỏ hoàn toàn nguy cơ đua thời gian.
// LỖI THẬT ĐÃ GẶP (người dùng báo: xoá/bỏ miễn trừ TỪNG mục một tới hết, nút "TẤT CẢ" vẫn còn hiện dù
// danh sách đã rỗng hoặc chỉ còn 1 mục): nút "TẤT CẢ" trước đây CHỈ được tính hiện/ẩn LÚC RENDER BAN ĐẦU
// (`items.length > 1`) - không tự cập nhật lại khi người dùng xoá dần từng mục một qua nút riêng lẻ thay
// vì bấm "TẤT CẢ". SỬA: nhận thêm tham số `allBtn` (tuỳ chọn), đếm lại số dòng thật còn trong danh sách
// SAU mỗi lần xoá 1 dòng, ẩn nút "TẤT CẢ" ngay khi còn ≤1 mục - khớp đúng điều kiện hiện nút lúc render
// ban đầu, không để 2 thời điểm lệch pha nhau nữa. Áp dụng chung cho cả 3 danh sách (Đã xoá/Đã miễn trừ/
// Đã loại trừ) vì cùng 1 khuôn mẫu UI.
function removeRowOptimistically(row, listEl, emptyHtml, allBtn) {
    const body = row.parentElement;
    row.remove();
    if (!body) return;
    if (body.children.length === 0) {
        const header = body.__jdBucketHeader;
        if (header) header.remove();
        body.remove();
    } else {
        const header = body.__jdBucketHeader;
        const span = header && header.querySelector('.zap-date');
        if (span) {
            span.textContent = span.textContent.replace(/\((\d+)\)/, (m, n) => `(${Math.max(0, parseInt(n, 10) - 1)})`);
        }
    }
    if (listEl.children.length === 0) {
        listEl.innerHTML = emptyHtml;
    }
    if (allBtn) {
        const remaining = listEl.querySelectorAll('.zap-today-row').length;
        if (remaining <= 1) allBtn.style.display = 'none';
    }
}

function classifyZapDateBucket(dateStr, todayMidnight) {
    if (dateStr === 'unknown' || typeof dateStr !== 'string' || !dateStr) return 'unknown';
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return 'unknown';
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (Number.isNaN(d.getTime())) return 'unknown';
    const diffDays = Math.round((todayMidnight - d) / 86400000);
    if (diffDays <= 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays <= 7) return 'last7';
    if (diffDays <= 30) return 'last30';
    return 'older';
}

// THEO YÊU CẦU NGƯỜI DÙNG ("2 bên phải giống nhau"): bảng "Đã xoá" giờ hiện TỪNG MỤC CỤ THỂ (selector/
// chữ ký nội dung + ngày) y hệt cấu trúc renderProtectedList() bên dưới - nhóm theo ngày (Hôm nay/Hôm
// qua/7 ngày/30 ngày/Cũ hơn, dùng chung classifyZapDateBucket/ZAP_BUCKET_ORDER), MỖI MỤC có nút "Khôi
// phục" RIÊNG (xoá đúng 1 selector đó khỏi cả kho trung tâm lẫn localStorage của trang, không tự đóng
// popup, tự làm mới danh sách tại chỗ) - không còn chỉ hiện "Hôm nay (14)" trần trụi kèm 1 nút khôi
// phục cả cụm như trước.
function renderZapDays(items, host, tabId) {
    const listEl = document.getElementById('zapperDaysList');
    const hostEl = document.getElementById('zapperHost');
    const restoreAllBtn = document.getElementById('restoreAllBtn');
    hostEl.textContent = host || '—';
    listEl.innerHTML = '';

    if (!items || !items.length) {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapEmpty}</div>`;
        restoreAllBtn.style.display = 'none';
        return;
    }

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const buckets = {};
    items.forEach((item) => {
        const bucket = classifyZapDateBucket(item.date, todayMidnight);
        (buckets[bucket] || (buckets[bucket] = [])).push(item);
    });
    ZAP_BUCKET_ORDER.forEach((bucketKey) => {
        const group = buckets[bucketKey];
        if (!group || !group.length) return;
        const body = appendBucketGroup(listEl, i18n[currentLang][ZAP_BUCKET_LABEL_KEY[bucketKey]], group.length);
        group.forEach(({ sel, date, txt }) => {
            const row = document.createElement('div');
            row.className = 'zap-today-row';
            const label = (txt || sel || '').slice(0, 40).replace(/</g, '&lt;');
            row.innerHTML = `
                <span title="${(sel || '').replace(/"/g, '&quot;')}"><span class="zap-today-host">${label || i18n[currentLang].zapProtectedNoLabel}</span><span class="zap-today-count">${date || ''}</span></span>
                <button>${i18n[currentLang].zapRestoreBtnShort}</button>
            `;
            row.querySelector('button').addEventListener('click', () => {
                // THEO Ý TƯỞNG NGƯỜI DÙNG ĐỀ XUẤT: xoá thẳng dòng này khỏi giao diện NGAY LẬP TỨC lúc bấm -
                // không đợi hỏi lại dữ liệu, không đua với bất kỳ thao tác bất đồng bộ nào. Việc xoá dữ liệu
                // thật (kho trung tâm + localStorage của tab đang mở, nếu đúng site đó) chạy song song bên
                // dưới, không quyết định gì tới việc hiển thị.
                removeRowOptimistically(row, listEl, `<div class="zap-empty">${i18n[currentLang].zapEmpty}</div>`, restoreAllBtn);
                chrome.runtime.sendMessage({ action: 'zapperRestoreOne', hostname: activeHostname, selector: sel }, () => {
                    void chrome.runtime.lastError;
                    // Chỉ cần đồng bộ/reload tab đang mở nếu ĐÚNG site đó đang mở - không có lý do gì đụng
                    // tới tab khác (đang xem site khác). Site không đang mở sẽ tự đồng bộ đúng ở lần tải kế
                    // tiếp (cơ chế reconcile có sẵn trong element-zapper.js).
                    if (activeHostname === host && tabId != null) {
                        chrome.tabs.sendMessage(tabId, { target: 'jdZapper', action: 'restoreOne', selector: sel }, () => {
                            void chrome.runtime.lastError;
                            chrome.tabs.reload(tabId).catch(() => {});
                        });
                    }
                    loadTodaySummary();
                });
            });
            body.appendChild(row);
        });
    });
    restoreAllBtn.style.display = 'block';
}

let activeHostname = null;

// ĐÃ REVERT (bằng chứng thật): từng đổi nút này sang gọi zapperRestoreEverything (xoá SẠCH kho trung
// tâm mọi trang mọi ngày) theo yêu cầu trước đó - nhưng người dùng báo bấm xong "biến mất hết" dữ liệu
// (mất luôn lịch sử của CÁC TRANG KHÁC không liên quan tới trang đang mở) - đúng chữ trên nút chỉ nói
// "trang này"/"mục đã xoá" nên hành vi xoá-sạch-toàn-cục nấp phía sau là bất ngờ, không đúng tinh thần
// "ưu tiên 1: không xoá nhầm". TRẢ VỀ đúng phạm vi nút: chỉ khôi phục (xoá khỏi kho) các mục ĐÃ XOÁ của
// ĐÚNG hostname đang mở, không đụng dữ liệu trang khác.
// THEO YÊU CẦU NGƯỜI DÙNG: bỏ hẳn việc tự tải lại trang khi bấm "Khôi phục tất cả"/"Bỏ miễn trừ tất cả"
// (áp dụng cho cả 4 nút "tất cả" trong file này) - không hợp lý khi người dùng đang đứng ở 1 site KHÁC
// hoàn toàn không liên quan lúc bấm các nút này (VD khôi phục cho dantri.com.vn trong khi đang mở
// heovl.im) - tự tải lại đúng tab đang mở lúc đó chẳng liên quan gì tới thao tác vừa làm. Trang liên
// quan (nếu có đang mở) sẽ tự đồng bộ đúng ở lần tải kế tiếp qua cơ chế reconcile có sẵn.
document.getElementById('restoreAllBtn').addEventListener('click', () => {
    if (activeHostname == null) return;
    // Xoá sạch danh sách trên giao diện NGAY LẬP TỨC - cùng nguyên tắc removeRowOptimistically() ở trên.
    document.getElementById('zapperDaysList').innerHTML = `<div class="zap-empty">${i18n[currentLang].zapEmpty}</div>`;
    document.getElementById('restoreAllBtn').style.display = 'none';
    chrome.runtime.sendMessage({ action: 'zapperRestoreAll', hostname: activeHostname }, () => {
        void chrome.runtime.lastError;
        if (activeTabId != null) {
            chrome.tabs.sendMessage(activeTabId, { target: 'jdZapper', action: 'restoreAll' }, () => {
                void chrome.runtime.lastError;
            });
        }
        loadTodaySummary();
    });
});

// THEO YÊU CẦU NGƯỜI DÙNG ("2 bên phải giống nhau"): đọc TỪNG MỤC CỤ THỂ từ content script của tab
// đang mở (localStorage của đúng trang đó) - cùng nguồn/cùng cơ chế với loadProtectedPanel() bên dưới,
// thay vì chỉ hỏi kho trung tâm lấy SỐ ĐẾM gộp theo ngày như trước.
// LỖI THẬT VỪA GẶP (bằng chứng thật, người dùng báo: bấm Khôi phục/Bỏ miễn trừ xong, danh sách vẫn
// hiện dữ liệu CŨ, phải đóng mở lại popup mới thấy đúng): các nơi gọi hàm này (Khôi phục 1 mục, Khôi
// phục tất cả, Bỏ miễn trừ...) đều làm đúng thứ tự "load lại danh sách TRƯỚC, tải lại trang SAU" - NHƯNG
// hàm này là HOÀN TOÀN BẤT ĐỒNG BỘ (chrome.tabs.query -> chrome.tabs.sendMessage) mà KHÔNG TRẢ VỀ GÌ để
// nơi gọi biết khi nào nó THẬT SỰ xong - gọi loadZapDaysPanel() xong gọi chrome.tabs.reload() NGAY DÒNG
// KẾ TIẾP chỉ đúng về THỨ TỰ DÒNG LỆNH, không đúng về THỨ TỰ HOÀN TẤT THẬT SỰ (hàm này còn đang chờ
// sendMessage phản hồi thì reload() đã chạy, phá huỷ content script đang trả lời giữa chừng - danh sách
// hiển thị y hệt dữ liệu cũ hoặc rỗng). SỬA: thêm tham số callback `done`, chỉ gọi SAU KHI render xong
// thật sự (mọi nhánh, kể cả các nhánh lỗi/rỗng) - nơi gọi giờ đặt reload() vào ĐÚNG bên trong callback
// này thay vì gọi ngay sau dòng lệnh, đảm bảo reload chỉ chạy khi popup đã hiển thị dữ liệu mới thật.
function loadZapDaysPanel(done) {
    const finish = typeof done === 'function' ? done : () => {};
    const listEl = document.getElementById('zapperDaysList');
    if (typeof chrome === 'undefined' || !chrome.tabs) {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapNoData}</div>`;
        finish();
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        let hostname = '';
        try { hostname = tab && tab.url ? new URL(tab.url).hostname : ''; } catch (e) {}
        if (!tab || !hostname) {
            listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapNoData}</div>`;
            document.getElementById('zapperHost').textContent = '—';
            document.getElementById('restoreAllBtn').style.display = 'none';
            activeHostname = null;
            finish();
            return;
        }
        activeTabId = tab.id;
        activeHostname = hostname;
        chrome.tabs.sendMessage(tab.id, { target: 'jdZapper', action: 'getZapped' }, (resp) => {
            void chrome.runtime.lastError;
            if (!resp || !resp.ok) {
                listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapNoData}</div>`;
                document.getElementById('zapperHost').textContent = '—';
                document.getElementById('restoreAllBtn').style.display = 'none';
                finish();
                return;
            }
            renderZapDays(resp.items, resp.host, tab.id);
            finish();
        });
    });
}

loadZapDaysPanel();

// ==================== TAB "CORE FEATURES"/"MULTI-LAYER ALGORITHM" VÀ "ĐÃ XOÁ"/"ĐÃ MIỄN TRỪ" ====================
// THEO YÊU CẦU NGƯỜI DÙNG: có 2 NHÓM tab độc lập trên cùng 1 trang (panel Ống Ngắm + panel Tính năng)
// - LỖI THẬT sẽ gặp nếu không cẩn thận: nếu bấm 1 tab ở nhóm này mà lại tắt luôn tab đang mở của nhóm
// KIA (vì trước đây querySelectorAll('.tab-btn')/('.tab-panel') quét TOÀN TRANG không phân biệt nhóm),
// nhóm kia sẽ bị mất trắng nội dung hiển thị. Giới hạn phạm vi bằng closest('.panel') - mỗi nhóm tab
// nằm trong 1 .panel riêng, chỉ tắt/bật đúng tab-btn và tab-panel CÙNG PANEL với nút vừa bấm.
document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const scope = btn.closest('.panel') || document;
        scope.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('is-active'));
        scope.querySelectorAll('.tab-panel').forEach((p) => { p.classList.remove('is-active'); p.style.display = 'none'; });
        btn.classList.add('is-active');
        const panel = document.getElementById(btn.dataset.tab);
        if (panel) { panel.classList.add('is-active'); panel.style.display = 'block'; }
    });
});

// ==================== DANH SÁCH "MIỄN TRỪ VĨNH VIỄN" - RIÊNG BIỆT, TÁCH KHỎI "KHÔI PHỤC" ====================
// THEO YÊU CẦU NGƯỜI DÙNG: "Khôi phục" ở trên gộp theo NGÀY, dành cho mục ĐÃ XOÁ - không hợp với danh
// sách miễn trừ (thường chỉ vài mục, cần bỏ ĐÚNG 1 mục cụ thể lỡ đánh dấu nhầm, không phải theo ngày).
// Đọc trực tiếp từ content script (localStorage của trang, nguồn dữ liệu "sống" hiện tại) thay vì kho
// trung tâm IndexedDB - đơn giản hơn hẳn vì không cần gộp/lọc theo ngày như luồng "Khôi phục". Giờ nằm
// hẳn trong tab riêng (không cần toggle ẩn/hiện lồng thêm bên trong nữa - bản thân cái tab đã lo việc đó).
function renderProtectedList(items, tabId) {
    const listEl = document.getElementById('zapProtectedList');
    const unprotectAllBtn = document.getElementById('unprotectAllBtn');

    if (!items || !items.length) {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapProtectedEmpty}</div>`;
        unprotectAllBtn.style.display = 'none';
        return;
    }
    listEl.innerHTML = '';
    // THEO YÊU CẦU NGƯỜI DÙNG: nhóm theo ngày giống hệt danh sách "Đã xoá" (Hôm nay/Hôm qua/7 ngày
    // qua/30 ngày qua/Cũ hơn - dùng CHUNG classifyZapDateBucket/ZAP_BUCKET_ORDER đã có sẵn cho danh
    // sách kia, không viết logic phân loại ngày riêng) - vẫn giữ nút "Bỏ miễn trừ" cho TỪNG mục cụ thể
    // (khác với "Đã xoá" chỉ khôi phục theo cả nhóm) vì bỏ miễn trừ cần đúng CHÍNH XÁC 1 selector, gộp
    // theo ngày chỉ để dễ nhìn/định vị, không đổi hành vi bấm nút.
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const buckets = {};
    items.forEach((item) => {
        const bucket = classifyZapDateBucket(item.date, todayMidnight);
        (buckets[bucket] || (buckets[bucket] = [])).push(item);
    });
    ZAP_BUCKET_ORDER.forEach((bucketKey) => {
        const group = buckets[bucketKey];
        if (!group || !group.length) return;
        const body = appendBucketGroup(listEl, i18n[currentLang][ZAP_BUCKET_LABEL_KEY[bucketKey]], group.length);
        group.forEach(({ sel, date, txt }) => {
            const row = document.createElement('div');
            row.className = 'zap-today-row';
            const label = (txt || sel || '').slice(0, 40).replace(/</g, '&lt;');
            row.innerHTML = `
                <span title="${(sel || '').replace(/"/g, '&quot;')}"><span class="zap-today-host">${label || i18n[currentLang].zapProtectedNoLabel}</span><span class="zap-today-count">${date || ''}</span></span>
                <button>${i18n[currentLang].zapUnprotectBtn}</button>
            `;
            row.querySelector('button').addEventListener('click', () => {
                // LỖI THẬT VỪA GẶP (người dùng báo: bỏ miễn trừ xong, tải lại trang vẫn bị lại): trước đây
                // CHỈ xoá ở localStorage của trang (qua content script) - KHÔNG xoá ở kho trung tâm
                // (IndexedDB, qua background). Tải lại trang, element-zapper.js tự đồng bộ lại từ kho trung
                // tâm (zapperGetHostEntries, xem comment "ĐỒNG BỘ CACHE NHANH..." trong element-zapper.js) -
                // dữ liệu cũ vẫn còn nguyên ở đó nên bị ghi lại vào localStorage y hệt trước khi bỏ miễn trừ.
                // Phải xoá CẢ HAI nơi, giống hệt cách "Khôi phục" ở trên đã làm đúng cho danh sách đã xoá.
                // THEO YÊU CẦU NGƯỜI DÙNG: bỏ miễn trừ 1 mục KHÔNG được tự đóng popup nữa - trước đây
                // window.close() sau MỖI lần bấm buộc phải mở lại popup từ đầu mới bỏ tiếp được mục kế
                // tiếp, rất bất tiện nếu cần bỏ nhiều mục liên tiếp. Trang vẫn tải lại (cần thiết để CSS
                // ẩn tĩnh tính toán lại không còn selector này trong danh sách miễn trừ), nhưng popup ở
                // lại, tự làm mới danh sách để bấm tiếp mục khác ngay.
                // THEO Ý TƯỞNG NGƯỜI DÙNG ĐỀ XUẤT: xoá thẳng dòng này khỏi giao diện NGAY LẬP TỨC, không
                // đợi hỏi lại dữ liệu - xem removeRowOptimistically() ở trên.
                removeRowOptimistically(row, listEl, `<div class="zap-empty">${i18n[currentLang].zapProtectedEmpty}</div>`, unprotectAllBtn);
                chrome.runtime.sendMessage({ action: 'zapperUnprotect', hostname: activeHostname, selector: sel }, () => {
                    void chrome.runtime.lastError;
                    chrome.tabs.sendMessage(tabId, { target: 'jdZapper', action: 'unprotectOne', selector: sel }, () => {
                        void chrome.runtime.lastError;
                        chrome.tabs.reload(tabId).catch(() => {});
                    });
                });
            });
            body.appendChild(row);
        });
    });

    unprotectAllBtn.style.display = items.length > 1 ? 'block' : 'none';
    unprotectAllBtn.onclick = () => {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapProtectedEmpty}</div>`;
        unprotectAllBtn.style.display = 'none';
        chrome.runtime.sendMessage({ action: 'zapperUnprotectAll', hostname: activeHostname }, () => {
            void chrome.runtime.lastError;
            chrome.tabs.sendMessage(tabId, { target: 'jdZapper', action: 'unprotectAll' }, () => {
                void chrome.runtime.lastError;
                chrome.tabs.reload(tabId).catch(() => {});
            });
        });
    };
}

// ==================== TAB "ĐÃ LOẠI TRỪ" (chuột phải trên trang → tắt hẳn extension cho cả domain) ====
// KHÁC "Đã xoá"/"Đã miễn trừ" (2 danh sách đó SCOPE theo TỪNG TRANG cụ thể): loại trừ là quyết định
// TOÀN CỤC theo domain, không gắn với 1 trang/tab nào - nên danh sách này LUÔN hiển thị TẤT CẢ domain đã
// loại trừ (không lọc theo activeHostname), đọc thẳng từ background.js (nguồn sự thật duy nhất), không
// cần hỏi content script của tab nào cả.
function renderExcludedList(rawItems) {
    const listEl = document.getElementById('zapExcludedList');
    const allBtn = document.getElementById('unexcludeAllBtn');

    // LỖI THẬT ĐÃ GẶP (TypeError: Cannot read properties of undefined (reading 'split')): mục người
    // dùng lưu TRƯỚC KHI schema đổi từ chuỗi domain thuần sang {domain, date} vẫn còn ở dạng chuỗi cũ
    // trong storage - destructure thẳng {domain, date} từ 1 chuỗi cho ra date=undefined, vỡ ngay ở
    // classifyZapDateBucket. Chuẩn hoá CẢ 2 dạng ngay khi đọc, không giả định mọi entry đã đúng schema.
    const items = (rawItems || []).map((entry) =>
        typeof entry === 'string' ? { domain: entry, date: 'unknown' } : entry
    );

    if (!items.length) {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapExcludedEmpty}</div>`;
        allBtn.style.display = 'none';
        return;
    }
    listEl.innerHTML = '';
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const buckets = {};
    items.forEach((item) => {
        const bucket = classifyZapDateBucket(item.date, todayMidnight);
        (buckets[bucket] || (buckets[bucket] = [])).push(item);
    });
    ZAP_BUCKET_ORDER.forEach((bucketKey) => {
        const group = buckets[bucketKey];
        if (!group || !group.length) return;
        const body = appendBucketGroup(listEl, i18n[currentLang][ZAP_BUCKET_LABEL_KEY[bucketKey]], group.length);
        group.forEach(({ domain, date }) => {
            const row = document.createElement('div');
            row.className = 'zap-today-row';
            row.innerHTML = `
                <span title="${(domain || '').replace(/"/g, '&quot;')}"><span class="zap-today-host">${domain || ''}</span><span class="zap-today-count">${date || ''}</span></span>
                <button>${i18n[currentLang].zapUnexcludeBtn}</button>
            `;
            row.querySelector('button').addEventListener('click', () => {
                removeRowOptimistically(row, listEl, `<div class="zap-empty">${i18n[currentLang].zapExcludedEmpty}</div>`, allBtn);
                chrome.runtime.sendMessage({ action: 'jdRemoveExcludedDomain', domain }, () => {
                    void chrome.runtime.lastError;
                    // Áp dụng TỨC THÌ cho tab đang mở nếu đúng domain đó đang mở - không cần tải lại trang,
                    // tái dùng nguyên plumbing jdSetExcluded đã có ở mỗi content script.
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        const tab = tabs && tabs[0];
                        if (!tab || !tab.url) return;
                        try {
                            const host = new URL(tab.url).hostname.toLowerCase();
                            if (host === domain || host.endsWith('.' + domain)) {
                                chrome.tabs.sendMessage(tab.id, { action: 'jdSetExcluded', excluded: false }, () => { void chrome.runtime.lastError; });
                            }
                        } catch (e) {}
                    });
                });
            });
            body.appendChild(row);
        });
    });

    allBtn.style.display = items.length > 1 ? 'block' : 'none';
    allBtn.onclick = () => {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapExcludedEmpty}</div>`;
        allBtn.style.display = 'none';
        chrome.runtime.sendMessage({ action: 'jdRemoveAllExcludedDomains' }, () => {
            void chrome.runtime.lastError;
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs && tabs[0];
                if (tab && tab.id != null) {
                    chrome.tabs.sendMessage(tab.id, { action: 'jdSetExcluded', excluded: false }, () => { void chrome.runtime.lastError; });
                }
            });
        });
    };
}

function loadExcludedPanel() {
    if (typeof chrome === 'undefined' || !chrome.runtime) { renderExcludedList([]); return; }
    chrome.runtime.sendMessage({ action: 'jdGetExcludedDomains' }, (resp) => {
        void chrome.runtime.lastError;
        renderExcludedList(resp && resp.ok ? resp.items : []);
    });
}
loadExcludedPanel();

// 3 nhánh không gọi được renderProtectedList() (chrome://, tab không hợp lệ, content script chưa phản
// hồi) trước đây không ghi gì cả, để nguyên nội dung tĩnh mặc định trong TT.html - gọi thẳng qua hàm
// render với mảng rỗng cho gọn, tận dụng đúng nhánh "rỗng" đã có sẵn trong renderProtectedList().
const showZapProtectedEmpty = () => {
    renderProtectedList([], null);
};
// Cùng lý do sửa với loadZapDaysPanel() ở trên - xem chú thích "LỖI THẬT VỪA GẶP" tại đó.
function loadProtectedPanel(done) {
    const finish = typeof done === 'function' ? done : () => {};
    if (typeof chrome === 'undefined' || !chrome.tabs) { showZapProtectedEmpty(); finish(); return; }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        if (!tab || !/^https?:/i.test(tab.url || '')) { showZapProtectedEmpty(); finish(); return; }
        chrome.tabs.sendMessage(tab.id, { target: 'jdZapper', action: 'getProtected' }, (resp) => {
            void chrome.runtime.lastError;
            if (resp && resp.ok) renderProtectedList(resp.items, tab.id);
            else showZapProtectedEmpty();
            finish();
        });
    });
}

loadProtectedPanel();

// ==================== TẤT CẢ TRANG, TẤT CẢ THỜI ĐIỂM (không chỉ "hôm nay", không chỉ trang đang mở) ====================
// THEO YÊU CẦU NGƯỜI DÙNG: bấm vào "Hôm nay"/"Hôm qua"/"7 ngày qua"/... phải thấy ĐÚNG TỪNG MỤC (kèm
// tên trang, vì đây là danh sách GỘP MỌI TRANG chứ không riêng trang đang mở), khôi phục/bỏ miễn trừ
// được NGAY TỪNG MỤC đó dù KHÔNG đang mở đúng trang đó (kho trung tâm là nguồn sự thật) - THỜI GIAN
// THỰC, KHÔNG đóng popup. Dùng CHUNG 1 hàm cho cả 2 tab (Đã xoá/Đã miễn trừ), chỉ khác action xoá.
// THEO YÊU CẦU NGƯỜI DÙNG: danh sách MỌI TRANG không liệt kê từng mục trần trụi (nếu có 29 trang, mỗi
// trang nhiều mục thì quá dài) - thay vào đó QUẢN LÝ THEO TRANG trong từng nhóm ngày: mỗi dòng là 1
// tên trang + số lượng, bấm "Khôi phục/Bỏ miễn trừ" là xoá HẾT các mục của ĐÚNG trang đó trong ĐÚNG
// nhóm ngày đang mở - gọn, không tràn màn hình dù có bao nhiêu trang đi nữa.
function renderBucketedCrossSiteItems(items, listEl, deleteBtnLabelKey, onDeleted) {
    listEl.innerHTML = '';
    if (!items || !items.length) {
        listEl.innerHTML = `<div class="zap-empty">${i18n[currentLang].zapNoData}</div>`;
        return;
    }
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const buckets = {};
    items.forEach((item) => {
        const bucket = classifyZapDateBucket(item.date, todayMidnight);
        (buckets[bucket] || (buckets[bucket] = [])).push(item);
    });
    ZAP_BUCKET_ORDER.forEach((bucketKey) => {
        const group = buckets[bucketKey];
        if (!group || !group.length) return;
        const byHost = {};
        group.forEach((item) => { (byHost[item.hostname] || (byHost[item.hostname] = [])).push(item); });
        const hosts = Object.keys(byHost).sort((a, b) => byHost[b].length - byHost[a].length);
        const body = appendBucketGroup(listEl, i18n[currentLang][ZAP_BUCKET_LABEL_KEY[bucketKey]], group.length);
        hosts.forEach((host) => {
            const hostItems = byHost[host];
            const row = document.createElement('div');
            row.className = 'zap-today-row';
            row.innerHTML = `
                <span><span class="zap-today-host">${host}</span><span class="zap-today-count">(${hostItems.length})</span></span>
                <button>${i18n[currentLang][deleteBtnLabelKey]}</button>
            `;
            row.querySelector('button').addEventListener('click', () => {
                // THEO Ý TƯỞNG NGƯỜI DÙNG ĐỀ XUẤT: xoá thẳng dòng này (đúng 1 site trong đúng nhóm ngày)
                // khỏi giao diện NGAY LẬP TỨC - không đợi hỏi lại dữ liệu. Chỉ reload tab đang mở nếu ĐÚNG
                // site đó đang mở (activeHostname === host) - đứng ở site KHÁC (VD heovl.im) bấm khôi phục
                // cho dantri.com.vn thì KHÔNG đụng gì tới tab đang mở, site đó tự đồng bộ đúng ở lần tải
                // kế tiếp qua cơ chế reconcile có sẵn.
                removeRowOptimistically(row, listEl, `<div class="zap-empty">${i18n[currentLang].zapNoData}</div>`);
                hostItems.forEach((item) => {
                    chrome.runtime.sendMessage({ action: 'zapperDeleteEntryById', id: item.id }, () => {
                        void chrome.runtime.lastError;
                    });
                });
                if (activeHostname === host && activeTabId != null) {
                    chrome.tabs.reload(activeTabId).catch(() => {});
                }
                // Làm mới nền bảng theo-trang (nếu đúng site đang mở trùng site này) - không quyết định gì
                // tới việc hiển thị dòng vừa xoá (đã xử lý ở trên), chỉ để đồng bộ số đếm nếu có mở panel đó.
                onDeleted();
            });
            body.appendChild(row);
        });
    });
}

function renderTodaySummary(items) {
    const toggleWrap = document.getElementById('zapTodayToggle');
    const restoreAllTodayBtn = document.getElementById('restoreAllTodayBtn');
    if (!items || !items.length) {
        toggleWrap.style.display = 'none';
        return;
    }
    toggleWrap.style.display = 'flex';
    renderBucketedCrossSiteItems(items, document.getElementById('zapTodayList'), 'zapRestoreBtnShort', () => {
        loadZapDaysPanel();
    });
    restoreAllTodayBtn.style.display = 'block';
}

function loadTodaySummary(done) {
    const finish = typeof done === 'function' ? done : () => {};
    chrome.runtime.sendMessage({ action: 'zapperGetAllItems', mode: 'destroy' }, (resp) => {
        if (chrome.runtime.lastError || !resp || !resp.ok) { finish(); return; }
        renderTodaySummary(resp.items);
        finish();
    });
}

document.getElementById('zapTodayToggle').addEventListener('click', () => {
    const panel = document.getElementById('zapTodayPanel');
    const toggle = document.getElementById('zapTodayToggle');
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    toggle.classList.toggle('open', !isOpen);
});

// ĐÃ REVERT (cùng lý do với restoreAllBtn ở trên - xem comment tại đó): trả về đúng phạm vi "hôm nay,
// mọi trang" (zapperRestoreAllToday), không xoá sạch toàn bộ lịch sử mọi ngày mọi trang nữa.
// LỖI THẬT VỪA GẶP (bằng chứng thật qua ảnh chụp người dùng gửi: đang mở heovl.im, bấm nút này để khôi
// phục dữ liệu của dantri.com.vn): nút này gộp dữ liệu HÔM NAY từ NHIỀU SITE khác nhau, không riêng site
// đang mở - bản trước lại gửi thẳng lệnh "restoreAll" (xoá SẠCH TOÀN BỘ danh sách đã xoá, không riêng
// hôm nay) tới TAB ĐANG MỞ bất kể tab đó có liên quan gì không - vừa sai phạm vi (mọi ngày thay vì chỉ
// hôm nay), vừa sai site (site đang mở có thể hoàn toàn không nằm trong nhóm được khôi phục hôm nay,
// hoặc tệ hơn là bị xoá nhầm dữ liệu ĐÃ XOÁ của riêng NÓ nếu tình cờ cũng có). Bỏ hẳn bước gửi lệnh cho
// tab đang mở lẫn việc tự tải lại trang - các site liên quan (dù đang mở hay không) sẽ tự đồng bộ đúng
// dữ liệu mới ở lần tải kế tiếp qua cơ chế reconcile có sẵn trong element-zapper.js.
document.getElementById('restoreAllTodayBtn').addEventListener('click', () => {
    // Xoá sạch giao diện "Hôm nay" NGAY LẬP TỨC.
    document.getElementById('zapTodayToggle').style.display = 'none';
    document.getElementById('zapTodayList').innerHTML = '';
    chrome.runtime.sendMessage({ action: 'zapperRestoreAllToday' }, () => {
        void chrome.runtime.lastError;
        loadTodaySummary();
    });
});

loadTodaySummary();

// ==================== DANH SÁCH MIỄN TRỪ MỌI TRANG/MỌI LÚC - MIRROR CỦA BẢN TRÊN ====================
// Dùng chung renderBucketedCrossSiteItems() ở trên, chỉ khác action lấy dữ liệu (mode: 'protect') và
// nhãn nút xoá ("Bỏ miễn trừ" thay vì "Khôi phục") - tách biệt hoàn toàn với danh sách "Đã xoá".
function renderProtectedTodaySummary(items) {
    const toggleWrap = document.getElementById('zapProtectedTodayToggle');
    const unprotectAllTodayBtn = document.getElementById('unprotectAllTodayBtn');
    if (!items || !items.length) {
        toggleWrap.style.display = 'none';
        return;
    }
    toggleWrap.style.display = 'flex';
    renderBucketedCrossSiteItems(items, document.getElementById('zapProtectedTodayList'), 'zapUnprotectBtnShort', () => {
        loadProtectedPanel();
    });
    unprotectAllTodayBtn.style.display = 'block';
}

function loadProtectedTodaySummary(done) {
    const finish = typeof done === 'function' ? done : () => {};
    chrome.runtime.sendMessage({ action: 'zapperGetAllItems', mode: 'protect' }, (resp) => {
        if (chrome.runtime.lastError || !resp || !resp.ok) { finish(); return; }
        renderProtectedTodaySummary(resp.items);
        finish();
    });
}

document.getElementById('zapProtectedTodayToggle').addEventListener('click', () => {
    const panel = document.getElementById('zapProtectedTodayPanel');
    const toggle = document.getElementById('zapProtectedTodayToggle');
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    toggle.classList.toggle('open', !isOpen);
});


// Cùng lý do đã sửa ở "restoreAllTodayBtn" phía trên - xem chú thích "LỖI THẬT VỪA GẶP" tại đó.
document.getElementById('unprotectAllTodayBtn').addEventListener('click', () => {
    document.getElementById('zapProtectedTodayToggle').style.display = 'none';
    document.getElementById('zapProtectedTodayList').innerHTML = '';
    chrome.runtime.sendMessage({ action: 'zapperUnprotectAllToday' }, () => {
        void chrome.runtime.lastError;
        loadProtectedTodaySummary();
    });
});

loadProtectedTodaySummary();

// ==================== XUẤT / NHẬP DỮ LIỆU ỐNG NGẮM ====================
// Xuất TOÀN BỘ kho trung tâm (mọi trang đã ngắm/soi qua, không chỉ trang hiện tại) - vì extension
// hoạt động OFFLINE (không có server đồng bộ), đây là cách duy nhất để chia sẻ dữ liệu học được
// qua lại giữa các máy/người dùng khác nhau, hoặc gửi cho tác giả để gộp vào bản phát hành sau.
document.getElementById('zapperExportBtn').addEventListener('click', () => {
    if (typeof chrome === 'undefined' || !chrome.runtime) return;
    chrome.runtime.sendMessage({ action: 'zapperExportAll' }, (resp) => {
        if (chrome.runtime.lastError || !resp || !resp.ok) return;
        const blob = new Blob([JSON.stringify(resp.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `removeadblock-pro-bundle-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        const n = (resp.data && resp.data.entries) ? resp.data.entries.length : 0;
        showToast(i18n[currentLang].zapExportToast.replace('{n}', n));
    });
});

const zapperImportFile = document.getElementById('zapperImportFile');
document.getElementById('zapperImportBtn').addEventListener('click', () => zapperImportFile.click());
zapperImportFile.addEventListener('change', () => {
    const file = zapperImportFile.files && zapperImportFile.files[0];
    zapperImportFile.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        let data;
        try { data = JSON.parse(reader.result); } catch (e) {
            showToast(i18n[currentLang].zapImportError);
            return;
        }
        chrome.runtime.sendMessage({ action: 'zapperImportData', data }, (resp) => {
            if (chrome.runtime.lastError || !resp || !resp.ok) {
                showToast(i18n[currentLang].zapImportError);
                return;
            }
            const r = resp.result || { imported: 0, rejected: 0, patternsLearned: 0, excludedImported: 0 };
            const cfg = r.configImported || {};
            showToast(i18n[currentLang].zapImportToast
                .replace('{imp}', r.imported).replace('{rej}', r.rejected).replace('{pat}', r.patternsLearned)
                .replace('{exc}', r.excludedImported || 0)
                .replace('{allow}', cfg.allow || 0)
                .replace('{block}', cfg.block || 0));
            loadZapDaysPanel();
            if (typeof loadExcludedPanel === 'function') loadExcludedPanel();
        });
    };
    reader.readAsText(file);
});

// ==================== ỦNG HỘ DỰ ÁN (DONATE) ====================
(function () {
    const donateBtn = document.getElementById('donateBtn');
    const donateModal = document.getElementById('donateModal');
    const donateModalClose = document.getElementById('donateModalClose');
    const accountCopy = document.getElementById('donateAccountCopy');
    const emailCopy = document.getElementById('donateEmailCopy');
    if (!donateBtn || !donateModal) return;

    const copyText = (text, msgKey) => {
        navigator.clipboard.writeText(text)
            .then(() => showToast(i18n[currentLang][msgKey]))
            .catch(() => {});
    };

    donateBtn.addEventListener('click', () => { donateModal.style.display = 'flex'; });
    if (donateModalClose) donateModalClose.addEventListener('click', () => { donateModal.style.display = 'none'; });
    donateModal.addEventListener('click', (e) => { if (e.target === donateModal) donateModal.style.display = 'none'; });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && donateModal.style.display === 'flex') donateModal.style.display = 'none';
    });
    if (accountCopy) accountCopy.addEventListener('click', () => copyText('9898661918', 'donateCopiedAccount'));
    if (emailCopy) emailCopy.addEventListener('click', () => copyText('ThaiThongsj@gmail.com', 'donateCopiedEmail'));
	
// ==========================================
// QUÉT GỘP DOM & TẦNG MẠNG VÀ COPY VÀO CLIPBOARD
// ==========================================
async function copyCombinedReport() {
  const btn = document.getElementById('copyDomReportBtn');

  try {
    // 1. Kiểm tra Tab đang mở
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      showToast('⚠️ Không tìm thấy Tab đang mở!');
      return;
    }

    const url = tab.url || '';
    if (!/^https?:\/\//i.test(url)) {
      showToast('⚠️ Chỉ dùng được trên trang http/https (không áp dụng chrome://)');
      return;
    }

    showToast('⏳ Đang quét dữ liệu DOM & Tầng mạng...');

    // 2. Yêu cầu Content Script quét DOM + Deep Context
    let res;
    try {
      res = await chrome.tabs.sendMessage(tab.id, { action: 'jdDomReport' });
    } catch (sendErr) {
      showToast('❌ Content script chưa sẵn sàng — Vui lòng F5 lại trang web!');
      return;
    }

    if (res && res.ok && res.report) {
      // 3. Trích xuất dữ liệu Tầng mạng từ deepJsContext hoặc networkAdHints
      const deep = res.report.deepJsContext || {};
      const networkLogs = Array.isArray(deep.networkLogs) ? deep.networkLogs : [];

            const networkReport = {
                requests: res.report.networkAdHints || networkLogs,
                categorySummary: res.report.networkSummary || {},
                outcomeSummary: res.report.requestOutcomeSummary || {},
                extensionDecisionSummary: res.report.extensionDecisionSummary || {},
                requestTypeSummary: res.report.requestTypeSummary || {},
                captureScope: 'Main-frame instrumented requests plus a bounded Resource Timing sample; DNR matches are recorded only for this awakened tab.',
                dnrDiagnostics: {
                    available: !!res.report.dnrDiagnosticsAvailable,
                    matchedRuleCount: res.report.dnrMatchedRuleCount || 0,
                    matchedRules: res.report.dnrMatchedRules || [],
                    unavailableReason: res.report.dnrDiagnosticsAvailable
                        ? null
                        : 'DNR debug match events are unavailable in this browser/extension mode.'
                }
            };

      // 4. Gộp toàn bộ nguồn dữ liệu vào 1 Object
      const combinedReport = {
        domReport: res.report,
        networkReport: networkReport,
        deepJsContext: deep,
        copiedAt: new Date().toISOString()
      };

      const jsonText = JSON.stringify(combinedReport, null, 2);

      // 5. Cập nhật vào khung xem trước (nếu popup có thẻ <pre id="output">)
      const outputEl = document.getElementById('output');
      if (outputEl) {
        outputEl.innerText = jsonText;
      }

      // 6. Copy vào Clipboard
      await navigator.clipboard.writeText(jsonText);

      // 7. Hiệu ứng đổi nhãn nút báo thành công
      if (btn) {
        const labelEl = btn.querySelector('.icon-label');
        const oldText = labelEl ? labelEl.innerText : btn.innerText;

        if (labelEl) labelEl.innerText = '✅ Đã Copy!';
        else btn.innerText = '✅ Đã Copy!';

        setTimeout(() => {
          if (labelEl) labelEl.innerText = oldText;
          else btn.innerText = oldText;
        }, 2000);
      }

      showToast('📋 Đã copy đầy đủ (DOM + Tầng mạng)!');
    } else {
      const why = (res && res.error) ? String(res.error).slice(0, 80) : 'không có phản hồi';
      showToast('❌ Lỗi: ' + why);
    }
  } catch (e) {
    console.error('Lỗi copyCombinedReport:', e);
    showToast('❌ Có lỗi xảy ra! Vui lòng F5 trang web và thử lại.');
  }
}

// ==========================================
// GÁN SỰ KIỆN NÚT VÀ PHÍM TẮT DÀNH CHO POPUP
// ==========================================

// Gán sự kiện click cho nút Copy
const copyDomReportBtn = document.getElementById('copyDomReportBtn');
copyDomReportBtn?.addEventListener('click', copyCombinedReport);

let injectedDevTabId = null;

async function restoreInjectedDevModeState() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !/^https?:\/\//i.test(tab.url || '')) return;

    try {
        const response = await chrome.runtime.sendMessage({
            action: 'jdGetInjectedDevState',
            tabId: tab.id
        });
        if (response?.ok && response.active) {
            injectedDevTabId = tab.id;
            copyDomReportBtn.style.display = 'inline-flex';
            copyDomReportBtn.disabled = false;
        }
    } catch (error) {}
}

void restoreInjectedDevModeState();

async function toggleInjectedDevMode() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !/^https?:\/\//i.test(tab.url || '')) {
        showToast('⚠️ Chỉ dùng được trên trang http/https');
        return;
    }

    injectedDevTabId = tab.id;
    const wake = copyDomReportBtn.style.display === 'none';
    copyDomReportBtn.style.display = wake ? 'inline-flex' : 'none';
    copyDomReportBtn.disabled = wake;

    try {
        const response = await chrome.runtime.sendMessage({
            action: wake ? 'jdWakeInjectedDevMode' : 'jdSleepInjectedDevMode',
            tabId: tab.id
        });
        if (!response?.ok) throw new Error(response?.error || 'Không thể đổi chế độ');
        showToast(wake
            ? '⏳ Đã bật chế độ kiểm tra, đang tải lại trang...'
            : '🔒 Đã tắt chế độ kiểm tra');
    } catch (error) {
        copyDomReportBtn.style.display = wake ? 'none' : 'inline-flex';
        copyDomReportBtn.disabled = false;
        showToast('❌ Không thể bật chế độ kiểm tra trên tab này');
    }
}

document.addEventListener('keydown', (event) => {
    if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        void toggleInjectedDevMode();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message?.action === 'jdInjectedDevModeReady' && message.tabId === injectedDevTabId) {
        copyDomReportBtn.disabled = false;
        showToast('✅ Chế độ kiểm tra đã sẵn sàng');
    }
});

window.addEventListener('pagehide', () => {
    if (injectedDevTabId !== null) {
        chrome.runtime.sendMessage({ action: 'jdSleepInjectedDevMode', tabId: injectedDevTabId }).catch(() => {});
    }
}, { once: true });
})();