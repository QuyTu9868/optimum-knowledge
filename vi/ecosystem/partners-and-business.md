---
title: Partners, research coverage and business model
last_verified: 2026-10-16
status: mixed
lang: vi
translation_of: ecosystem/partners-and-business.md
source_sha: 101f374a43bd
---

# Đối tác và mô hình kinh doanh (Partners and business model)

## Obol

- Obol thông báo đang thử Optimum, với dự tính có thể tích hợp distributed validator (validator phân tán). Chưa có gì chạy thật. ([Obol blog, 2025-10-07](https://blog.obol.org/obol-and-optimum-unite-to-supercharge-ethereum-scaling/)) [third-party]
- Repo Gateway có một overlay tùy chọn (opt-in) cho bộ cài đặt CDVN của Obol (PR #5, 2026-08-03), và tổ chức getoptimum cũng lưu trữ một repo charon-distributed-validator-node. ([GitHub](https://github.com/getoptimum/optimum-gateway)) [confirmed]

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
- Xem thêm [../technology/flexnodes.md](../technology/flexnodes.md).

## Có cần cấp phép hay không (Permissioned or permissionless)

- Trang chủ dùng tiêu đề "Permissionless, Zero-Setup Integration". ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Gateway dùng handshake JWT dựa trên dịch vụ xác thực của Optimum, và bài ra mắt mainnet nói quyền truy cập được cấp phép bằng API key. ([v1.1.0 release notes](https://github.com/getoptimum/optimum-gateway/releases), [launch post](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [confirmed]
- Từ v1.3.1, nhà vận hành có thể tự đăng ký gateway bằng một join key dùng chung cho cả tổ chức, thay vì một key cho mỗi máy. Xem [../code/releases.md](../code/releases.md). [confirmed]
- Four Pillars coi Flexnode không cần cấp phép là mục tiêu trong tương lai. [third-party]

## Solana

- Không tìm thấy triển khai nào trên Solana. Optimum mới chỉ viết về Turbine và một phần mở rộng RLNC có thể có cho Turbine. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Sự kiện (Events)

- Optimum tổ chức sự kiện CODED vào ngày 2026-09-29 trong Korea Blockchain Week, đồng tổ chức với Google Cloud, Four Pillars, LINE NEXT và Auros. ([@get_optimum post, 2026-09-17](https://x.com/get_optimum/status/2100671701965271457); [event page](https://luma.com/bkffotv7), trang này ghi địa điểm là Google Startup Campus tại Seoul, 15:00 đến 20:00) [claimed]
- Four Pillars cũng thông báo CODED@KBW, nói rằng thương hiệu validator FP Validated của họ tổ chức cùng Google Cloud, LINE NEXT, Optimum và Auros. ([@FourPillarsFP post, 2026-09-17](https://x.com/FourPillarsFP/status/2100470989926654170)) Bài đăng cùng ngày của chính FP Validated nhắc lại danh sách đơn vị tổ chức và ghi địa điểm là Google for Startups Campus tại Seoul. ([@FPvalidated post, 2026-09-17](https://x.com/FPvalidated/status/2100462173436965321)) [third-party]
- P2P.org đăng rằng đại diện Hàn Quốc của họ tham gia một panel về các tổ chức tại CODED@KBW cùng Muriel Medard của Optimum. Trang sự kiện liệt kê P2P, Four Pillars, Lido, Auros và Optimum trong panel đó (Panel #2). ([@P2Pvalidator post, 2026-10-14](https://x.com/P2Pvalidator/status/2110323311473504382); [event page](https://luma.com/bkffotv7)) [third-party]
- Optimum nói rằng họ đã đồng tổ chức một buổi chiều về agentic trading cùng AMBR tại văn phòng của AMBR ở Singapore vào ngày 2026-10-06. ([@get_optimum post, 2026-10-02](https://x.com/get_optimum/status/2106167385522880702); [recap, 2026-10-07](https://x.com/get_optimum/status/2107874916330877387)) [claimed]
- AMBR liệt kê một phiên về agentic trading, AI agent và hạ tầng tài chính cùng Optimum vào ngày 6/10 trong tuần Token2049 Singapore. Bài đăng không ghi địa điểm và không gọi Optimum là đơn vị đồng tổ chức. ([@ambr_io post, 2026-09-29](https://x.com/ambr_io/status/2104862584650518757)) [third-party]

## Còn tranh cãi (Disputed)

- **Permissionless:** nội dung quảng bá nói là permissionless; hệ thống đang chạy thì yêu cầu một key hoặc join key do Optimum cấp.
- **Chi tiết panel CODED@KBW:** bài của P2P.org nói Head of Korea của họ phát biểu, một người điều phối của Four Pillars dẫn panel và Nethermind cũng có mặt. Trang sự kiện ghi diễn giả của P2P là "Justin, APAC BD", không nêu người điều phối và liệt kê diễn giả của Nethermind mà không gắn với panel nào. ([@P2Pvalidator post](https://x.com/P2Pvalidator/status/2110323311473504382); [event page](https://luma.com/bkffotv7))
