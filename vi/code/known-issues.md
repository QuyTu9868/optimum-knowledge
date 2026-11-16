---
title: Known issues and notable fixes
last_verified: 2026-11-16
status: confirmed from PRs, commits and CHANGELOG; GitHub issues list not searched
lang: vi
translation_of: code/known-issues.md
source_sha: d1aa68c2ce16
---

# Các lỗi đã biết và bản sửa đáng chú ý (Known issues and notable fixes)

Không đọc được danh sách issue trong lúc nghiên cứu, nên file này chỉ bao gồm PR, commit và CHANGELOG.

## Các bản sửa đáng chú ý (Notable fixes)

- **Slot bị bỏ qua ở v1.3.0 và v1.3.1:** một số slot (khung 12 giây của Ethereum) bị bỏ qua; v1.3.2 lan truyền khối ở mọi slot và là bản nâng cấp bắt buộc. ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md)) [confirmed]
- **Thông báo trùng lặp (PR #121, 2026-09-09):** thêm cửa sổ chống trùng (dedup) 30 giây để các lần mã hóa lại (re-encoding, không phải tái mã hóa RLNC) của cùng một khối từ cùng một nguồn không kích hoạt sự kiện stream lặp lại. PR không nhắc tới việc publish (đăng thông điệp) lại hay độ trễ (latency) tăng vọt. ([PR #121](https://github.com/getoptimum/optimum-gateway/pull/121)) [confirmed]
- **Chặn bằng handshake (PR #8, 2026-07-23):** chỉ nhận thông điệp từ các peer (nút ngang hàng) đã hoàn tất xác thực handshake. Không nhắc tới hành vi riêng của client nào. ([PR #8](https://github.com/getoptimum/optimum-gateway/pull/8)) [confirmed]
- **Chỉ số sức khỏe (PR #48, v1.0.2):** chỉ số sức khỏe của client đồng thuận (consensus client) giờ cũng được cập nhật khi chuyển tiếp (relay) đi ra, không chỉ khi nhận gossip (lan truyền kiểu tin đồn) đi vào. [confirmed]
- **Cạn bộ nhớ qua aggregated attestation (GHSA-rcrq-vcj2-m787, sửa ở v1.3.3, mức medium):** một peer mump2p có quyền publish có thể gửi gói có chỉ số subnet ngoài phạm vi, khiến các gateway đang subscribe cấp phát bộ nhớ nhiều hơn rất nhiều so với kích thước thông điệp. Gateway giờ từ chối cả gói nếu có subnet nằm ngoài 0-63. v1.3.2 trở về trước bị ảnh hưởng. ([release notes v1.3.3](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.3/release_notes.md)) [confirmed]
- **Telemetry bị mở khi dùng host networking (GHSA-gr6w-cqh2-3c5g, v1.3.4):** với `--network host` hoặc `hostNetwork` của Helm chart, các endpoint telemetry chỉ-đọc trên 48123 (`/`, `/health`, `/metrics`, `/api/v1/self_info`) lắng nghe trên mọi interface IPv4 của host. Chỉ nâng cấp thì chưa đổi được địa chỉ bind: đặt `telemetry_addr: 127.0.0.1`, hoặc với Helm dùng chart 0.5.0 cùng v1.3.4. Gateway chạy bằng lệnh Console hiện tại publish 48123 trên loopback nên không bị ảnh hưởng. ([release notes v1.3.4](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.4/release_notes.md)) [confirmed]
- **MPTCP (CVE-2026-98432, v1.3.4):** Go 1.24 trở lên chấp nhận MPTCP mặc định; v1.3.4 tắt nó trên mọi listener của gateway. Release notes nói bản sửa đầy đủ là cập nhật kernel của host. [confirmed]
- **Các bản sửa khác từ 2026-10-19, chỉ theo tiêu đề:** fork digest theo traffic của CL thay vì theo subscription (#192); làm mới token khoảng mỗi 15 phút (#184); kiểm tra topic index khi giải mã packer (#185); cờ propagation cho attestation (#179); stream-only gateway theo fork digest (#217); giữ địa chỉ reconnect CL peer đã cấu hình (#219); quảng bá custody tối thiểu, không có data availability cho CL peer (#222); ghi nhận CL peer ngắt kết nối/goodbye theo client (#223); trả lời ping bằng metadata sequence number của chính mình (#224); docs ghi rõ load balancer không đặt trước được cổng mesh (#227); nâng golang.org/x/net vá CVE-2026-78661 (#231). Chưa kiểm tra PR đang mở. [confirmed]
- Các mục khác, chỉ theo tiêu đề: telemetry data race (#10), vấn đề TLS trong stream service (#84), chặn theo slot cho Hermes beacon fanout (#135), ghi lại thời điểm first-seen của publisher (bên phát hành thông điệp) (#161), chấp nhận khối gossip tới giới hạn kích thước nén (#162). [confirmed]

## Kiểm toán (Audit)

- ProbeLab kiểm toán giai đoạn 2 tìm ra 17 vấn đề, không có vấn đề nghiêm trọng nào; tất cả trừ F-07 được sửa ở v1.0.2. Xem [../technology/security.md](../technology/security.md).

## Cài đặt GossipSub trong code của Gateway (GossipSub settings in the Gateway code)

Từ [config.go](https://github.com/getoptimum/optimum-gateway/blob/main/pkg/service/mum_p2p/config.go): [confirmed]

- Mesh degree (số peer trong mesh, mạng lưới kết nối) mục tiêu có thể cấu hình; ngưỡng dưới là mục tiêu trừ 1, ngưỡng trên là mục tiêu cộng 6.
- Heartbeat mỗi 700 ms.
- Thông điệp đầy đủ được giữ trong 6 cửa sổ để trả lời các yêu cầu IWANT; gossip bao phủ 3 cửa sổ.
- Có thể bật tracing để ghi log các sự kiện mesh GRAFT/PRUNE.

Không tìm thấy phần xử lý IDONTWANT trong cấu hình của Gateway.

## Những chuyện không có nguồn (Stories without a source)

Những chuyện này vẫn lan truyền nhưng không có gì trong repo, PR, CHANGELOG hay docs xác nhận, tính đến last_verified. Được liệt kê trong [../unverified.md](../unverified.md).

- Một lỗi khiến khối bị publish lại sau TTL 30 giây, gây độ trễ tăng vọt 30-46 giây.
- Prysm khá dễ tính còn Teku/Lighthouse chặt chẽ về handshake.
- "Partial RLNC delivery".
