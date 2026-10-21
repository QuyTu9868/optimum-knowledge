---
title: What Optimum is
last_verified: 2026-10-21
status: mostly confirmed, product status changes often
lang: vi
translation_of: technology/overview.md
source_sha: 453606187ded
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
| mump2p | Lớp pub/sub tăng tốc bằng RLNC, tương thích với libp2p GossipSub | Trang sản phẩm ghi là đã live, dùng để lan truyền khối cho validator (nút xác thực) của Ethereum. Optimum thông báo lần triển khai mainnet đầu tiên vào 2026-10-20 ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] |
| OptimumP2P / Optimump2p | Tên cũ dùng trong các bài blog năm 2025 cho cùng giao thức pub/sub này | Đã đổi tên, xem ghi chú bên dưới |
| deRAM / DeRAM | Lớp RAM phi tập trung, cấp cho ứng dụng quyền đọc/ghi thời gian thực vào trạng thái chuỗi | Trang sản phẩm ghi là "Soon" |
| DeROM | Được liệt kê cạnh DeRAM như một trường hợp dùng RLNC sắp tới | Đang lên kế hoạch |
| Optimum Gateway | Chương trình chạy cạnh một beacon node (sidecar, tức tiến trình chạy kèm của validator), hoặc chạy riêng ở chế độ stream-only (chỉ stream) | Xem [sidecar-gateway.md](sidecar-gateway.md), [../products/run-the-gateway.md](../products/run-the-gateway.md), [gateway-design.md](gateway-design.md) |
| Console và Signal | Web console (trang quản trị) nơi operator đăng ký gateway và quản lý khóa, cùng dịch vụ Signal được bật theo từng tài khoản. Blog ra mắt nói Signal miễn phí cho mọi nhà vận hành validator Ethereum ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] | Xem [../products/console-and-signal.md](../products/console-and-signal.md) |
| Accelerate | Tính năng của Console đề xuất bid cutoff (mốc cắt bid) cho MEV sidecar (mev-boost hoặc Commit-Boost). Blog ra mắt nói thêm rằng tính năng này tự đăng ký được cho các đơn vị có ít nhất 200 validator key ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] | Xem [../products/accelerate.md](../products/accelerate.md) |
| Slot-based block acceleration | Cơ chế của Gateway theo ADR-0012: bootstrap liệt kê các slot cần tăng tốc và các gateway vai trò Hermes chỉ chuyển các khối nằm trong danh sách cho client của mình. Các nguồn không nối nó với tính năng Accelerate của Console | Xem [gateway-design.md](gateway-design.md) |
| keysync | Công cụ đồng bộ validator key với Optimum | Xem [../products/keysync.md](../products/keysync.md) |
| Consumer block stream | Luồng khối chỉ đọc, phải tự bật, lấy từ một gateway (ADR-0011) | Xem [../products/block-stream.md](../products/block-stream.md) |
| Optimum Hub | Dashboard công khai tại hub.getoptimum.xyz với số liệu mainnet về lan truyền, tốc độ và stake từ các nút được kết nối của Optimum | Công bố 2026-10-20 ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] |
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

- **Thế nào là "live".** Trang sản phẩm nói mump2p đang live. Trang team vẫn ghi "Optimum Mainnet" là sắp ra. Cách hiểu nhiều khả năng đúng nhất: sidecar Gateway chạy trên Ethereum mainnet cùng các operator, còn việc ra mắt mainnet chính thức của Optimum thì chưa được công bố. Bị thay thế vào 2026-10-20/21, giữ lại làm lịch sử; chi tiết ở [../team/timeline.md](../team/timeline.md). ([team page](https://www.getoptimum.xyz/team)) [claimed]
- **Thế nào là "live", cập nhật.** Vào 2026-10-20 Optimum thông báo mump2p đã live trên mainnet Ethereum. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- **Trang team, 2026-10-21.** Nay ghi "Live: Optimum on Ethereum Mainnet", với 20+ validator và hơn 1.4 million ETH đang stake. ([team page](https://www.getoptimum.xyz/team)) [claimed]
- Mọi nguồn đều là của chính Optimum; số liệu về tốc độ, stake và số nhà vận hành khác nhau giữa các nguồn, xem [../results/performance.md](../results/performance.md) và [../ecosystem/validators.md](../ecosystem/validators.md).
