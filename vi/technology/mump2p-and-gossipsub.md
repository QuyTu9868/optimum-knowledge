---
title: mump2p and libp2p GossipSub
last_verified: 2026-10-18
status: relationship confirmed, speed numbers disputed
lang: vi
translation_of: technology/mump2p-and-gossipsub.md
source_sha: 2705a1c67c1c
---

# mump2p và GossipSub

## Mối quan hệ (Relationship)

- mump2p xây trên giao thức GossipSub của libp2p. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Nó duy trì một mesh gossip (mạng lưới kết nối, lan truyền kiểu tin đồn) có thể cấu hình, với số peer (nút ngang hàng) tương tự GossipSub. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Mạng gossip của Ethereum hiện dùng GossipSub. ([gossip problem blog, 2025-08-20](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- Validator (nút xác thực) vẫn dùng GossipSub chuẩn để giao tiếp với các peer không chạy mump2p. ([implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed]
- Một bản kiểm toán (audit) của bên thứ ba mô tả Gateway chạy song song với libp2p stack của client đồng thuận (consensus client), chứ không thay thế nó. ([ProbeLab audit, 2026-08-18](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- Một nút mump2p là một libp2p host với mesh kiểu GossipSub, cộng thêm module RLNC làm nhiệm vụ mã hóa, tái mã hóa (recoding) và giải mã các shard (mảnh mã hóa). ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Docs gọi mump2p là giải pháp thay thế hiệu năng cao cho GossipSub, xây trên libp2p. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Trong thiết kế của Gateway, consensus client vẫn giữ libp2p stack bình thường. Gateway là một libp2p peer riêng, đăng ký (subscribe) các topic gossip của Ethereum, chuyển chúng vào mesh mump2p và đưa lại các thông điệp từ mesh vào mạng của client. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Vì sao Optimum nói gossip cần được sửa (Why Optimum says gossip needs fixing)

- Optimum lập luận rằng gossip không mở rộng tuyến tính: mạng càng lớn thì độ trễ (latency) càng vọt lên và thông lượng (throughput) chạm trần. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [claimed]
- Một nút trên mesh GossipSub có thể nhận cùng một shard nhiều lần trong khi vẫn đang chờ một shard nó còn thiếu. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- Médard gắn chi phí này với đồng hồ slot của Ethereum: một slot (khung thời gian của Ethereum) kéo dài 12 giây, và bà chỉ ra khoảng 4 giây để các validator thống nhất về head của chuỗi, nên thời gian dành cho dữ liệu cũ bị trừ vào ngân sách đó. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- Trong consensus spec của Ethereum, attester (nút bỏ phiếu xác nhận) bỏ phiếu cho head mà họ thấy ở khoảng một phần ba slot (ATTESTATION_DUE_BPS 3333, khoảng 4 giây). ([consensus-specs validator.md](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/validator.md)) [third-party]
- Bà lập luận rằng các lần nhận lặp ảnh hưởng nặng nhất tới validator ở xa nguồn phát khối, tạo ra một khoản lợi thế cho việc đặt máy cùng vị trí (colocation) và đi ngược lại phi tập trung hóa. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- Một buổi thuyết trình nghiên cứu nói rằng khối được đề xuất phải đi qua mạng toàn cầu trước khi các attester bỏ phiếu được, rồi các phiếu lại đi tiếp tới các aggregator, nên cả hai chặng đều nhạy với độ trễ. ([research talk, 2026-05-07](https://www.youtube.com/watch?v=fgeXDbORuz0)) [claimed]

## Cách phát hành và chuyển tiếp (How publishing and relaying work)

Tóm tắt từ trang docs p2p.

- **Phát hành:** nút thêm tiền tố độ dài và đệm thêm cho thông điệp nếu cần, chia nó thành k mảnh dữ liệu (fragment) theo ShredFactor, tạo ra ShredFactor nhân PublisherShardMultiplier shard mã hóa, rồi gửi các shard khác nhau cho các peer khác nhau theo thứ tự round-robin. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- **Nhận một shard:** nút kiểm tra tính độc lập tuyến tính của shard và bỏ những shard dư thừa, lưu shard hợp lệ cùng các shard khác của thông điệp, và thử giải mã khi đã có đủ k shard khác nhau. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- **Chuyển tiếp:** shard từ publisher (bên phát hành thông điệp) được gửi ngay cho mọi mesh peer. Shard từ các peer khác được tái mã hóa và chuyển tiếp khi nút đã giữ đủ số lượng. Docs ghi ngưỡng này là ForwardShardThreshold ở một chỗ và là ShredFactor nhân ForwardShardThreshold ở chỗ khác. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- **Thông điệp điều khiển** mở rộng từ GossipSub: IDONTWANT báo các peer ngừng gửi shard của một thông điệp đã giải mã xong, IHAVE thông báo những shard đang giữ, IWANT yêu cầu thêm shard của thông điệp chưa giải mã được, còn GRAFT và PRUNE làm mesh lớn lên hoặc co lại. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- **Kích thước mesh:** MeshDegreeTarget, MeshDegreeMin và MeshDegreeMax quy định số peer mà một nút giữ. Docs dẫn bậc kết nối (degree) lý tưởng mặc định của libp2p là 6, chấp nhận từ 4 đến 12 (theo spec gossipsub v1.0 của libp2p). Consensus spec của Ethereum đặt giá trị riêng (low 6, high 12, heartbeat 0.7 s). ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- Giá trị mặc định của các thiết lập này nằm trong [parameters.md](parameters.md).


## Các tuyên bố về tốc độ và băng thông, theo nguồn (Speed and bandwidth claims, by source)

Các con số này đến từ những thiết lập và thời điểm khác nhau. Đừng so chúng như thể cùng một benchmark.

| Tuyên bố | Bối cảnh | Nguồn | Tag |
|---|---|---|---|
| Độ trễ thấp hơn 50%+, ít biến động hơn so với GossipSub | Thử nghiệm ban đầu, 2025 | [implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits) | [claimed] |
| Nhanh hơn gossipsub 6-20x | Trang sản phẩm, không nêu thiết lập | [product page](https://www.getoptimum.xyz/product) | [claimed] |
| Trung bình ~150ms, nhanh hơn baseline GossipSub ít nhất 6x | Hoodi testnet | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| Tiết kiệm băng thông (bandwidth) 90-95% so với gossipsub | Trang chủ, không nêu thiết lập | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| Nhanh hơn 2.42x, phương sai thấp hơn 7.88x | Ethereum mainnet so với baseline libp2p, do alan.s đăng | [Lido PERCH post, 2026-08-10](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [claimed] |
| Không có tác động đáng kể; Nimbus chậm hơn trên các nút được thử | 36 full node mainnet, không gắn validator, 11.5 ngày, build v1.1.1, operator stefa2k | [reply in the same Lido thread, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |

## Bản demo tốc độ trực tiếp năm 2025 (The 2025 live speed demo)

- Bản demo chạy 72 nút rải khắp thế giới: 36 nút chạy mump2p và 36 nút chạy GossipSub, với bố trí địa lý gần như giống hệt nhau. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- Thông điệp 5 MB, rồi 8 MB, được phát từ các nút chọn ngẫu nhiên. Video mô tả khối L1 nặng 2 đến 5 MB. Các kích thước này vượt mức tối đa 1 MB cho mỗi thông điệp trong spec của libp2p, nên nhiều khả năng bản demo đã dùng một giới hạn cấu hình lớn hơn. "Delay" nghĩa là thời gian cho tới khi 95% số nút nhận được thông điệp. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- Ở mức 5 MB và một thông điệp mỗi giây, diễn giả báo cáo khoảng 1 s với mump2p so với khoảng 2 s với GossipSub, và ít dao động hơn. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- Ở mức 8 MB và hai thông điệp mỗi giây, mump2p vẫn theo kịp, còn độ trễ của GossipSub cứ tăng dần vì hàng đợi tồn đọng. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- Optimum trình bày đây là một bản demo tốc độ. Nghiên cứu về doanh thu trong buổi thuyết trình nghiên cứu tháng 5 năm 2026 dùng một chỉ số khác, là thời gian để một khối đến được 80% mạng. ([research talk, 2026-05-07](https://www.youtube.com/watch?v=fgeXDbORuz0)) [claimed]

## Còn tranh cãi (Disputed)

- **Nhanh hơn bao nhiêu trên mainnet.** Số liệu của Optimum cho thấy tốc độ tăng rõ rệt. Một bài thử của operator độc lập trên bản build đầu không thấy khác biệt đáng kể. Bài thử đó dùng full node không gắn validator, nên đường attestation (phiếu xác nhận) chưa hề được kiểm tra. Cả hai đều được ghi lại ở đây. Khi dùng con số 2.42x, hãy nhắc cả kết quả độc lập.

## Chưa đề cập (Not yet covered)

- Các phiên bản trước của file này nói docs không mô tả GRAFT/PRUNE hay IHAVE / IWANT / IDONTWANT. Trang docs p2p hiện đã liệt kê đầy đủ, xem phần "Cách phát hành và chuyển tiếp (How publishing and relaying work)" ở trên. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Vẫn chưa có tài liệu trong các nguồn đã xem về: định dạng shard trên đường truyền (wire format), một thông điệp thực tế được chia thành bao nhiêu shard, tên topic ngoài các topic gossip của Ethereum, và cách xử lý blob.
- Code của Gateway đặt các tham số GossipSub (heartbeat 700 ms, IWANT cache 6 cửa sổ, tracing GRAFT/PRUNE); xem [../code/known-issues.md](../code/known-issues.md).

Kết quả đầy đủ, phương pháp và bài thử độc lập nằm trong [../results/performance.md](../results/performance.md).
