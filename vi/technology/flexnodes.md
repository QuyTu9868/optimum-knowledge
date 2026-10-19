---
title: Flexnodes and the Latency Marketplace
last_verified: 2026-10-18
status: claimed, forward-looking, plans not final
lang: vi
translation_of: technology/flexnodes.md
source_sha: 5c596cdf8067
---

# Flexnode và chợ độ trễ (Flexnodes and the Latency Marketplace)

- Tài liệu của Optimum định nghĩa Flexnode là một nút do operator (bên vận hành) chạy, tham gia vào coded gossip (gossip có mã hóa) của Optimum và phục vụ các memory request (yêu cầu truy cập bộ nhớ). ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [confirmed]
- Optimum mô tả Flexnode là mạng lưới nút toàn cầu giúp đẩy nhanh việc lan truyền dữ liệu, với các sản phẩm lưu trữ dự kiến ra sau. ([flexnodes blog, 2026-01-20](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Trang sản phẩm gọi mạng này là một mesh (mạng lưới kết nối) toàn cầu gồm các Flexnode dùng RLNC (mã hóa mạng tuyến tính ngẫu nhiên) để chuyển dữ liệu blockchain nhanh hơn. ([product page](https://www.getoptimum.xyz/product)) [claimed]
- Theo blog, bất kỳ thiết bị nào có kết nối internet cũng có thể chạy phần mềm Flexnode. ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]

## Flexnode làm gì, theo các video của Optimum (What a Flexnode does, per Optimum's videos)

- Flexnode là nút gửi các phương trình đã mã hóa cho bên nhận như validator (nút xác thực). Nó có thể là validator hoặc không. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Trong topology (cấu trúc kết nối mạng), Flexnode là các relay (nút trung chuyển) nằm giữa proposer (nút đề xuất khối) và bên nhận. Chúng tạo ra các phương trình mã hóa mới ngay trên đường đi, và bên nhận kết nối tới nhiều Flexnode. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]
- Bên nhận không chọn được mình nhận phương trình nào. Nó nhận bất cứ gì gửi tới, và chọn kết nối với những Flexnode nào. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Hiện nay Flexnode chạy mump2p để lan truyền dữ liệu. DeRAM và các dịch vụ khác sẽ đến sau, và operator sẽ tự chọn cung cấp dịch vụ nào. ([Flexnodes: a global network of data accelerators, 2026-01-20](https://www.youtube.com/watch?v=DguSwGFvftc)) [claimed]
- Optimum nói rằng không có kế hoạch dùng slashing (phạt cắt stake) cho Flexnode. Flexnode nào ngoại tuyến thì chỉ đơn giản là không có thu nhập, còn mesh có mã hóa vẫn chạy bình thường khi thiếu nó. ([Exploring Network Topologies: Flexnodes and slashing, 2026-02-24](https://www.youtube.com/watch?v=3BIGj-vso2I)) [claimed]
- Hành vi cố ý gây hại sẽ bị trừng phạt, nhưng chưa có cơ chế nào cho việc đó được mô tả. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]
- Yêu cầu tài nguyên được mô tả là nhẹ: chạy được trên laptop, và mục tiêu là cả điện thoại thông minh. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]

## Chợ độ trễ (Latency Marketplace), dự kiến

- Việc chạy Flexnode sẽ được thưởng thông qua một "Latency Marketplace". ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Validator sẽ trả tiền cho các phương trình mã hóa mình cần, và operator được trả tiền khi cung cấp chúng. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Những operator đầu tiên nhiều khả năng là các đối tác validator hiện có của Optimum. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Optimum nói chưa có gì ở đây là cuối cùng. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [confirmed]
- Trong các video về topology, bên nhận trả tiền cho từng Flexnode cung cấp phương trình. Điều này được mô tả là kế hoạch, chưa chạy thật. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Việc một thị trường bền vững có chạy được hay không được mô tả là câu hỏi mở, cần thử nghiệm. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]

## Còn tranh cãi (Disputed)

- **Memory request.** Docs intro nói flexnode phục vụ memory request. Video Flexnodes tháng 2 năm 2026 lại nói các sản phẩm lưu trữ (bộ nhớ cập nhật được, DeRAM) sẽ được bổ sung sau và hiện nay Flexnode chỉ làm việc lan truyền dữ liệu. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro); [Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0))
