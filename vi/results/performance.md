---
title: Performance results, testnet and mainnet
last_verified: 2026-10-14
status: mostly Optimum's own claims; one independent mainnet test disagrees; mainnet benchmarks ongoing
lang: vi
translation_of: results/performance.md
source_sha: 1cb5500e1dd6
---

# Kết quả hiệu năng (Performance results)

Đọc phần này trước: gần như mọi con số tốc độ bên dưới do Optimum công bố, hoặc nằm trong báo cáo do Optimum tài trợ. Phép đo mainnet độc lập duy nhất tìm được cho tới nay không thấy tác động đáng kể trên một bản build đầu. Cả hai phía đều có ở đây.

## Mô phỏng và devnet giai đoạn đầu (Early simulations and devnets (2025))

- Mô phỏng Ethshadow với 1,000 nút: OptimumP2P chuyển thông điệp nhanh hơn Gossipsub hơn 2x. ([blog, 2025-06-12](https://www.getoptimum.xyz/blog/comparing-the-performance-of-optimump2p-and-gossipsub)) [claimed]
- Thử nghiệm trực tiếp trên 36 nút với thông điệp 6 MB: độ trễ (latency) trung bình 1.17s, so với 2.35s của Gossipsub. ([same post](https://www.getoptimum.xyz/blog/comparing-the-performance-of-optimump2p-and-gossipsub)) [claimed]
- Testnet 36 nút: khối 4, 6 và 10 MB được chuyển trong khoảng 1s; Gossipsub mất 1.6s ở 4 MB và 2.6s ở 6 MB. Không nêu phần cứng hay thời lượng. ([blog, 2025-07-10](https://www.getoptimum.xyz/blog/mump2p-unlocking-next-gen-performance-for-tomorrows-killer-apps)) [claimed]

## Testnet Hoodi, cuối 2025 (Hoodi testnet (late 2025))

- Thời gian lan truyền khối trung bình khoảng 150 ms trên 30 gateway phân bố toàn cầu. Bài viết gọi đây là số liệu vòng đầu. ([blog, 2025-09-23](https://www.getoptimum.xyz/blog/acceleration-mump2p-early-results-on-hoodi-testnet)) [claimed]
- Mốc so sánh là con số Gossipsub nhanh nhất từ ethPandaOps, khoảng 1s. Cùng bài này nêu mức tăng tốc trung bình 6.5x, "frequently" 7-8x. ([same post](https://www.getoptimum.xyz/blog/acceleration-mump2p-early-results-on-hoodi-testnet)) [claimed]
- Phương pháp trong bài tiếp theo: mỗi khối được gửi qua mump2p và Gossipsub cùng lúc từ cùng một gateway; histogram Prometheus được thu thập mỗi 5s; có các đỉnh 200-250 ms khi truyền giữa các châu lục. Không nêu cỡ mẫu. ([blog, 2025-10-16](https://www.getoptimum.xyz/blog/behind-the-metrics-mump2ps-6x-latency-win-on-ethereum-hoodi-testnet)) [claimed]
- COO của Everstake là Bohdan Opryshko nói với Blockworks rằng thời gian lan truyền trung bình khoảng 150 ms và chi phí phát sinh (overhead) "not significant". Cách nói 5-6x là của bài báo, không phải lời trích của ông. ([Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck)) [third-party]

## Mainnet

- Bài PERCH trên Lido (alan.s, 2026-08-10) nói rằng trên mainnet, mump2p được đo là lan truyền nhanh hơn 2.42x với phương sai thấp hơn 7.88x. Không có liên kết tới phương pháp hay dữ liệu. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- Four Pillars nhắc lại con số nhanh hơn 2.42x (2.50x tính theo trung vị) so với mốc GossipSub, và phương sai thấp hơn 7.88x so với libp2p (2.81x tính theo độ lệch chuẩn), gọi đây là kết quả kiểm thử ban đầu từ 30 gateway trên toàn thế giới nhưng không nêu tên mạng. Báo cáo do Optimum tài trợ. ([Four Pillars, 2026-08-18](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [claimed]
- Bài ra mắt mainnet không có số liệu tốc độ. Bài nói việc triển khai đang diễn ra với 40+ validator (nút xác thực) và nhà vận hành nút, còn quyền truy cập cần cấp phép qua API key. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Trang chủ: "Mainnet benchmarks are ongoing." ([homepage](https://www.getoptimum.xyz/)) [claimed]

### Kiểm thử mainnet độc lập (Independent mainnet test)

- StereumLabs (stefa2k) chạy bản build đầu v1.1.1 trên 36 full node (nút đầy đủ) mainnet trong 11.5 ngày. ([Lido forum reply, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [third-party]
  - Khối đến sớm hơn trên Lighthouse (khoảng 120 ms), Prysm (khoảng 60 ms) và Grandine (khoảng 30-50 ms). Lodestar được cải thiện ít hơn, một phần do control drift. Teku không thay đổi.
  - Các nút Nimbus chạy Gateway bị chậm đi.
  - Tóm tắt của họ: không kết quả nào đáng kể (significant).
  - Mesh (mạng lưới kết nối) của gateway trung bình có 6.91-6.96 peer (nút ngang hàng), so với mục tiêu là 8.
  - Không gắn validator nào, nên đường đi của attestation (phiếu xác nhận) chưa từng được kiểm thử.
- Tính đến last_verified, Optimum chưa đăng bản tổng kết cuối trong thread đó.

### Báo cáo của các nhà vận hành trong thread Lido, Hoodi (Operator reports from the Lido thread (Hoodi))

- HashKey Cloud: thời gian lan truyền attestation trung bình giảm khoảng 200 ms. [third-party]
- Blockdaemon: hiệu năng attestation cải thiện nói chung, không có con số. [third-party]
- Ebunker: độ trễ giảm rõ rệt trong môi trường testnet, không nêu con số. [third-party]
- Stakely: không có sự cố nào. FP Validated: phép đo vẫn đang chạy. [third-party]

Tất cả đều từ [Lido PERCH thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786).

## Băng thông (Bandwidth)

- Trang chủ nói rằng giảm băng thông khoảng 90-95% so với Gossipsub và chuyển nhanh hơn 6-20x. Không nêu phương pháp hay mạng. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Không tìm thấy số đo băng thông mainnet thực tế nào ở bất kỳ đâu.

## Mô hình hóa, không phải đo thực tế (Modeled, not measured)

Những con số này đến từ mô hình kinh tế của chính Optimum, không phải từ việc chạy mạng.

- Giảm độ trễ 50-150 ms sẽ nâng độ chính xác của head vote từ khoảng 98.6% lên 98.8-99.1%, tương đương 1,000-2,000 ETH mỗi năm. Cửa sổ dữ liệu: Feb-Mar 2026. ([blog, 2026-03-26](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- Cùng mô hình đó cho mức tăng APR khoảng 0.66-1.97% với các nhà vận hành lớn. ([same](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- Hạn chót nhận bid muộn hơn 150 ms làm giá bid MEV trung bình tăng khoảng 16%. ([PBS blog, 2026-05-19](https://www.getoptimum.xyz/blog/the-cost-of-uncertainty-in-ethereums-pbs-hot-path)) [claimed]
- Nhóm nghiên cứu của Optimum nói rằng một nghiên cứu cho thấy MEV bỏ lỡ ở bid được chọn của một slot (khung 12 giây của Ethereum) không phải lúc nào cũng được thu lại đầy đủ ở slot kế tiếp (cross-slot MEV). Bài không đưa số liệu. ([@get_optimum post, 2026-07-27](https://x.com/get_optimum/status/2081835782785159418)) [claimed]
- Bài về Solana dẫn mức giảm độ trễ tới 4x ở mức mất gói 1-5% từ các mô hình benchmark; không có thử nghiệm Solana nào được báo cáo. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Còn tranh cãi (Disputed)

- **Mức tăng tốc trên Hoodi:** 6x (homepage, Behind the Metrics) so với trung bình 6.5x / thường 7-8x (Acceleration post) so với 5-6x (Blockworks).
- **Phương sai:** thấp hơn 7.88x (PERCH) so với khoảng 7x trên benchmark 90 nút (PBS blog) so với 2.81x tính theo độ lệch chuẩn (Four Pillars). Phương sai và độ lệch chuẩn là hai thước đo khác nhau, nên đây không phải cùng một con số.
- **Độ trễ p95:** 170 ms (Four Pillars) so với khoảng 179 ms (PBS blog).
- **Con số 2.42x đến từ mạng nào:** PERCH nói mainnet; Four Pillars không nêu tên mạng.
- **Khoảng tốc độ:** 6-20x trên trang chủ so với 2.42x được nói là đạt trên mainnet.
- **Có giúp được gì trên mainnet không:** Optimum nói rằng đạt 2.42x; phép thử độc lập duy nhất (bản build đầu, chỉ full node) không thấy gì đáng kể.
