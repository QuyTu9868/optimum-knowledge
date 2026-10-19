---
title: Repos and Gateway releases
last_verified: 2026-10-11
status: confirmed from git history and CHANGELOG
lang: vi
translation_of: code/releases.md
source_sha: 2963f1e9338d
---

# Repo và các bản phát hành (Repos and releases)

## Repo công khai (Public repos)

[getoptimum GitHub org](https://github.com/getoptimum) có khoảng 21 repo công khai. Các repo chính: [confirmed]

| Repo | Là gì | Giấy phép |
|---|---|---|
| optimum-gateway | sidecar (tiến trình chạy kèm) viết bằng Go, chuyển tiếp gossip (lan truyền kiểu tin đồn) giữa các client đồng thuận (consensus client) libp2p và mump2p | MIT, kèm thông báo PATENTS |
| optimum-common | SDK Go dùng chung | BSD-3-Clause |
| optimum-hop | Script chạy thử nhanh | GPL-3.0 |
| mump2p-cli | CLI cho giao thức pubsub mump2p | không ghi |
| docs | Site tài liệu | |
| optimum-keysync | Công cụ đồng bộ key (Python) | MIT |
| hermes, go-libp2p-pubsub, prysm, shadow | Các fork dùng cho việc tracing, pubsub, client và mô phỏng | |
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
| v1.3.1 | 2026-09-14 | Tự đăng ký bằng một join key dùng chung toàn org, `ojk_` (#116, docs #129) |
| v1.3.2 | 2026-09-17 | Khối lan truyền ở mọi slot (khung 12 giây của Ethereum); v1.3.0 và v1.3.1 bỏ sót một số slot |

- CHANGELOG nói v1.3.2 là phiên bản duy nhất còn được hỗ trợ; mọi bản cũ hơn, kể cả v0.0.1-rc1 đến rc12, đều đã bị deprecated (ngừng hỗ trợ). ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md)) [confirmed]
- Các client đồng thuận được hỗ trợ: Prysm, Lighthouse, Nimbus, Teku, Lodestar. Docs lưu ý Nimbus có thể mất vài giờ để ổn định. [confirmed]
