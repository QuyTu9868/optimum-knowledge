---
title: The "provably optimal" claim
last_verified: 2026-10-18
status: claimed, conditional
lang: vi
translation_of: technology/provably-optimal.md
source_sha: 5d9bc9ff88df
---

# Tối ưu có chứng minh (Provably optimal)

- Tài liệu của Optimum gọi chiến lược lan truyền dữ liệu (dissemination) là tối ưu có chứng minh về thông lượng (throughput) và độ trễ (latency). ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [claimed]
- Cũng đoạn văn đó giới hạn điều này trong các mô hình RLNC (mã hóa mạng tuyến tính ngẫu nhiên) chuẩn, khi có mất gói và tranh chấp (contention). Ngoài các mô hình đó, chứng minh không tự động áp dụng. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [confirmed]
- Blog trilemma dựa vào nghiên cứu có sẵn để nêu tuyên bố thông lượng tối ưu, trích dẫn Deb, Médard và Choute (IEEE Trans. Inf. Theory 52(6), 2006). Đây không phải một chứng minh mới. ([trilemma blog, 2025-07-30](https://www.getoptimum.xyz/blog/unlocking-the-blockchain-trilemma)) [confirmed]
- Danh sách nghiên cứu có "Algebraic Gossip: A Network Coding Approach to Optimal Multiple Rumor Mongering" (Allerton 2004, journal 2006). ([research list](https://docs.getoptimum.xyz/docs/research/gossip/gossip)) [confirmed]
- Trong video RLNC vs Reed-Solomon tháng 3 năm 2026, một diễn giả khách mời trên kênh của Optimum giới hạn phạm vi của tuyên bố: RLNC tối ưu về mặt toán học cho việc khôi phục dữ liệu bị mất (erasure) trong mạng, không phải cho mọi bài toán mã hóa. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]

## Những tuyên bố lớn hơn xây trên nó (Bigger claims built on it)

- Blog trilemma nói rằng gossip RLNC mở rộng được mà không phải đánh đổi tính phi tập trung hay bảo mật. ([trilemma blog](https://www.getoptimum.xyz/blog/unlocking-the-blockchain-trilemma)) [claimed]
- Blog cũng nói rằng điều này cho phép khối lớn hơn và slot time ngắn hơn. ([same](https://www.getoptimum.xyz/blog/unlocking-the-blockchain-trilemma)) [claimed]

## Nên viết về nó thế nào (How to write about it)

"Provably optimal under standard RLNC models" là cách nói chính xác. Chỉ ghi "Provably optimal" là bỏ mất điều kiện.
