---
title: What Optimum is
last_verified: 2026-10-14
status: mostly confirmed, product status changes often
lang: vi
translation_of: technology/overview.md
source_sha: 985ec96111a2
---

# Optimum là gì (What Optimum is)

## Tự mô tả (Self-description)

- Optimum mô tả mục tiêu của mình là xây lớp bộ nhớ còn thiếu cho Web3. ([launch blog, 2025-04-15](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]
- Cùng bài đó gọi Optimum là hạ tầng bộ nhớ phi tập trung, hiệu năng cao đầu tiên cho mọi blockchain. ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]
- Docs mô tả Optimum là giao thức internet phi tập trung nhanh nhất cho web3. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [claimed]
- Kỹ thuật nền tảng là RLNC (mã hóa mạng tuyến tính ngẫu nhiên), mà Optimum nói là được phát triển tại MIT. ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]. Xem [rlnc.md](rlnc.md).

## Tên các sản phẩm (Product names)

| Tên | Là gì | Trạng thái (tại last_verified) |
|---|---|---|
| mump2p | Lớp pub/sub tăng tốc bằng RLNC, tương thích với libp2p GossipSub | Trang sản phẩm ghi là đã live, dùng để lan truyền khối cho validator (nút xác thực) của Ethereum |
| OptimumP2P / Optimump2p | Tên cũ dùng trong các bài blog năm 2025 cho cùng giao thức pub/sub này | Đã đổi tên, xem ghi chú bên dưới |
| deRAM / DeRAM | Lớp RAM phi tập trung, cấp cho ứng dụng quyền đọc/ghi thời gian thực vào trạng thái chuỗi | Trang sản phẩm ghi là "Soon" |
| DeROM | Được liệt kê cạnh DeRAM như một trường hợp dùng RLNC sắp tới | Đang lên kế hoạch |
| Optimum Gateway | Sidecar (tiến trình chạy kèm) mà validator chạy để dùng mump2p | Xem [sidecar-gateway.md](sidecar-gateway.md) |
| Flexnodes | Các nút do operator vận hành trong mạng gossip (lan truyền kiểu tin đồn) có mã hóa | Xem [flexnodes.md](flexnodes.md) |

Nguồn:
- Định nghĩa mump2p: ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [confirmed]
- mump2p đã live cho validator Ethereum, DeRAM và DeROM sắp ra mắt: ([product page](https://www.getoptimum.xyz/product)) [claimed]
- deRAM cấp cho ứng dụng quyền đọc/ghi thời gian thực vào trạng thái blockchain: ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]
- OptimumP2P được mô tả là giao thức pub-sub nhằm thay các mạng gossip cũ bằng cách lan truyền dựa trên mã hóa: ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]

**Ghi chú về tên gọi:** các bài năm 2025 dùng "OptimumP2P". Docs và trang sản phẩm dùng "mump2p". Bài tháng 6 năm 2025 nay có tiêu đề "Introducing mump2p", cho thấy đã có việc đổi tên. Không trang nào nói thẳng về việc đổi tên. ([implementation blog](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed: wording only]

## ACD hay ACID (ACD or ACID)

Người ta nói deRAM đảm bảo ba tính chất: Atomicity, Consistency, Durability. Launch blog ghi là "ACD" ở một chỗ và "ACID" ở chỗ khác trong cùng trang. Isolation, chữ "I" trong ACID, không bao giờ được nêu tên. ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [confirmed: wording]

Báo chí hay lặp lại "ACID". Nếu bạn viết về chủ đề này, cách an toàn là chỉ nêu ba tính chất đã được gọi tên.

## Kế hoạch đã công bố (Announced plans)

- Optimum nói đang chuẩn bị cung cấp dịch vụ cho thị trường builder khi bản nâng cấp Glamsterdam của Ethereum (tính năng chính là ePBS, EIP-7732) được triển khai trên mainnet. ([@get_optimum post, 2026-09-08](https://x.com/get_optimum/status/2097402261194547656)) [claimed]

## Còn tranh cãi (Disputed)

- **Thế nào là "live".** Trang sản phẩm nói mump2p đang live. Trang team vẫn ghi "Optimum Mainnet" là sắp ra. Cách hiểu nhiều khả năng đúng nhất: sidecar Gateway chạy trên Ethereum mainnet cùng các operator, còn việc ra mắt mainnet chính thức của Optimum thì chưa được công bố. Chi tiết ở [../team/timeline.md](../team/timeline.md).
