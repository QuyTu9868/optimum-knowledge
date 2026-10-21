---
title: Validators and operators
last_verified: 2026-10-21
status: names mostly claimed by Optimum; a few self-reported tests
lang: vi
translation_of: ecosystem/validators.md
source_sha: 3e4195e74634
---

# Validator (nút xác thực) và nhà vận hành (Validators and operators)

Được Optimum nêu tên không có nghĩa là đang chạy nó. Mỗi nhà vận hành bên dưới được kiểm tra riêng.

## Nhà vận hành được nêu tên (Named operators)

| Nhà vận hành | Bằng chứng cho thấy gì | Nguồn | Tag |
|---|---|---|---|
| Everstake | Đã thử nghiệm trên Hoodi; COO được phỏng vấn | [Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck) | [third-party] |
| Blockdaemon | Tự báo cáo chạy thử trên Hoodi, hiệu năng attestation (phiếu xác nhận) tốt hơn. Là đối tác ra mắt trên mainnet từ 2026-10-20 (đã được thay thế, xem bên dưới) | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| InfStones | Tự báo cáo chạy trên một testnet riêng, không có số liệu | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| Ebunker | Tự báo cáo chạy trong môi trường testnet, không nêu tên mạng | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| P2P.org | Được nêu tên và trích lời trong thông cáo báo chí của Optimum; không có dữ liệu thử nghiệm. Bài đăng riêng ngày 2026-10-20 nói họ chạy nó trên mainnet (đã được thay thế, xem bên dưới) | [Chainwire, 2025-06-24](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/); [@P2Pvalidator, 2026-10-20](https://x.com/P2Pvalidator/status/2112574739789267067) | [claimed], [third-party] |
| Kiln | Được nêu tên và COO được trích lời trong cùng thông cáo; không có dữ liệu thử nghiệm | [Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/) | [claimed] |
| Luganodes | Chỉ có lời chứng thực trên site của Optimum. Đã được thay thế ngày 2026-10-21: bài đăng riêng của họ nói họ chạy mump2p trên mainnet, xem bên dưới | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| FP Validated | Optimum nói rằng đang thử mump2p; FP Validated nói rằng đã tham gia với tư cách đối tác validator. Không có dữ liệu thử nghiệm | [@get_optimum, 2026-08-04](https://x.com/get_optimum/status/2084681995741995255); [@FPvalidated, 2026-08-05](https://x.com/FPvalidated/status/2084816155177537577) | [claimed] |
| DSRV | Optimum nêu tên là đối tác thử nghiệm, một nhà vận hành Hàn Quốc mà Optimum nói đang stake hơn 300k ETH. Không có dữ liệu thử nghiệm | [@get_optimum, 2026-09-10](https://x.com/get_optimum/status/2098033786915287228) | [claimed] |
| Twinstake | Được nêu tên là đối tác thử nghiệm. Optimum nói thêm rằng MEV APR của riêng Twinstake cao hơn mức trung bình của Ethereum khoảng 35% trong 12 tháng; đó không phải kết quả của mump2p và không có nguồn đi kèm. Chính Twinstake đăng rằng họ đang thử mump2p cùng với hạ tầng Ethereum của mình, chưa có kết quả. Đã được thay thế ngày 2026-10-20: họ đăng rằng họ chạy nó trên mainnet, xem bên dưới | [@get_optimum, 2026-09-15](https://x.com/get_optimum/status/2099900356671295884); [@twinstake_io, 2026-09-15](https://x.com/twinstake_io/status/2099967006338359471) | [claimed], [third-party] |
| Finoa Consensus Services | Được nêu tên là đối tác mới; bài đăng không nói là đang thử hay đang chạy mump2p. Chính Finoa đăng rằng họ hào hứng được hợp tác với Optimum, cũng không nhắc tới việc thử nghiệm. Đã được thay thế ngày 2026-10-21: Finoa tự gọi mình là đối tác ra mắt đã chạy trên mainnet, xem bên dưới | [@get_optimum, 2026-08-31](https://x.com/get_optimum/status/2094450916095361404); [@FinoaConsensus, 2026-09-01](https://x.com/FinoaConsensus/status/2094817254609211903) | [claimed], [third-party] |
| Nodemonster | Tự báo cáo đã chạy vài tháng trên testnet, thời gian lan truyền khối trung bình khoảng 150 ms, nhanh hơn mốc so sánh GossipSub khoảng 6x, không nêu phương pháp đo. Optimum đã trích lại bài này. Bài đăng về mainnet ngày 2026-10-20 bên dưới thay thế trạng thái chỉ chạy testnet | [@Nodemonste post](https://x.com/Nodemonste/status/2095105880807051525); [quoted by @get_optimum, 2026-09-02](https://x.com/get_optimum/status/2095189075892531257) | [third-party] |

Các nhà vận hành khác báo cáo trong Lido thread: HashKey Cloud (Hoodi, độ trễ lan truyền attestation thấp hơn khoảng 200 ms), Stakely (Hoodi, không có sự cố nào), FP Validated (Hoodi, vẫn đang đo). stakefish và SenseiNode mới chỉ đăng ký hoặc tỏ ý quan tâm (phần về stakefish đã được thay thế ngày 2026-10-20: họ đăng rằng họ chạy mump2p trên mainnet, xem bên dưới). StereumLabs chạy phép đo độc lập duy nhất trên mainnet, xem [../results/performance.md](../results/performance.md). [third-party]

Chưa tìm thấy bài đăng gốc nào từ Everstake, P2P.org, Kiln hay Luganodes nói rằng họ đang chạy nó. Đã được thay thế ngày 2026-10-20 đối với P2P.org (họ đăng rằng họ chạy nó trên mainnet) và Everstake (họ đăng rằng họ đang đánh giá kết quả trên mainnet); Luganodes cũng đăng ngày 2026-10-21 (xem bên dưới); vẫn chưa thấy bài đăng nào từ Kiln.

## Bài đăng của các nhà vận hành về mainnet (Mainnet operator posts, thêm ngày 2026-10-21)

Mỗi gạch đầu dòng là điều bài đăng riêng của nhà vận hành nói; không bài nào đi kèm phương pháp hay dữ liệu từ Hub của Optimum. Nội dung bài đăng được đối chiếu với tài khoản riêng của từng nhà vận hành khi có lần quét thứ hai (Everstake, Stakely, stakefish, Validation Cloud, Luganodes, P2P.org, Nodemonster, Twinstake, Finoa); các bài còn lại được đọc dưới dạng repost.

- P2P.org, 2026-10-20: tài khoản của họ nói họ "now running" Optimum trên Ethereum mainnet và nêu việc dùng ít băng thông hơn, thu được nhiều phần thưởng hơn. ([@P2Pvalidator](https://x.com/P2Pvalidator/status/2112574739789267067)) [third-party]
- stakefish, 2026-10-20: nói rằng họ "now running" mump2p trên Ethereum mainnet. ([@stakefish](https://x.com/stakefish/status/2112669319553257684)) [third-party]
- Stakely, 2026-10-20: nói rằng họ "now running" mump2p trên Ethereum mainnet và viết "From testing to mainnet". ([@Stakely_io](https://x.com/Stakely_io/status/2112582924499308700)) [third-party]
- Twinstake, 2026-10-20: nói rằng họ chạy mump2p "across our gateways" trên mainnet. ([@twinstake_io](https://x.com/twinstake_io/status/2112572641349669235)) [third-party]
- Validatrium, 2026-10-20: nói rằng họ "now running" mump2p trong hạ tầng validator Ethereum của mình. ([@validatrium](https://x.com/validatrium/status/2112568062218015224)) [third-party]
- Meria, 2026-10-20: nói rằng họ tự hào "join" Optimum mainnet với tư cách validator; họ không dùng từ running. ([@Meria_Finance](https://x.com/Meria_Finance/status/2112565899026976769)) [third-party]
- Luganodes, 2026-10-21: nói rằng họ "running mump2p" trên Ethereum mainnet. ([@Luganodes](https://x.com/Luganodes/status/2112788160338169916)) [third-party]
- Finoa Consensus Services, 2026-10-21: nói rằng họ là đối tác ra mắt của mump2p, đã chạy trên mainnet, và các validator của họ giờ thấy khối và attestation sớm hơn. ([@FinoaConsensus](https://x.com/FinoaConsensus/status/2112896608522346590)) [third-party]
- Blockdaemon, 2026-10-20: nói rằng họ là đối tác ra mắt của Optimum, giờ đã chạy trên mainnet, và kỳ vọng hiệu năng tốt hơn cùng nhiều phần thưởng hơn. ([@BlockdaemonHQ](https://x.com/BlockdaemonHQ/status/2112567298083147836)) [third-party]
- Nodemonster, 2026-10-20: nói rằng các validator của họ chạy trên Optimum mainnet sau giai đoạn testnet, với "84.2%" số khối đến nhanh hơn và lan truyền nhanh hơn trung bình khoảng 5x; không nêu phương pháp đo. ([@Nodemonste](https://x.com/Nodemonste/status/2112663008015163608)) [third-party]
- Validation Cloud, 2026-10-20: nói rằng họ thấy hơn 98% số khối đến nhanh hơn và tốc độ trung bình tăng 2.2 lần so với libp2p; không nêu phương pháp đo. ([@ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714)) [third-party]
- Everstake, 2026-10-20: nói rằng họ đã tham gia thử nghiệm và "now evaluating the results" trên mainnet; cách dùng từ là đang đánh giá, không phải đang chạy production. ([@everstake_pool](https://x.com/everstake_pool/status/2112577152298148217)) [third-party]
- Everstake, 2026-10-20: một bài đăng riêng chỉ chúc mừng Optimum ra mắt mainnet. ([@everstake_pool](https://x.com/everstake_pool/status/2112567194953335050)) [third-party]
- Ebunker, 2026-10-21: chúc mừng Optimum và nói họ là "part of this milestone", làm việc cùng đội ngũ; họ không nói thẳng rằng họ chạy mump2p trên mainnet. ([@ebunker_eth](https://x.com/ebunker_eth/status/2112743473975882088)) [third-party]
- ether.fi, 2026-10-20: chúc mừng Optimum và tự gọi mình là "Proud user"; đây là bài đăng đầu tiên của ether.fi được tìm thấy, và bài không nhắc tới yêu cầu đối với nhà vận hành nút. ([@ether_fi](https://x.com/ether_fi/status/2112560807385145596)) [third-party]

## Tin từ Unchained (Unchained coverage, thêm ngày 2026-10-21)

- Unchained, 2026-10-20, đưa tin rằng Optimum cho họ biết có 16 nhà vận hành nút đang chạy mump2p trên mainnet với khoảng 22,000 validator key và hơn 1.4 million ETH (số liệu của Optimum, chưa được kiểm tra độc lập), mà Optimum cho là hơn 3% lượng ETH đang stake. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- Bài viết nói ether.fi giờ yêu cầu cả 12 nhà vận hành nút của họ chạy mump2p, và trích lời Rok Kopp của ether.fi; Optimum nói trước đó ether.fi để việc này là tùy chọn. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- Bài nói các nhà vận hành mà Optimum nêu tên gồm Blockdaemon, Everstake, P2P.org, Stakefish và Bitcoin Suisse; bài không nói Optimum nêu tên họ ở đâu. Danh sách này rộng hơn danh sách trong blog ra mắt (xem "Số lượng đối tác"). ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- Bài gọi con số tốc độ 2.42x là tự báo cáo và nói Optimum không cho biết cách thu thập. Trang không ghi tác giả cụ thể, chỉ có "Unchained" và một biên tập viên, nên đây không phải bài có tên Laura Shin. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]

## Số lượng đối tác (Partner counts)

- Trang chủ: "40" đối tác testnet và "$24b" stake ETH được kết nối. Đây là đối tác testnet, không phải validator chạy production. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Bài thông báo ra mắt mainnet nói đang triển khai với hơn 40 validator và nhà vận hành nút cấp doanh nghiệp. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Thông cáo tháng 6 năm 2025 nói các đối tác nắm khoảng 15% tổng stake của Ethereum, theo dữ liệu của Rated. ([Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/)) [claimed]

- Bài ra mắt, 2026-10-20: "16 leading node operators" đang tăng ETH stake của họ. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Cùng bài nêu tên Blockdaemon và Everstake là "some of the largest Ethereum node operators" trong số những bên áp dụng, cùng với "all ether.fi validators" và các nhà vận hành "from every major global region". Bài không liệt kê tên nào khác. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Bài nói họ đã làm việc với một số đối tác này hơn một năm. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Trang team ngày 2026-10-21: "Live: Optimum on Ethereum Mainnet" với "20+ validators" và "over 1.4 million staked ETH". ([team page](https://www.getoptimum.xyz/team)) [claimed]
- Trang chủ ngày 2026-10-21: "20 Mainnet partners & counting"; FAQ nói danh sách đối tác hiện tại nằm trên Hub. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Mã nguồn validators.js của Hub liệt kê 26 tên nhà vận hành trong danh sách của nó: Blockdaemon, InfStones, Luganodes, EBunker, P2P.org, ether.fi, Meria, NodeMonster, RockX, Obol, Simply Staking, Gateway.fm, HashKey Cloud, Stakely, ChainUp, Everstake, Kiln, DSRV, Finoa Consensus, FP Validated, Puffer, Nansen, Validation Cloud, Stakefish, Validatrium, Twinstake. Cùng file này còn tạo ra hàng nghìn validator giả lập, nên đây là code front-end chưa rõ trạng thái. Hãy hiểu các tên đó là "mã nguồn của Hub liệt kê những tên này", không phải bằng chứng nhà vận hành nào chạy mump2p trên mainnet. ([Hub validators.js](https://hub.getoptimum.xyz/dashboard/services/validators.js)) [claimed]
- Trong số các nhà vận hành được nêu tên, chỉ Blockdaemon, Everstake và ether.fi được chính bài ra mắt của Optimum nêu là bên áp dụng; với các bên còn lại, các dòng ở bảng trên vẫn là bằng chứng. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]

## Lido PERCH

- Đăng ngày 2026-08-10 bởi alan.s, với tư cách người đề xuất. Bài đề nghị các nhà vận hành thuộc Lido Curated Module chạy Optimum Gateway cạnh beacon node của họ trong một tháng đánh giá trên Hoodi. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [confirmed]
- Tính đến last_verified, thread vẫn mở, chưa có tóm tắt kết thúc và chưa có quyết định governance nào. [confirmed]
- Reply 12, 2026-10-13, của người dùng diễn đàn Chandler_Otterbein (bài đăng không nêu đơn vị công tác): cửa sổ đo một tháng trên Hoodi đang "wrapping up", bản tóm tắt cấp toàn bộ fleet trên Hoodi sẽ được đăng sau buổi rà soát cuối cửa sổ, và các bước tiếp theo cho stake được ủy quyền của Lido trên mainnet sẽ được phối hợp với Lido sau khi báo cáo PERCH được xem xét. ([Lido forum, post 12](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/12)) [confirmed]
- Cùng bài này gọi số liệu attestation trên Hoodi là "a directional read" vì có slot bị bỏ lỡ và slot mồ côi (orphaned), và nói việc thử nghiệm riêng trên mainnet cho "very positive results", không kèm dữ liệu. ([Lido forum, post 12](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/12)) [claimed]
- Khi đọc ngày 2026-10-21, thread chưa có bản tóm tắt cấp fleet nào. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [confirmed]

## Còn tranh cãi (Disputed)

- **Nhà vận hành nào chạy nó trên mainnet (2026-10-21):** các dòng cũ nói chưa có bài đăng gốc từ P2P.org hay Everstake và stakefish mới chỉ đăng ký; các bài đăng sau đó nói P2P.org và stakefish chạy nó, còn Everstake chỉ nói đang đánh giá. Unchained thêm Bitcoin Suisse, bên không có bài đăng nào ở đây. Tất cả là phát biểu của nhà vận hành hoặc báo chí, không cái nào được đo độc lập. ([@P2Pvalidator](https://x.com/P2Pvalidator/status/2112574739789267067); [@stakefish](https://x.com/stakefish/status/2112669319553257684); [@everstake_pool](https://x.com/everstake_pool/status/2112577152298148217); [Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- **Tuyên bố tốc độ của các nhà vận hành:** Nodemonster nói khoảng 5x với 84.2% số khối nhanh hơn, Validation Cloud nói 2.2x với hơn 98% nhanh hơn, blog ra mắt của Optimum nói 2.5 - 3.5x. Các nhà vận hành khác nhau, không có phương pháp chung. ([@Nodemonste](https://x.com/Nodemonste/status/2112663008015163608); [@ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [third-party], [claimed]
- **Stake được kết nối:** $24B (trang chủ) so với khoảng $30B (Four Pillars dẫn lại Optimum) so với khoảng 15% tổng stake (thông cáo 2025). Mốc thời gian khác nhau, có thể là các nhóm đối tác khác nhau.
- **Số nhà vận hành lúc ra mắt:** blog "16 leading node operators" so với trang chủ "20 Mainnet partners & counting" so với trang team "20+ validators" và "over 1.4 million staked ETH" so với 26 tên trong danh sách validators.js của Hub so với "40+" validator trước đó và "40" đối tác testnet. Có thể do mốc thời gian và định nghĩa khác nhau (nhà vận hành, đối tác, validator); không nguồn nào đưa ra danh sách đằng sau bất kỳ con số nào. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/); [team page](https://www.getoptimum.xyz/team); [Hub validators.js](https://hub.getoptimum.xyz/dashboard/services/validators.js)) [claimed]
- **"40 validators":** trang chủ đếm đối tác testnet; bài ra mắt nói hơn 40 validator trong đợt triển khai mainnet. Cả hai đều không liệt kê đầy đủ.
