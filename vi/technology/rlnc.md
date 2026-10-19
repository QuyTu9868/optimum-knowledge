---
title: RLNC (Random Linear Network Coding)
last_verified: 2026-10-18
status: confirmed for mechanism, claimed for advantages
lang: vi
translation_of: technology/rlnc.md
source_sha: 92e7777ec50e
---

# RLNC (mã hóa mạng tuyến tính ngẫu nhiên)

## Tóm tắt một dòng (One-line version)

Thay vì chuyển tiếp bản sao của thông điệp, mỗi nút gửi đi các tổ hợp ngẫu nhiên (mix) của các mảnh dữ liệu (fragment). Bên nhận cần đủ số mix độc lập tuyến tính (linearly independent), không cần đúng những mảnh cụ thể nào.

## Cơ chế (Mechanism)

- mump2p chia mỗi thông điệp thành các shard (mảnh mã hóa) thay vì gửi nguyên cả thông điệp. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Mỗi nút gửi một shard nhỏ là tổ hợp tuyến tính (linear combination) của dữ liệu gốc, không gửi bản sao đầy đủ. ([gossip problem blog, 2025-08-20](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- Các tổ hợp dùng hệ số ngẫu nhiên, không có cấu trúc cố định hay tất định. ([battle of the codes, 2025-04-30](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Một nút chỉ cần k shard độc lập tuyến tính để dựng lại thông điệp gốc. Shard nào cũng được. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Optimum nói rằng các gói mã hóa tiếp tục mang thông tin mới cho tới khi bên nhận giải mã được. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [claimed]
- Docs nói rằng RLNC giảm dư thừa và chịu mất gói tốt hơn. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [claimed]
- Docs nói thêm rằng bên nhận kiểm tra từng shard xem có độc lập tuyến tính không và bỏ những shard dư, nên không có gì đảm bảo mỗi shard đều mang thông tin mới. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Docs nói thông điệp được chia thành k mảnh dữ liệu, rồi biến thành n shard bằng các tổ hợp tuyến tính ngẫu nhiên trên trường hữu hạn (finite field). Bên nhận giải mã bằng đại số tuyến tính (nghịch đảo ma trận) khi đã có k shard độc lập tuyến tính. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]

## Ví dụ minh họa (A worked example)

Đây là các ví dụ giảng dạy của Médard. Các con số chỉ để minh họa. Hệ thống thật tính trên trường hữu hạn với hệ số ngẫu nhiên, nơi các mix độc lập tuyến tính chỉ có xác suất cao chứ không chắc chắn, còn số nhỏ chọn tay thì có thể bị phụ thuộc tuyến tính.

- Lấy ba mảnh x1, x2 và x3. Một validator (nút xác thực) ở xa nguồn nhận ba mix khác nhau, ví dụ 3x1 + 2x2 + x3, x1 + x2 + 5x3 và 11x1 + 2x2 + 13x3. Ba mix này đủ để nó giải ra x1, x2 và x3. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- Một bản sao lặp lại của x1 chỉ bảo vệ khi mất x1. Nó không giúp gì nếu mất x2. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- Ví dụ nhỏ nhất về khôi phục dữ liệu mất (erasure): gửi x1, x2, x3 và thêm x1 + x2 + x3. Nếu mất bất kỳ một mảnh nào, ba mảnh còn lại khôi phục được nó. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- Trong RLNC, mỗi mix có hệ số riêng, chọn ngẫu nhiên từ một trường hữu hạn đủ lớn, nên không có hệ số nào được định sẵn từ trước. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- Một nút có thể tạo mix mới từ các mix nó đang giữ, bằng cách nhân trọng số rồi cộng lại, mà không cần thấy dữ liệu gốc. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]

## Tái mã hóa tại relay (Recoding at relay nodes)

Đây là tính chất Optimum dựa vào nhiều nhất.

- Relay (nút trung chuyển) có thể trộn các gói mã hóa đang giữ thành gói mã hóa mới mà không cần giải mã trước. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- Một nút giữ nhiều shard độc lập có thể tạo shard mới từ chúng mà không cần giải mã. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Một nút có thể bắt đầu chuyển tiếp shard trước khi dựng lại xong cả khối. ([implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed]
- Optimum cho rằng relay có thể giúp tạo các gói mã hóa còn thiếu ở mọi chặng. ([battle of the codes](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- Với tái mã hóa, mức mất gói của bên nhận chỉ phản ánh chặng cuối, không phải mất gói dồn lại qua mọi chặng. ([battle of the codes pt II, 2025-05-16](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Trong mump2p, shard từ publisher (bên phát hành thông điệp) được chuyển ngay cho các peer (nút ngang hàng) trong mesh (mạng lưới kết nối). Shard nhận từ peer thì được tái mã hóa và chuyển tiếp sau khi nút giữ đủ shard. Docs ghi ngưỡng này là ForwardShardThreshold ở một chỗ và là ShredFactor nhân ForwardShardThreshold ở chỗ khác, nên quy tắc chính xác chưa rõ. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- Ví dụ chuỗi của Optimum có ba nút nối tiếp và mỗi liên kết mất một gói. Relay chỉ chuyển tiếp cần 9 lượt truyền. Nút giữa giải mã rồi mã hóa lại cần 8 lượt truyền trong 8 bước thời gian. Nút giữa tái mã hóa mà không giải mã cần 8 lượt truyền trong 5 bước thời gian, vì hai liên kết chạy theo kiểu pipeline. ([RLNC encoding video, 2025-08-18](https://www.youtube.com/watch?v=S0ZtWWUKM_k)) [claimed]
- Với mã hóa đầu cuối, mức mất gói của mọi chặng cộng dồn lại và phải bù trước. Với tái mã hóa, mỗi chặng tự sửa phần mất của mình, nên chất lượng theo liên kết yếu nhất. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]

## RLNC so với Reed-Solomon và fountain codes (RLNC vs Reed-Solomon vs fountain codes)

- Reed-Solomon là mã MDS: n shard thì lấy k shard bất kỳ là giải mã được dữ liệu gốc. ([battle of the codes](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Fountain codes là mã rateless (không cố định tỷ lệ): sinh được dòng gói mã hóa không giới hạn. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Optimum cho rằng thông lượng (throughput) của mã khối và fountain codes giảm khi số chặng tăng, còn RLNC tránh được vì relay có thể tái mã hóa. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- Bài đó gọi các mã cố định là "a degenerate, needlessly constrained version of a random code". Tác giả: Kishori Konwar, Muriel Médard, Nicolas Nicolaou. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- Reed-Solomon không tái mã hóa được: relay hoặc chuyển tiếp những gì nó có, hoặc giải mã về dữ liệu gốc rồi mã hóa lại. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]
- Reed-Solomon được thiết kế cho một liên kết đơn có một bộ mã hóa và một bộ giải mã, và dùng đa thức trên trường hữu hạn nên chỉ cho phép một số độ dài và tỷ lệ mã nhất định. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]
- Mã tỷ lệ cố định quyết định phần dự phòng từ trước: 3 mảnh dữ liệu cộng 1 mảnh dự phòng (parity) là tỷ lệ 3/4, lãng phí mảnh dự phòng khi không mất gì và hỏng khi mất hai mảnh. Mã rateless (fountain) cứ gửi phương trình cho tới khi bên nhận báo là đủ. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- Médard gọi Reed-Solomon và Raptor codes là các trường hợp đặc biệt bị ràng buộc của RLNC, và nói RLNC chạy được như mã khối hoặc như mã rateless. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- Các diễn giả mô tả việc giải mã khi mất gói là giải các phương trình đã nhận, và cho rằng cách này đơn giản và nhanh. Không có số đo thời gian nào. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]
- Theo các diễn giả của Optimum, Turbine của Solana và Rotor của Alpenglow (đang được lên kế hoạch) dùng Reed-Solomon, còn Monad dùng Raptor codes. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]

### Cách Optimum mô tả các chain khác (How Optimum describes other chains)

Đây là mô tả của chính Optimum, không phải phân tích độc lập.

- Turbine của Solana dùng Reed-Solomon tỷ lệ 1/2: lấy 32 trong số 64 shred (mảnh dữ liệu của Solana) bất kỳ là khôi phục được dữ liệu. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Turbine giả định độ sâu cây là hai đến ba. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- RaptorCast của Monad nhắm tới việc lan truyền trong vòng 2x độ trễ (latency) một chiều ở trường hợp xấu nhất. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Mức tăng tốc trong Part II được thể hiện bằng một ví dụ minh họa đơn giản, không phải benchmark đo thực tế. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [confirmed]

## Trình mô phỏng (Simulator)

- Optimum dẫn liên kết tới một trình mô phỏng mạng tương tác, so sánh RLNC với các cách truyền dữ liệu khác. Trang này nói đây chỉ để minh họa, không phải hiệu năng mạng đo thực tế. Tên miền là gmum.cc, không phải getoptimum.xyz. ([simulator](https://gmum.cc/simulation-mesh/); được dẫn bởi [@get_optimum, 2026-07-29](https://x.com/get_optimum/status/2082514252737474686)) [claimed]
- Trình mô phỏng chạy ba chế độ song song trên cùng một topology: không mã hóa, Reed-Solomon (64 shard, giải mã được từ 32 shard bất kỳ) và RLNC có tái mã hóa. Mỗi nút mô phỏng bị giới hạn băng thông (bandwidth) vào và có khoảng 3 đến 5 peer. Médard nói đây không phải benchmark và không phải hệ thống chạy thật, chỉ là công cụ giúp hình dung trực quan. ([simulation video, 2026-04-28](https://www.youtube.com/watch?v=2dal03NwuOQ)) [claimed]
- Trong một lần chạy được trình diễn trong video, các con số xấp xỉ 7 s khi không mã hóa, 1.75 s với Reed-Solomon và 171 ms với RLNC. Số liệu lấy từ phụ đề tự động và chỉ một lần chạy, nên chỉ nên coi là gần đúng. ([simulation video, 2026-04-28](https://www.youtube.com/watch?v=2dal03NwuOQ)) [claimed]

## Còn tranh cãi (Disputed)

- **Chặng cuối hay liên kết yếu nhất.** Blog của Optimum nói rằng với tái mã hóa, mức mất gói của bên nhận chỉ phản ánh chặng cuối ([battle of the codes pt II, 2025-05-16](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]. Video tháng 3 năm 2026 nói chất lượng tổng thể là chất lượng của liên kết yếu nhất trên đường đi ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]. Hai ý này nói về các thiết lập khác nhau nên có thể không mâu thuẫn, nhưng các nguồn không dung hòa chúng.

## Chưa đề cập (Not yet covered)

Các nguồn đã xem không nêu kích thước của trường hữu hạn, hệ số làm mỗi shard nặng thêm bao nhiêu, hay giải mã mất bao lâu.

## Nền tảng học thuật (Academic roots)

Xem [../team/research-history.md](../team/research-history.md).
