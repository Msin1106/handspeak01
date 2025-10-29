
# Handspeak (GitHub Pages)

Website mẫu để triển khai trên GitHub Pages, đã cấu hình **Web Speech** đọc **Tiếng Việt (vi-VN)**.

## Triển khai
1. Tạo repo `Handspeak` (hoặc `handspeak`) trên GitHub.
2. Upload toàn bộ file lên nhánh `main`.
3. **Settings → Pages**: Source = Deploy from a branch; Branch = main; Folder = /(root) → Save.
4. Mở: `https://<username>.github.io/Handspeak/`.

## Dùng trong code
Gọi:
```js
speakVi("Xin chào, đây là giọng đọc tiếng Việt.", { cancelBeforeSpeak: true, rate: 1.0, pitch: 1.0 });
```
Hoặc chọn voice cụ thể (nếu có): `voice: "Google Tiếng Việt"` hoặc `"Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)"`.
