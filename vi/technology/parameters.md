---
title: Documented configuration defaults
last_verified: 2026-10-18
status: confirmed, with internal inconsistencies on the docs page
lang: vi
translation_of: technology/parameters.md
source_sha: 10acee50f402
---

# Tham số (Parameters)

Mọi giá trị lấy từ trang tham số của docs: https://docs.getoptimum.xyz/docs/guides/03-parameters (trang trả về 404 ngày 2026-10-18) [claimed]

Giá trị mặc định thay đổi giữa các phiên bản. Hãy kiểm tra lại trang này trước khi dựa vào một giá trị.

Kiểm tra ngày 2026-10-18: trang tham số ở trên trả về HTTP 404, nên các giá trị bên dưới không thể xác minh lại. Trang docs p2p gọi các thiết lập tương tự bằng tên khác: ShredFactor (số mảnh dữ liệu (fragment) cơ sở mỗi thông điệp), PublisherShardMultiplier (số shard (mảnh mã hóa) tạo ra lúc publish bằng ShredFactor nhân giá trị này), ForwardShardThreshold (relay (nút trung chuyển) tái mã hóa và chuyển tiếp khi số shard vượt một ngưỡng, mà docs viết cả là ForwardShardThreshold lẫn là ShredFactor nhân ForwardShardThreshold) và MeshDegreeTarget, MeshDegreeMin và MeshDegreeMax. Docs không nói biến môi trường nào ứng với tên nào, nên mọi sự đối ứng với bảng bên dưới đều là suy luận. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]

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

- Một phiên bản docs trước đây mô tả việc triển khai qua proxy hoặc kết nối gRPC trực tiếp tới các nút P2P. Trang guides được dẫn hiện chỉ hiển thị "Under Construction", nên không thể xác minh lại vào 2026-10-18. ([guides overview](https://docs.getoptimum.xyz/docs/how-to-guides/overview)) [claimed]

## Cổng của Gateway (Gateway ports)

- Gateway lắng nghe trên TCP 33212 cho libp2p host hướng tới client đồng thuận (consensus client), TCP 33213 cho mesh mump2p (gateway với gateway), và TCP 48123 cho máy chủ HTTP telemetry. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Còn tranh cãi (Disputed)

Các giá trị khác nhau giữa những phần của cùng một trang docs:

- OPTIMUM_MESH_MIN: 3 trong bảng tham số, 4 trong Quick Start và Defaults Reference. Trang không nói giá trị nào được ưu tiên.
- Cổng API: 9090 và 8081.
- Mức log: debug và production.
- Thư mục identity: `/identity` và `/tmp`.
- OPTIMUM_THRESHOLD: bảng tham số nói 0.75 là tỷ lệ shard cần có "to forward or decode". Trang docs p2p mô tả ForwardShardThreshold là ngưỡng chuyển tiếp và nói giải mã cần k shard độc lập tuyến tính. Việc OPTIMUM_THRESHOLD có phải cùng thiết lập đó hay không là giả định, không được nêu rõ. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- Cổng 33212: bảng tham số liệt kê nó là cổng gRPC giữa proxy và nút P2P (SIDECAR_PORT). Gateway README dùng 33212 cho libp2p host hướng tới client đồng thuận. Có thể đây là hai sản phẩm khác nhau, và không nguồn nào nói rõ. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
