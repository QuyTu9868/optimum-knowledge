---
title: Optimum Console and Signal
last_verified: 2026-10-20
status: official docs read in full; Signal availability and report timing depend on Optimum enabling features per account
lang: vi
translation_of: products/console-and-signal.md
source_sha: ec1a5ccd0b78
---

# Optimum Console và Signal (Optimum Console and Signal)

Console là ứng dụng web nơi nhà vận hành (operator) tạo tài khoản Optimum, tạo enrollment key (khóa đăng ký gateway) và kiểm tra kết quả. Signal là phần của Console nối gateway bạn tự chạy với beacon node của bạn.

Trang này mô tả docs chính thức theo bản đọc ngày 2026-10-20. ([docs repo commits](https://github.com/getoptimum/docs/commits/main))

Cổng, mount, kết nối peer (peering) theo từng client và health check nằm ở [run-the-gateway](../products/run-the-gateway.md). Luồng khối cho consumer nằm ở [block-stream](../products/block-stream.md). Sản phẩm mốc cắt bid (bid cutoff) nằm ở [accelerate](../products/accelerate.md). Đồng bộ tập validator (nút xác thực) nằm ở [keysync](../products/keysync.md).

## Console là gì và dành cho ai (What Console is and who it is for)

- Docs là sổ tay vận hành cho nhà cung cấp staking (staking provider) và cho người tự chạy validator. ([docs: introduction](https://docs.getoptimum.xyz/)) [confirmed]
- Console không bao giờ thay đổi hạ tầng của bạn, và Optimum không host gateway: bạn tự chạy container. ([docs: introduction](https://docs.getoptimum.xyz/), [docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- Gateway là một peer (nút ngang hàng) của client đồng thuận (consensus client), chuyển khối cho client đó và không bao giờ nhận khóa validator. ([docs: introduction](https://docs.getoptimum.xyz/)) [confirmed]
- Không có multiaddr nào do Optimum host để trỏ client tới; client kết nối peer với gateway bạn khởi chạy ngay cạnh nó. ([docs: what Optimum does](https://docs.getoptimum.xyz/start/what-optimum-does)) [confirmed]

## Hai lộ trình (Two paths)

- Validator operator: gateway chạy cạnh beacon node, bạn kết nối peer cho client đồng thuận, rồi đăng ký các chỉ số validator (validator indices). ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- Stream-only consumer (bên tiêu thụ chỉ stream): dành cho người tham gia không có validator. Gateway lấy khối từ mesh (mạng lưới kết nối) và phục vụ cho các consumer của riêng bạn, không cần beacon node và không hỏi chỉ số nào. Chi tiết nằm ở [block-stream](../products/block-stream.md). ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]

## Tài khoản và đăng ký (Account and registration)

- Loại tài khoản là Individual hoặc Entity. Cả hai đều có Signal. Ai có thể dùng Accelerate được nêu ở [accelerate](../products/accelerate.md). ([docs: account type](https://docs.getoptimum.xyz/getting-in/account-type), [docs: introduction](https://docs.getoptimum.xyz/)) [confirmed]
- Đăng ký bằng Google hoặc Microsoft. ([docs: create an account](https://docs.getoptimum.xyz/getting-in/create-an-account)) [confirmed]
- Nếu đăng ký tự phục vụ đang đóng, Optimum tạo tài khoản và bạn đăng nhập bằng tài khoản Google hoặc Microsoft đã cung cấp cho họ. ([docs: create an account](https://docs.getoptimum.xyz/getting-in/create-an-account)) [confirmed]
- Bước đăng ký hỏi "Do you run validators?" và yêu cầu tích ô đồng ý điều khoản ngay trên cùng màn hình. Entity còn phải khai thông tin pháp nhân. ([docs: register](https://docs.getoptimum.xyz/getting-in/register)) [confirmed]
- Nếu chọn có ở câu hỏi chạy validator, hệ thống còn hỏi tổng stake và lượng stake muốn kết nối, tính bằng ETH. ([docs: register](https://docs.getoptimum.xyz/getting-in/register)) [confirmed]

## Signal là gì (What Signal is)

- Signal là gateway đặt cạnh beacon node của bạn: nó nhận khối từ mesh của Optimum và đưa cho client đồng thuận của bạn. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Optimum nói rằng nhờ vậy validator nhận khối sớm hơn và hiệu suất attestation (phiếu xác nhận) tốt hơn. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [claimed]
- Optimum bật Signal theo từng tài khoản. Cho tới lúc đó, thanh bên không có mục Signal, bước kiểm tra Verify trả lời là chưa khả dụng, và không có URL nào đi vòng được. Hãy hỏi support. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [docs: FAQ](https://docs.getoptimum.xyz/help/faq)) [confirmed]

## Đăng ký gateway (Enrollment)

- Một enrollment key (OPT_JOIN_KEY, tiền tố ojk_) có thể đăng ký mọi gateway bạn chạy. Mỗi gateway tự tạo cặp khóa riêng ở lần khởi động đầu và giữ credential (chứng danh) sinh ra trong thư mục identity mump2p của nó. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Khóa riêng không bao giờ rời khỏi máy chủ (host), và phía server không trả về bí mật nào, chỉ trả client_id. ([ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Mạng và cluster lấy từ khóa, nên gateway không tự chọn được. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Thời hạn khóa: 14 ngày cho gateway đầu tiên của tài khoản được mời trong quá trình onboarding, 1 ngày nếu tạo từ trang Signal, hoặc số ngày bạn chọn, tối đa 365, trong Gateways & keys. Bí mật chỉ hiện một lần. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Mỗi khóa nhận tối đa 1,000 gateway, và tổ chức bị giới hạn 1,000 credential gateway đang hoạt động. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Thu hồi hoặc để khóa hết hạn chỉ chặn các gateway mới; gateway đã đăng ký vẫn chạy tiếp. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Mỗi gateway cần một tên (OPT_GATEWAY_ID) không trùng trong tổ chức; gateway thứ hai cùng tên bị từ chối với HTTP 409. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin), [docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Mất thư mục identity thì gateway nhận peer id mới và một lần đăng ký mới, tốn thêm một lượt dùng khóa; lần đăng ký đó bị từ chối nếu dùng cùng tên cho tới khi credential cũ bị thu hồi. Chi tiết mount nằm ở [run-the-gateway](../products/run-the-gateway.md). ([docs: troubleshoot](https://docs.getoptimum.xyz/help/troubleshoot), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Lỗi 401 khi đăng ký có thể do khóa không tồn tại, hết hạn, hết lượt dùng hoặc đã bị thu hồi, và đồng hồ máy chủ chậm hơn khoảng 2 phút cũng cho kết quả giống vậy. ([docs: troubleshoot](https://docs.getoptimum.xyz/help/troubleshoot), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]

- Hai trường hợp identity khác nhau: nếu mất thư mục identity, gateway nhận peer id mới và đăng ký lại (docs); nếu credential còn nhưng danh tính peer đổi, gateway từ chối khởi động và nêu tên cả hai peer ID (ADR). ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]

## Connect và Verify (Connect and Verify)

- Các bước trên Signal: 1a đặt tên gateway, 1b khởi chạy, 1c trỏ client tới gateway, 1d verify. Console in ra lệnh khởi chạy và cờ cho client; xem [run-the-gateway](../products/run-the-gateway.md). ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Verify đọc ba thứ từ bên ngoài máy chủ của bạn, gộp chung mọi gateway trong tổ chức: gateway đã đăng ký, được Optimum thấy trong mười phút gần nhất, và có khối đến trong các slot (khung 12 giây của Ethereum) gần đây. ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails)) [confirmed]
- Verify hiển thị số lượng chứ không hiển thị tên, nên có thể đạt vì một gateway khác đang khỏe. Hãy kiểm tra máy mới ngay trên máy đó. ([docs: troubleshoot](https://docs.getoptimum.xyz/help/troubleshoot)) [confirmed]
- Verify không thấy được client đồng thuận của bạn đã kết nối peer chưa; chỉ /health của chính gateway trên máy của nó cho biết điều đó. ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails)) [confirmed]
- Các lỗi được nêu tên: gateway không truy cập được, client không kết nối peer, container thoát vì lỗi quyền, và peer id bị đổi. Cách sửa nằm ở [run-the-gateway](../products/run-the-gateway.md). ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails)) [confirmed]

## Khóa validator và onboarding hàng loạt (Validator keys and bulk onboarding)

- Console nhận chỉ số validator dạng số thập phân, dán vào hoặc dùng CSV; khóa công khai BLS bị bỏ qua trên màn hình tự phục vụ. Optimum xác nhận các chỉ số trước khi chúng được tính vào báo cáo. ([docs: register keys](https://docs.getoptimum.xyz/signal/register-keys)) [confirmed]
- Tài khoản tự phục vụ có giới hạn trọn đời về số lần tra cứu validator; thử lại không làm tăng giới hạn này. ([docs: register keys](https://docs.getoptimum.xyz/signal/register-keys)) [confirmed]
- Tài khoản operator được mời có thể có Manage validators (Add, Remove, Replace) và [keysync](../products/keysync.md), công cụ đối chiếu tập validator theo lịch. ([docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Console không bao giờ liệt kê lại các chỉ số bạn đã đăng ký; nó hiển thị số lượng và lịch sử thay đổi. ([docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]

## Báo cáo hiệu suất hàng tuần (Weekly performance report)

- Thẻ Blocks received earlier phải chờ đủ một tuần các slot ghép cặp, và số liệu theo từng operator vẫn ở trạng thái Pending cho tới khi cửa sổ có ít nhất 30 slot ghép cặp. ([docs: your first report](https://docs.getoptimum.xyz/signal/your-first-report)) [confirmed]
- Thẻ Attestation accuracy cần có từ 500 chỉ số trở lên trong hồ sơ, rồi mới đến báo cáo hàng tuần. ([docs: your first report](https://docs.getoptimum.xyz/signal/your-first-report)) [confirmed]
- Các mục báo cáo chỉ xuất hiện khi được bật cho tài khoản, và tài khoản tự phục vụ không có Attestations. ([docs: your first report](https://docs.getoptimum.xyz/signal/your-first-report)) [confirmed]

## Hỗ trợ (Support)

- Support là kênh hỗ trợ validator trên Discord; hãy gửi kèm tên gateway, client và phiên bản, danh sách lỗi từ /health và kết quả Verify, và không bao giờ dán khóa. ([docs: support](https://docs.getoptimum.xyz/help/support)) [confirmed]

## Còn tranh cãi (Disputed)

- Thuật ngữ: docs gọi là "enrollment key" còn ADR (bản ghi quyết định kiến trúc) gọi là "org join key" và "Partner Console". ADR cũng mô tả một API key cũ theo từng máy chủ có tiền tố ogw_ mà docs không nhắc tới. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Tên menu cho cùng các khu vực của Console khác nhau tùy trang: Gateways & keys (enrollment key, consumer token), Stream consumers (cũng được viết là "Keys" rồi "Stream consumers"), Manage API keys (khóa operator của keysync; README của keysync nói là partners dashboard), Activate validators và Manage validators. Xem [block-stream](../products/block-stream.md) và [keysync](../products/keysync.md). ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Truy cập: docs của Console mô tả đăng ký tự phục vụ (đôi khi đóng), trong khi sổ tay gateway được mô tả ở [run-the-gateway](../products/run-the-gateway.md) là chỉ theo lời mời. Việc đăng ký có thể đang mở, nhưng Signal và khóa gateway được Optimum bật theo từng tài khoản. ([docs: create an account](https://docs.getoptimum.xyz/getting-in/create-an-account), [docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Docs nói rằng giá trị của Helm chart vẫn mô tả đường dùng API key cũ. ([docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]

## Chưa đề cập (Not yet covered)

- Optimum bật Signal cho những tài khoản nào, và mất bao lâu, không được nêu.
- Các trang này không công bố số đo nào về khối đến sớm hơn hay mức cải thiện attestation, và chúng chưa được xác minh độc lập.
- Điều khoản của thỏa thuận đăng ký không được tóm tắt trong docs.
- Các con số stake hỏi lúc đăng ký được dùng vào việc gì thì không được nêu.
