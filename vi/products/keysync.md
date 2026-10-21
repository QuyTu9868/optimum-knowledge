---
title: Optimum keysync
last_verified: 2026-10-20
status: open-source CLI, v1.1.1; needs an Optimum operator account
lang: vi
translation_of: products/keysync.md
source_sha: ce9594bd480f
---

# Optimum keysync

Keysync là công cụ dòng lệnh do khách hàng tự chạy, dùng để đối chiếu các validator (nút xác thực) Ethereum bạn đang chạy với tập validator mà Console của Optimum đang giữ.

Trang này mô tả những gì docs chính thức và repository nói, tính đến 2026-10-20. Thuật ngữ về Console và gateway nằm ở [console-and-signal.md](console-and-signal.md) và [run-the-gateway.md](run-the-gateway.md).

## Nó là gì (What it is)

- Repository mô tả đây là một CLI do khách hàng tự chạy, đối chiếu các phần gán validator với API console của Optimum, xác thực bằng operator API key và áp dụng phần chênh lệch, phù hợp để chạy bằng cron. ([GitHub: optimum-keysync](https://github.com/getoptimum/optimum-keysync)) [confirmed]
- Nó viết bằng Python và dùng giấy phép MIT. ([GitHub API: optimum-keysync](https://api.github.com/repos/getoptimum/optimum-keysync)) [confirmed]
- Các bản phát hành là v1.0.0, v1.1.0 và v1.1.1, tất cả đều đăng ngày 2026-06-25; v1.1.1 là bản mới nhất. ([GitHub releases](https://github.com/getoptimum/optimum-keysync/releases)) [confirmed]
- Docs đặt nó cho tập validator liên tục thay đổi; việc thêm, xóa và thay thế lẻ vẫn làm trong Console. ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]

## Cài đặt và chạy (Install and run)

- Cài bằng `pip install optimum-keysync`; lệnh là `keysync`. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- `keysync diff` in ra các thao tác thêm và xóa dự kiến và không ghi gì; `keysync sync` chỉ chạy thử (dry run) cho tới khi truyền `--apply`; `keysync show` liệt kê các phần gán hiện tại. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Chạy lại nhiều lần cho cùng kết quả (idempotent), nên khi đã ổn định thì nó báo không có gì để làm. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- Nó được thiết kế để chạy bằng cron, systemd timer hoặc Kubernetes CronJob; mẫu cho hai loại sau có trong repo. ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync), [README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Cấu hình bằng biến môi trường `KEYSYNC_*`, mỗi biến có một cờ ghi đè; API, auth, mạng và chain id mặc định là Optimum production và Ethereum mainnet (chain `0x1`). ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Mã thoát: 0 thành công, 2 auth, 3 API console, 4 cấu hình, 5 rào chắn xóa, 6 beacon node. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]

## Dữ liệu nó xử lý (Data it handles)

- Bí mật duy nhất là operator API key (`ovi_live_*`, `KEYSYNC_API_KEY`), tạo trong Manage API keys của Console; thu hồi khóa có hiệu lực ở lần chạy kế tiếp. ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync), [README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Đầu vào là một tệp các validator bạn chạy: khóa công khai BLS, chỉ số validator, hoặc bản ghi JSON gồm chỉ số, chain và khóa. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Danh sách khóa công khai hoặc chỉ số cần một beacon node trả lời `/eth/v1/beacon/states/head/validators` mà không cần auth; tùy chọn bản ghi JSON thì không cần. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- README chỉ nhắc tới khóa công khai và chỉ số làm đầu vào, không nhắc khóa ký, khóa rút tiền hay keystore; đây là điều README nói, không phải bảo đảm về mã nguồn. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Nó chạy phía khách hàng và chỉ đọc endpoint validator của beacon node; README không mô tả thao tác ghi nào lên nút. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Nó dùng khóa để tra operator id của bạn, liệt kê các phần gán hiện tại, tính các thao tác thêm và xóa, rồi đăng ký, gán và bỏ gán. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]

## Giới hạn (Limits)

- Nó từ chối xóa quá 10 validator trong một lần chạy trừ khi nâng `--max-deletes`, để một tệp đầu vào sai không xóa sạch cả tập. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- Docs xếp nó sau bước đăng ký khóa trong phần thiết lập operator, tách khỏi việc chạy gateway; thông tin về gateway nằm ở [run-the-gateway.md](run-the-gateway.md). ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- Các lệnh gọi HTTP chỉ thử lại với lỗi 5xx, 429 và lỗi mạng; các lỗi 4xx khác thất bại ngay. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]

## Còn tranh cãi (Disputed)

- Khóa lấy từ đâu: README nói là Optimum partners dashboard; docs nói là Manage API keys trong Console. Không nguồn nào nói hai chỗ này có phải cùng một màn hình không; xem ghi chú thuật ngữ trong [console-and-signal.md](console-and-signal.md). ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]

## Chưa đề cập (Not yet covered)

- Keysync có dành cho mọi tài khoản Console hay không: docs nhắc tới việc tài khoản operator được mời khởi chạy nó từ Activate validators, nên quyền truy cập phụ thuộc vào việc Optimum bật nó.
- Không tìm thấy kiểm toán độc lập hay đánh giá của bên thứ ba nào về công cụ này.
- Các validator đã đăng ký được dùng vào việc gì ở phía sau thì được mô tả trong docs khác, không nằm trong nguồn về keysync.
