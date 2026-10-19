---
title: How data reaches many nodes
last_verified: 2026-10-18
status: claimed, Optimum's own explanation, models not measurements
lang: vi
translation_of: technology/network-topologies.md
source_sha: 37d0202d74fd
---

# Dữ liệu đến được nhiều nút như thế nào (How data reaches many nodes)

Đây là phần giải thích của chính Optimum, lấy từ loạt video Network Topology và video về vòng đời giao dịch. Chúng là mô hình để dạy, không phải số đo thực tế.

## Hành trình của một giao dịch (Journey of a transaction)

- Một giao dịch bắt đầu từ thiết bị ở nhà, đi qua Wi-Fi, điểm truy cập của khu dân cư và sợi quang dùng chung, rồi qua rất nhiều switch và router. Switch là máy nối đầu vào với đầu ra, còn định tuyến (routing) là phần mềm quyết định xử lý từng gói tin ra sao. ([The real transaction lifecycle, 2025-10-22](https://www.youtube.com/watch?v=K_TYCGxfhr0)) [claimed]
- Giao dịch đến block builder (bên dựng khối) và builder ghép chúng thành một khối. Khối này đi tới proposer (nút đề xuất khối), nút này phải gửi khối cho nhiều validator (nút xác thực) và gom đủ phiếu để đạt đồng thuận. ([The real transaction lifecycle, 2025-10-22](https://www.youtube.com/watch?v=K_TYCGxfhr0)) [claimed]
- Kéo đường riêng từ mọi proposer tới mọi validator là bất khả thi: khoảng 1,000 validator sẽ cần chừng một triệu đường riêng. Hệ thống thật chạy trên mạng chuyển mạch dùng chung, nên không có đường nào thực sự dành riêng. ([The real transaction lifecycle, 2025-10-22](https://www.youtube.com/watch?v=K_TYCGxfhr0)) [claimed]

## Các cách đến được nhiều nút (Ways to reach many nodes)

- **Mỗi bên nhận một kết nối (hình sao):** bên gửi đến mọi bên nhận chỉ trong một chặng, nhưng tất cả kết nối dùng chung đường ra của bên gửi, nên với n bên nhận, mỗi bên được khoảng 1/n dung lượng của bên gửi. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- **Chuỗi nối tiếp (daisy chain):** mỗi nút chuyển tiếp cho nút kế, nên mọi đường đều chạy ở tốc độ đầy đủ và thông lượng (throughput) lý tưởng không giảm khi thêm nút. Nếu áp dụng mã đầu cuối trên cả chuỗi, thông lượng giảm theo (1 - epsilon) lũy thừa n, tiến dần về không khi chuỗi dài. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- **Cây multicast:** mỗi đường dùng chung chỉ có một bản sao đi qua, nên không phải nhân bản dữ liệu như kiểu mỗi bên nhận một kết nối. Tìm một cây tốt trong mesh (mạng lưới kết nối) dày đặc là bài toán NP-khó (NP-hard). ([Exploring Network Topologies: Tree Multicast, 2026-01-22](https://www.youtube.com/watch?v=XdqVpE5qUOo)) [claimed]
- **Mesh gossip:** gossip (lan truyền kiểu tin đồn) không mã hóa chống mất gói bằng cách giới hạn số chặng, và diễn giả ước lượng thông lượng của nó suy giảm cỡ 1 - nε. Mạng của Ethereum được mô tả là gần với chuỗi nối tiếp hơn hình sao, nhưng vẫn là một mesh. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- **Mesh có mã hóa:** mọi kết nối sẵn có đều có thể chở các phương trình, nên bên nhận không bị buộc vào một đường duy nhất. Tái mã hóa (recoding) ở mọi relay (nút trung chuyển) mà không cần giải mã giữ thông lượng ở mức tối ưu của một đường, bất kể chuỗi có bao nhiêu nút, đổi lại là nhiều chặng hơn và thêm chút độ trễ (latency). ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- Các nút có thể tự quyết định gửi bao nhiêu phương trình chỉ dựa vào các nút lân cận, không cần biết topology toàn cục, và chạy trong thời gian đa thức. ([Exploring Network Topologies: RLNC, 2026-01-30](https://www.youtube.com/watch?v=LPO9iEJPYD4)) [claimed]

## Vì sao gửi lại gây hại (Why resends hurt)

- Trên một tuyến đơn qua mesh, TCP khắc phục mất gói bằng cách xác nhận rồi gửi lại, và việc gửi lại phải lặp luôn cả những chặng đã thành công. Thông lượng giảm còn (1 - epsilon) trên mỗi chặng, các hệ số này nhân dồn qua cả tuyến, trong khi mã hóa trên cùng tuyến chỉ bị giới hạn bởi chặng yếu nhất. ([Exploring Network Topologies: Point to Point TCP, 2026-01-15](https://www.youtube.com/watch?v=7QBi4cD1sX8)) [claimed]
- TCP/IP tới được nhiều bên nhận bằng cách mở một kết nối riêng tới từng bên, nên đường đầu tiên của bên gửi phải chở cùng một dữ liệu một lần cho mỗi bên nhận. ([Exploring Network Topologies: Tree Multicast, 2026-01-22](https://www.youtube.com/watch?v=XdqVpE5qUOo)) [claimed]

Xem thêm [rlnc.md](rlnc.md) và [flexnodes.md](flexnodes.md).
