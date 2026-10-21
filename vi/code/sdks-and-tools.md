---
title: SDKs and developer tools
last_verified: 2026-10-20
status: checked against GitHub org and package registries on 2026-10-20; no public client SDK found
lang: vi
translation_of: code/sdks-and-tools.md
source_sha: 94203cedf86c
---

# SDK và công cụ cho nhà phát triển (SDKs and developer tools)

Trang này liệt kê những gì Optimum đã công bố cho nhà phát triển trong [getoptimum GitHub org](https://github.com/getoptimum), và những gì không tìm thấy, tính đến 2026-10-20. Tài liệu chính thức công bố ngày đó không nhắc tới SDK nào.

## optimum-common

- README gọi nó là một SDK Go dùng chung cho các dịch vụ của Optimum, gồm các tiện ích về cấu hình, mạng, ghi log và xử lý đồng thời. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- Cài bằng `go get github.com/getoptimum/optimum-common`; cần Go 1.27.2 trở lên. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md), [go.mod](https://github.com/getoptimum/optimum-common/blob/main/go.mod)) [confirmed]
- Nó có 19 package trong `pkg/`: chain, config, entities, hash, identity, io, jwks, logger, maps, math, net, pointers, rand, slices, sql, syncx, telemetry, test_utils, version. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- Một số package là các hàm trợ giúp chung (slices, maps, pointers, hash, rand, math). Những package riêng của Optimum là các kiểu domain dùng chung cho P2P và cấu hình động, khóa định danh nút, bộ nhớ đệm khóa JWKS và một client định vị địa lý. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- Bảng package không có package nào để publish hay subscribe các topic mump2p. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- README nói rằng thư viện được liên kết vào cả các sản phẩm Optimum theo giấy phép copyleft lẫn độc quyền. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- Giấy phép là BSD-3-Clause. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md), [GitHub API](https://api.github.com/repos/getoptimum/optimum-common)) [confirmed]
- Tag và bản phát hành mới nhất là v0.1.10, đăng ngày 2026-10-12; repo được push lần cuối ngày 2026-10-19. Phiên bản này chưa lên 1.0. ([release](https://github.com/getoptimum/optimum-common/releases/tag/v0.1.10), [pkg.go.dev](https://pkg.go.dev/github.com/getoptimum/optimum-common), [GitHub API](https://api.github.com/repos/getoptimum/optimum-common)) [confirmed]

## mump2p-cli

- Đây là một công cụ dòng lệnh viết bằng Go, giao tiếp với một proxy để quản lý phiên, rồi publish và subscribe trực tiếp trên các nút P2P. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Các lệnh được nêu: `login`, `whoami`, `logout`, `subscribe`, `publish`, `health`, `list-topics`, `usage`, `version`, `update`. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Login in ra một URL và một mã để nhập trong trình duyệt (trang activate của Auth0). Token mặc định được lưu ở `~/.mump2p/auth.yml`. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Kết quả mẫu của `whoami` trong README cho thấy 50000 publish mỗi giờ, 600 mỗi giây, kích thước thông điệp tối đa 10 MB và hạn mức hằng ngày 20480 MB. Đây là kết quả mẫu của một tài khoản, không phải gói dịch vụ được ghi tài liệu. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- `subscribe` mặc định yêu cầu 3 nút để dự phòng khi lỗi, còn `publish` yêu cầu 1. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- `--disable-auth --client-id <id>` bỏ qua Auth0 để thử nghiệm. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- README liệt kê ba host proxy (us1, us2, us3 dưới getoptimum.io, cổng 8080) mà `--service-url` có thể chuyển qua lại. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Tag và bản phát hành mới nhất là v0.0.1-rc8, đăng ngày 2025-10-14, là một release candidate. Lần push cuối vào repo là 2026-04-23. ([releases](https://github.com/getoptimum/mump2p-cli/releases), [GitHub API](https://api.github.com/repos/getoptimum/mump2p-cli)) [confirmed]
- GitHub API báo repo không có giấy phép. ([GitHub API](https://api.github.com/repos/getoptimum/mump2p-cli)) [confirmed]
- Ngày 2026-10-20, các trang tài liệu đã kiểm tra (signal/network, start/before-you-begin) không nhắc tới mump2p-cli, `mump2p login` hay Auth0, trong khi README của CLI lại có đăng nhập Auth0 và các host proxy. ([CLI README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md), [docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]

## optimum-dev-setup-guide

- Một bộ cài tham chiếu bằng Docker Compose để chạy mump2p cục bộ: 4 nút P2P và 2 proxy trên một mạng overlay tĩnh, kèm các client thử nghiệm gRPC. ([readme](https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/readme.md)) [confirmed]
- Readme nói rằng nó chưa sẵn sàng cho production và cần được sửa cho hợp môi trường của bạn. ([readme](https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/readme.md)) [confirmed]
- Repo không có giấy phép và không có bản phát hành; push lần cuối 2026-06-29. ([GitHub API](https://api.github.com/repos/getoptimum/optimum-dev-setup-guide)) [confirmed]

## optimum-hop

- Một framework Docker Compose kèm bộ test để chạy Optimum Gateway và giám sát chỉ với vài lệnh. ([README](https://github.com/getoptimum/optimum-hop/blob/main/README.md)) [confirmed]
- Giấy phép là GPL-3.0; không có bản phát hành; push lần cuối 2026-10-19. ([GitHub API](https://api.github.com/repos/getoptimum/optimum-hop)) [confirmed]

## Sản phẩm liên quan (Related products)

- optimum-keysync (CLI do khách hàng tự chạy, dùng cho việc gán validator): xem [../products/keysync.md](../products/keysync.md).
- Nguồn cấp block stream (luồng khối) cho consumer: xem [../products/block-stream.md](../products/block-stream.md).

## Không tìm thấy (Not found)

Mọi lần kiểm tra dưới đây đều thực hiện ngày 2026-10-20. Chúng chỉ cho thấy sự vắng mặt vào ngày đó.

- Không tìm thấy SDK client công khai nào cho nhà phát triển ứng dụng. Tìm `mump2p` và `getoptimum` trong npm registry đều trả về 0 kết quả. ([npm search mump2p](https://registry.npmjs.org/-/v1/search?text=mump2p), [npm search getoptimum](https://registry.npmjs.org/-/v1/search?text=getoptimum)) [confirmed]
- Các package npm `mump2p` và `@getoptimum/sdk` trả về 404. ([npm mump2p](https://registry.npmjs.org/mump2p), [npm @getoptimum/sdk](https://registry.npmjs.org/@getoptimum/sdk)) [confirmed]
- PyPI trả về 404 cho `mump2p`, `getoptimum`, `mump2p-client` và `optimum-common`. ([PyPI mump2p](https://pypi.org/pypi/mump2p/json), [PyPI getoptimum](https://pypi.org/pypi/getoptimum/json)) [confirmed]
- PyPI có liệt kê optimum-keysync (công cụ Python của Optimum), nên việc PyPI không có chỉ áp dụng cho các tên SDK. ([PyPI optimum-keysync](https://pypi.org/pypi/optimum-keysync/json)) [confirmed]
- crates.io trả về 0 crate cho `mump2p`, còn truy vấn `getoptimum` chỉ trả về một crate không liên quan. ([crates.io mump2p](https://crates.io/api/v1/crates?q=mump2p), [crates.io getoptimum](https://crates.io/api/v1/crates?q=getoptimum)) [confirmed]
- Trong code của chính Optimum trên pkg.go.dev, chỉ optimum-common là module thư viện dùng lại được. mump2p-cli (một command, đăng 2025-10-14) và optimum-gateway (một module, đăng 2026-09-17) là chương trình, còn repo reedsolomon là một bản fork. ([optimum-common](https://pkg.go.dev/github.com/getoptimum/optimum-common), [mump2p-cli](https://pkg.go.dev/github.com/getoptimum/mump2p-cli), [optimum-gateway](https://pkg.go.dev/github.com/getoptimum/optimum-gateway), [reedsolomon](https://pkg.go.dev/github.com/getoptimum/reedsolomon)) [confirmed]
- Không tên repo hay mô tả nào trong danh sách của org (20 repo, khoảng một nửa là fork) nhắc tới code lõi RLNC (mã hóa mạng tuyến tính ngẫu nhiên). ([org repos API](https://api.github.com/orgs/getoptimum/repos?per_page=100)) [confirmed]
- Repo tài liệu chính thức không có trang nào nhắc tới SDK (tìm ngày 2026-10-20). ([docs repo](https://github.com/getoptimum/docs)) [confirmed]

## Còn tranh cãi (Disputed)

- README của optimum-common gọi nó là "shared SDK" cho các dịch vụ của Optimum, nhưng bảng package của chính nó liệt kê các tiện ích nội bộ và không có client nào cho topic mump2p. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]

## Chưa đề cập (Not yet covered)

- Các bước cài mump2p-cli: README không có, dù repo chứa một file `install.sh`. README không nêu giới hạn tốc độ trong đó có phải điều khoản của gói dịch vụ hay không.
- optimum-common có dành cho nhà phát triển ứng dụng hay không: README không nói; bảng package gợi ý là dùng nội bộ.
- Mọi cam kết về tính ổn định hay hỗ trợ cho API của optimum-common.
