---
title: Flexnodes and the Latency Marketplace
last_verified: 2026-10-21
status: claimed, forward-looking, plans not final
lang: vi
translation_of: technology/flexnodes.md
source_sha: e845fb607556
---

# Flexnode và chợ độ trễ (Flexnodes and the Latency Marketplace)

- Tài liệu của Optimum định nghĩa Flexnode là một nút do operator (bên vận hành) chạy, tham gia vào coded gossip (gossip có mã hóa) của Optimum và phục vụ các memory request (yêu cầu truy cập bộ nhớ). ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [confirmed]
- Optimum mô tả Flexnode là mạng lưới nút toàn cầu giúp đẩy nhanh việc lan truyền dữ liệu, với các sản phẩm lưu trữ dự kiến ra sau. ([flexnodes blog, 2026-01-20](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Trang sản phẩm gọi mạng này là một mesh (mạng lưới kết nối) toàn cầu gồm các Flexnode dùng RLNC (mã hóa mạng tuyến tính ngẫu nhiên) để chuyển dữ liệu blockchain nhanh hơn. ([product page](https://www.getoptimum.xyz/product)) [claimed]
- Theo blog, bất kỳ thiết bị nào có kết nối internet cũng có thể chạy phần mềm Flexnode. ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]

## Flexnode làm gì, theo các video của Optimum (What a Flexnode does, per Optimum's videos)

- Flexnode là nút gửi các phương trình đã mã hóa cho bên nhận như validator (nút xác thực). Nó có thể là validator hoặc không. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Trong topology (cấu trúc kết nối mạng), Flexnode là các relay (nút trung chuyển) nằm giữa proposer (nút đề xuất khối) và bên nhận. Chúng tạo ra các phương trình mã hóa mới ngay trên đường đi, và bên nhận kết nối tới nhiều Flexnode. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0), [Exploring Network Topologies: Optimum Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Bên nhận không chọn được mình nhận phương trình nào. Nó nhận bất cứ gì gửi tới, và chọn kết nối với những Flexnode nào. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Tính đến video tháng 1 năm 2026, Flexnode chạy mump2p để lan truyền dữ liệu. DeRAM và các dịch vụ khác sẽ đến sau, và operator sẽ tự chọn cung cấp dịch vụ nào. ([Flexnodes: a global network of data accelerators, 2026-01-20](https://www.youtube.com/watch?v=DguSwGFvftc)) [claimed]
- Optimum nói rằng không có kế hoạch dùng slashing (phạt cắt stake) cho Flexnode. Flexnode nào ngoại tuyến thì chỉ đơn giản là không có thu nhập, còn mesh có mã hóa vẫn chạy bình thường khi thiếu nó. ([Exploring Network Topologies: Flexnodes and slashing, 2026-02-24](https://www.youtube.com/watch?v=3BIGj-vso2I)) [claimed]
- Một nhận xét thoáng qua trong Flexnodes Explained nói hành vi cố ý gây hại sẽ bị trừng phạt, nhưng chưa có cơ chế nào cho việc đó được mô tả. Điều này khó khớp với kế hoạch không dùng slashing ở trên. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]
- Yêu cầu tài nguyên được mô tả là nhẹ: chạy được trên laptop, và mục tiêu là cả điện thoại thông minh. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]

## Chợ độ trễ (Latency Marketplace), dự kiến

- Việc chạy Flexnode sẽ được thưởng thông qua một "Latency Marketplace". ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Validator sẽ trả tiền cho các phương trình mã hóa mình cần, và operator được trả tiền khi cung cấp chúng. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Những operator đầu tiên nhiều khả năng là các đối tác validator hiện có của Optimum. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Optimum nói chưa có gì ở đây là cuối cùng. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [confirmed]
- Trong các video về topology, bên nhận trả tiền cho từng Flexnode cung cấp phương trình. Điều này được mô tả là kế hoạch, chưa chạy thật. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Việc một thị trường bền vững có chạy được hay không được mô tả là câu hỏi mở, cần thử nghiệm. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]

## Cách dùng trong bài ra mắt (2026-10-20) (Launch post usage)

- Bài về mainnet gọi Optimum Network là "a global mesh of all the nodes running our chain specific network protocols" và nói "We refer to these as Flexnodes". ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Bài nói Flexnode thực hiện RLNC sharding, mã hóa và giải mã trên dữ liệu khối, chuyển tiếp shard (mảnh mã hóa) nhanh và tạo shard mới, và một mesh lớn hơn, đa dạng địa lý hơn thì giao dữ liệu nhanh hơn. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Bài không nhắc tới Latency Marketplace, thanh toán hay sản phẩm lưu trữ. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Cách phân tầng trong bài: mump2p xây trên RLNC, và Optimum Network (Flexnodes) nằm phía trên. Hai dịch vụ nằm ở [../products/console-and-signal.md](../products/console-and-signal.md). ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]

## Còn tranh cãi (Disputed)

- **Ai được tính là Flexnode.** Blog định nghĩa Flexnode là mọi nút chạy các giao thức mạng của Optimum trong mesh, nghe như bao gồm cả các nút mump2p phía validator. Các dòng video trước đó lại mô tả Flexnode là relay riêng, do operator vận hành và có thể không phải validator, được trả tiền qua một chợ dự kiến. Bài không nói 16 hay 20 operator ra mắt có chạy Flexnode theo nghĩa đó hay không. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0))
- **Ngày của bài blog Flexnodes.** Dòng cũ ở trên ghi 2026-01-20. Metadata của chính trang bài ghi xuất bản 2026-04-04, danh sách blog hiện April 4, 2026, và nội dung trang cũng có "January 20, 2026". Video YouTube cùng tên đề ngày 2026-01-20, nên tháng 1 có lẽ là ngày của video, nhưng không nguồn nào nói vậy. ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators); [video](https://www.youtube.com/watch?v=DguSwGFvftc))
- **Memory request.** Docs intro nói flexnode phục vụ memory request. Video Flexnodes tháng 2 năm 2026 lại nói các sản phẩm lưu trữ (bộ nhớ cập nhật được, DeRAM) sẽ được bổ sung sau và hiện nay Flexnode chỉ làm việc lan truyền dữ liệu. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro); [Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0))
