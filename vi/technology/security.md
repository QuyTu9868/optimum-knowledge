---
title: Security, pollution attacks and audits
last_verified: 2026-10-18
status: confirmed
lang: vi
translation_of: technology/security.md
source_sha: 6be0dc367497
---

# Bảo mật (Security)

## Tấn công làm nhiễm gói (Pollution attacks)

Trong mã hóa mạng (network coding), một nút độc hại có thể gửi gói mã hóa sai. Vì relay (nút trung chuyển) trộn các gói với nhau, một gói sai có thể làm hỏng nhiều gói khác. Kiểu này gọi là tấn công làm nhiễm gói (pollution attack).

- Sau khi giải mã, các nút kiểm tra dữ liệu dựng lại với chữ ký và hash gốc của publisher (bên phát hành thông điệp). Việc xác minh là đầu cuối, không làm theo từng shard (mảnh mã hóa). ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Peer (nút ngang hàng) gửi shard không hợp lệ bị hạ điểm uy tín và cuối cùng bị cắt khỏi mạng. Docs thừa nhận có thể khó chỉ ra shard nào bị sai. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Danh sách tài liệu nghiên cứu (research list) có các bài về chống tấn công Byzantine trong hệ thống P2P dùng mã hóa mạng, ví dụ Kim et al., IEEE JSAC 2010. ([research list](https://docs.getoptimum.xyz/docs/research/gossip/gossip)) [confirmed]

## Kế thừa từ libp2p (Inherited from libp2p)

- Kênh giữa các nút được mã hóa bảo mật (encryption) và xác thực bằng Noise hoặc TLS, và mump2p thừa hưởng các biện pháp phòng thủ Sybil và eclipse của libp2p. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]

## Kiểm toán Optimum Gateway của ProbeLab (ProbeLab audit of the Optimum Gateway)

- ProbeLab đã công bố một báo cáo kiểm toán bảo mật cho Optimum Gateway vào 2026-08-18. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- Phase 2 (tháng 7 năm 2026) tìm ra 17 vấn đề, không cái nào ở mức critical: 1 high, 9 medium, 1 low, 6 informational. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- Tất cả đã được sửa trong v1.0.2, trừ F-07 (medium) mới chỉ được giải quyết một phần. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- Báo cáo kiểm toán nói Gateway không thay đổi logic ký của validator (nút xác thực), beacon state hay nhiệm vụ attestation (phiếu xác nhận). ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]

Xem thêm [sidecar-gateway.md](sidecar-gateway.md).

## Ý kiến về bảo mật lượng tử (Quantum security opinion)

- Trong một bài bình luận (opinion) trên CoinDesk, Médard lập luận rằng RLNC có thể hỗ trợ lưu trữ dữ liệu an toàn trước máy tính lượng tử, vì chỉ cần mã hóa bảo mật (encrypt) một phần các mảnh đã được mã hóa mạng (bà lấy ví dụ một trong mười) là bảo vệ được cả tập dữ liệu. Đây là ý kiến của bà, và bài viết không dẫn thử nghiệm độc lập nào. ([CoinDesk, 2026-09-13](https://www.coindesk.com/opinion/2026/09/13/quantum-proof-blockchain-why-math-not-machines-holds-the-key)) [claimed]
