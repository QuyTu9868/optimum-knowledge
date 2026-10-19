# Bảng thuật ngữ Anh - Việt

Quy ước cho mọi bản dịch tiếng Việt trong thư mục `vi/`. Bản tiếng Anh là bản gốc. Bản dịch là bản dịch cộng đồng.

## Quy tắc chung

- Thuật ngữ song song: lần đầu xuất hiện trong mỗi trang, viết "tiếng Việt (English)", ví dụ "tái mã hóa (recoding)". Các lần sau chỉ dùng một dạng đã chọn, nhất quán trong cả trang.
- Thuật ngữ giữ nguyên tiếng Anh vì dân kỹ thuật dùng như vậy (shard, relay, mesh, peer, gossip, validator...): lần đầu kèm giải nghĩa ngắn trong ngoặc, ví dụ "shard (mảnh mã hóa)".
- Tiêu đề: "Tiếng Việt (English)", ví dụ "Tái mã hóa tại relay (Recoding at relay nodes)".
- Giữ nguyên, không dịch: tên riêng và tên dự án (Optimum, mump2p, GossipSub, Flexnode, Optimum Gateway), tên tham số và biến môi trường, đoạn code, URL, cổng, số liệu, ngày tháng, tên file.
- Tag nguồn `[confirmed]`, `[claimed]`, `[third-party]` giữ nguyên chữ, vị trí cuối dòng và đúng thứ tự link nguồn như bản gốc.
- Nhãn của link nguồn (ví dụ "docs p2p", "Médard whiteboard video, 2026-07-01") giữ nguyên tiếng Anh, vì đó là tên nguồn.
- Trích dẫn nguyên văn trong dấu ngoặc kép: giữ tiếng Anh.
- Số liệu giữ nguyên như bản gốc, kể cả dấu phân cách (ví dụ 1,000 và 2.42x).
- Không dùng dấu gạch dài (em dash). Dùng "-" hoặc viết lại câu.
- Không thêm ý, không bỏ ý, không làm mạnh hay yếu hơn mức chắc chắn của câu gốc ("claims" là "nói rằng", không phải "chứng minh").

## Thuật ngữ

| English | Tiếng Việt |
|---|---|
| RLNC (random linear network coding) | RLNC (mã hóa mạng tuyến tính ngẫu nhiên) |
| shard / coded shard | shard (mảnh mã hóa) |
| fragment / piece | mảnh dữ liệu (fragment); không dùng "mảnh" trần cho shard |
| mix / random mix | tổ hợp ngẫu nhiên (mix) |
| recoding | tái mã hóa (recoding); không dùng "mã hóa lại" cho nghĩa này |
| encode / decode | mã hóa / giải mã |
| linearly independent | độc lập tuyến tính |
| linear combination | tổ hợp tuyến tính |
| finite field | trường hữu hạn (finite field) |
| erasure coding | mã hóa chống mất gói (erasure coding) |
| Reed-Solomon | Reed-Solomon (giữ nguyên) |
| relay / relay node | relay (nút trung chuyển); không dùng "nút trung gian" |
| peer | peer (nút ngang hàng) |
| mesh / mesh peer | mesh (mạng lưới kết nối) / peer trong mesh |
| gossip | gossip (lan truyền kiểu tin đồn) |
| publisher | publisher (bên phát hành thông điệp) |
| validator | validator (nút xác thực) |
| proposer | proposer (nút đề xuất khối); không gọi là "người" |
| block builder | block builder (bên dựng khối) |
| attestation / attester | attestation (phiếu xác nhận) / attester |
| slot | slot (khung 12 giây của Ethereum); bước thời gian trong ví dụ minh họa thì dùng "bước thời gian" |
| consensus client | client đồng thuận (consensus client); không dùng "client tầng đồng thuận" |
| sidecar | sidecar (tiến trình chạy kèm) |
| dedup cache | bộ nhớ đệm chống trùng (dedup cache) |
| latency | độ trễ (latency) |
| throughput | thông lượng (throughput) |
| bandwidth | băng thông (bandwidth) |
| colocation | đặt máy cùng vị trí (colocation) |
| slashing | phạt cắt stake (slashing) |
| testnet / mainnet / devnet | testnet / mainnet / devnet (giữ nguyên) |
| coded packet | gói mã hóa |
| coded equation | phương trình mã hóa (chỉ khi gốc nói equation) |
| encryption | mã hóa bảo mật (encryption) |
| network coding / encode | mã hóa mạng / mã hóa (coding) |
| SSZ re-encode | mã hóa SSZ lại (khác với tái mã hóa RLNC) |
| node | nút (không để "node" trần) |
| hop | chặng |
| audit | kiểm toán (audit) |
| claim / claims | tuyên bố; động từ "claims" là "nói rằng" |
| dissemination / propagation | lan truyền (không dùng "phát tán") |
| finite field / field | trường hữu hạn (không để "field") |
| head (of chain) | head của chuỗi |
| speaker | diễn giả |
| topology | topology (cấu trúc kết nối mạng) |
| parity piece | mảnh dự phòng (parity); không dùng "sửa lỗi" cho erasure |
| transmission | lượt truyền |
| publish / release | publish (đăng thông điệp) / bản phát hành |
| Disputed | Còn tranh cãi (Disputed) |
| Not yet covered | Chưa đề cập (Not yet covered) |
| Unverified | Chưa xác minh (Unverified) |
| confirmed / claimed / third-party | giữ nguyên tag, không dịch |
