# 🛡️ REMOVEADBLOCK PRO

**Extension chặn quảng cáo tàng hình đa lớp — không chỉ YouTube, mà mọi trang web**

![Version](https://img.shields.io/badge/Version-14.9.23-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave-red?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-orange?style=for-the-badge)

> Không dựa vào 1 danh sách domain tĩnh duy nhất — kết hợp chặn tầng mạng (EasyList + danh sách tự xây), ẩn theo cấu trúc/tên gọi đã biết, và 1 công cụ thủ công "Ống Ngắm" (Zapper) để bạn tự xử lý bất kỳ quảng cáo nào lọt lưới, đồng thời **tự học** để không phải xử lý lại lần sau.

---

## ✨ TÍNH NĂNG CỐT LÕI

- **Chặn quảng cáo video mọi nơi** — không chỉ YouTube (Proxy dữ liệu JSON nội bộ + can thiệp Main World), mà cả các player bên thứ 3 phổ biến (JW Player, Video.js, Google IMA SDK...) trên bất kỳ trang xem phim/video nào.
- **Chặn quảng cáo banner/native/popup** — 3 lớp cộng hưởng: chặn domain ở tầng mạng (EasyList + rules tự xây, hàng nghìn domain), ẩn theo tên class/id đã biết (EasyList cosmetic), và heuristic tự suy luận theo cấu trúc trang cho các trường hợp chưa từng gặp.
- **Chặn popup/popunder & click-hijack** — cơ chế "click-token" (chỉ 1 cửa sổ mới/1 cú bấm thật), nhận diện link/video bị lồng ghép dẫn sang trang cờ bạc/affiliate theo cấu trúc hình học, không cần biết trước domain đích.
- **Phát hiện web giả mạo & lừa đảo tài chính** — thuật toán tự học (fuzzy-matching + phát hiện homograph/punycode) bắt được cả domain giả mạo thương hiệu ngân hàng/ví điện tử/mạng xã hội **chưa từng có trong bất kỳ danh sách nào**, cộng thêm phát hiện trang lừa đảo theo NỘI DUNG (form xin OTP/mật khẩu + ngôn từ lừa đảo) dù không giả danh thương hiệu nào.
- **Cảnh báo tải file độc hại** — chặn tự động khi khớp danh sách site phát tán malware đã biết; cảnh báo (không tự chặn) với file có đuôi nguy hiểm.
- **Ống Ngắm (Element Zapper)** — công cụ thủ công 2 chế độ để bạn tự "dọn" bất kỳ quảng cáo nào lọt qua các lớp tự động (xem hướng dẫn chi tiết bên dưới).
- **Tự học liên tục** — mọi hành động thủ công của bạn (Zapper) đều góp phần huấn luyện hệ thống nhận diện tốt hơn cho lần sau, trên chính site đó lẫn các site khác dùng chung khuôn mẫu.
- **Ngụy trang vân tay trình duyệt nâng cao** — giả mạo AudioContext/WebGL/Canvas/thông tin phần cứng, kèm che giấu cả `.toString()`/`.name`/`.length` của mọi hàm bị patch để qua mặt cả script kiểm tra bị can thiệp.
- **Chống đứng hình/giật video** — tự khôi phục playback khi bị nghẽn băng thông hoặc bị YouTube cố tình làm chậm khi chuyển tab nền.

---

## 🖱️ HƯỚNG DẪN SỬ DỤNG "ỐNG NGẮM" (ELEMENT ZAPPER)

Khi 3 lớp tự động (chặn mạng + cosmetic + heuristic) vẫn để lọt 1 quảng cáo, dùng Ống Ngắm để tự xử lý ngay tại chỗ — **chỉ mất 1 giây, và không bao giờ phải làm lại lần 2 cho đúng site đó.**

### Kích hoạt
- Bấm nút tròn 🎯 ở góc màn hình (có thể kéo-thả đổi vị trí, vị trí được nhớ chung cho mọi trang), **hoặc**
- Nhấn tổ hợp phím **`Alt + Shift + X`**

Khi đang ngắm, con trỏ chuyển thành dấu cộng và phần tử dưới chuột được viền đỏ nét đứt để xem trước.

### 🔴 Chuột TRÁI — Tiêu diệt (Destroy)
Dùng khi **chính phần tử đó** là quảng cáo cần loại bỏ hẳn (banner, khung quảng cáo, nút giả...).

- Di chuột tới đúng phần tử → **bấm chuột trái**
- Phần tử bị xoá hẳn khỏi trang, ghi nhớ lại theo đúng site đó — lần sau quay lại, phần tử này tự động biến mất ngay từ đầu, không cần ngắm lại.
- Có kiểm tra an toàn tuyệt đối: không bao giờ xoá được `<body>`, ô nhập liệu/khung soạn thảo (chat, form...), hay chính UI của extension.

### 🔵 Chuột PHẢI — Dọn lớp phủ ẩn (Clean overlay)
Dùng khi 1 nút/video **thật** bị 1 lớp gần như vô hình đè lên trên (kiểu click-hijack) — bấm vào tưởng bấm trúng nút thật nhưng thực chất trúng lớp phủ, bị kéo sang trang khác.

- Di chuột tới đúng vị trí (ngay trên nút/video nghi bị che) → **bấm chuột phải**
- Extension soi toàn bộ các lớp xếp chồng tại đúng điểm đó, chỉ dọn lớp nào có bằng chứng rõ ràng là lớp phủ giả (gần như trong suốt, link/iframe dẫn ra domain khác, hoặc tên class gợi ý quảng cáo) — **giữ nguyên nút/video thật bên dưới**, không xoá gì cả, chỉ vô hiệu hoá (không cản trở click nữa).
- Nếu không có gì đáng ngờ, hiện thông báo "✅ An toàn, không có gì ẩn" — đây là kết quả đúng, không phải lỗi.
- **Bonus tự học:** nếu bạn bấm trúng đúng 1 nút mang nhãn "Skip"/"Bỏ qua" quảng cáo, hệ thống tự ghi nhớ tên nút đó — xác nhận trên ≥2 trang khác nhau xong, nút Skip cùng kiểu ở **bất kỳ trang nào khác** cũng được tự động bấm giúp bạn, không cần lặp lại thao tác này nữa.

### Các phím khác
| Phím | Chức năng |
|---|---|
| `Esc` | Huỷ ngắm giữa chừng |
| Kéo nút 🎯 | Di chuyển vị trí nút (nhớ chung mọi trang) |

### Xem lại / Khôi phục
Mở popup extension → xem danh sách phần tử đã tiêu diệt/dọn theo từng site, theo từng ngày, có nút **"Khôi phục"** để hoàn tác bất kỳ lúc nào (từng site, hoặc toàn bộ).

### Xuất / Nhập dữ liệu
- **Xuất dữ liệu**: lưu toàn bộ "trí nhớ" của Zapper ra 1 file JSON (tên miền/URL được làm rối trước khi xuất, không lộ nguyên văn bạn từng ghé site nào).
- **Nhập dữ liệu**: nạp lại file đó (của chính bạn sau khi cài lại máy, hoặc do người khác chia sẻ) — dữ liệu tự động hợp nhất, không ghi đè.

### Chế độ "Aggressive" (tuỳ chọn, tắt mặc định)
Trong popup có công tắc **"Tự nhận diện mạnh"** — bật lên để hệ thống chấp nhận thêm vài tín hiệu nhận diện rủi ro cao hơn (banner co giãn responsive, phần tử lạc loài khỏi khuôn mẫu trang) nhằm bắt thêm được nhiều trường hợp hơn, đổi lại khả năng ẩn nhầm nội dung thật tăng nhẹ. Mặc định TẮT để ưu tiên an toàn.

---

## 🧠 KIẾN TRÚC THUẬT TOÁN ĐA TẦNG

```
Core Engine = (Chặn tầng mạng + Nhận diện cấu trúc) × Tự học × Chống bị phát hiện
```

| Lớp | Cơ chế | Mô tả |
|---|---|---|
| 1 | **YouTube JSON Proxy** | Tiêm script vào Main World, can thiệp trực tiếp `playerResponse`/`ytplayer.config` — gỡ đánh dấu quảng cáo trước khi trình phát kịp đọc |
| 2 | **Chặn tầng mạng (EasyList)** | Tự động tải & làm mới danh sách domain quảng cáo cộng đồng (cùng nguồn AdGuard/uBlock dùng), chuyển thành rule `declarativeNetRequest` |
| 3 | **Ẩn Cosmetic (EasyList)** | Danh sách tên class/id quảng cáo phổ biến, ẩn tức thì bằng CSS ngay lúc trang bắt đầu tải |
| 4 | **Heuristic cấu trúc** | Tự suy luận theo tên gọi/nhãn tự khai/kích thước chuẩn IAB/vị trí hình học — bắt được cả site chưa từng gặp, không cần domain cụ thể |
| 5 | **Element Zapper + Tự học** | Công cụ thủ công, mọi thao tác đều huấn luyện lại hệ thống — xác nhận trên ≥2-3 site độc lập mới được tự áp dụng, tránh học nhầm |
| 6 | **Fuzzy Brand-Guard** | So khớp mờ (Levenshtein) + phát hiện homograph/punycode — bắt domain giả mạo thương hiệu hoàn toàn mới |
| 7 | **Popunder & Click-Hijack Guard** | "Click-token": tối đa 1 cửa sổ mới/1 cú bấm thật; nhận diện video/link bị lồng ghép theo cấu trúc hình học |
| 8 | **Anti-Detection Cloaking** | Giả mạo AudioContext/WebGL/Canvas + che `.toString()`/`.name`/`.length` của mọi hàm bị patch, qua mặt cả script kiểm tra bị can thiệp |

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
- **Công nghệ chính**: `declarativeNetRequest`, Main World script injection, `MutationObserver`, IndexedDB (kho học trung tâm), Proxy/`Object.defineProperty` (giả mạo API trình duyệt)
- **Nguyên tắc thiết kế**: an toàn trên hết — không hành động tự động nào được thực thi nếu chỉ dựa vào 1 tín hiệu yếu/đơn lẻ; mọi thay đổi trên trang đều có thể khôi phục qua popup

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
