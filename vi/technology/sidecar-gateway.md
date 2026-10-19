---
title: Optimum Gateway as a validator sidecar
last_verified: 2026-10-18
status: claimed by Lido post, backed by third-party audit
lang: vi
translation_of: technology/sidecar-gateway.md
source_sha: 43092a8fda03
---

# Mô hình sidecar (Sidecar model)

Sidecar (tiến trình chạy kèm) là một chương trình riêng chạy cạnh phần mềm chính, thêm tính năng mà không sửa phần mềm đó.

- Optimum Gateway chạy cạnh beacon node như một sidecar. ([Lido PERCH post, 2026-08-10](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- Nó không đòi hỏi thay đổi nào ở phần mềm validator (nút xác thực). ([same](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- Nó không thêm điều kiện phạt cắt stake (slashing) nào và không truy cập khóa của validator. ([same](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- Bản kiểm toán của ProbeLab xác nhận Gateway chạy song song với libp2p stack của client đồng thuận (consensus client) và không đụng tới logic ký, beacon state hay nhiệm vụ attestation (phiếu xác nhận). Dừng Gateway không ảnh hưởng tới mesh (mạng lưới kết nối) riêng của client. ([ProbeLab audit, 2026-08-18](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]

## Gateway làm gì (What the Gateway does)

- Nó nối một client đồng thuận của Ethereum với mesh mump2p. Nó đăng ký (subscribe) các topic gossip (lan truyền kiểu tin đồn) của Ethereum, chuyển lưu lượng đó vào mesh, và nhận các thông điệp mump2p để mã hóa SSZ lại rồi đưa vào mạng client cục bộ. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Từ client sang mesh: mỗi thông điệp được băm bằng XXHash để tạo dấu vân tay và giữ khoảng một phút trong bộ nhớ đệm chống trùng (dedup cache), rồi chuyển tiếp cho các peer (nút ngang hàng) mump2p, với tùy chọn gom lô cho các topic không phải block. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Từ mesh sang client: thông điệp đã có trong bộ nhớ đệm thì bị bỏ qua, nếu không thì được giải mã SSZ, mã hóa SSZ lại và publish vào mạng libp2p cục bộ. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Nó chạy hai libp2p host: TCP 33212 hướng về consensus client và TCP 33213 hướng về các gateway khác trên mesh mump2p. Một HTTP server telemetry lắng nghe ở 48123 với /health và /api/v1/self_info. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Client không cần đổi code: chỉ cần trỏ nó tới Gateway như một peer, ví dụ bằng cờ --peer của Prysm cùng multiaddress của Gateway. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Một video tích hợp validator năm 2025 nói về các topic beacon block và attestation, và nói khi đó beacon aggregate sắp có. ([validator implementation video, 2025-09-29](https://www.youtube.com/watch?v=xe1u2Ct6WNY)) [claimed]

## Repo mã nguồn (Repos)

- Code công khai nằm trong GitHub org getoptimum, gồm `optimum-gateway` (giấy phép MIT). ([GitHub](https://github.com/getoptimum)) [confirmed]

Lịch sử phát hành và các bản sửa: [../code/releases.md](../code/releases.md), [../code/known-issues.md](../code/known-issues.md).
