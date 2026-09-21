# 🛡️ REMOVEADBLOCK PRO

**🌐 [English version](README.en.md)** · Extension chặn quảng cáo tàng hình đa lớp — không chỉ YouTube, mà mọi trang web

![Version](https://img.shields.io/badge/Version-14.9.36-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave-red?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-orange?style=for-the-badge)

> Không dựa vào 1 danh sách domain tĩnh duy nhất — kết hợp chặn tầng mạng (EasyList + danh sách tự xây), ẩn theo cấu trúc/tên gọi đã biết, và 1 công cụ thủ công "Ống Ngắm" (Zapper) để bạn tự xử lý bất kỳ quảng cáo nào lọt lưới, đồng thời **tự học** để không phải xử lý lại lần sau.

---

## ✨ TÍNH NĂNG CỐT LÕI

- **Chặn quảng cáo video mọi nơi** — không chỉ YouTube (Proxy dữ liệu JSON nội bộ + can thiệp Main World), mà cả các player bên thứ 3 phổ biến (JW Player, Video.js, Google IMA SDK...) trên bất kỳ trang xem phim/video nào. Tự động khôi phục playback khi bị đứng hình/bóp băng thông nền.
- **Chặn quảng cáo banner/native/popup** — 3 lớp cộng hưởng: chặn domain ở tầng mạng (EasyList + rules tự xây, hàng nghìn domain), ẩn theo tên class/id đã biết (CSS tiêm ngay lúc `document_start`, không lóe hình), và heuristic tự suy luận theo cấu trúc trang cho các trường hợp chưa từng gặp.
- **Chặn popup/popunder & click-hijack — kể cả khi domain đích đổi liên tục.** 3 lớp cộng hưởng:
  1. *Click-token*: chỉ cho phép 1 cửa sổ mới/1 cú bấm thật, nhận diện link/video bị lồng ghép theo cấu trúc hình học (không cần biết trước domain đích).
  2. *Lớp phủ trong suốt*: chỉ vô hiệu hoá khi có bằng chứng rõ ràng (link ngoài domain nằm đúng tâm khung, không phải "có link lạ ở đâu đó trong khung" — tránh ẩn nhầm khung to bọc cả trang).
  3. *Chặn ở tầng tab (background.js)*: quan sát SAU KHI 1 chuỗi chuyển hướng HTTP nhiều bước đã chạy xong — bắt được cả kiểu popunder cố tình đổi domain đích liên tục để né mọi kiểm tra href tĩnh.
- **Phát hiện web giả mạo & lừa đảo tài chính** — thuật toán tự học (fuzzy-matching + phát hiện homograph/punycode) bắt được cả domain giả mạo thương hiệu ngân hàng/ví điện tử/mạng xã hội **chưa từng có trong bất kỳ danh sách nào**, cộng thêm phát hiện trang lừa đảo theo NỘI DUNG (form xin OTP/mật khẩu + ngôn từ lừa đảo) dù không giả danh thương hiệu nào.
- **Cảnh báo tải file độc hại** — chặn tự động khi khớp danh sách site phát tán malware đã biết; cảnh báo (không tự chặn) đúng file dạng script/thực thi bất thường (`.vbs/.ps1/.hta/.js/.bat`...) — **không** cảnh báo `.exe`/`.apk` (định dạng cài đặt phổ biến, hợp lệ, cảnh báo liên tục sẽ khiến người dùng bỏ qua cả cảnh báo thật).
- **Ống Ngắm (Element Zapper)** — công cụ thủ công 3 chế độ để bạn tự "dọn" bất kỳ quảng cáo nào lọt qua các lớp tự động, nay có thêm **bảng "Chọn lớp thông minh"** khi chuột phải (xem hướng dẫn chi tiết bên dưới).
- **Tạm dừng tức thì (Pause)** — tắt/bật TOÀN BỘ việc chặn quảng cáo trên tab hiện tại ngay lập tức, không cần tải lại trang.
- **Loại trừ hẳn 1 trang** — chuột phải trên trang bất kỳ → tắt hẳn mọi content script chặn quảng cáo cho đúng domain đó, dùng khi gặp 1 site bị ảnh hưởng mà chưa kịp có bản vá, không cần chờ cập nhật.
- **Chế độ "Tự nhận diện mạnh" (Aggressive, tắt mặc định)** — chấp nhận thêm vài tín hiệu rủi ro cao hơn (banner co giãn responsive, phần tử lạc loài khỏi khuôn mẫu trang) để bắt thêm quảng cáo, luôn đi kèm kiểm tra whitelist trước khi ẩn.
- **Tự học liên tục** — mọi hành động thủ công của bạn (Zapper) đều góp phần huấn luyện hệ thống nhận diện tốt hơn cho lần sau, trên chính site đó lẫn các site khác dùng chung khuôn mẫu. Mẫu chỉ được tự động áp dụng sau khi xác nhận độc lập trên ≥2-3 site khác nhau — tránh học nhầm từ 1 lần trùng hợp.
- **Ngụy trang vân tay trình duyệt nâng cao** — giả mạo AudioContext/WebGL/Canvas/thông tin phần cứng, kèm che giấu cả `.toString()`/`.name`/`.length` của mọi hàm bị patch để qua mặt cả script kiểm tra bị can thiệp. Mọi phần tử bị ẩn còn tự trả lời `offsetWidth/offsetHeight` bằng giá trị hợp lý khác 0 — đánh lừa cả script chống-adblock tự đọc lại kích thước sau khi ẩn để suy luận "đã bị chặn".
- **Kiểm tra bản cập nhật tự động** — tự kiểm tra phiên bản mới, hiện huy hiệu nhắc trên nút "Cập nhật" trong popup, không cần tự vào GitHub kiểm tra tay.
- **Đếm số quảng cáo đã chặn theo từng tab** — hiện ngay trên icon extension.

---

## 🖱️ HƯỚNG DẪN SỬ DỤNG "ỐNG NGẮM" (ELEMENT ZAPPER)

Khi 3 lớp tự động (chặn mạng + cosmetic + heuristic) vẫn để lọt 1 quảng cáo, dùng Ống Ngắm để tự xử lý ngay tại chỗ.

### Kích hoạt
- Bấm nút tròn 🎯 ở góc màn hình (có thể kéo-thả đổi vị trí, vị trí được nhớ chung cho mọi trang), **hoặc**
- Nhấn tổ hợp phím **`Alt + Shift + X`**

Khi đang ngắm, con trỏ chuyển thành dấu cộng và phần tử dưới chuột được viền đỏ nét đứt để xem trước.

### 🔴 Chuột TRÁI — Tiêu diệt (Destroy)
Dùng khi **chính phần tử đó** là quảng cáo cần loại bỏ hẳn (banner, khung quảng cáo, nút giả...).

- Di chuột tới đúng phần tử → **bấm chuột trái**
- Phần tử bị xoá hẳn khỏi trang, ghi nhớ lại theo đúng site đó — lần sau quay lại, phần tử này tự động biến mất ngay từ đầu, không cần ngắm lại.
- Có kiểm tra an toàn tuyệt đối: không bao giờ xoá được `<body>`, ô nhập liệu/khung soạn thảo (chat, form...), video thật đang phát, hay chính UI của extension.

### 🔵 Chuột PHẢI — Bảng "Chọn lớp thông minh" *(mới)*
Dùng khi 1 nút/video **thật** bị 1 hay nhiều lớp khác đè lên trên, hoặc muốn tự tay chọn đúng lớp nào cần xoá thay vì để hệ thống tự đoán.

- Di chuột tới đúng vị trí → **bấm chuột phải** → 1 bảng nổi hiện ra ngay tại đó, tự lật vị trí (trái/phải, trên/dưới) để không bao giờ bị cắt mất ngoài màn hình.
- Bảng liệt kê **toàn bộ** các lớp đang xếp chồng đúng tại điểm bấm, mỗi dòng có:
  - 1 ô tick để chọn lớp cần xoá.
  - Tên đã diễn giải dễ hiểu (VD: *"Lớp phủ nghi vấn quảng cáo/chặn click"*, *"Khung nhúng (iframe) từ nơi khác"*, *"Lớp cố định trên màn hình"*...).
  - Rê chuột vào dòng đó để xem đoạn mã HTML thật của lớp đó ở khung bên dưới, giúp bạn chắc chắn trước khi quyết định.
- **Nội dung thật luôn được khoá, làm mờ, không tick được**: ô nhập liệu, video đang phát thật, hoặc 1 khung đang bao quanh cả các lớp khác (xoá cả khung sẽ kéo theo mọi thứ bên trong).
- **Xem trước theo thời gian thực**: tick vào lớp nào, lớp đó biến mất NGAY LẬP TỨC để bạn thấy đúng kết quả; bỏ tick thì hiện lại ngay — không có gì bị mất cho tới khi bạn tự bấm.
- Bấm **"✅ Đồng ý"** để lưu lại vĩnh viễn các lớp đã tick (lần sau quay lại site đó tự động ẩn luôn). Bấm **"Huỷ"**, phím `Esc`, hoặc bấm ra ngoài bảng để huỷ bỏ toàn bộ thay đổi chưa xác nhận, không mất gì cả.

### 🟢 Alt + Ctrl + Chuột PHẢI — Miễn trừ vĩnh viễn (Protect)
Dùng khi 1 luật tự động (heuristic) lỡ đoán nhầm 1 khung nội dung thật là quảng cáo.

- Di chuột tới đúng khung → giữ **Alt + Ctrl** → **bấm chuột phải**
- Khung đó được ghi vào danh sách miễn trừ theo site — từ nay **không bao giờ** bị bất kỳ lớp tự động nào (heuristic lẫn chính Zapper) tự xoá/ẩn nữa, kể cả khi khớp đúng 1 luật quảng cáo nào đó.
- Nếu khung đang bị ẩn ngay lúc đó (do JS tự ẩn), nó hiện lại ngay lập tức. *Giới hạn thật:* nếu khung bị ẩn bởi 1 luật CSS tĩnh cố định (không phải JS), cần tải lại trang để thấy hiệu lực miễn trừ.
- Nằm trong dữ liệu Xuất/Nhập như các danh sách khác — không mất khi cài lại máy.

---

### Các phím khác
| Phím | Chức năng |
|---|---|
| `Esc` | Huỷ ngắm giữa chừng (hoặc chỉ đóng bảng chọn lớp nếu đang mở, không thoát hẳn chế độ ngắm) |
| Kéo nút 🎯 | Di chuyển vị trí nút (nhớ chung mọi trang) |
| `Alt` + Chuột phải | Học mẫu quảng cáo video (khung video quảng cáo hiện tại) — xác nhận xong, video quảng cáo cùng khuôn mẫu ở **bất kỳ trang nào khác** cũng tự bị mute/tua/ép nhảy |
| `Alt + Shift` + Chuột phải | Quên mẫu quảng cáo video vừa học |
| `Alt + Ctrl` + Chuột phải | 🟢 Miễn trừ vĩnh viễn — xem mục trên |

### Xem lại / Khôi phục
Mở popup extension → xem danh sách phần tử đã tiêu diệt/dọn/miễn trừ theo từng site, theo từng ngày, có nút **"Khôi phục"** để hoàn tác bất kỳ lúc nào (từng site, hoặc toàn bộ).

---

## ⏸️ TẠM DỪNG TỨC THÌ (PAUSE)

Nút **"Tạm dừng"** trong popup tắt TOÀN BỘ việc chặn quảng cáo (mạng + ẩn) trên tab hiện tại **ngay lập tức, không cần tải lại trang** — hữu ích khi 1 trang bị chặn nhầm quá tay và bạn cần xem ngay nguyên bản trang đó. Bấm lại để bật lại, cũng tức thì. Riêng phần chặn quảng cáo YouTube (JSON proxy) vẫn hoạt động bình thường khi Pause — chỉ ảnh hưởng tới các lớp chặn quảng cáo chung (mạng/ẩn/heuristic) trên trang hiện tại.

## 🚫 LOẠI TRỪ HẲN 1 TRANG (EXCLUDE SITE)

Chuột phải trên bất kỳ trang nào → chọn **"Loại trừ trang này khỏi REMOVEADBLOCK PRO"**. Toàn bộ content script chặn quảng cáo (trừ 2 script riêng cho YouTube) sẽ tắt hẳn cho đúng domain gốc đó, áp dụng ngay không cần tải lại trang. Dùng khi 1 site bị ảnh hưởng bởi 1 luật heuristic mà chưa kịp có bản vá cụ thể — bấm lại đúng mục đó (giờ đổi tên thành "Bật lại...") để bật lại bất cứ lúc nào. Xem/quản lý toàn bộ danh sách đã loại trừ ở tab **"🚫 Đã loại trừ"** trong popup.

## 🧪 CHẾ ĐỘ "TỰ NHẬN DIỆN MẠNH" (AGGRESSIVE, tắt mặc định)

Công tắc trong popup — bật lên để hệ thống chấp nhận thêm vài tín hiệu nhận diện rủi ro cao hơn (banner co giãn responsive, phần tử lạc loài khỏi khuôn mẫu trang) nhằm bắt thêm được nhiều trường hợp hơn, đổi lại khả năng ẩn nhầm nội dung thật tăng nhẹ — luôn có kiểm tra whitelist trước khi ẩn bất cứ gì. Mặc định TẮT để ưu tiên an toàn. Cần tải lại (F5) các tab đang mở để áp dụng.

## 📤 XUẤT / NHẬP DỮ LIỆU

- **Xuất dữ liệu**: lưu toàn bộ "trí nhớ" của Ống Ngắm ra 1 file JSON duy nhất — gồm cả 3 danh sách (đã xoá/đã dọn lớp/đã miễn trừ) trên MỌI site đã từng ngắm, các mẫu đã tự học (Skip/quảng cáo video), **và danh sách các trang đã loại trừ hẳn**. Tên miền/URL được làm rối trước khi xuất (không phải mã hoá thật, chỉ để người chỉ mở file bằng mắt không đọc được ngay bạn từng ghé site nào).
- **Nhập dữ liệu**: nạp lại file đó (của chính bạn sau khi cài lại máy, hoặc do người khác chia sẻ) — dữ liệu **tự động hợp nhất, không ghi đè** những gì đã có sẵn trên máy.
- Dùng 1 file xuất DUY NHẤT cho mọi mục (không có tuỳ chọn "chỉ xuất riêng 1 loại") — vì toàn bộ dữ liệu đã cùng chung 1 vòng đời (backup cá nhân khi đổi máy) và cùng chung 1 chính sách riêng tư (domain luôn được làm rối), tách nhỏ ra chỉ làm phức tạp thêm mà không có lợi ích thực tế nào.

---

## 🧠 KIẾN TRÚC THUẬT TOÁN ĐA TẦNG

```
Core Engine = (Chặn tầng mạng + Nhận diện cấu trúc) × Tự học × Chống bị phát hiện
```

| Lớp | Cơ chế | Mô tả |
|---|---|---|
| 1 | **YouTube JSON Proxy** | Tiêm script vào Main World, can thiệp trực tiếp `playerResponse`/`ytplayer.config` — gỡ đánh dấu quảng cáo trước khi trình phát kịp đọc |
| 2 | **Chặn tầng mạng (EasyList)** | Tự động tải & làm mới danh sách domain quảng cáo cộng đồng (cùng nguồn AdGuard/uBlock dùng), chuyển thành rule `declarativeNetRequest` |
| 3 | **Ẩn Cosmetic** | Danh sách tên class/id quảng cáo phổ biến, ẩn tức thì bằng CSS tự tiêm (`<style>` do JS tạo, không phải khai qua manifest) ngay lúc trang bắt đầu tải — điều khiển bật/tắt được bởi Pause |
| 4 | **Heuristic cấu trúc** | Tự suy luận theo tên gọi/nhãn tự khai/kích thước chuẩn IAB/vị trí hình học — bắt được cả site chưa từng gặp, không cần domain cụ thể |
| 5 | **Element Zapper + Tự học** | Công cụ thủ công 3 chế độ (destroy/chọn lớp/miễn trừ), mọi thao tác đều huấn luyện lại hệ thống — xác nhận trên ≥2-3 site độc lập mới được tự áp dụng, tránh học nhầm |
| 6 | **Fuzzy Brand-Guard** | So khớp mờ (Levenshtein) + phát hiện homograph/punycode — bắt domain giả mạo thương hiệu hoàn toàn mới |
| 7 | **Popunder & Click-Hijack Guard** | "Click-token" (chỉ 1 cửa sổ mới/1 cú bấm thật) + phát hiện lớp phủ trong suốt theo bằng chứng ở tầng trang, CỘNG THÊM lớp chặn ở tầng tab (background.js) bắt được cả chuỗi chuyển hướng HTTP nhiều bước đổi domain đích liên tục |
| 8 | **Anti-Detection Cloaking** | Giả mạo AudioContext/WebGL/Canvas + che `.toString()`/`.name`/`.length` của mọi hàm bị patch, cộng thêm giả mạo `offsetWidth/offsetHeight` của phần tử đã ẩn — qua mặt cả script kiểm tra bị can thiệp lẫn script tự đọc lại kích thước để dò AdBlock |

---

## 📥 CÀI ĐẶT

1. Tải mã nguồn extension về máy (folder hoặc file zip, giải nén)
2. Mở trình duyệt (**Chrome / Edge / Brave**)
3. Truy cập `chrome://extensions/` (hoặc `edge://extensions/`)
4. Bật **Developer Mode** (Chế độ nhà phát triển) ở góc trên phải
5. Bấm **"Load unpacked"** (Tải tiện ích đã giải nén) → chọn đúng thư mục chứa extension
6. Xong — extension hoạt động ngay, không cần khởi động lại trình duyệt

> Sau mỗi lần cập nhật mã nguồn, cần bấm nút reload (⟳) trên thẻ extension ở `chrome://extensions` để áp dụng bản mới — chỉ F5 trang KHÔNG đủ.

---

## ⚙️ KIẾN TRÚC KỸ THUẬT

- **Ngôn ngữ**: JavaScript thuần (content scripts) + Manifest V3 (service worker)
- **Công nghệ chính**: `declarativeNetRequest`, Main World script injection (tách riêng script MAIN world và isolated-world qua cầu nối `CustomEvent` khi cần vừa `chrome.*` vừa thứ tự chạy đúng trước script của trang), `MutationObserver` có debounce, IndexedDB (kho học trung tâm dùng chung cho Xuất/Nhập), Proxy/`Object.defineProperty` (giả mạo API trình duyệt)
- **Nguyên tắc thiết kế**: an toàn trên hết — không hành động tự động nào được thực thi nếu chỉ dựa vào 1 tín hiệu yếu/đơn lẻ; mọi thay đổi trên trang đều có thể khôi phục qua popup; mọi observer/vòng lặp đều có debounce hoặc giới hạn phạm vi quét để không giật/lag ngay cả trên trang nặng quảng cáo

---

## 🔧 LIÊN HỆ & HỖ TRỢ

- **Tác giả:** Thái Thông
- **Email:** [ThaiThongsj@gmail.com](mailto:ThaiThongsj@gmail.com)

### 💰 Ủng hộ dự án

**Tài khoản Vietcombank**
`9898661918` — **NGUYỄN NGỌC THÁI THÔNG**

---

**Cảm ơn bạn đã sử dụng REMOVEADBLOCK PRO!**
Duyệt web thoải mái, sạch quảng cáo, an toàn hơn. ✨
