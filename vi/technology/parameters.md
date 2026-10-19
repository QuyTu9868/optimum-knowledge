---
title: Documented configuration defaults
last_verified: 2026-10-18
status: confirmed, with internal inconsistencies on the docs page
lang: vi
translation_of: technology/parameters.md
source_sha: f65248936b19
---

# Tham số (Parameters)

Mọi giá trị lấy từ trang tham số của docs: https://docs.getoptimum.xyz/docs/guides/03-parameters (trang trả về 404 ngày 2026-10-18) [claimed]

Giá trị mặc định thay đổi giữa các phiên bản. Hãy kiểm tra lại trang này trước khi dựa vào một giá trị.

Kiểm tra ngày 2026-10-18: trang tham số ở trên trả về HTTP 404, nên các giá trị bên dưới không thể xác minh lại. Trang docs p2p gọi cùng các thiết lập này bằng tên khác: ShredFactor (số mảnh dữ liệu (fragment) cơ sở mỗi thông điệp), PublisherShardMultiplier (số shard (mảnh mã hóa) tạo ra lúc publish bằng ShredFactor nhân giá trị này), ForwardShardThreshold (relay (nút trung chuyển) tái mã hóa và chuyển tiếp khi đang giữ nhiều hơn ShredFactor nhân giá trị này số shard) và MeshDegreeTarget, MeshDegreeMin và MeshDegreeMax. Docs không nói biến môi trường nào ứng với tên nào, nên các dòng trong bảng nhiều khả năng là cùng các thiết lập đó. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]

## Chế độ RLNC (RLNC mode) cho mump2p

| Tham số | Mặc định | Ý nghĩa (diễn giải lại) |
|---|---|---|
| OPTIMUM_MESH_TARGET | 6 | Số peer (nút ngang hàng) mong muốn trong mesh (mạng lưới kết nối) |
| OPTIMUM_MESH_MIN | 3 hoặc 4 | Số peer tối thiểu trước khi thêm peer. Xem mục Còn tranh cãi |
| OPTIMUM_MESH_MAX | 12 | Số peer tối đa trước khi cắt bớt |
| OPTIMUM_SHARD_FACTOR | 4 | Số shard mỗi thông điệp |
| OPTIMUM_SHARD_MULT | 1.5 | Hệ số dư thừa, tức số shard thêm |
| OPTIMUM_THRESHOLD | 0.75 | Tỷ lệ shard cần có để chuyển tiếp hoặc giải mã (còn tranh cãi, xem bên dưới) |
| OPTIMUM_PORT | 7070 | Cổng TCP cho RLNC gossip |
| Kích thước thông điệp tối đa | 1048576 byte (1 MB) | Payload đầy đủ tối đa, giống nhau ở cả hai chế độ |

## Chế độ GossipSub (GossipSub mode)

| Tham số | Mặc định |
|---|---|
| GOSSIPSUB_PORT | 6060 |
| Mesh target / min / max | 6 / 4 / 12 |

## Proxy và sidecar - tiến trình chạy kèm (Proxy and sidecar)

| Tham số | Mặc định | Ý nghĩa |
|---|---|---|
| SIDECAR_PORT | 33212 | Cổng gRPC giữa proxy và nút P2P |
| SUBSCRIBER_THRESHOLD | 0.1 | Tỷ lệ subscriber đang kết nối cần có để chuyển tiếp một thông điệp |

- Có thể triển khai qua proxy, hoặc client kết nối thẳng tới các nút P2P bằng gRPC. ([guides overview](https://docs.getoptimum.xyz/docs/how-to-guides/overview)) [confirmed]

## Cổng của Gateway (Gateway ports)

- Gateway lắng nghe trên TCP 33212 cho libp2p host hướng tới client đồng thuận (consensus client), TCP 33213 cho mesh mump2p (gateway với gateway), và TCP 48123 cho máy chủ HTTP telemetry. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Còn tranh cãi (Disputed)

Các giá trị khác nhau giữa những phần của cùng một trang docs:

- OPTIMUM_MESH_MIN: 3 trong bảng tham số, 4 trong Quick Start và Defaults Reference. Trang không nói giá trị nào được ưu tiên.
- Cổng API: 9090 và 8081.
- Mức log: debug và production.
- Thư mục identity: `/identity` và `/tmp`.
- OPTIMUM_THRESHOLD: bảng tham số nói 0.75 là tỷ lệ shard cần có "to forward or decode". Trang docs p2p nói ngưỡng chỉ quyết định lúc nào relay tái mã hóa và chuyển tiếp, còn giải mã cần k shard độc lập tuyến tính. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Cổng 33212: bảng tham số liệt kê nó là cổng gRPC giữa proxy và nút P2P (SIDECAR_PORT). Gateway README dùng 33212 cho libp2p host hướng tới client đồng thuận. Có thể đây là hai sản phẩm khác nhau, và không nguồn nào nói rõ. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
