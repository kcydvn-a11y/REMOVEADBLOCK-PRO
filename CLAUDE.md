# Quy tắc bắt buộc khi sửa/thêm code cho REMOVEADBLOCK PRO

Đây là extension chặn quảng cáo tự động chạy trên **mọi trang web** (`*://*/*`, `all_frames: true`
ở phần lớn content script). Hậu quả của 1 lần "xóa nhầm" hoặc 1 vòng lặp chạy ẩu ảnh hưởng trực tiếp
tới trải nghiệm người dùng trên hàng loạt site khác nhau, kể cả các site họ dùng để làm việc/nhắn tin.
Vì vậy áp dụng thứ tự ưu tiên sau cho **mọi thay đổi**, không ngoại lệ:

**Ưu tiên 1: KHÔNG XÓA NHẦM > Ưu tiên 2: MƯỢT (không lag/không quét dồn dập) > Ưu tiên 3: bắt được
nhiều quảng cáo hơn.** Thà bỏ sót 1 banner còn hơn xóa nhầm nội dung thật, ô nhập liệu, hay khung chat.

## 1. Danh sách PHẢI luôn được bảo vệ, ở MỌI lớp quét (không chỉ 1 chỗ)

- Ô nhập liệu/soạn thảo: `input`, `textarea`, `select`, `[contenteditable]` và **mọi phần tử con** bên
  trong vùng contenteditable (xem `isEditableTarget` trong `element-zapper.js`, phần kiểm tra
  `isContentEditable` lan xuống con trong `heuristic-adblock.js`).
- Khung chat/hỗ trợ hợp lệ: Zalo, Messenger, Tawk, Crisp, Intercom, LiveChat, Zendesk, Freshchat,
  Jivo, Smartsupp, Chatra, Userlike, LiveAgent, Drift, Hubspot chat, Olark, Purechat, Tidio, và các
  nút "liên hệ/góp ý/phản hồi" tiếng Việt — xem `LEGIT_WIDGET_RE` + `isLegitWidget()` trong
  `heuristic-adblock.js`. Khi gặp 1 nhà cung cấp chat mới không nằm trong regex này, **thêm vào regex
  thay vì bỏ qua** — đừng để lọt qua "tưởng là hiếm gặp".
- `<video>` đang có nguồn phát thật (`currentSrc`/`src` khác rỗng) và mọi khung cha chứa nó
  (`containsRealVideo` trong `heuristic-adblock.js`, `isVideoAlreadyInUse` ở zapper).
- `document.body`, `documentElement`, `head`, và bất kỳ phần tử nào đang chứa UI của chính extension
  (`data-jd-own-ui`, nút 🎯, khung ngắm) — không bao giờ được là mục tiêu bị xóa/ẩn.
- Danh sách/feed động (≥3 phần tử anh em cùng loại thẻ): không dùng `:nth-of-type(N)` làm định danh
  bền và không xóa lại vô điều kiện nếu không có chữ ký nội dung khớp — xóa 1 phần tử làm các phần tử
  sau dồn lên, dễ gây xóa dây chuyền toàn bộ danh sách theo thời gian.

## 2. Cơ chế "tự chữa lành" — bắt buộc giữ khi sửa code liên quan đến zapper/selector đã lưu

Nếu 1 selector đã lưu trước đó (trong `localStorage`/IndexedDB) hóa ra khớp trúng ô nhập liệu, khung
chat, hoặc gây xóa dây chuyền, code phải **tự phát hiện và dọn selector đó khỏi bộ nhớ ngay lúc áp
dụng lại**, không chỉ chặn hành vi xóa lúc đó. Nếu không, hậu quả của 1 lỗi cũ (đã vá) vẫn lặp lại vĩnh
viễn ở mọi lần tải trang sau vì dữ liệu sai đã trót lưu từ trước. Xem `applyStored()` trong
`element-zapper.js` làm mẫu.

## 3. Hiệu năng — mọi observer/vòng lặp mới phải tuân thủ

- `MutationObserver` bắt buộc có debounce (setTimeout gộp, không gọi hàm quét nặng trực tiếp trong
  callback). 50–100ms là mức đã kiểm chứng đủ mượt mà không trễ thấy rõ.
- Không thêm `setInterval` chu kỳ ngắn (<500ms) chạy `querySelectorAll` toàn trang. Nếu cần polling,
  dùng khoảng ≥700ms và giới hạn phạm vi quét (selector cụ thể, không phải `*`).
- Việc không khẩn cấp (đồng bộ dữ liệu, quét bổ sung) ưu tiên `requestIdleCallback`; cập nhật vị trí
  UI theo chuột ưu tiên `requestAnimationFrame` thay vì ghi style trực tiếp trong mỗi sự kiện.
- Quét Shadow DOM chỉ đệ quy sâu khi thực sự tìm thấy `shadowRoot`, không chạy lại toàn bộ pipeline
  quét nặng một cách vô điều kiện.

## 4. Chế độ Aggressive (tắt mặc định)

Các luật rủi ro cao hơn (dò outlier theo cấu trúc, khớp tỉ lệ khung ảnh lỏng hơn...) chỉ được chạy khi
`aggressiveMode === true` (người dùng tự bật trong popup) **và** phải luôn kiểm tra qua whitelist
(`isLegitWidget`, `hasStrongAdSignal`) trước khi ẩn. Không hạ điều kiện an toàn này xuống chế độ mặc
định.

## 5. Zero-flash: đã nhận diện chắc chắn thì không hiện dù chỉ 1 khung hình

Nếu 1 khuôn mẫu quảng cáo (id/class/thuộc tính cố định) đã được xác nhận qua **≥2 bằng chứng thật độc
lập** (không phải đoán 1 lần), thêm thẳng vào khối CSS tĩnh tiêm ở `document_start` (đầu
`heuristic-adblock.js`) thay vì chỉ dựa vào JS quét động (`scanContainers`/`scanAnchors`/...). Lý do:
JS quét động chỉ chạy được SAU KHI phần tử đã tồn tại trong DOM + qua ít nhất 1 chu kỳ debounce
(~100ms) - đủ để khung quảng cáo "lóe" ra 1 chút trước khi bị ẩn, và có thể bị chặn hoàn toàn nếu 1
phần tử con lạ chưa biết trước (VD nút đóng dạng SVG không nhãn) khiến `collapseEmptyAncestors` không
nhận ra khung cha đã rỗng. CSS tĩnh áp dụng NGAY khi trình duyệt parse ra phần tử, không có độ trễ nào.
Không áp dụng cách này cho các luật suy đoán rủi ro cao (Aggressive Mode, structural outlier) - chỉ áp
dụng cho khuôn mẫu đã có bằng chứng cụ thể, lặp lại, ổn định.

**BẮT BUỘC mỗi khi thêm 1 khối `<style>` ẨN MỚI** (ở bất kỳ file nào): gọi
`window.__jdProtect.registerSheet(styleEl)` NGAY sau khi gắn vào DOM (cổng `protect-core.js`, xem mục 10).
Nếu quên, khối mới đó sẽ ẩn đè lên vùng đã miễn trừ. (Cơ chế cũ "khối `<style data-jd-protect-override>` phải đứng SAU khối ẩn"
đã BỎ từ 2026-09-24 - nó dùng `display:revert` gây lệch hình, không còn tồn tại.)

**Kiểm tra "đã miễn trừ chưa" LUÔN LUÔN phải theo PHẦN TỬ THẬT (`el.matches(protectedSel)`), KHÔNG BAO
GIỜ so sánh 2 chuỗi selector có giống hệt nhau không (`selA === selB`).** BẰNG CHỨNG THẬT: người dùng
miễn trừ đúng 1 phần tử (xác nhận qua console `document.querySelectorAll(sel).length >= 1`) nhưng vẫn bị
`applyStored()` trong `element-zapper.js` xoá mất - nguyên nhân: hàm đó so sánh `entry.sel === it.sel`
(chuỗi selector của mục ĐÃ XOÁ trước đó với chuỗi selector MIỄN TRỪ mới) - nếu 2 lần bấm (xoá rồi sau đó
miễn trừ đúng chỗ đó) sinh ra 2 chuỗi selector hơi khác nhau dù CÙNG TRỎ TỚI 1 phần tử, phép so sánh
chuỗi thất bại, vẫn xoá theo selector cũ. Đã sửa cả `applyStored()` lẫn `applyStoredOverlays()` sang
kiểm tra `el.matches(...)` trên từng phần tử thật sự khớp được bởi `document.querySelectorAll(entry.sel)`
- đây là cách ĐÚNG duy nhất, áp dụng cho MỌI chỗ cần hỏi "phần tử này có đang được miễn trừ không" trong
tương lai, không riêng 2 hàm trên.

## 6. Khi sửa 1 bug xóa/ẩn nhầm

Viết lại rõ trong comment: bằng chứng thực tế (site nào, hiện tượng gì), nguyên nhân gốc, và tại sao
cách sửa không lặp lại cùng lớp lỗi ở chỗ khác. Codebase này đã có nhiều ví dụ tốt theo phong cách này
(xem các đoạn "LỖI THẬT ĐÃ GẶP" trong `element-zapper.js`, `heuristic-adblock.js`, `content.js`) — tiếp
tục theo đúng phong cách đó, đừng chỉ sửa im lặng.

## 7. Giả tín hiệu "vẫn hiển thị đầy đủ" để né phát hiện (anti-adblock detection)

Ẩn quảng cáo không chỉ là ẩn về mặt hình ảnh — nhiều script chống-adblock tự đọc lại
`offsetWidth/offsetHeight/clientWidth/clientHeight` của khung SAU KHI ẩn để suy luận "đã bị chặn" rồi
hiện bảng ép tắt AdBlock. `hide()` trong `heuristic-adblock.js` đã tự định nghĩa lại các thuộc tính này
trả về giá trị hợp lý (khác 0) CHỈ RIÊNG trên đúng phần tử đó (`Object.defineProperty` trên instance,
không đụng prototype chung nên không ảnh hưởng phần tử khác) - đánh lừa kiểu kiểm tra này. **Bắt buộc
giữ nguyên cơ chế này cho mọi đường ẩn quảng cáo mới thêm sau này** đi qua `hide()`. Với các trường hợp
CHỈ ẩn bằng CSS tĩnh (mục 5) - nếu khuôn mẫu đó có nguy cơ bị chính site tự dò kích thước sau khi ẩn
(hay gặp ở các khung quảng cáo có gắn kèm script chống-chặn riêng, không chỉ hộp thoại ép tắt AdBlock
lộ liễu), nên đẩy nó qua `scanContainers`/`scanIframes` (JS) thay vì chỉ dựa vào CSS thuần, để được
thừa hưởng luôn lớp giả kích thước này.

Lưu ý thành thật: "ẩn tức thì không nháy 1 khung hình nào" (mục 5) chỉ áp dụng được cho khuôn mẫu ĐÃ CÓ
bằng chứng lặp lại từ trước (đưa thẳng vào CSS tĩnh document_start). Lần ĐẦU TIÊN gặp 1 quảng cáo hoàn
toàn mới (chưa từng thấy khuôn mẫu này) bắt buộc phải có JS đọc được phần tử rồi mới đoán được - có độ
trễ nhỏ không thể tránh khỏi (bị giới hạn bởi chu kỳ debounce ~100ms ở mục 3), không nên hứa hẹn "tức
thì tuyệt đối cho mọi trường hợp" vì không đúng sự thật kỹ thuật.

## 9. KHÔNG BAO GIỜ trễ đồng bộ khởi động của content script chạy trên mọi trang

ĐÃ THỬ VÀ GÂY SỰ CỐ THẬT (2026-09-18): đổi `heuristic-adblock.js`/`generic-video-adblock.js` từ
`(function(){...})()` sang `(async function(){ await chrome.storage.local.get(...); ...})()` để đọc cờ
"Tạm dừng" TRƯỚC khi làm bất cứ điều gì — tưởng chỉ trễ vài mili-giây không đáng kể. Hậu quả thật: nhiều
trang (dantri.com.vn và các trang con của nó) rơi vào vòng lặp tự tải lại liên tục, không vào được nữa.
Nghi vấn hợp lý nhất: độ trễ dù nhỏ cũng đủ để 1 script chống-adblock của site kịp chạy xong bước kiểm
tra "phòng thủ của đối phương đã có mặt chưa" TRƯỚC KHI CSS/JS chống-adblock của mình kịp dựng lên, khiến
site phản ứng cực đoan hơn hẳn (ép reload liên tục) so với khi thứ tự đúng (phòng thủ đã có sẵn trước
khi site kịp kiểm tra). ĐÃ REVERT về chạy đồng bộ hoàn toàn.

**QUY TẮC BẮT BUỘC**: mọi file chạy ở `document_start` trên diện rộng (`matches: ["*://*/*"]`) — đặc
biệt `heuristic-adblock.js`, `generic-video-adblock.js`, `popup-blocker.js`, `anti-adblock-detect.js` —
PHẢI giữ nguyên là hàm ĐỒNG BỘ (`function(){}`, không phải `async function(){}`) ở cấp NGOÀI CÙNG, và
KHÔNG được có bất kỳ `await` nào đứng TRƯỚC phần tiêm CSS chống chớp nháy hoặc bất kỳ hành vi chống-
adblock nào.

**CÁCH ĐÚNG đã áp dụng cho Pause (thiết kế thứ 2, theo đúng nguyên lý của chính Zapper)**: không "đặt
cờ vào storage rồi tải lại trang, hy vọng content script lần sau đọc đúng cờ" (vừa có độ trễ, vừa từng
liên quan tới sự cố ở trên) - popup GỬI MESSAGE TRỰC TIẾP (`{action:'jdSetPaused', paused}`) cho content
script của tab ĐANG MỞ, content script nhận được thì THAO TÁC TRỰC TIẾP lên DOM hiện có NGAY LẬP TỨC
(gỡ hẳn thẻ `<style>` đã tiêm để CSS ngưng áp dụng tức thì + gỡ inline style trên các phần tử đã bị
`hide()` JS ẩn trước đó + `observer.disconnect()`) - giống hệt cách nút miễn trừ (Alt+Ctrl+chuột phải)
đã làm, không cần tải lại trang, không có độ trễ round-trip storage nào ảnh hưởng tới trải nghiệm. Phần
khởi động đồng bộ quan trọng (CSS chống chớp nháy, bait chống-adblock) không hề bị đụng tới bởi cơ chế
Pause - vẫn chạy y hệt bản gốc. Chỉ ĐÚNG 1 chỗ còn cần đọc storage bất đồng bộ: xác định cờ Pause ban
đầu lúc trang MỚI tải (không có cách nào khác vì `chrome.storage` không có API đồng bộ) - đặt SAU khi
CSS/bait đã tiêm xong đồng bộ, không trễ chúng.

**LỖI THẬT VỪA GẶP RIÊNG Ở BƯỚC NÀY (đã sửa): dùng `.disabled` để bật/tắt `<style>`, TUYỆT ĐỐI không
`remove()` rồi `appendChild()` lại.** Bản đầu tiên của `releaseEverything()`/`resumeEverything()` dùng
`styleInject.remove()` để tạm dừng rồi `appendChild(styleInject)` lại để bật lại - nhưng `appendChild`
luôn gắn vào CUỐI `<head>`, tức là SAU khối CSS miễn trừ (`protectStyle`, vốn có mặt từ lúc tải trang và
không bao giờ bị gỡ). Hậu quả: sau khi Bật lại, `styleInject` giờ đứng SAU `protectStyle` trong tài liệu
- theo đúng luật CSS (cùng `!important`, cùng độ đặc thù, luật đứng SAU luôn thắng) - NÓ THẮNG NGƯỢC
LẠI, ẩn đè cả những khung đã miễn trừ, ngược hoàn toàn ý muốn (bằng chứng thật: người dùng miễn trừ
`#vnx_modal_root` xong, Bật lại là nó bị ẩn lại ngay). SỬA: mọi lần cần "tắt rồi bật lại" 1 khối
`<style>` mà có tồn tại 1 khối `<style>` KHÁC cần giữ đúng thứ tự tương đối với nó — LUÔN dùng thuộc
tính `.disabled = true/false` có sẵn của thẻ `<style>` (bật/tắt tức thì, không có gì để "chờ", giống
hệt remove/append về hiệu ứng) thay vì tháo/gắn lại node - `.disabled` không bao giờ đổi VỊ TRÍ của thẻ
trong tài liệu, nên thứ tự nguồn với các `<style>` khác luôn được giữ nguyên bất kể bật/tắt bao nhiêu
lần.

**LỖ HỔNG THẬT VỪA PHÁT HIỆN (2026-09-18) - CSS TĨNH khai báo qua `manifest.json` KHÔNG THỂ tắt bằng
`.disabled`**: bằng chứng thật (bramasacscadi.com, xác nhận qua console): 2 thẻ `<a rel="nofollow
sponsored">` vẫn `display:none` NGAY CẢ LÚC ĐANG PAUSE, dù không dính `HIDDEN_MARK`, không inline
style, không khớp bất kỳ selector JS nào của `heuristic-adblock.js`. Nguyên nhân: `generic-adblock.css`
từng được khai báo riêng trong `manifest.json` (`content_scripts` → `"css": [...]`) - loại CSS này do
TRÌNH DUYỆT tự nạp thẳng, không tạo ra bởi dòng JS nào của mình nên KHÔNG CÓ THAM CHIẾU `<style>` nào để
gọi `.disabled` lên nó - Pause (chỉ biết bật/tắt các thẻ `<style>` tự tạo + ruleset DNR) hoàn toàn không
đụng được vào. ĐÃ SỬA: gộp toàn bộ nội dung file đó vào 1 thẻ `<style data-jd-generic-injected>` tự tạo
bằng JS ngay trong `heuristic-adblock.js` (cùng thời điểm document_start, giữ nguyên "zero-flash"), có
`.disabled` điều khiển được y hệt `styleInject`, và gỡ hẳn dòng khai báo `"css": ["generic-adblock.css"]`
khỏi `manifest.json` để tránh áp dụng trùng lặp 2 lần (1 lần không tắt được). **QUY TẮC RÚT RA**: BẤT KỲ
CSS nào khai qua `"css"` trong `content_scripts` của `manifest.json` đều nằm NGOÀI TẦM VỚI của Pause -
nếu sau này cần thêm CSS ẩn quảng cáo tĩnh mới, PHẢI thêm vào đúng khối `<style>` tự tạo bằng JS (trong
`heuristic-adblock.js`, đã có `.disabled` sẵn), TUYỆT ĐỐI không thêm file `.css` mới vào `manifest.json`
nữa - nếu không, lịch sử sẽ lặp lại đúng lỗ hổng này ở 1 file CSS khác.

## 8b. Cảnh báo file tải về — chỉ cảnh báo SCRIPT/THỰC THI bất thường, không cảnh báo trình cài đặt thường gặp

Theo yêu cầu người dùng: KHÔNG đưa `.exe`/`.apk` trở lại danh sách `dangerousDownloadExtensions`
(`phishing-list.json`) dù có vẻ hợp lý về mặt bảo mật thuần tuý - đây là định dạng cài đặt chương
trình phổ biến, hợp lệ trên rất nhiều trang, và người dùng còn phải tự thao tác thêm (double-click,
cấp quyền cài đặt) mới chạy được. Cảnh báo mỗi lần tải loại này gây phiền, khiến người dùng dần bỏ qua
luôn cả cảnh báo thật. Danh sách cảnh báo chỉ nên gồm dạng SCRIPT/THỰC THI mà 1 trang web thông thường
hầu như không có lý do hợp lệ nào để bắt tải về (`.vbs/.ps1/.hta/.js/.bat`...). Domain nguồn tải khớp
`malwareDomains` đã biết thì luôn huỷ thẳng bất kể đuôi file gì, không phụ thuộc quy tắc này.

## 8. Hiệu năng dài hạn — không rò rỉ bộ nhớ, không tích tụ theo thời gian

Ngoài quy tắc debounce/interval ở mục 3: khi thêm bất kỳ `Map`/`Set` nào để theo dõi trạng thái theo
từng phần tử (VD `mutedByUs`, `adModeStartTime` trong `generic-video-adblock.js`, `disabledIframes`
trong `element-zapper.js`), đảm bảo có dọn dẹp entry khi phần tử tương ứng biến mất khỏi DOM (video đổi
nguồn, phần tử bị gỡ...) hoặc ưu tiên dùng `WeakMap`/`WeakSet` (tự giải phóng khi phần tử không còn
tham chiếu nào khác, không cần dọn tay). Không để các cấu trúc này phình to vô hạn trong 1 phiên duyệt
web dài (đọc báo/xem phim liên tục nhiều giờ trên nhiều trang/tab) — dù mỗi lần quét riêng lẻ vẫn
nhanh, RAM tích tụ dần qua nhiều giờ mới là nguyên nhân thật khiến máy ì/nóng máy về lâu dài, không
phải do 1 lần quét nặng nào cả.

**Không đọc lại `localStorage`/`chrome.storage` bên trong 1 hàm được gọi LẶP LẠI nhiều lần trong cùng 1
đợt quét.** BẰNG CHỨNG THẬT: `isProtectedElement()` (kiểm tra danh sách miễn trừ) từng gọi
`localStorage.getItem` + `JSON.parse` lại TỪ ĐẦU mỗi lần `hide()` chạy - mà `hide()` có thể được gọi
hàng chục/hàng trăm lần trong 1 đợt quét (mỗi quảng cáo tìm thấy gọi 1 lần) trên 1 trang nhiều quảng
cáo như dantri.com.vn - người dùng báo trực tiếp là trang load chậm hẳn. Sửa bằng cách cache lại kết quả
đọc, chỉ đọc/parse lại tối đa 1 lần mỗi ~300ms (`getProtectedListCached()` trong `heuristic-adblock.js`)
- danh sách miễn trừ gần như không đổi giữa 2 lần quét liên tiếp nên cache ngắn hạn này an toàn, không
làm mất khả năng nhận thay đổi mới. Áp dụng nguyên tắc này cho MỌI dữ liệu đọc từ storage bên trong 1
hàm quét/kiểm tra chạy lặp lại - không riêng trường hợp này.

## 10. Tầng MIỄN TRỪ (Alt+Ctrl+chuột phải) — "đục 1 lỗ xuyên sách", không bao giờ ép CSS lên site

**CỔNG CHUNG `protect-core.js`** (theo đề xuất người dùng: 1 cổng cho mọi file, không vá từng nơi): chạy
ĐẦU TIÊN ở document_start (entry đầu tiên trong `content_scripts`, mọi frame), cung cấp
`window.__jdProtect` { `isProtected(el)`, `registerSheet(styleEl)`, `getMatchers()`, `changed()`,
`onChange(fn)` }. MỌI lớp chặn mới: khối CSS → `registerSheet`; ẩn/xoá bằng JS → hỏi `isProtected` trước.
KHÔNG tự viết bộ khớp miễn trừ riêng trong từng file nữa (trước đây có 2 bản sao lệch nhau).

Thứ tự ưu tiên theo yêu cầu người dùng: **Pause > Miễn trừ > Kill (ống ngắm) > Auto**. Vùng miễn trừ =
khung được bấm + MỌI con cháu + các khung cha trực tiếp (chỉ bản thân khung cha, `isAncestor`). Áp dụng
chung cho mọi website, không có nhánh riêng theo site.

- **KHÔNG BAO GIỜ** "miễn trừ" bằng cách ép giá trị CSS (`display:revert`, `visibility:visible`,
  `height:revert`...) hoặc gỡ inline style của site. BẰNG CHỨNG THẬT: `revert` xoá luôn `display:flex/grid`
  của site → khung lệch sang 1 bên ngay lúc bấm; gỡ inline `display:none` của site → dropdown đang đóng bị
  ép mở. Cách đúng: làm cho CHÍNH luật ẩn của extension không chạm tới vùng đó:
  - CSS: `patchProtectSheet`/`buildProtectedCss` trong `element-zapper.js` viết lại mọi khối `<style>` ẩn
    của extension thành `@scope (:root) to (<khung đã bấm>) { :not(<mọi phần tử miễn trừ>) { .x& {...} } }`
    (CSS lồng nhau, mỗi selector chỉ thêm 1 ký tự `&`). Đã kiểm chứng trên Chrome thật: khung + con cháu +
    khung cha đều thoát khỏi luật ẩn Ở MỌI THỜI ĐIỂM. BẰNG CHỨNG THẬT (dantri): bản đầu chỉ gắn `:not()`
    cho luật đang khớp lúc quét → luật `#bannerMasthead:has(.dta-unit){visibility:hidden}` khớp MUỘN (DTads
    chèn .dta-unit sau cả sự kiện load) → khung cha bị ẩn, `visibility` thừa kế xuống banner → khoảng trắng.
    KHÔNG BAO GIỜ quay lại cách "chỉ vá luật đang khớp lúc quét".
  - JS: mọi đường ẩn/xoá (`hide()` heuristic, `applyStored()` Kill, gỡ pointer-events...) phải hỏi
    `isProtectedElement`/`isInProtectRegion` (chính nó, con cháu, hoặc đang CHỨA phần tử miễn trừ).
  - Chỉ được gỡ đúng dấu extension đã đặt (`data-jd-heuristic-hidden`, `data-jd-overlay-neutralized`) +
    xoá lớp giả kích thước của `hide()` để site đo lại kích thước thật.
- Đổi `textContent` của `<style>` tạo sheet mới → **cờ `.disabled` (Pause) bị reset** (đã kiểm chứng thật).
  Luôn lưu lại và gán lại `.disabled` sau khi đổi nội dung.
- Bấm vào phần tử lá (ảnh/link/icon) nằm trong 1 CỤM banner nhỏ → tự nâng lên cả cụm (`promoteToBlock`).
  BẰNG CHỨNG THẬT (sexvn6x.com): bấm 1 ảnh trong lưới 6 banner chỉ miễn trừ `a:nth-of-type(1)`, 5 banner kia
  + banner xoay vòng lần sau vẫn bị ẩn. Dừng ngay ở khối lớn/có chữ/có ô nhập liệu.
- File chạy ở MAIN world (popup-blocker.js) không gọi được cổng → phải tự áp CÙNG quy tắc vùng (nằm trong
  HOẶC đang chứa phần tử miễn trừ), đọc cùng `jdProtectedSelectors:<host>`.
- Selector của khung được bấm phải khớp ĐÚNG 1 phần tử trên trang lúc bấm (1 cú bấm = 1 lỗ, không lan
  3-4 chỗ). Khung cha chỉ 1 selector duy nhất/cấp (id ổn định hoặc đường dẫn đầy đủ), không class chung.
- Khung do SCRIPT của tên miền quảng cáo DỰNG LÊN (BẰNG CHỨNG THẬT heovl.im: `#bottomBannerContainer` do
  `ads.adspro.name/bottom-banner-ads.js` tạo; script bị chặn → sau F5 khung KHÔNG TỒN TẠI, không phải do
  Auto ẩn) → mở tên miền của tài nguyên trong khung (`hostsOfUrls`), chỉ với initiator là site đó. Dự
  phòng Google theo tên id/class CHỈ khi khung không có tài nguyên nào để suy ra tên miền.
- Tầng mạng: KHÔNG allow cả hostname (bản cũ tắt chặn mạng cả site chỉ vì 1 mục miễn trừ). Allow đúng
  URL tài nguyên trong khung + `allowAllRequests` cho đúng iframe trong khung (`jdProtectNetSet` → luật
  dynamic dải 985000+); heuristic chạy trong iframe đó tự nhả qua `jdProtectFrames`. Khung quảng cáo tự vẽ
  bằng script (GPT/AdSense/Taboola/Outbrain) → mở đúng các tên miền của hệ đó, CHỈ với initiator là site đã
  miễn trừ (`AD_NET_PROFILES` + dự phòng theo tên id/class `AD_SLOT_NAME_RE`). BẰNG CHỨNG THẬT (dantri,
  extension thật trên Chrome headless): không mở GPT thì DTads treo, khung rỗng; mở rồi thì banner hiện và
  0/14 quảng cáo khác trên trang hiện lại (vẫn bị tầng Auto/CSS ẩn).
- Thanh cuộn ngang ~8px trên dantri khi banner dùng mẫu dự phòng là DO CHÍNH DTads (inline `width:1920px`
  theo `innerWidth` gồm cả thanh cuộn dọc) - đo thật: trạng thái Pause cũng y hệt. Không ép CSS để "sửa" site.
- Miễn trừ KHÔNG được dạy bộ học mẫu quảng cáo (`updatePatternsFromSignature` chỉ cho mode xoá).
- Không polling/observer cho miễn trừ: làm mới đúng lúc danh sách đổi, 1 lần lúc DOMContentLoaded, 1 lần
  lúc load, rồi dừng.
