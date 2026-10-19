---
title: Validators and operators
last_verified: 2026-10-16
status: names mostly claimed by Optimum; a few self-reported tests
lang: vi
translation_of: ecosystem/validators.md
source_sha: fa4f884e925a
---

# Validator (nút xác thực) và nhà vận hành (Validators and operators)

Được Optimum nêu tên không có nghĩa là đang chạy nó. Mỗi nhà vận hành bên dưới được kiểm tra riêng.

## Nhà vận hành được nêu tên (Named operators)

| Nhà vận hành | Bằng chứng cho thấy gì | Nguồn | Tag |
|---|---|---|---|
| Everstake | Đã thử nghiệm trên Hoodi; COO được phỏng vấn | [Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck) | [third-party] |
| Blockdaemon | Tự báo cáo chạy thử trên Hoodi, hiệu suất attestation (phiếu xác nhận) tốt hơn | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| InfStones | Tự báo cáo chạy trên một testnet riêng, không có số liệu | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| Ebunker | Tự báo cáo chạy trong môi trường testnet, không nêu tên mạng | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| P2P.org | Được nêu tên và trích lời trong thông cáo báo chí của Optimum; không có dữ liệu thử nghiệm | [Chainwire, 2025-06-24](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/) | [claimed] |
| Kiln | Được nêu tên và COO được trích lời trong cùng thông cáo; không có dữ liệu thử nghiệm | [Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/) | [claimed] |
| Luganodes | Chỉ có lời chứng thực trên site của Optimum | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| FP Validated | Optimum nói rằng đang thử mump2p; FP Validated nói rằng đã tham gia với tư cách đối tác validator. Không có dữ liệu thử nghiệm | [@get_optimum, 2026-08-04](https://x.com/get_optimum/status/2084681995741995255); [@FPvalidated, 2026-08-05](https://x.com/FPvalidated/status/2084816155177537577) | [claimed] |
| DSRV | Optimum nêu tên là đối tác thử nghiệm, một nhà vận hành Hàn Quốc mà Optimum nói đang stake hơn 300k ETH. Không có dữ liệu thử nghiệm | [@get_optimum, 2026-09-10](https://x.com/get_optimum/status/2098033786915287228) | [claimed] |
| Twinstake | Được nêu tên là đối tác thử nghiệm. Optimum nói thêm rằng MEV APR của riêng Twinstake cao hơn mức trung bình của Ethereum khoảng 35% trong 12 tháng; đó không phải kết quả của mump2p và không có nguồn đi kèm. Chính Twinstake đăng rằng họ đang thử mump2p cùng với hạ tầng Ethereum của mình, chưa có kết quả | [@get_optimum, 2026-09-15](https://x.com/get_optimum/status/2099900356671295884); [@twinstake_io, 2026-09-15](https://x.com/twinstake_io/status/2099967006338359471) | [claimed], [third-party] |
| Finoa Consensus Services | Được nêu tên là đối tác mới; bài đăng không nói là đang thử hay đang chạy mump2p. Chính Finoa đăng rằng họ hào hứng được hợp tác với Optimum, cũng không nhắc tới việc thử nghiệm | [@get_optimum, 2026-08-31](https://x.com/get_optimum/status/2094450916095361404); [@FinoaConsensus, 2026-09-01](https://x.com/FinoaConsensus/status/2094817254609211903) | [claimed], [third-party] |
| Nodemonster | Tự báo cáo đã chạy vài tháng trên testnet, độ trễ lan truyền khối trung bình khoảng 150 ms, nhanh hơn mức nền GossipSub khoảng 6x, không nêu phương pháp đo. Optimum đã trích lại bài này | [@Nodemonste post](https://x.com/Nodemonste/status/2095105880807051525); [quoted by @get_optimum, 2026-09-02](https://x.com/get_optimum/status/2095189075892531257) | [third-party] |

Các nhà vận hành khác báo cáo trong Lido thread: HashKey Cloud (Hoodi, độ trễ lan truyền attestation thấp hơn khoảng 200 ms), Stakely (Hoodi, không có sự cố nào), FP Validated (Hoodi, vẫn đang đo). stakefish và SenseiNode mới chỉ đăng ký hoặc tỏ ý quan tâm. StereumLabs chạy phép đo độc lập duy nhất trên mainnet, xem [../results/performance.md](../results/performance.md). [third-party]

Chưa tìm thấy bài đăng gốc nào từ Everstake, P2P.org, Kiln hay Luganodes nói rằng họ đang chạy nó.

## Số lượng đối tác (Partner counts)

- Trang chủ: "40" đối tác testnet và "$24b" stake ETH được kết nối. Đây là đối tác testnet, không phải validator chạy production. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Bài thông báo ra mắt mainnet nói đang triển khai với hơn 40 validator và nhà vận hành nút cấp doanh nghiệp. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Thông cáo tháng 6 năm 2025 nói các đối tác nắm khoảng 15% tổng stake của Ethereum, theo dữ liệu của Rated. ([Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/)) [claimed]

## Lido PERCH

- Đăng ngày 2026-08-10 bởi alan.s, với tư cách người đề xuất. Bài đề nghị các nhà vận hành thuộc Lido Curated Module chạy Optimum Gateway cạnh beacon node của họ trong một tháng đánh giá trên Hoodi. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [confirmed]
- Tính đến last_verified, thread vẫn mở, chưa có tóm tắt kết thúc và chưa có quyết định governance nào. [confirmed]

## Còn tranh cãi (Disputed)

- **Stake được kết nối:** $24B (trang chủ) so với khoảng $30B (Four Pillars dẫn lại Optimum) so với khoảng 15% tổng stake (thông cáo 2025). Mốc thời gian khác nhau, có thể là các nhóm đối tác khác nhau.
- **"40 validators":** trang chủ đếm đối tác testnet; bài ra mắt nói hơn 40 validator trong đợt triển khai mainnet. Cả hai đều không liệt kê đầy đủ.
