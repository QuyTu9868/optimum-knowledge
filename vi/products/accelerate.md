---
title: Optimum Accelerate
last_verified: 2026-10-21
status: official docs only, gated by Optimum, no independent results
lang: vi
translation_of: products/accelerate.md
source_sha: 490328a9f7e2
---

# Optimum Accelerate

Theo docs chính thức (xem Còn tranh cãi), Accelerate là một tính năng của Console, đề xuất mốc cắt bid (bid cutoff) cho MEV sidecar (tiến trình MEV chạy kèm) mà nhà vận hành (operator) validator (nút xác thực) đang chạy sẵn.

Trang này mô tả những gì tài liệu chính thức nói tính đến 2026-10-20. Các loại tài khoản và kiến thức cơ bản về Console nằm ở [console-and-signal.md](console-and-signal.md).

## Accelerate là gì (What it is)

- Accelerate đề xuất mốc cắt bid cho MEV sidecar mà bạn đang chạy. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
- Mục đích được nêu là để một proposal (đề xuất khối) nhận được bid tốt hơn mà không phải chờ quá lâu khiến khối bị trễ. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [claimed]
- Con số này được tính từ các slot (khung 12 giây của Ethereum) mà validator của bạn đã đề xuất. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
- Bạn tải về một file cấu hình và tự triển khai. Console không bao giờ ghi vào hạ tầng của bạn, và Optimum không có quyền ghi vào cả hai sidecar. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does), [docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- Màn hình nói rằng nhận bid gần hạn chót hơn thì bắt được nhiều MEV hơn. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [claimed]

## Mô tả khi ra mắt (Launch description, 2026-10-20)

- Bài ra mắt nói Accelerate là "for sending data fast": nó giúp các khối được đề xuất đến các validator khác sớm hơn và "includes a service to optimize your bid cutoff settings". Bài nói proposer dùng nó trước tiên để tối đa hóa lượng bid MEV bắt được, còn các tổ chức giao dịch chuyên nghiệp là mục tiêu kế tiếp. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- FAQ trên homepage nói Accelerate "propagates the blocks and attestations your validator sends" nhanh hơn, và cả hai dịch vụ chạy qua cùng một mump2p sidecar. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Bài đăng nói Accelerate có sẵn qua onboarding tự phục vụ cho các đơn vị vận hành từ 200 validator key trở lên. FAQ homepage nói operator chạy từ 200 validator trở lên. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- Bài đăng nói mump2p cho phép validator chờ lâu hơn để có bid tốt hơn mà vẫn kịp hạn chót của slot. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Signal, phía nhận, nằm ở [console-and-signal](console-and-signal.md). Mạng phía gửi nằm ở [flexnodes](../technology/flexnodes.md).

## Ai dùng được (Who can use it)

- Thanh bên chỉ hiện Accelerate khi Optimum đã bật nó cho tổ chức của bạn và bạn có ít nhất 200 validator đang hoạt động trên mainnet. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does), [docs: FAQ](https://docs.getoptimum.xyz/help/faq)) [confirmed]
- Tính năng này dành cho tài khoản entity. Đăng ký làm entity không tự bật nó, và một tài khoản cá nhân có 200 validator mainnet đang hoạt động cũng có thể được bật theo cách tương tự. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
- Nếu không thấy mục này thì không có URL nào khác để dùng. Hãy hỏi bộ phận hỗ trợ. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]

## Các bước (Steps)

- Step 1, Start Accelerate: trước hết bạn phải xác nhận hộp thoại tuyên bố miễn trừ, và nhân viên không thể xác nhận thay bạn. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Step 2, Recommendation: bạn tải lên file cấu hình đang chạy, là `config.yaml` của mev-boost hoặc `cb-config.toml` của Commit-Boost. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Từ file tải lên, Console đọc mốc cắt bid, `late_in_slot_time_ms` và tập MEV relay của bạn. Với file Commit-Boost, Console chỉ đọc các mốc thời gian trong `[pbs]` và url của từng `[[relays]]`, và bỏ qua các thiết lập chain, port, signer và metrics. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Nếu chưa có cấu hình, bạn có thể tải một file khởi đầu, và đó không phải là đề xuất. File mà Console không đọc được sẽ bị từ chối, kèm danh sách từng lỗi theo dòng. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Step 3, Adjust: bạn đặt mốc cắt bid và late-in-slot bằng thanh trượt, có thể áp dụng đề xuất, rồi tải file cấu hình về. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- MEV-Boost nhận một file `mev-boost-config.yaml` hoàn chỉnh, với mốc cắt bid nằm ở `timeout_get_header_ms`. Commit-Boost nhận `cb-config-pbs.toml`, một khối `[pbs]` để gộp vào `cb-config.toml` của bạn. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- Một bid getHeader đến sau `late_in_slot_time_ms` sẽ bỏ qua toàn bộ relay và khối được dựng cục bộ, nên mốc cắt bid phải nằm trước mốc này. Mốc cắt muộn hơn có thể nhận bid cao hơn, nhưng đặt quá muộn thì proposal trượt slot. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- Sau khi tự triển khai file, nút "I have adjusted my cutoff" ghi lại giá trị các thanh trượt. Việc ghi lại không triển khai gì cả. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]

## Điều kiện sẵn sàng (Readiness)

- Một đề xuất cần 200 proposal đã đo trên toàn bộ validator của bạn, không tính theo từng khóa. Trước đó màn hình báo chưa đủ proposal, dù bạn vẫn có thể bắt đầu và tải lên một file cấu hình. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]
- Khóa validator phải được đăng ký để Console biết bạn đề xuất ở những slot nào. Validator đang chờ (pending) chưa có slot đề xuất, nên chưa có gì được đo cho tới khi chúng kích hoạt. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]
- Mức lợi thêm hằng năm theo mô hình cần 30 ngày lịch sử đã nạp và 30 khối MEV. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]

## Các con số nghĩa là gì (What the numbers mean)

- Slots that could have improved: tỷ lệ các khối MEV có bid tốt hơn trong một độ lệch (offset) nêu rõ, tính từ bid bạn đã nhận. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Slots modelled: các khối MEV trong cửa sổ mô hình hóa. Relays on file: số relay mà file cấu hình bạn tải lên nêu tên. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Con số này là phần lợi thêm có sẵn ở độ lệch đó trên các khối đã được đề xuất. Nó không định giá rủi ro của việc chờ. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Mức lợi thêm hằng năm theo mô hình là phần mà mốc cắt muộn hơn có thể đã bắt được, giữ nguyên tỷ lệ đó trong một năm. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]
- "No cutoff change indicated" nghĩa là cửa sổ dữ liệu không ủng hộ việc dời mốc cắt bid. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]

## Xem kết quả ở đâu (Where results show)

- Kết quả nằm dưới "MEV outcome" trên màn hình Accelerate, không nằm dưới Performance. Các số liệu tính từ ngày sau khi bạn ghi lại một mốc cắt bid. Nếu từ đó chưa đo được gì, màn hình sẽ nói vậy và hiện cửa sổ rộng hơn mà đề xuất đã đọc từ đó. ([docs: acceleration](https://docs.getoptimum.xyz/accelerate/where-results-show)) [confirmed]
- Màn hình hiện tổng ETH đã nhận, bid nhận trung bình mỗi slot và MEV chưa hiện thực hóa trung bình. Tổng đã nhận là mọi thứ bắt được, không phải phần do việc đổi mốc cắt gây ra. ([docs: acceleration](https://docs.getoptimum.xyz/accelerate/where-results-show)) [confirmed]
- Một số thông báo cũ vẫn ghi MumBoost, tên cũ của cùng bước kiểm tra điều khoản này. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]

## Tuyên bố miễn trừ (Disclaimer)

- Hộp thoại nói rằng thông tin cấu hình là kết quả mô phỏng từ dữ liệu mạng hiện tại, chỉ để tham khảo. Optimum không đảm bảo kết quả hiệu năng, và các thay đổi trên hạ tầng của bạn là quyết định của bạn. Nội dung hộp thoại chính là thỏa thuận, nên hãy đọc ở đó. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]

## Một tính năng gateway khác có tên gần giống: ADR 0012 (A different gateway feature with a similar name: ADR 0012)

- ADR 0012 (đã chấp nhận, đã triển khai) nói về việc gateway giao những beacon block nào cho consensus client (client đồng thuận) của nó, dựa trên danh sách số slot mà bootstrap phục vụ tại `accelerate_slots`. Nó không nhắc tới Console, MEV-Boost, Commit-Boost hay mốc cắt bid. ([ADR 0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]
- Bộ lọc theo danh sách chỉ áp dụng cho các gateway có vai trò hermes. Chúng chuyển một khối cho client nếu slot của khối nằm trong danh sách hoặc vượt quá mốc cuối của danh sách (list horizon). Gateway của đối tác đưa mọi khối cho client của họ, còn gateway relay không đưa khối nào từ mesh (mạng lưới kết nối) cho client. ([ADR 0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md), [gateway-design.md](../technology/gateway-design.md)) [confirmed]
- Các trang Accelerate trong tài liệu Console không nhắc tới danh sách slot hay gateway. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
Không nguồn nào nói hai thứ này có liên quan, nên trang này coi chúng là hai thứ riêng. Chi tiết về ADR nằm ở [gateway-design.md](../technology/gateway-design.md).

## Chưa đề cập (Not yet covered)

- Mốc cắt bid được đề xuất được tính ra sao, các độ lệch nào được dùng, và cửa sổ mô hình hóa dài bao lâu.
- Có nhà vận hành nào đã triển khai một đề xuất hay chưa, và kết quả ra sao. Chưa tìm thấy kết quả độc lập nào.
- Tính năng Console và ADR 0012 có dùng chung logic hay dữ liệu nào không. Cả hai nguồn đều không nói.
- Điều kiện Optimum bật tính năng này, và nhà vận hành dưới 200 validator có bao giờ được bật hay không.

## Còn tranh cãi (Disputed)

- **Accelerate là gì:** docs nói nó đề xuất mốc cắt bid cho MEV sidecar và operator tự triển khai cấu hình. Blog nói nó giúp các khối được đề xuất đến các validator khác sớm hơn và có kèm dịch vụ mốc cắt bid. FAQ homepage nói nó lan truyền nhanh hơn các khối và attestation mà validator gửi, không nhắc tới mốc cắt bid. FAQ homepage nói việc gửi chạy qua mump2p sidecar; blog và các trang Accelerate trong docs không mô tả cơ chế gửi nào. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed], [confirmed]
- **Điều kiện:** docs nói 200 validator mainnet đang hoạt động, dành cho tài khoản entity nhưng cá nhân vẫn có thể được bật; blog nói "entities" với 200 khóa validator; homepage nói operator chạy từ 200 validator trở lên. Khóa và validator có thể là cùng một số lượng; không nguồn nào nói. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed], [confirmed]
- **Việc bật:** docs nói Optimum bật Accelerate theo từng tổ chức; blog nói "self-serve onboarding". ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed], [confirmed]

Liên quan: [sidecar gateway](../technology/sidecar-gateway.md), [unverified claims](../unverified.md).
