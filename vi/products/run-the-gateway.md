---
title: Running the Optimum Gateway
last_verified: 2026-10-20
status: operator facts from official docs and gateway manual (v1.3.2); the manual says enrollment is invite-only, the Console docs describe self-service sign-up
lang: vi
translation_of: products/run-the-gateway.md
source_sha: 1f65fd2f0edf
---

# Chạy Optimum Gateway (Running the Optimum Gateway)

Gateway là chương trình mà nhà vận hành (operator) chạy cạnh beacon node (hoặc chạy riêng ở chế độ chỉ stream, stream-only) để tham gia mesh (mạng lưới kết nối) của Optimum. Trang này liệt kê các thông tin vận hành lấy từ tài liệu chính thức.

Trang này mô tả những gì tài liệu chính thức và manual của gateway nói tính đến 2026-10-20. Quy trình đăng ký (enrollment) và tên sản phẩm nằm trong [console-and-signal.md](console-and-signal.md), gồm cả chỗ docs, ADR (bản ghi quyết định kiến trúc) và manual dùng thuật ngữ khác nhau.

Nền tảng về việc gateway làm gì nằm ở [../technology/sidecar-gateway.md](../technology/sidecar-gateway.md).

## Yêu cầu (Requirements)

- Cần một máy có Docker, đặt cạnh beacon node. Gateway chỉ stream có thể chạy trên bất kỳ máy nào bạn kiểm soát. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Cần một tài khoản Console và một enrollment key (khóa đăng ký gateway), khóa này chỉ hiện một lần. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Phần cứng tối thiểu là 2+ vCPUs, 512MB RAM và 500MB+ ổ đĩa. Khuyến nghị 4+ vCPUs. ([gateway manual v1.3.2: quick start](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/01_quick_start.md)) [confirmed]
- Các client đồng thuận (consensus client) được hỗ trợ là Prysm, Lighthouse, Teku, Nimbus và Lodestar. ([gateway manual v1.3.2: index](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/index.md)) [confirmed]
- Manual của gateway nói rằng quyền truy cập chỉ theo lời mời: Optimum phải onboard operator trước khi tạo được key. ([gateway manual v1.3.2: quick start](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/01_quick_start.md)) [confirmed]

## Một container và đăng ký (One container and enrollment)

- Lệnh production của Console là một lệnh `docker run` chạy `docker.io/getoptimum/gateway:latest` với `-config ""`. Thiếu cờ này, tiến trình đi tìm một file cấu hình không có trong image rồi thoát. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- `OPT_JOIN_KEY` chứa enrollment key. `OPT_GATEWAY_CLUSTER_ID` không có giá trị mặc định, và tiến trình thoát nếu để trống. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Cluster id phải là giá trị Console in ra cho key đó. Giá trị khác vẫn xác thực được nhưng mọi lần bắt tay (handshake) với mesh đều thất bại. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- `OPT_GATEWAY_ID` chỉ là nhãn đăng ký cho máy này. Nếu không đặt, giá trị là `dev-gateway` và đăng ký không có nhãn. Sau khi đăng ký, id lúc chạy lấy từ token. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Một key có thể dùng cho nhiều gateway, mỗi gateway một tên riêng. Gateway thứ hai đăng ký bằng tên đã dùng sẽ bị từ chối với HTTP 409 (ADR 0013 cũng dùng 409 cho giới hạn số lượng key). ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Không đặt `OPT_CHAIN_ID`. Chain được lấy từ key. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Các endpoint auth và bootstrap (`auth.getoptimum.io`, `bootstrap.getoptimum.io`) được tích hợp sẵn. Chỉ ghi đè cả hai cùng lúc khi Optimum đưa ra một môi trường khác. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Đổi bất kỳ `-e` nào thì phải xóa và tạo lại container. Restart thường vẫn giữ môi trường cũ. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]

## Cổng (Ports)

- `33212/tcp` là cổng client đồng thuận kết nối tới. Cổng này được publish trên mọi interface, chỉ với gateway validator (nút xác thực), không áp dụng cho chế độ chỉ stream. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- `33213/tcp` là cổng mesh, được publish trên mọi interface. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- `48123/tcp` phục vụ `/health`, `/metrics` và `/api/v1/self_info`, và chỉ được publish tới `127.0.0.1`. Không dùng `--network host`. ([docs: network](https://docs.getoptimum.xyz/signal/network), [docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Chế độ chỉ stream còn publish thêm WebSocket `9600` và gRPC `9601` tới loopback, với xác thực consumer bật mặc định. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- Cần truy cập ra ngoài tới các endpoint auth và bootstrap và tới các peer (nút ngang hàng) của mesh. Remote push cần HTTPS ra ngoài (443). ([docs: network](https://docs.getoptimum.xyz/signal/network), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]

## Thư mục danh tính (Identity directories)

- Mount các thư mục bền vững trên máy chủ lên `/tmp/libp2p` và `/tmp/mump2p` (docs dùng `$HOME/optimum-gateway/libp2p` và `.../mump2p`). Các thư mục mặc định không được giữ lại sau khi restart, và danh tính mới làm mất hiệu lực peer id đã đưa cho client. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Trên máy dùng SELinux, thêm `:z` vào mỗi mount, nếu không container lỗi `write identity data: permission denied`. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin), [docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]

## Kết nối peer cho client đồng thuận (Peering the consensus client)

- Lấy peer id từ `curl -s http://localhost:48123/api/v1/self_info` rồi ghép `/ip4/<host>/tcp/33212/p2p/<peer id>` với một địa chỉ mà client truy cập được. Đừng lấy multiaddr đầu tiên trong danh sách, vì đó thường là địa chỉ container. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Prysm dùng `--peer`, Teku dùng `--p2p-direct-peers` cùng địa chỉ đó trong `--p2p-static-peers`, Nimbus dùng `--direct-peer` (file netkey ổn định), Lodestar dùng `--directPeers`. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Lighthouse nối theo chiều ngược lại: gateway chủ động kết nối tới nút qua `OPT_DIRECT_CL_PEERS`. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Khi đã đặt `OPT_DIRECT_CL_PEERS`, nó cũng thành danh sách cho phép (allowlist): client đồng thuận nào không được nêu tên sẽ bị ngắt kết nối. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]

## Kubernetes

- Lệnh của Console là `docker run`. Cùng gateway đó chạy được bằng Helm chart chính thức, và pod không lưu bền dữ liệu danh tính sẽ có peer id mới mỗi lần restart. ([docs: Kubernetes](https://docs.getoptimum.xyz/operate/kubernetes)) [confirmed]
- Chart cần Kubernetes 1.25+, Helm 3.8+, một nút có IP công khai, TCP 33213 chiều vào, và một namespace cho phép `hostNetwork` và `hostPort` (Pod Security `privileged`). ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]
- `hostNetwork` là mặc định vì gateway quảng bá các địa chỉ nó thấy trong namespace của chính nó và không có cách ghi đè địa chỉ announce. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]
- Một Helm release là một gateway và một client. Chart từ chối `gateway.directClPeers` để trống. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]
- Giá trị của chart nhắm tới API key (`apiKey.existingSecret`). Dùng enrollment key (join key) trên Helm thì bạn phải tự cấu hình phần đấu nối, và docs của Console nói rằng giá trị của chart vẫn mô tả đường API key. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md), [docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Tài nguyên được nêu là request 150m CPU và 2Gi bộ nhớ, với giới hạn bộ nhớ 4Gi. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]

## Telemetry và /health (Telemetry and /health)

- Console đặt cả `OPT_ENABLE_TELEMETRY` và `OPT_REMOTE_PUSH_ENABLE`. Bật push mà không bật telemetry thì bị từ chối khi khởi động, còn chỉ bật telemetry thì không push. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Remote push gửi log và metrics của gateway tới Loki và Mimir của chính Optimum. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- `/metrics` không được phục vụ cho tới khi bật telemetry. ([docs: telemetry](https://docs.getoptimum.xyz/operate/telemetry)) [confirmed]
- `/health` trả về 200 với `"healthy"` hoặc 503 với `"degraded"` kèm danh sách `failing`, dựa trên sáu kiểm tra: cl_peers, mump2p_peers, subscribed_topics, last_block_age_sec (dưới 60 s), cl_health và mump2p_health (có lưu lượng trong 30 s gần nhất). ([gateway manual v1.3.2: telemetry](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/03_telemetry.md)) [confirmed]
- Gặp 503 ngay sau khi khởi động là bình thường: các kiểm tra mesh chỉ qua sau khi khối đầu tiên tới, và với gateway validator thì các kiểm tra phía client vẫn lỗi cho tới khi client được kết nối peer. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Trên gateway chỉ stream, `cl_peers`, `cl_health` và `subscribed_topics` có giá trị `skipped` (bỏ qua), không phải lỗi. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: telemetry](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/03_telemetry.md)) [confirmed]

## Các thiết lập chính (Main settings)

- Giá trị mặc định: `OPT_AGENT_LIB_P2P_PORT` 33212, `OPT_AGENT_MUMP2P_PORT` 33213, `OPT_TELEMETRY_PORT` 48123, `OPT_LOG_LEVEL` debug, telemetry và remote push là false. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- `OPT_ENROLL_CRED_DIR` mặc định là thư mục danh tính mump2p và phải bền vững. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Block stream (luồng khối) cho consumer được bật bằng `OPT_STREAM_ENABLE`. `OPT_STREAM_ONLY` đòi hỏi biến đó, và các biến `OPT_STREAM_*` khác đặt địa chỉ, xác thực và giới hạn kết nối. Giá trị mặc định và chỗ còn tranh cãi về bind nằm ở [block-stream.md](block-stream.md). ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Các topic được cố định trong binary: `beacon_block` và các subnet attestation (phiếu xác nhận) từ 0 đến 63. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Token có hiệu lực 6 giờ và tự làm mới. Credential bị thu hồi sẽ mất quyền truy cập ở lần hết hạn kế tiếp. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]

## Còn tranh cãi (Disputed)

- Cổng: số cổng khớp nhau giữa Gateway README (như tóm tắt ở [../technology/sidecar-gateway.md](../technology/sidecar-gateway.md)), docs và manual. Ví dụ Docker của README publish 48123 trên mọi interface (`-p 48123:48123/tcp`), trong khi docs và manual chỉ bind nó vào 127.0.0.1. ([Gateway README](https://github.com/getoptimum/optimum-gateway), [docs: network](https://docs.getoptimum.xyz/signal/network), [gateway manual v1.3.2: network requirements](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/00_network_requirements.md)) [confirmed]
- [../technology/parameters.md](../technology/parameters.md) liệt kê `SIDECAR_PORT` 33212 là cổng gRPC giữa proxy và nút (sidecar trong README của optimum-dev-setup-guide, xem [../code/sdks-and-tools.md](../code/sdks-and-tools.md)). Docs của gateway lại dùng 33212 cho listener libp2p của client đồng thuận. Có vẻ đây là hai stack khác nhau dùng chung một số. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- Credential: docs của Console chỉ dùng `OPT_JOIN_KEY` (the "enrollment key"; ADR gọi nó là org join key). Manual v1.3.2 còn ghi thêm `OPT_API_KEY` (`ogw_live_...`), mỗi gateway một key, loại trừ lẫn nhau với join key. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Image: Console dùng tag `:latest` luôn thay đổi. Manual ghi `v1.3.2` và hướng dẫn Helm yêu cầu một digest. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: quick start](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/01_quick_start.md), [gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]

## Chưa đề cập (Not yet covered)

- Việc đăng ký có mở cho mọi người không: manual nói chỉ theo lời mời, còn docs của Console mô tả đăng ký tự phục vụ, nên quyền truy cập có thể phụ thuộc vào việc Optimum bật tài khoản.
- Chi phí chạy gateway, hoặc operator nhận lại được gì: docs không đưa số liệu nào.
- Cờ PeerDAS của Lighthouse v8: docs trỏ tới quick start của gateway (bản latest) cho phần này, và chúng không có trong các file v1.3.2 đã đọc ở đây. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
