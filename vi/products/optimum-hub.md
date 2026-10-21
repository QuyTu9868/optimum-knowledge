---
title: Optimum Hub
last_verified: 2026-10-21
status: Optimum's own dashboard and public JSON, read 2026-10-21; method described only in the launch blog, not independently audited
lang: vi
translation_of: products/optimum-hub.md
source_sha: 1a7385875525
---

# Optimum Hub

Hub là dashboard hiệu năng công khai của Optimum cho mump2p trên mainnet Ethereum, được công bố cùng đợt ra mắt mainnet ngày 2026-10-20. Blog nói số liệu của họ lấy từ Hub một tuần trước đó, nên Hub đã có trước thông báo. Mọi con số trên đó đều do chính Optimum đưa ra, nên được gắn tag claimed xuyên suốt. Các so sánh tốc độ nằm ở [../results/performance.md](../results/performance.md).

## Hub là gì (What it is)

- Optimum xây Hub như một "proof of performance": dashboard lấy dữ liệu từ các nút kết nối của họ, tổng hợp trên các nhà vận hành (operator) đang chạy mump2p. ([launch blog, 2026-10-20](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Dashboard nằm ở [hub.getoptimum.xyz](https://hub.getoptimum.xyz/). Tweet ra mắt thứ hai trỏ tới đây cho các chỉ số đằng sau thông báo. ([tweet](https://x.com/get_optimum/status/2112559943123349769)) [claimed]
- FAQ trên trang chủ nói danh sách đối tác mainnet hiện tại, lượng stake và số liệu hiệu năng trực tiếp được công bố trên Hub. ([homepage](https://www.getoptimum.xyz/)) [claimed]

## Phương pháp, theo cách blog nêu (Method, as the blog states it)

- Hub hiển thị ảnh chụp nhanh mức tăng tốc của mump2p trên các khối gần đây và dùng các nút sentry của Xatu để đo hiệu năng libp2p trên chính những khối đó. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Vậy mốc so sánh là libp2p theo cách các sentry Xatu nhìn thấy, còn phía mump2p đến từ các nút kết nối của Optimum. Bài không nói dấu thời gian của sentry và gateway được căn chỉnh thế nào. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Số liệu trong blog: 50,292 slot (khung 12 giây của Ethereum), mump2p dẫn trước 335 ms, "3.3x faster", lấy từ Hub một tuần trước khi đăng. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog nói mump2p tăng tốc 85-90% số khối với mức 2.5-3.5x. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Một ca nghiên cứu nhà vận hành: head vote sai giảm 51% trong 1 tuần, so trước và sau khi dùng mump2p. Nhà vận hành không được nêu tên. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]

## Ba endpoint công khai (The three public endpoints)

Tất cả nằm dưới `https://console.getoptimum.xyz/api/public/`. Không cần đăng nhập khi lấy ngày 2026-10-21. Ý nghĩa các trường dưới đây là những gì JSON cho thấy; blog không mô tả schema.

- `network-performance`: `network` mainnet, `window` (start, end, hours, slots measured), `observers` (số gateway và sentry Xatu), `headline` (spread factor, lead tính bằng ms kèm khoảng tin cậy, tỉ lệ slot được tăng tốc), `spread` và `arrival` (ms cho mump2p và libp2p, không nêu thống kê nào, và số slot được so sánh), `percentile_lead` (lead tính bằng ms từ p50 đến p95) và `distribution` (các bucket 10 ms, số đếm theo từng phía). ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- `fleet-stake`: `unit` eth, một `series` theo ngày gồm các giá trị `eth` kèm cờ `carried`. Một ngày (2026-09-14) được đánh dấu carried, có lẽ nghĩa là giá trị sao chép từ ngày trước; JSON không nói. ([API](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- `propagation-status`: lan truyền có `on` cho mainnet hay không, từ khi nào, và lần kiểm tra gần nhất. ([API](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- JSON không bao giờ định nghĩa "spread", "arrival" hay "stake" tính cái gì (ví dụ là số dư validator hay số dư hiệu lực). Coi các tên đó là chưa được giải thích.

## Ảnh chụp các giá trị trực tiếp (lấy 2026-10-21T13:50Z; giá trị thay đổi) (Snapshot of live values)

- network-performance được tạo lúc 2026-10-21T13:50:43Z; cửa sổ từ 2026-10-20T06:00:33Z đến 2026-10-21T13:00:00Z, 31 giờ, đo 9,281 slot. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Bên quan sát: 300 gateway và 155 sentry Xatu. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Headline: spread factor 3.21, lead 262 ms (CI 8.5 ms), 87.9% số slot được tăng tốc. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Spread: mump2p 133.7 ms so với libp2p 429.3 ms trên 9,279 slot được so sánh. Arrival: 1,987 ms so với 2,249.4 ms. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Lead theo percentile: p50 49 ms, p75 102 ms, p80 112 ms, p95 262 ms. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- propagation-status: mainnet "on", từ 2026-10-20T05:45:32Z, kiểm tra lúc 2026-10-21T13:45:56Z. ([API](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- fleet-stake: 119 điểm theo ngày từ 2026-06-25 đến 2026-10-21. Giá trị cuối là 1,419,082 ETH; 2026-10-19 là 1,401,158 và 2026-10-20 là 1,419,036. ([API](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- Cùng chuỗi này cho thấy 6,720 ETH ngày 2026-06-25, 1,228,316 ngày 2026-09-01 và 1,315,896 ngày 2026-09-05. Như vậy lượng stake lớn đã được ghi nhận từ lâu trước khi mở công khai ngày 2026-10-20; chuỗi không nói lý do. ([API](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- JSON không có giá trị đô la; mọi con số đô la đều phụ thuộc vào giá ETH mà các nguồn không nêu.
- Script front-end của Hub liệt kê tên các nhà vận hành (ví dụ Blockdaemon, Everstake, Kiln, ether.fi, P2P.org). Trạng thái của danh sách này chưa rõ, nên đây chỉ là "mã nguồn của Hub liệt kê các tên này", không phải bằng chứng họ tham gia. ([Hub validators.js](https://hub.getoptimum.xyz/dashboard/services/validators.js)) [claimed]

## Chưa được kiểm chứng độc lập (Not independently verified)

- Mọi thứ trên Hub: chưa có bên thứ ba nào kiểm toán việc chọn sentry, lọc slot, căn chỉnh dấu thời gian hay định nghĩa của "spread".
- Việc 335 ms của blog và lead 262 ms của API có phải cùng một thước đo hay không. Chênh lệch arrival của API là 262 ms và chênh lệch spread của nó khoảng 296 ms.
- Số liệu stake và số nhà vận hành (xem Còn tranh cãi).
- Kết quả head vote sai giảm 51%: một nhà vận hành không nêu tên, không có nhóm đối chứng.

## Còn tranh cãi (Disputed)

- **Tốc độ:** blog 3.3x và 335 ms trên 50,292 slot (dữ liệu một tuần trước khi đăng) so với API 3.21 và lead 262 ms trên 31 giờ và 9,281 slot (2026-10-21). Khoảng thời gian khác nhau nên dự kiến có chênh lệch phần nào; blog không định nghĩa thước đo của mình.
- **Stake:** tweet và tiêu đề blog "$3.4B"; thân blog "over $3.7B in Total Value Boosted"; trang chủ "$3.4b"; API kết thúc ở 1,419,082 ETH ngày 2026-10-21 và không có giá. ([tweet](https://x.com/get_optimum/status/2112559939126206552), [launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet), [homepage](https://www.getoptimum.xyz/), [API](https://console.getoptimum.xyz/api/public/fleet-stake))
- **Nhà vận hành:** blog nói 16 nhà vận hành nút hàng đầu; trang chủ nói "20 Mainnet partners & counting". Chưa được đối chiếu. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet), [homepage](https://www.getoptimum.xyz/))
- **Ngày ra mắt so với dữ liệu:** tweet thông báo lúc 2026-10-20T15:01Z. Thời điểm `since` của trạng thái là 2026-10-20T05:45Z, sớm hơn vài giờ trong cùng ngày. Chuỗi stake cho thấy 144,847 ETH ngày 2026-06-29 và vượt 1.2M ETH ngày 2026-08-31, nên stake đã được ghi nhận từ lâu trước thông báo; JSON không nói lý do. ([propagation-status API](https://console.getoptimum.xyz/api/public/propagation-status), [fleet-stake API](https://console.getoptimum.xyz/api/public/fleet-stake), [tweet](https://x.com/get_optimum/status/2112559939126206552))
- **Dashboard DefiLlama:** DefiLlama nói đã ra mắt một dashboard Investor Relations cùng Optimum, hiển thị Total Value Boosted (1.4M ETH, $3.4B) và tốc độ khối của Optimum so với một mốc chuẩn. Trang investors.defillama.com/optimum trả về HTTP 403 ngày 2026-10-21, nên chưa được đọc và nguồn của nó (Hub hay khác) chưa rõ. ([@DefiLlama](https://x.com/DefiLlama/status/2112561379651514602)) [third-party]
- **Số liệu tốc độ của nhà vận hành và báo chí so với Hub:** Nodemonster khoảng 5x, Validation Cloud 2.2x so với libp2p, Kent Lin 2.5-3.5x, API Hub 3.21 và blog 3.3x; phương pháp không được nêu hoặc khác nhau. Xem [../results/performance.md](../results/performance.md). ([Nodemonste](https://x.com/Nodemonste/status/2112663008015163608), [ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714), [@kentlinyy](https://x.com/kentlinyy/status/2112563195395399866)) [third-party]
- **Phạm vi tăng tốc:** Optimum nói tăng tốc toàn cục đã hoạt động trên toàn mainnet Ethereum trong cửa sổ đo của StereumLabs, và dự định chỉ tăng tốc cho nhà vận hành đã đăng ký sau October 26. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]
  - Ghi chú biên tập (không phải từ bài đăng): nếu tăng tốc toàn mạng đã hoạt động vào những thời điểm khác, mốc libp2p của Hub có thể bị ảnh hưởng; các nguồn không nói.

Xem thêm: [console-and-signal.md](console-and-signal.md), [accelerate.md](accelerate.md)
