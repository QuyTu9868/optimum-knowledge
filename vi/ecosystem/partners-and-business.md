---
title: Partners, research coverage and business model
last_verified: 2026-10-21
status: mixed
lang: vi
translation_of: ecosystem/partners-and-business.md
source_sha: a45f65cc76cc
---

# Đối tác và mô hình kinh doanh (Partners and business model)

## Obol

- Obol thông báo đang thử Optimum, với dự tính có thể tích hợp distributed validator (validator phân tán). Chưa có gì chạy thật (còn tranh cãi từ 2026-10-20, xem Còn tranh cãi). ([Obol blog, 2025-10-07](https://blog.obol.org/obol-and-optimum-unite-to-supercharge-ethereum-scaling/)) [third-party]
- Repo Gateway có một overlay tùy chọn (opt-in) cho bộ cài đặt CDVN của Obol (PR #5, 2026-08-03), và tổ chức getoptimum cũng lưu trữ một repo charon-distributed-validator-node. ([GitHub](https://github.com/getoptimum/optimum-gateway)) [confirmed]

- Tổng kết ngày đầu 2026-10-20 của tài khoản X EliLaipson (bài đăng không nêu vai trò và chưa kiểm tra bio; cách dùng từ "our partners" và "We launched" gợi ý tài khoản này đăng thay Optimum, nên coi là third-party): cảm ơn "our partners" ether.fi, Lido, Blockdaemon, Everstake, P2P, Meria, Stakely và Obol "and a whole bunch more". Bài không nói Obol chạy mump2p trên mainnet. ([@EliLaipson](https://x.com/EliLaipson/status/2112653066432573466)) [third-party]

## Báo cáo của Four Pillars (Four Pillars report)

- Four Pillars đăng "Optimum: Rethinking the Blockchain Network Layer" của c4lvin vào ngày 2026-08-18. Bài ghi rõ nghiên cứu này do Optimum tài trợ. ([Four Pillars](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [confirmed]
- FP Validated, một bộ phận của Four Pillars, cũng là một trong các nhà vận hành đang thử nghiệm trong Lido thread. [third-party]
- FP Validated đăng ngày 2026-08-05 rằng họ đã tham gia Optimum với tư cách đối tác validator (nút xác thực). ([@FPvalidated post](https://x.com/FPvalidated/status/2084816155177537577)) [third-party]

## Ethereum Korea

- Optimum thông báo ngày 2026-08-20 rằng họ chính thức là thành viên của Ethereum Korea Consortium. ([@get_optimum post, 2026-08-20](https://x.com/get_optimum/status/2090239160208764986)) [claimed]
- Ethereum Korea đăng cùng tin này bằng tiếng Hàn trong ngày hôm đó. ([@ethereumkoreaio post, 2026-08-20](https://x.com/ethereumkoreaio/status/2090242415776891250)) [third-party]
- Ethereum Korea liệt kê Optimum là General Sponsor của sự kiện Ethereum Korea One, diễn ra ngày 28-29/9/2026 tại Seoul. ([@ethereumkoreaio post, 2026-09-05](https://x.com/ethereumkoreaio/status/2096244461659689119)) [third-party]

## Ai trả tiền (Who pays)

- Optimum nói rằng việc truy cập khối và attestation (phiếu xác nhận) nhanh hơn đang miễn phí cho validator và sẽ tiếp tục miễn phí. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Four Pillars mô tả một Latency Marketplace đang được lên kế hoạch: validator trả tiền, các nhà vận hành Flexnode cung cấp băng thông (bandwidth) được trả tiền. Giá, cơ chế thanh toán và vai trò của token (nếu có) chưa được công bố. ([Four Pillars](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [third-party]
- Bài ra mắt, 2026-10-20: Signal "free and available to all Ethereum validator operators", còn Accelerate có sẵn qua quy trình tự đăng ký (self-serve onboarding) cho các đơn vị vận hành từ 200 validator key trở lên. Bài không nói Accelerate có miễn phí hay không. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- FAQ trang chủ ngày 2026-10-21: "Signal is free for Ethereum validators"; trang không nêu giá cho Accelerate. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Tweet thông báo nói Optimum đang "opening up free access for all Ethereum node operators". ([@get_optimum, 2026-10-20](https://x.com/get_optimum/status/2112559939126206552)) [claimed]
- Token, phí của nhà vận hành Flexnode và Latency Marketplace không được nhắc tới trong bài ra mắt hay trang chủ; các dòng ở trên không đổi. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- Xem thêm [../technology/flexnodes.md](../technology/flexnodes.md).

## Có cần cấp phép hay không (Permissioned or permissionless)

- Trang chủ dùng tiêu đề "Permissionless, Zero-Setup Integration". ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Gateway dùng handshake JWT dựa trên dịch vụ xác thực của Optimum, và bài ra mắt mainnet nói quyền truy cập được cấp phép bằng API key. ([v1.1.0 release notes](https://github.com/getoptimum/optimum-gateway/releases), [launch post](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [confirmed]
- Từ v1.3.1, nhà vận hành có thể tự đăng ký gateway bằng một join key dùng chung cho cả tổ chức, thay vì một key cho mỗi máy. Xem [../code/releases.md](../code/releases.md). [confirmed]
- Four Pillars coi Flexnode không cần cấp phép là mục tiêu trong tương lai. [third-party]
- Bài ra mắt, 2026-10-20: nhà vận hành validator Ethereum "can get started" qua Console với thiết lập tự phục vụ, và bài nói "any node operator can now onboard themselves". Signal mở cho mọi nhà vận hành validator; Accelerate bị giới hạn theo quy mô (200 key). ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- FAQ trang chủ: "Signal is open to any Ethereum validator. Accelerate is available to operators running 200 or more validators." Tiêu đề trang chủ vẫn ghi "Permissionless, Zero-Setup Integration". ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Tài liệu Console đọc ngày 2026-10-20 nói Optimum bật Signal và Accelerate theo từng tài khoản, xem [../products/console-and-signal.md](../products/console-and-signal.md) và [../products/accelerate.md](../products/accelerate.md). ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]

## Tổng kết ngày ra mắt và hướng đi (Launch-day recap and direction, thêm ngày 2026-10-21)

- Bản tổng kết đó còn nhắc tới một dashboard DefiLlama, buổi livestream của blocmates với Kent Lin và Muriel Medard, Optimum Hub, và tin từ The Defiant, Unchained và Laura Shin. ([@EliLaipson](https://x.com/EliLaipson/status/2112653066432573466)) [third-party]
- Unchained, 2026-10-20, đưa tin ether.fi giờ yêu cầu cả 12 nhà vận hành nút của họ chạy mump2p; xem [validators.md](validators.md). ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- Optimum đăng ngày 2026-09-15 rằng họ đang tuyển một trader làm việc từ xa hoàn toàn, có nền tảng giao dịch crypto, quant hoặc market-making, để tìm nơi độ trễ quan trọng và thiết kế sản phẩm cho trader. ([@get_optimum](https://x.com/get_optimum/status/2099914538753888345)) [claimed]
- Muriel Medard nhắc lại ngay trong ngày, nói Optimum đã xây một "ultra-low latency data acceleration network" và muốn biến nó thành sản phẩm cho trader. Đây là tín hiệu tuyển dụng và một hướng đi được nêu ra, không phải sản phẩm đã ra mắt. ([@MurielMedard](https://x.com/MurielMedard/status/2099935717728436606)) [claimed]

## Solana

- Không tìm thấy triển khai nào trên Solana. Optimum mới chỉ viết về Turbine và một phần mở rộng RLNC có thể có cho Turbine. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Sự kiện (Events)

- Optimum tổ chức sự kiện CODED vào ngày 2026-09-29 trong Korea Blockchain Week, đồng tổ chức với Google Cloud, Four Pillars, LINE NEXT và Auros. ([@get_optimum post, 2026-09-17](https://x.com/get_optimum/status/2100671701965271457); [event page](https://luma.com/bkffotv7), trang này ghi địa điểm là Google Startup Campus tại Seoul, 15:00 đến 20:00) [claimed]
- Four Pillars cũng thông báo CODED@KBW, nói rằng thương hiệu validator FP Validated của họ tổ chức cùng Google Cloud, LINE NEXT, Optimum và Auros. ([@FourPillarsFP post, 2026-09-17](https://x.com/FourPillarsFP/status/2100470989926654170)) Bài đăng cùng ngày của chính FP Validated nhắc lại danh sách đơn vị tổ chức và ghi địa điểm là Google for Startups Campus tại Seoul. ([@FPvalidated post, 2026-09-17](https://x.com/FPvalidated/status/2100462173436965321)) [third-party]
- P2P.org đăng rằng đại diện Hàn Quốc của họ tham gia một panel về các tổ chức tại CODED@KBW cùng Muriel Medard của Optimum. Trang sự kiện liệt kê P2P, Four Pillars, Lido, Auros và Optimum trong panel đó (Panel #2). ([@P2Pvalidator post, 2026-10-14](https://x.com/P2Pvalidator/status/2110323311473504382); [event page](https://luma.com/bkffotv7)) [third-party]
- Ethereum Korea liệt kê một panel "Staking Infra: Custody, Yield, and Compliance for ETH" vào ngày 2026-09-28 tại Conrad Seoul, trong đó Kent Lin được nêu là COO của Optimum, cùng các diễn giả từ Nodeinfra, DSRV và Lido. ([@ethereumkoreaio post, 2026-09-18](https://x.com/ethereumkoreaio/status/2100848959766024699)) [third-party]
- Optimum nói Kent Lin sẽ phát biểu trong panel đó vào 9/28, sự kiện CODED của họ diễn ra 9/29, và đội ngũ dự DAS Asia vào 10/7. Chưa kiểm tra panel có diễn ra đúng như danh sách hay không. ([@get_optimum post, 2026-09-22](https://x.com/get_optimum/status/2102361934700138960)) [claimed]
- Optimum nói rằng họ đã đồng tổ chức một buổi chiều về agentic trading cùng AMBR tại văn phòng của AMBR ở Singapore vào ngày 2026-10-06. ([@get_optimum post, 2026-10-02](https://x.com/get_optimum/status/2106167385522880702); [recap, 2026-10-07](https://x.com/get_optimum/status/2107874916330877387)) [claimed]
- AMBR liệt kê một phiên về agentic trading, AI agent và hạ tầng tài chính cùng Optimum vào ngày 6/10 trong tuần Token2049 Singapore. Bài đăng không ghi địa điểm và không gọi Optimum là đơn vị đồng tổ chức. ([@ambr_io post, 2026-09-29](https://x.com/ambr_io/status/2104862584650518757)) [third-party]

## Còn tranh cãi (Disputed)

- **Obol (2026-10-20):** blog Obol ngày 2025-10-07 nói Obol đang thử và chưa có gì chạy thật, nên dòng ở trên được giữ lại. Bản tổng kết ngày đầu cảm ơn Obol trong số "our partners" ở đợt ra mắt mainnet mà không nói Obol chạy gì, và validators.js của Hub có liệt kê Obol; không tìm thấy bài đăng nào của Obol về mainnet. Là đối tác và đang chạy thật là hai tuyên bố khác nhau. ([Obol blog](https://blog.obol.org/obol-and-optimum-unite-to-supercharge-ethereum-scaling/); [@EliLaipson](https://x.com/EliLaipson/status/2112653066432573466)) [third-party]
- **Permissionless:** nội dung quảng bá nói là permissionless; hệ thống đang chạy thì yêu cầu một key hoặc join key do Optimum cấp.
- **Mở cho tất cả so với bật theo từng tài khoản (sau ra mắt):** bài ra mắt và FAQ trang chủ nói Signal mở cho mọi nhà vận hành validator Ethereum với quy trình tự đăng ký, trong khi tài liệu Console đọc ngày 2026-10-20 nói Optimum bật Signal theo từng tài khoản. Repo tài liệu không có commit nào sau 2026-10-20 13:04 UTC, tức trước tweet ra mắt. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/); [docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [claimed], [confirmed]
- **Miễn phí cho tất cả hay chỉ Signal:** tweet nói "free access for all Ethereum node operators" và phần mở đầu blog nói validator nào cũng chạy miễn phí, trong khi phần onboarding của blog và FAQ trang chủ chỉ nêu giá cho Signal; Accelerate bị giới hạn ở 200 key và chưa có giá. ([tweet](https://x.com/get_optimum/status/2112559939126206552); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- **Cách ghi điều kiện của Accelerate:** blog ghi "entities operating at least 200 validator keys", FAQ trang chủ ghi "operators running 200 or more validators", tài liệu ghi 200 validator mainnet đang hoạt động và cũng cho phép tài khoản cá nhân. Xem [../products/accelerate.md](../products/accelerate.md). ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- **Chi tiết panel CODED@KBW:** bài của P2P.org nói Head of Korea của họ phát biểu, một người điều phối của Four Pillars dẫn panel và Nethermind cũng có mặt. Trang sự kiện ghi diễn giả của P2P là "Justin, APAC BD", không nêu người điều phối và liệt kê diễn giả của Nethermind mà không gắn với panel nào. ([@P2Pvalidator post](https://x.com/P2Pvalidator/status/2110323311473504382); [event page](https://luma.com/bkffotv7))
