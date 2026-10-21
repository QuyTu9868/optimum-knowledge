---
title: Gateway design decisions (ADRs)
last_verified: 2026-10-20
status: summary of 13 public ADRs; some decisions are proposals or pending, marked per item
lang: vi
translation_of: technology/gateway-design.md
source_sha: 496d6467278d
---

# Các quyết định thiết kế Gateway (Gateway design decisions - ADRs)

Repo optimum-gateway giữ 13 ADR (bản ghi quyết định kiến trúc, architecture decision records) giải thích vì sao gateway được xây như hiện nay.

Trang này mô tả những gì các ADR nói tính đến 2026-10-20. ADR là tài liệu thiết kế, nên mỗi mục cho biết ADR nêu nó là đã triển khai, đề xuất hay đang chờ. Mục đích và hiệu quả dự kiến được gắn tag claimed. Những gì ADR định nghĩa rõ ràng, kể cả lời thừa nhận của chính nó, được gắn tag confirmed.

## ADR-0001 Kiến trúc (Architecture) (Accepted, 2025-12-04)

- Một tiến trình gateway giữ một libp2p host hướng về client đồng thuận (consensus client) và một nút mump2p nhúng bên trong, rồi chuyển thông điệp qua lại hai chiều. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- Các topic lưu lượng lớn có thể được aggregator gom lô khoảng mỗi 25 ms. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- ADR nêu mục đích của việc gom lô là giảm băng thông (bandwidth). ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [claimed]
- Một công tắc `propagation_enabled` áp dụng cho cả fleet (toàn bộ các gateway) bật/tắt việc chuyển block và attestation (phiếu xác nhận) từ mump2p sang client; chiều từ client sang mump2p và việc đo thời điểm đến không do công tắc này điều khiển. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- ADR tự nêu một đánh đổi: gateway nằm trên đường đi chính của cả hai phía, nên một lỗi có thể ảnh hưởng cả hai chiều. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]

## ADR-0002 đến 0005 Đo lường (Measurement)

- ADR-0002 (Accepted, 2025-12-04) chọn tính độ trễ (latency) của block ở phía bootstrap dựa trên báo cáo từ các gateway, và từ chối việc thêm timestamp vào thông điệp trên đường truyền. Một ghi chú nói các ADR sau đã thay thế phần lớn cách đặt tên của nó. ([ADR-0002](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0002-beacon-block-latency.md)) [confirmed]
- ADR-0003 (Accepted, 2026-01-07): các gateway phát timestamp thô theo từng block (`t_eth_seen_ms`, `t_mum_seen_ms`, `t_mum_published_ms`) và dịch vụ bootstrap tính các KPI như khoảng cách tới gateway tốt nhất. ([ADR-0003](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md)) [confirmed]
- ADR-0003 lập luận rằng độ chênh thô "mump2p minus Ethereum" là tín hiệu để debug, không phải KPI ổn định. ([ADR-0003](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md)) [confirmed]
- ADR-0003 nói snapshot API để publish các KPI chưa được triển khai. ([ADR-0003](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md)) [confirmed]
- ADR-0004 (Accepted, 2026-02-09) thêm các trường origin và upstream peer để có thể truy vết đường định tuyến. Bộ đếm theo từng peer được nêu là đã triển khai. ([ADR-0004](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0004-hop-by-hop-latency-tracking.md)) [confirmed]
- Các KPI độ trễ theo chặng suy ra từ những trường đó (hop latency, processing delay, bottleneck rate) được ghi rõ là chưa triển khai. ([ADR-0004](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0004-hop-by-hop-latency-tracking.md)) [confirmed]
- ADR-0005 (Approved, 2026-02-17; không nêu tình trạng triển khai) định nghĩa cách truy vết nguồn đầu vào nào (nút đồng thuận, relay, Hermes node) giao block trước, cùng các chỉ số suy ra như relay impact và missed blocks. ([ADR-0005](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0005-block-ingestion-tracing-and-analysis.md)) [confirmed]

## ADR-0006 và 0007 Theo dõi sức khỏe và thời điểm đến (Health and arrival tracking)

- ADR-0006 (Accepted, 2026-03-18) thêm `GET /health` ở cổng telemetry 48123: trả 200 khi khỏe, 503 khi suy giảm. ([ADR-0006](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0006-gateway-health-check.md)) [confirmed]
- Nó kiểm tra số peer của client ít nhất 1, số peer mump2p ít nhất 1, số topic đã đăng ký ít nhất 1, và tuổi block gần nhất dưới 60 giây. Các bản gateway sau thêm `cl_health` và `mump2p_health`, xem [../products/run-the-gateway.md](../products/run-the-gateway.md). ([ADR-0006](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0006-gateway-health-check.md)) [confirmed]
- ADR-0007 (Accepted, 2026-04-14) ghi lại peer client đồng thuận nào đã giao từng block, và thêm bộ đếm first-seen cục bộ của gateway cùng histogram thời điểm đến theo từng đường. ([ADR-0007](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0007-slot-based-block-arrival-tracking.md)) [confirmed]

## ADR-0008 đến 0010 Phiếu xác nhận (Attestations)

- ADR-0008 (Accepted, 2026-04-17): gateway chỉ chuyển cho mump2p các attestation của chính validator thuộc tài khoản, được biết qua claim `validator_indexes` trong auth token của nó. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- ADR-0008 nêu mục đích là cắt lưu lượng attestation trùng lặp giữa các gateway. Ví dụ tính toán của nó (80 percent băng thông lãng phí trước đó) chỉ để minh họa, và nó ước tính lưu lượng attestation giảm khoảng 98 percent, còn ADR-0009 nhắc lại khoảng 95 percent. Cả hai đều là ước tính, không có phép đo. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md), [ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [claimed]
- ADR-0008 nói các attestation cách slot hiện tại hơn 3 slot sẽ bị bỏ (xem Còn tranh cãi cho ADR-0009). Ở chiều client sang mump2p, các topic không phải block và attestation bị bỏ. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- ADR-0009 (Accepted, 2026-04-27): aggregator giữ attestation lại và chỉ publish trong khoảng từ giây thứ 4 đến giây thứ 8 của mỗi slot. Các giá trị này là hằng số cố định lúc biên dịch. ([ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [confirmed]
- ADR nêu mục đích là để attestation không tranh với việc lan truyền (propagation) block. ([ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [claimed]
- ADR thừa nhận lợi ích mới chỉ là giả thuyết, được bật sẵn mặc định mà chưa có phép đo, sẽ kiểm tra sau bằng optimum-bench. ([ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [confirmed]
- ADR-0010 (Approved, implementation pending, 2026-06-10) đề xuất chia validator thành các chunk xác định để các gateway của cùng một tài khoản dựng payload attestation giống hệt nhau. Nó không được nêu là đã triển khai. ([ADR-0010](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0010-attestation-synchronization.md)) [confirmed]

## ADR-0011 đến 0013 (chỉ tóm tắt) (summary only)

- ADR-0011 (Approved, implemented, 2026-08-05): luồng block chỉ đọc, tự chọn bật; chi tiết ở [../products/block-stream.md](../products/block-stream.md). ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- ADR-0012 (Accepted, implemented, 2026-08-18, updated 2026-10-02): bootstrap publish một danh sách slot cần tăng tốc; gateway vai trò Hermes chỉ chuyển cho client của mình các block có trong danh sách (hoặc các block vượt quá giới hạn xa nhất (horizon) của danh sách), còn gateway vai trò partner chuyển mọi block. Trang sản phẩm Accelerate không tự liên kết tới ADR này, xem [../products/accelerate.md](../products/accelerate.md). ([ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]
- ADR-0013 (Accepted, implemented, 2026-09-08): một gateway tự đăng ký bằng enrollment key (khóa đăng ký gateway) dùng lại được (ADR gọi là org join key) cùng một keypair sinh cục bộ, thay vì mỗi host một API key. ([ADR-0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]

## Còn tranh cãi (Disputed)

- ADR-0008 nói các attestation cách slot hiện tại hơn 3 slot sẽ bị bỏ; sau đó ADR-0009 liệt kê hằng số max slot age bằng 0, nghĩa là chỉ slot hiện tại. Các ADR không dung hòa hai điều này. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md), [ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [confirmed]
- [sidecar-gateway.md](sidecar-gateway.md) nói gateway đăng ký các topic gossip của Ethereum và chuyển lưu lượng đó vào mesh. ADR-0008 nói ở chiều từ client sang mump2p chỉ có block và attestation của chính tài khoản được chuyển, các topic khác bị bỏ. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- Trang sidecar mô tả một gateway chạy cạnh beacon node. ADR-0011 định nghĩa chế độ stream-only (chỉ stream) bỏ qua phía client và không bao giờ publish. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Trang sidecar nói gateway không cần thay đổi gì ở phần mềm validator và không đụng tới việc ký, beacon state hay nhiệm vụ attestation. ADR-0001 nêu một lỗi gateway ảnh hưởng cả hai chiều là một đánh đổi, và ADR-0012 cho gateway vai trò Hermes giữ lại các block không có trong danh sách, không chuyển cho client. Những điều này không mâu thuẫn trực tiếp với các nhận định được trích; đó là hành vi mà trang sidecar không nhắc tới. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md), [ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]

## Chưa đề cập (Not yet covered)

- Không ADR nào đưa ra kết quả đo về độ trễ hay phần thưởng; các câu nói về lợi ích chỉ là ý định.
- ADR-0010 không có ngày triển khai, và snapshot API cho KPI của bootstrap cũng không có ngày.
- Việc bản kiểm toán ProbeLab trong security.md, phase 2 hồi tháng 7 năm 2026, có bao phủ luồng stream, việc chuyển block có chọn lọc hay tự đăng ký hay không thì không được nêu, và ADR-0011 đến 0013 đề ngày tháng 8 và tháng 9 năm 2026.
- Danh sách chỉ số và định dạng ở mức trường không được lặp lại ở đây.
