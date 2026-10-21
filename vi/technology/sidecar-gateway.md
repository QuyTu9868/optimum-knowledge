---
title: Optimum Gateway as a validator sidecar
last_verified: 2026-10-20
status: claimed by Lido post, backed by third-party audit
lang: vi
translation_of: technology/sidecar-gateway.md
source_sha: 2a7316f70e40
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
- Phạm vi chuyển tiếp (sửa lại bullet đầu ở trên): từ client sang mesh, gateway chỉ chuyển các beacon block và attestation của chính tài khoản; các topic khác bị bỏ. ADR-0008 được đánh dấu "Superseded in part": vai trò nay lấy từ JWT type claim và việc chuyển block theo từng vai trò đã chuyển sang ADR-0012. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- Cách nối khác nhau theo client: Prysm, Teku, Nimbus và Lodestar gọi tới gateway; với Lighthouse thì gateway gọi tới node qua `OPT_DIRECT_CL_PEERS`. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Một gateway stream-only (chỉ stream) không có client peer và không bao giờ publish. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Quy tắc phơi cổng ra ngoài: 48123 chỉ được publish ở loopback, và 33212 không được publish ở chế độ stream-only. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- ADR-0011, 0012 và 0013 đề ngày tháng 8 và tháng 9 năm 2026. ADR-0012 cho gateway vai trò Hermes chỉ chuyển các block có trong danh sách cho client của mình, và ADR-0001 nêu một lỗi gateway ảnh hưởng cả hai chiều là một đánh đổi. ([ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md), [ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- Ghi chú biên tập: giai đoạn kiểm toán ProbeLab diễn ra vào tháng 7 năm 2026 và không nguồn nào nói nó bao phủ ADR-0011, 0012 hay 0013, nên câu "dừng Gateway không ảnh hưởng tới mesh riêng của client" cần được đọc cùng với các ADR đó.
- Một video tích hợp validator năm 2025 nói về các topic beacon block và attestation, và nói khi đó beacon aggregate sắp có. ([validator implementation video, 2025-09-29](https://www.youtube.com/watch?v=xe1u2Ct6WNY)) [claimed]

## Repo mã nguồn (Repos)

- Code công khai nằm trong GitHub org getoptimum, gồm `optimum-gateway` (giấy phép MIT). ([GitHub](https://github.com/getoptimum)) [confirmed]

## Còn tranh cãi (Disputed)

- "Forwards that traffic into the mesh" (Gateway làm gì) so với ADR-0008: chỉ block và attestation của chính tài khoản được chuyển vào mesh. Xem [gateway-design.md](gateway-design.md).
- "The client is pointed at the Gateway as a peer" đúng với Prysm, Teku, Nimbus và Lodestar; Lighthouse thì ngược lại, và stream-only không có client.
- "Stopping it does not affect the client's own mesh" (ProbeLab, Lido) so với ADR-0012 (gateway vai trò Hermes giữ lại các block không có trong danh sách, không chuyển cho client) và ADR-0001 (rủi ro nằm trên đường đi chính).

Các trang mới hơn: [../products/run-the-gateway.md](../products/run-the-gateway.md), [../products/console-and-signal.md](../products/console-and-signal.md), [gateway-design.md](gateway-design.md), [../products/block-stream.md](../products/block-stream.md), [../products/keysync.md](../products/keysync.md).

Lịch sử phát hành và các bản sửa: [../code/releases.md](../code/releases.md), [../code/known-issues.md](../code/known-issues.md).
