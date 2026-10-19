---
title: Known issues and notable fixes
last_verified: 2026-10-11
status: confirmed from PRs, commits and CHANGELOG; GitHub issues list not searched
lang: vi
translation_of: code/known-issues.md
source_sha: d1aa68c2ce16
---

# Các lỗi đã biết và bản sửa đáng chú ý (Known issues and notable fixes)

Không đọc được danh sách issue trong lúc nghiên cứu, nên file này chỉ bao gồm PR, commit và CHANGELOG.

## Các bản sửa đáng chú ý (Notable fixes)

- **Slot bị bỏ qua ở v1.3.0 và v1.3.1:** một số slot (khung 12 giây của Ethereum) bị bỏ qua; v1.3.2 lan truyền khối ở mọi slot và là bản nâng cấp bắt buộc. ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md)) [confirmed]
- **Thông báo trùng lặp (PR #121, 2026-09-09):** thêm cửa sổ chống trùng (dedup) 30 giây để các lần mã hóa lại của cùng một khối từ cùng một nguồn không kích hoạt sự kiện stream lặp lại. PR không nhắc tới việc publish (đăng thông điệp) lại hay độ trễ (latency) tăng vọt. ([PR #121](https://github.com/getoptimum/optimum-gateway/pull/121)) [confirmed]
- **Chặn bằng handshake (PR #8, 2026-07-23):** chỉ nhận thông điệp từ các peer (nút ngang hàng) đã hoàn tất xác thực handshake. Không nhắc tới hành vi riêng của client nào. ([PR #8](https://github.com/getoptimum/optimum-gateway/pull/8)) [confirmed]
- **Chỉ số sức khỏe (PR #48, v1.0.2):** chỉ số sức khỏe của client đồng thuận (consensus client) giờ cũng được cập nhật khi chuyển tiếp (relay) đi ra, không chỉ khi nhận gossip (lan truyền kiểu tin đồn) đi vào. [confirmed]
- Các mục khác, chỉ theo tiêu đề: telemetry data race (#10), vấn đề TLS trong stream service (#84), chặn theo slot cho Hermes beacon fanout (#135), ghi lại thời điểm first-seen của publisher (bên phát hành thông điệp) (#161), chấp nhận khối gossip tới giới hạn kích thước nén (#162). [confirmed]

## Kiểm toán (Audit)

- ProbeLab kiểm toán giai đoạn 2 tìm ra 17 vấn đề, không có vấn đề nghiêm trọng nào; tất cả trừ F-07 được sửa ở v1.0.2. Xem [../technology/security.md](../technology/security.md).

## Cài đặt GossipSub trong code của Gateway (GossipSub settings in the Gateway code)

Từ [config.go](https://github.com/getoptimum/optimum-gateway/blob/main/pkg/service/mum_p2p/config.go): [confirmed]

- Mục tiêu mesh (mạng lưới kết nối) degree có thể cấu hình; ngưỡng dưới là mục tiêu trừ 1, ngưỡng trên là mục tiêu cộng 6.
- Heartbeat mỗi 700 ms.
- Thông điệp đầy đủ được giữ trong 6 cửa sổ để trả lời các yêu cầu IWANT; gossip bao phủ 3 cửa sổ.
- Có thể bật tracing để ghi log các sự kiện mesh GRAFT/PRUNE.

Không tìm thấy phần xử lý IDONTWANT trong cấu hình của Gateway.

## Những chuyện không có nguồn (Stories without a source)

Những chuyện này vẫn lan truyền nhưng không có gì trong repo, PR, CHANGELOG hay docs xác nhận, tính đến last_verified. Được liệt kê trong [../unverified.md](../unverified.md).

- Một lỗi khiến khối bị publish lại sau TTL 30 giây, gây độ trễ tăng vọt 30-46 giây.
- Prysm khá dễ tính còn Teku/Lighthouse chặt chẽ về handshake.
- "Partial RLNC delivery".
