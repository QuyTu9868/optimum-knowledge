---
title: Performance results, testnet and mainnet
last_verified: 2026-10-21
status: mostly Optimum's own claims, now including its 2026-10-20 mainnet launch figures and live Hub data; the one independent mainnet test (early build) disagrees; no independent test of the launch figures found yet
lang: vi
translation_of: results/performance.md
source_sha: 4f69c2a39ed4
---

# Kết quả hiệu năng (Performance results)

Đọc phần này trước: gần như mọi con số tốc độ bên dưới do Optimum công bố, hoặc nằm trong báo cáo do Optimum tài trợ. Phép đo mainnet độc lập duy nhất tìm được cho tới nay không thấy tác động đáng kể trên một bản build đầu. Cả hai phía đều có ở đây.

## Mô phỏng và devnet giai đoạn đầu, 2025 (Early simulations and devnets, 2025)

- Mô phỏng Ethshadow với 1,000 nút: OptimumP2P chuyển thông điệp nhanh hơn Gossipsub hơn 2x. ([blog, 2025-06-12](https://www.getoptimum.xyz/blog/comparing-the-performance-of-optimump2p-and-gossipsub)) [claimed]
- Thử nghiệm trực tiếp trên 36 nút với thông điệp 6 MB: độ trễ (latency) trung bình 1.17s, so với 2.35s của Gossipsub. ([same post](https://www.getoptimum.xyz/blog/comparing-the-performance-of-optimump2p-and-gossipsub)) [claimed]
- Testnet 36 nút: khối 4, 6 và 10 MB được chuyển trong khoảng 1s; Gossipsub mất 1.6s ở 4 MB và 2.6s ở 6 MB. Không nêu phần cứng hay thời lượng. ([blog, 2025-07-10](https://www.getoptimum.xyz/blog/mump2p-unlocking-next-gen-performance-for-tomorrows-killer-apps)) [claimed]

## Testnet Hoodi, cuối 2025 (Hoodi testnet, late 2025)

- Thời gian lan truyền khối trung bình khoảng 150 ms trên 30 gateway phân bố toàn cầu. Bài viết gọi đây là số liệu vòng đầu. ([blog, 2025-09-23](https://www.getoptimum.xyz/blog/acceleration-mump2p-early-results-on-hoodi-testnet)) [claimed]
- Mốc so sánh là con số Gossipsub nhanh nhất từ ethPandaOps, khoảng 1s. Cùng bài này nêu mức tăng tốc trung bình 6.5x, "frequently" 7-8x. ([same post](https://www.getoptimum.xyz/blog/acceleration-mump2p-early-results-on-hoodi-testnet)) [claimed]
- Phương pháp trong bài tiếp theo: mỗi khối được gửi qua mump2p và Gossipsub cùng lúc từ cùng một gateway; histogram Prometheus được thu thập mỗi 5s; có các đỉnh 200-250 ms khi truyền giữa các châu lục. Không nêu cỡ mẫu. ([blog, 2025-10-16](https://www.getoptimum.xyz/blog/behind-the-metrics-mump2ps-6x-latency-win-on-ethereum-hoodi-testnet)) [claimed]
- COO của Everstake là Bohdan Opryshko nói với Blockworks rằng thời gian lan truyền trung bình khoảng 150 ms và chi phí phát sinh (overhead) "not significant". Cách nói 5-6x là của bài báo, không phải lời trích của ông. ([Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck)) [third-party]

## Mainnet

- Bài PERCH trên Lido (alan.s, 2026-08-10) nói rằng trên mainnet, mump2p được đo là lan truyền nhanh hơn 2.42x với phương sai thấp hơn 7.88x. Không có liên kết tới phương pháp hay dữ liệu. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- Four Pillars nhắc lại con số nhanh hơn 2.42x (2.50x tính theo trung vị) so với mốc GossipSub, và phương sai thấp hơn 7.88x so với libp2p (2.81x tính theo độ lệch chuẩn), gọi đây là kết quả kiểm thử ban đầu từ 30 gateway trên toàn thế giới nhưng không nêu tên mạng. Báo cáo do Optimum tài trợ. ([Four Pillars, 2026-08-18](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [claimed]
- Bài "Free and faster" tháng 8 năm 2026 (bài triển khai trước đó, không phải blog ra mắt ngày 2026-10-20) không có số liệu tốc độ. Bài nói việc triển khai đang diễn ra với 40+ validator (nút xác thực) và nhà vận hành nút, còn quyền truy cập cần cấp phép qua API key. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Trang chủ: "Mainnet benchmarks are ongoing." ([homepage](https://www.getoptimum.xyz/)) [claimed]
  - Đã bị thay thế: nội dung trang chủ đọc ngày 2026-10-21 không còn dòng đó (cũng không còn các dòng 6-20x và 90-95% bên dưới) và nay nêu số liệu mainnet, xem phần kế tiếp. Các dòng cũ được giữ lại làm lịch sử có ghi ngày.

### Số liệu ra mắt mainnet (công bố 2026-10-20, đọc 2026-10-21) (Mainnet launch figures)

Mọi nguồn ở đây đều là của chính Optimum. Mỗi nguồn đo một thứ hơi khác nhau, nên được liệt kê riêng. Mẫu, khoảng thời gian và bên quan sát chỉ được nêu khi nguồn có nêu.

- Tweet (@get_optimum, 2026-10-20): dữ liệu di chuyển trên Ethereum "2-3x faster". Không nêu mẫu, khoảng thời gian hay mốc so sánh. ([tweet](https://x.com/get_optimum/status/2112559939126206552)) [claimed]
- Tiêu đề blog: dữ liệu khối nhanh hơn "by 2.5 - 3.5x on average". Không nêu khoảng thời gian cho dải này. ([launch blog, 2026-10-20](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Số liệu Hub trong blog: trên mẫu 50,292 slot, mump2p vượt libp2p 335 ms, được gọi là nhanh hơn 3.3x. Bài nói các số liệu được lấy từ Hub 1 tuần trước khi đăng; độ dài khoảng thời gian không được nêu. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Mốc so sánh trong blog: Hub dùng các nút sentry của Xatu để đo hiệu năng libp2p trên cùng các khối. Bài không nói ai chạy các sentry hay có bao nhiêu. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Tuyên bố về tính nhất quán trong blog: mump2p tăng tốc 85-90% số khối với mức 2.5-3.5x, và mức cải thiện lớn hơn ở phần đuôi (first 50% up to 95% of nodes). Văn bản không có số theo từng percentile. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Ca nghiên cứu nhà vận hành trong blog: một nhà vận hành không nêu tên có số head vote sai ít hơn 51% trong 1 tuần sau khi dùng mump2p, so với tuần trước đó. Chỉ một nhà vận hành, so trước và sau, không phải thử nghiệm có đối chứng. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Trang chủ: lan truyền nhanh hơn "2-4x" (avg) so với Gossipsub và "90%" Optimum network first seen. Phần FAQ lặp lại cả hai cho mainnet. Không nêu mẫu, khoảng thời gian hay số bên quan sát. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- API Hub trực tiếp, lấy lúc 2026-10-21T13:50Z (giá trị thay đổi khi cửa sổ dịch chuyển): mainnet, cửa sổ từ 2026-10-20T06:00Z đến 2026-10-21T13:00Z (31 giờ), đo 9,281 slot, bên quan sát là 300 gateway và 155 sentry Xatu. Spread factor 3.21 (mump2p 133.7 ms so với libp2p 429.3 ms, so sánh 9,279 slot). ([network-performance API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Cùng API, các trường khác: arrival 1,987 ms (mump2p) so với 2,249.4 ms (libp2p); headline lead 262 ms (CI 8.5 ms); lead ở p50 49 ms, p75 102 ms, p95 262 ms; slot được tăng tốc 87.9%. JSON không định nghĩa "spread" hay "arrival", nên chúng được ghi lại như các trường thô. ([network-performance API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Phép tính từ các trường đó (của biên tập, không phải lời của Optimum): 3.21 là 429.3 chia cho 133.7 (các giá trị spread), còn các giá trị arrival cho tỉ lệ khoảng 1.13. Vì vậy "3x" trong API có thể chỉ thước đo spread chứ không phải tổng thời gian đến nơi; blog gọi thước đo của mình là "block arrival times" và không nói 335 ms của nó là thước đo nào trong hai cái. ([network-performance API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- API trạng thái: lan truyền mainnet "on" từ 2026-10-20T05:45:32Z, kiểm tra lúc 2026-10-21T13:45:56Z. ([propagation-status API](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- Không tìm thấy phép đo độc lập nào cho các số liệu ra mắt tính đến last_verified. Chi tiết về Hub nằm ở [../products/optimum-hub.md](../products/optimum-hub.md).

### Kiểm thử mainnet độc lập (Independent mainnet test)

- StereumLabs (stefa2k) chạy bản build đầu v1.1.1 trên 36 full node (nút đầy đủ) mainnet trong 11.5 ngày. ([Lido forum reply, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [third-party]
  - Khối đến sớm hơn trên Lighthouse (khoảng 120 ms), Prysm (khoảng 60 ms) và Grandine (khoảng 30-50 ms). Lodestar được cải thiện ít hơn, một phần do control drift. Teku không thay đổi.
  - Các nút Nimbus chạy Gateway bị chậm đi.
  - Tóm tắt của họ: không kết quả nào đáng kể (significant).
  - Mesh (mạng lưới kết nối) của gateway trung bình có 6.91-6.96 peer (nút ngang hàng), so với mục tiêu là 8.
  - Không gắn validator nào, nên đường đi của attestation (phiếu xác nhận) chưa từng được kiểm thử.
- Tính đến last_verified, Optimum chưa đăng bản tổng kết cuối trong thread đó.
- Phản hồi của Optimum (alan.s, post 11, 2026-10-12): nói rằng tăng tốc toàn cục đã hoạt động trên toàn mainnet Ethereum trong cửa sổ đo của StereumLabs, nên các khối được chuyển qua mạng của Optimum cũng có thể giúp cả những nút không chạy mump2p, khiến khó tách riêng tác động trực tiếp của mump2p. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]
- Cùng phản hồi: sau October 26, Optimum dự định chuyển sang mô hình chỉ các nhà vận hành đã đăng ký mới được tăng tốc, và so từng nhà vận hành với mốc riêng của họ trước khi bật tăng tốc toàn cục, dùng thời điểm khối đến gateway của nhà vận hành so với lúc slot bắt đầu cộng với kết quả attestation on-chain. Không đưa dữ liệu. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]
- Phản hồi không rút lại hay phản bác các phép đo của StereumLabs. Nó đưa ra một lý do cho kết quả không có tác động; các dòng về StereumLabs ở trên vẫn là bản ghi độc lập. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]

### Số liệu mainnet do nhà vận hành báo cáo (X, 2026-10-20) (Operator-reported mainnet figures)

Do chính các nhà vận hành đăng vào ngày ra mắt. Cả hai bài đều không nói số liệu được đo thế nào (không có khoảng thời gian, mẫu, bên quan sát hay mốc so sánh, trừ phép so với libp2p mà Validation Cloud nêu). Cả hai chưa được kiểm toán và các nhà vận hành là đối tác của Optimum.

- Nodemonster: "84.2% of our blocks are now arriving faster", tăng tốc lan truyền dữ liệu "by 5x on average". Thước đo, khoảng thời gian và mốc so sánh không được nêu. ([@Nodemonste, 2026-10-20](https://x.com/Nodemonste/status/2112663008015163608)) [third-party]
- Validation Cloud: "over 98% of blocks arrive faster", với mức tăng tốc trung bình "2.2 times faster than libp2p". Bài nói "since implementing" nhưng không nêu khoảng thời gian, mẫu hay thứ được đo thời gian. ([@ValidationCloud, 2026-10-20](https://x.com/ValidationCloud/status/2112605801621995714)) [third-party]
- Các bài của nhà vận hành khác trong ngày ra mắt tìm được (P2P.org, stakefish, Stakely, Twinstake, Finoa, Validatrium, Blockdaemon, Ebunker) không nêu số liệu tốc độ; Finoa chỉ nói các validator của họ "now see blocks and attestations sooner". ([Finoa](https://x.com/FinoaConsensus/status/2112896608522346590)) [third-party]
- Kent Lin (Optimum) nói đã thấy "consistent high-performance propagation" ở mức nhanh hơn 2.5-3.5x; đây là lời của Optimum, không có phương pháp. ([@kentlinyy, 2026-10-20](https://x.com/kentlinyy/status/2112563195395399866)) [claimed]

### Báo chí và dashboard (Press and dashboards)

- Unchained (2026-10-20) nhắc lại tuyên bố của Optimum rằng người dùng mump2p nhận khối đầu tiên trong chín trên 10 phép đo, và lưu ý con số 2.42x là do chính Optimum tự báo cáo, đồng thời nói thông báo không giải thích cách thu thập số liệu. Bài báo quy các phép đo cho Optimum, nên đây là bên thứ ba nhắc lại kết quả của Optimum, không phải một phép thử mới. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- DefiLlama nói đã ra mắt một dashboard Investor Relations cùng Optimum, hiển thị Total Value Boosted là 1.4M ETH ($3.4B) và so sánh tốc độ khối của Optimum với một mốc chuẩn. Dashboard tại investors.defillama.com/optimum trả về HTTP 403 khi lấy ngày 2026-10-21, nên số liệu và mốc chuẩn của nó chưa được đọc. ([@DefiLlama, 2026-10-20](https://x.com/DefiLlama/status/2112561379651514602)) [third-party]

### Báo cáo của các nhà vận hành trong thread Lido, Hoodi (Operator reports from the Lido thread, Hoodi)

- HashKey Cloud: thời gian lan truyền attestation trung bình giảm khoảng 200 ms. [third-party]
- Blockdaemon: hiệu năng attestation cải thiện nói chung, không có con số. [third-party]
- Ebunker: độ trễ giảm rõ rệt trong môi trường testnet, không nêu con số. [third-party]
- Stakely: không có sự cố nào. FP Validated: phép đo vẫn đang chạy. [third-party]

Tất cả đều từ [Lido PERCH thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786).

## Băng thông (Bandwidth)

- Trang chủ nói rằng giảm băng thông khoảng 90-95% so với Gossipsub và chuyển nhanh hơn 6-20x. Không nêu phương pháp hay mạng. ([homepage](https://www.getoptimum.xyz/)) [claimed] Đã bị thay thế: nội dung trang chủ không còn dòng này tính đến 2026-10-21 (chưa kiểm lại trang sản phẩm).
- Không tìm thấy số đo băng thông mainnet thực tế nào ở bất kỳ đâu.

## Mô hình hóa, không phải đo thực tế (Modeled, not measured)

Những con số này đến từ mô hình kinh tế của chính Optimum, không phải từ việc chạy mạng.

- Giảm độ trễ 50-150 ms sẽ nâng độ chính xác của head vote từ khoảng 98.6% lên 98.8-99.1%, tương đương 1,000-2,000 ETH mỗi năm. Cửa sổ dữ liệu: Feb-Mar 2026. ([blog, 2026-03-26](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- Cùng mô hình đó cho mức tăng APR khoảng 0.66-1.97% với các nhà vận hành lớn. ([same](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- Hạn chót nhận bid muộn hơn 150 ms làm giá bid MEV trung bình tăng khoảng 16%. ([PBS blog, 2026-05-19](https://www.getoptimum.xyz/blog/the-cost-of-uncertainty-in-ethereums-pbs-hot-path)) [claimed]
- Nhóm nghiên cứu của Optimum nói rằng một nghiên cứu cho thấy MEV bỏ lỡ ở bid được chọn của một slot (khung 12 giây của Ethereum) không phải lúc nào cũng được thu lại đầy đủ ở slot kế tiếp (cross-slot MEV). Bài không đưa số liệu. ([@get_optimum post, 2026-07-27](https://x.com/get_optimum/status/2081835782785159418)) [claimed]
- Bài về Solana dẫn mức giảm độ trễ tới 4x ở mức mất gói 1-5% từ các mô hình benchmark; không có thử nghiệm Solana nào được báo cáo. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Còn tranh cãi (Disputed)

- **Mức tăng tốc mainnet (tuần ra mắt):** tweet 2-3x; blog 2.5-3.5x trung bình và 3.3x (335 ms, 50,292 slot, dữ liệu Hub một tuần trước khi đăng); trang chủ 2-4x; API Hub trực tiếp ngày 2026-10-21 spread factor 3.21 trên 31 giờ và 9,281 slot. Trước đó: 2.42x (Lido PERCH, Four Pillars) và 6-20x (trang chủ, bản cũ). Khoảng thời gian, mẫu và thước đo khác nhau, nên đây không phải một con số. Không số nào được kiểm chứng độc lập.
- **Mức dẫn trước tính bằng ms:** blog 335 ms so với headline lead của API là 262 ms (bằng chênh lệch arrival và lead ở p95). Chênh lệch spread của API khoảng 296 ms (429.3 trừ 133.7). Blog không nói 335 ms của nó là thước đo nào.
- **Tỉ lệ khối được tăng tốc:** blog 85-90% và API 87.9% gần khớp nhau; "90% first seen" của trang chủ là cách diễn đạt khác.
- **Mainnet benchmarks ongoing (cũ) so với số liệu ra mắt (mới):** dòng trên trang chủ còn hiện hành ngày 2026-10-14; đến 2026-10-21 trang chủ hiển thị số liệu mainnet thay vào đó.
- **Mức tăng tốc trên Hoodi:** 6x (trang chủ bản cũ, không còn ở đó ngày 2026-10-21; Behind the Metrics) so với trung bình 6.5x / thường 7-8x (Acceleration post) so với 5-6x (Blockworks).
- **Phương sai:** thấp hơn 7.88x (PERCH) so với khoảng 7x trên benchmark 90 nút (PBS blog) so với 2.81x tính theo độ lệch chuẩn (Four Pillars). Phương sai và độ lệch chuẩn là hai thước đo khác nhau, nên đây không phải cùng một con số.
- **Độ trễ p95:** 170 ms (Four Pillars) so với khoảng 179 ms (PBS blog).
- **Con số 2.42x đến từ mạng nào:** PERCH nói mainnet; Four Pillars không nêu tên mạng.
- **Khoảng tốc độ:** 6-20x trên trang chủ bản cũ (không còn ở đó ngày 2026-10-21) so với 2.42x được nói là đạt trên mainnet.
- **Có giúp được gì trên mainnet không:** Optimum nói rằng đạt 2.42x; phép thử độc lập duy nhất (bản build đầu, chỉ full node) không thấy gì đáng kể. Optimum đã phản hồi (Lido post 11, 2026-10-12) rằng tăng tốc toàn cục đã hoạt động trong cửa sổ đo, khiến khó tách riêng tác động; họ không phản bác các phép đo. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11))
- **Số liệu của nhà vận hành so với số liệu của Optimum:** Nodemonster khoảng 5x và 84.2% số khối nhanh hơn; Validation Cloud 2.2x so với libp2p và over 98% số khối; Optimum 2-3x (tweet), 2.5-3.5x (blog, Kent Lin), 3.3x (blog Hub), 3.21 (API trực tiếp); Optimum, qua Unchained: 9 trên 10 lần đến trước (tỉ lệ đến trước, không phải một bội số). Thước đo, khoảng thời gian và mốc so sánh không được nêu hoặc khác nhau, nên không số nào so sánh được. Tỉ lệ theo từng khối của nhà vận hành (84.2%, over 98%) cũng khác với 85-90% của blog và 87.9% của API. ([Nodemonste](https://x.com/Nodemonste/status/2112663008015163608), [ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714), [launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet))
- **Vì sao StereumLabs không thấy gì:** StereumLabs nói không có tác động đáng kể trên bản build đầu v1.1.1 trong 11.5 ngày; Optimum nói tăng tốc toàn cục đã hoạt động trong cửa sổ đó và cũng giúp cả nút không chạy mump2p (post 11, 2026-10-12). Lời giải thích của Optimum chưa được kiểm chứng, và cách nói "2-3x across all of Ethereum" trong tuần ra mắt khớp với tăng tốc trên toàn mạng. Sau October 26, Optimum nói sẽ chỉ tăng tốc cho các nhà vận hành đã đăng ký. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11))
