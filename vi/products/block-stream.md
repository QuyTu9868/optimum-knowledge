---
title: Consumer block stream
last_verified: 2026-10-20
status: documented in gateway manual and ADR-0011; account enablement not documented
lang: vi
translation_of: products/block-stream.md
source_sha: 606622f42083
---

# Luồng khối cho consumer (Consumer block stream)

Block stream cho consumer là tính năng của gateway, phục vụ các beacon block đã giải mã qua WebSocket hoặc gRPC cho các consumer phía sau của bạn. Đây là đường dành cho các tài khoản không chạy validator (nút xác thực).

Trang này mô tả những gì tài liệu chính thức và manual của gateway nói tính đến 2026-10-20. Link manual trỏ tới phiên bản "latest" đọc vào ngày đó (cùng nội dung có trong v1.3.2). Docs nói rằng "block stream" là một tính năng của gateway, không phải sản phẩm riêng của Optimum. ([docs: block stream](https://docs.getoptimum.xyz/operate/block-stream)) [confirmed]

## Phía gateway (Gateway side)

- Luồng này tắt mặc định và chỉ đọc. Consumer không thể publish vào mesh (mạng lưới kết nối). ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md), [gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- Gateway chỉ stream (stream-only) được khởi động bằng `OPT_STREAM_ENABLE` và `OPT_STREAM_ONLY`. Chỉ đặt một trong hai thì nó không chạy. Cổng 33212 không được publish. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- Tài khoản không có validator chọn "A feed for my consumers" trong Console để nhận lệnh stream-only. Lệnh đầy đủ, các cổng và các health check nằm ở [run-the-gateway.md](run-the-gateway.md). ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- Ở chế độ stream-only, gateway vẫn tham gia mesh nhưng không publish. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream), [docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Manual nói rằng luồng này đang chạy trên Hoodi và Mainnet. Đây là tuyên bố về mức sẵn sàng do chính Optimum đưa ra. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [claimed]

## Endpoint và giá trị mặc định (Endpoints and defaults)

- WebSocket: `ws://127.0.0.1:9600/api/v1/stream/blocks`, với `mode=metadata` (mặc định) hoặc `mode=raw`. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- gRPC: `127.0.0.1:9601`, service `BlockStreamService`, method `Subscribe`. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Cả hai listener mặc định bind vào loopback (nhưng xem mục Disputed về lệnh của Console). Bind ngoài loopback thì phải giữ xác thực bật, và gateway không tự xử lý TLS (không làm TLS termination), nên muốn mở ra công khai cần một proxy TLS. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Mặc định: tổng cộng 256 kết nối, 8 kết nối mỗi key, bộ đệm mỗi kết nối là 64 sự kiện. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]

## Token và xác thực (Tokens and authentication)

- Consumer key (tiền tố `osc_`) được tạo trong Console ở tab "Stream consumers", chỉ hiện một lần, mỗi consumer một key, và gắn với mạng của gateway (Hoodi hoặc Mainnet). ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- Consumer gửi key tới `https://auth.getoptimum.io/api/v1/stream/token` và nhận về một Bearer JWT với `aud=stream`. Thời hạn mặc định là 3600 s, tối đa 21600 s. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- JWT được đặt trong header `Authorization`. Trình duyệt gửi nó qua `Sec-WebSocket-Protocol` dưới dạng `bearer.<jwt>` cạnh marker `optimum.stream.v1`. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Gateway kiểm tra chữ ký tại chỗ dựa trên JWKS ở `remote_auth_url`. Thu hồi key sẽ chặn token mới, nhưng token đã cấp vẫn dùng được cho tới khi hết hạn. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- Có thể gửi token mới trên luồng đang mở để làm mới. Chế độ xác minh lại mặc định là `observe`, chỉ đếm lỗi nhưng giữ luồng. `enforce` thì đóng luồng. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]

## Hành vi giao thức (Protocol behaviour)

- Các frame gồm `block`, `lagged` (số lượng bị bỏ, cộng dồn sau khi bộ đệm tràn) và `heartbeat` (mặc định mỗi 20 s). ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- Chế độ metadata mang slot (khung 12 giây của Ethereum), proposer index (chỉ số của nút đề xuất khối), parent root và state root, kích thước, nguồn (`libp2p` hoặc `mump2p`), thời điểm nhận và gateway id. Chế độ raw thêm các byte khối `ssz_snappy`. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Không có replay (phát lại): mỗi lần kết nối lại để lại một khoảng trống vĩnh viễn, và khối nhận được qua cả hai đường sẽ tới hai lần, mỗi nguồn một lần. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- ADR-0011 (bản ghi quyết định kiến trúc) nói rằng consumer không thể xác minh chế độ metadata và mọi trường thời gian, nên cần một đường truyền đáng tin cậy. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]

## Còn tranh cãi (Disputed)

- Manual và ADR-0011 nói rằng cả hai listener mặc định bind vào loopback. Lệnh stream-only của Console đặt `OPT_STREAM_ADDR` và `OPT_STREAM_GRPC_ADDR` thành 0.0.0.0 bên trong container, và chỉ publish ra loopback của máy chủ (cũng được ghi ở [run-the-gateway.md](run-the-gateway.md)). ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Vị trí trong Console khác nhau tùy trang: "Keys" rồi "Stream consumers" ([docs: block stream](https://docs.getoptimum.xyz/operate/block-stream)); "Gateways & keys" rồi "Stream consumers" ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)); "API keys" hoặc "Manage Gateways" ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)). [confirmed]
- Docs nói rằng luồng này mang các khối. Nhãn trong sơ đồ của manual còn ghi "blobs", nhưng phần văn bản của manual và ADR-0011 chỉ nêu beacon block, còn các topic khác là non-goal (ngoài mục tiêu). ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream), [ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]

## Chưa đề cập (Not yet covered)

- Truy cập stream-only có cần Optimum bật tài khoản không, và giá hay phí nếu có: các nguồn này không nói.
- Độ trễ (latency) hay uptime đo được của luồng: không nguồn nào đưa số liệu.
- Key `osc_` và endpoint token chỉ xuất hiện trong manual của gateway, không có trên site docs.
- Bản kiểm toán (audit) của ProbeLab có bao gồm luồng này không: không được nêu. Các trang liên quan: ../technology/gateway-design.md, ../technology/sidecar-gateway.md.
