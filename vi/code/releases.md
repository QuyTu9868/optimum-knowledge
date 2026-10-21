---
title: Repos and Gateway releases
last_verified: 2026-10-20
status: confirmed from git history and CHANGELOG
lang: vi
translation_of: code/releases.md
source_sha: 6d890def4c53
---

# Repo và các bản phát hành (Repos and releases)

## Repo công khai (Public repos)

[getoptimum GitHub org](https://github.com/getoptimum) có 20 repo công khai vào 2026-10-20 (khoảng một nửa là fork). Các repo chính: ([org repos API](https://api.github.com/orgs/getoptimum/repos?per_page=100)) [confirmed] Các phiên bản trước của trang này có liệt kê một fork hermes; nó không còn trong danh sách ngày 2026-10-20. Các repo không phải fork khác gồm forkdigest-hub và block-explorer.

| Repo | Là gì | Giấy phép |
|---|---|---|
| optimum-gateway | sidecar (tiến trình chạy kèm) viết bằng Go, chuyển tiếp gossip (lan truyền kiểu tin đồn) giữa các client đồng thuận (consensus client) libp2p và mump2p | MIT, kèm thông báo PATENTS |
| optimum-common | Thư viện Go dùng chung chứa các tiện ích nội bộ (README gọi là SDK dùng chung); xem [sdks-and-tools.md](sdks-and-tools.md) | BSD-3-Clause |
| optimum-hop | Framework Docker Compose và bộ test để chạy Gateway và giám sát | GPL-3.0 |
| mump2p-cli | CLI cho giao thức pubsub mump2p; tag mới nhất v0.0.1-rc8 (2025-10-14) | không ghi |
| optimum-dev-setup-guide | Cấu hình tham chiếu Docker Compose cho mump2p (4 nút, 2 proxy), không có bản phát hành | không ghi |
| docs | Site tài liệu | |
| optimum-keysync | Công cụ đồng bộ key (Python); v1.0.0, v1.1.0 và v1.1.1 đều đề ngày 2026-06-25, cũng có trên PyPI với tên optimum-keysync; xem [../products/keysync.md](../products/keysync.md) | MIT |
| go-libp2p-pubsub, prysm, shadow, reedsolomon, ethereum-package | Các fork (pubsub, client Ethereum, trình mô phỏng, mã hóa chống mất gói, gói devnet) | |
| charon-distributed-validator-node | Bộ cài đặt Obol CDVN | |

Chưa thấy repo công khai nào cho thư viện lõi RLNC (mã hóa mạng tuyến tính ngẫu nhiên).

## Giấy phép của Gateway (Gateway license)

- Đổi sang giấy phép MIT kèm thông báo PATENTS trong PR #55 vào 2026-08-07. ([commit c9603ea](https://github.com/getoptimum/optimum-gateway/commit/c9603ea)) [confirmed]
- Bên giữ bản quyền: Spice Solutions Inc. ([LICENSE](https://github.com/getoptimum/optimum-gateway/blob/main/LICENSE)) [confirmed]
- Lịch sử công khai bắt đầu từ commit "Initial public snapshot" vào 2026-07-20, nên phần phát triển trước đó không nhìn thấy được. [confirmed]

## Dòng thời gian phát hành (Release timeline)

Ngày ghi ở đây là ngày commit của từng tag. ([tags](https://github.com/getoptimum/optimum-gateway/tags)) [confirmed]

| Phiên bản | Ngày | Ghi chú |
|---|---|---|
| v1.1.0 | 2026-07-20 | Initial public snapshot; JWT handshake với dịch vụ xác thực của Optimum |
| v1.0.2 | 2026-08-05 | Sửa chỉ số sức khỏe (#48); sửa các lỗi theo kiểm toán (audit) của ProbeLab |
| v1.1.1 | 2026-08-06 | Bản build StereumLabs dùng cho phép thử mainnet độc lập |
| v1.2.0 | 2026-08-27 | |
| v1.2.1 | 2026-09-09 | Cửa sổ chống trùng (dedup) 30 giây cho khối được mã hóa lại (#121) |
| v1.3.0 | 2026-09-10 | Quyền publish lấy từ JWT scope (#123, #126); Subscribe hai chiều có làm mới token (#120) |
| v1.3.1 | 2026-09-14 | Tự đăng ký bằng một join key dùng chung toàn org, `ojk_` (#116, docs #129); có từ v1.3.1, giữ lại trong v1.3.2 (xem [../products/console-and-signal.md](../products/console-and-signal.md), [manual v1.3.2 configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) |
| v1.3.2 | 2026-09-17 | Khối lan truyền ở mọi slot (khung 12 giây của Ethereum); v1.3.0 và v1.3.1 bỏ sót một số slot |

- CHANGELOG nói v1.3.2 là phiên bản duy nhất còn được hỗ trợ; mọi bản cũ hơn, kể cả v0.0.1-rc1 đến rc12, đều đã bị deprecated (ngừng hỗ trợ). ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md)) [confirmed]
- Các client đồng thuận được hỗ trợ: Prysm, Lighthouse, Nimbus, Teku, Lodestar. Docs lưu ý Nimbus có thể mất vài giờ để ổn định. [confirmed]
