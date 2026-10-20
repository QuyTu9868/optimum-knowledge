---
title: SDKs and developer tools
last_verified: 2026-10-20
status: checked against GitHub org and package registries on 2026-10-20; no public client SDK found
---

# SDKs and developer tools

This page lists what Optimum has published for developers in the [getoptimum GitHub org](https://github.com/getoptimum), and what could not be found, as of 2026-10-20. The official docs published that day mention no SDK.

## optimum-common

- The README calls it a shared Go SDK for Optimum services, covering configuration, networking, logging and concurrency utilities. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- Install with `go get github.com/getoptimum/optimum-common`; it requires Go 1.27.2 or later. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md), [go.mod](https://github.com/getoptimum/optimum-common/blob/main/go.mod)) [confirmed]
- It has 19 packages under `pkg/`: chain, config, entities, hash, identity, io, jwks, logger, maps, math, net, pointers, rand, slices, sql, syncx, telemetry, test_utils, version. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- Several packages are generic helpers (slices, maps, pointers, hash, rand, math). The Optimum-specific ones are shared domain types for P2P and dynamic config, node identity keys, a JWKS key cache and a geolocation client. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- The package table has no package for publishing or subscribing to mump2p topics. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- The README says the library links into both copyleft and proprietary Optimum products. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]
- License is BSD-3-Clause. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md), [GitHub API](https://api.github.com/repos/getoptimum/optimum-common)) [confirmed]
- Latest tag and release is v0.1.10, published 2026-10-12; the repo was last pushed 2026-10-19. The version is pre-1.0. ([release](https://github.com/getoptimum/optimum-common/releases/tag/v0.1.10), [pkg.go.dev](https://pkg.go.dev/github.com/getoptimum/optimum-common), [GitHub API](https://api.github.com/repos/getoptimum/optimum-common)) [confirmed]

## mump2p-cli

- It is a Go command-line tool that talks to a proxy for session management, then publishes and subscribes directly against P2P nodes. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Commands shown: `login`, `whoami`, `logout`, `subscribe`, `publish`, `health`, `list-topics`, `usage`, `version`, `update`. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Login prints a URL and a code to enter in the browser (an Auth0 activate page). The token is stored in `~/.mump2p/auth.yml` by default. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- The README example output for `whoami` shows 50000 publishes per hour, 600 per second, a 10 MB maximum message size and a 20480 MB daily quota. These are sample output for one account, not a documented plan. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- `subscribe` requests 3 nodes by default for failover and `publish` requests 1. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- `--disable-auth --client-id <id>` skips Auth0 for testing. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- The README lists three proxy hosts (us1, us2, us3 under getoptimum.io, port 8080) that `--service-url` can switch between. ([README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md)) [confirmed]
- Latest tag and release is v0.0.1-rc8, published 2025-10-14, which is a release candidate. The last push to the repo was 2026-04-23. ([releases](https://github.com/getoptimum/mump2p-cli/releases), [GitHub API](https://api.github.com/repos/getoptimum/mump2p-cli)) [confirmed]
- The GitHub API reports no license for the repo. ([GitHub API](https://api.github.com/repos/getoptimum/mump2p-cli)) [confirmed]
- On 2026-10-20 the docs pages checked (signal/network, start/before-you-begin) do not mention mump2p-cli, `mump2p login` or Auth0, while the CLI README shows an Auth0 login and proxy hosts. ([CLI README](https://github.com/getoptimum/mump2p-cli/blob/main/README.md), [docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]

## optimum-dev-setup-guide

- A Docker Compose reference setup for running mump2p locally: 4 P2P nodes and 2 proxies on a static overlay network, with gRPC test clients. ([readme](https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/readme.md)) [confirmed]
- The readme says it is not production-ready and is meant to be modified for your environment. ([readme](https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/readme.md)) [confirmed]
- The repo has no license and no releases; last push 2026-06-29. ([GitHub API](https://api.github.com/repos/getoptimum/optimum-dev-setup-guide)) [confirmed]

## optimum-hop

- A Docker Compose framework and test suite for running the Optimum Gateway and monitoring in a few commands. ([README](https://github.com/getoptimum/optimum-hop/blob/main/README.md)) [confirmed]
- License is GPL-3.0; no releases; last push 2026-10-19. ([GitHub API](https://api.github.com/repos/getoptimum/optimum-hop)) [confirmed]

## Related products

- optimum-keysync (customer-run CLI for validator assignments): see [../products/keysync.md](../products/keysync.md).
- The consumer block stream feed: see [../products/block-stream.md](../products/block-stream.md).

## Not found

All checks below were made on 2026-10-20. They show absence on that date only.

- No public client SDK for application developers was found. Searches of the npm registry for `mump2p` and `getoptimum` returned 0 results. ([npm search mump2p](https://registry.npmjs.org/-/v1/search?text=mump2p), [npm search getoptimum](https://registry.npmjs.org/-/v1/search?text=getoptimum)) [confirmed]
- The npm packages `mump2p` and `@getoptimum/sdk` returned 404. ([npm mump2p](https://registry.npmjs.org/mump2p), [npm @getoptimum/sdk](https://registry.npmjs.org/@getoptimum/sdk)) [confirmed]
- PyPI returned 404 for `mump2p`, `getoptimum`, `mump2p-client` and `optimum-common`. ([PyPI mump2p](https://pypi.org/pypi/mump2p/json), [PyPI getoptimum](https://pypi.org/pypi/getoptimum/json)) [confirmed]
- PyPI does list optimum-keysync (Optimum's Python tool), so the PyPI absence covers SDK names only. ([PyPI optimum-keysync](https://pypi.org/pypi/optimum-keysync/json)) [confirmed]
- crates.io returned 0 crates for `mump2p`, and the `getoptimum` query returned only an unrelated crate. ([crates.io mump2p](https://crates.io/api/v1/crates?q=mump2p), [crates.io getoptimum](https://crates.io/api/v1/crates?q=getoptimum)) [confirmed]
- Of Optimum's own code on pkg.go.dev, only optimum-common is a reusable library module. mump2p-cli (a command, published 2025-10-14) and optimum-gateway (a module, published 2026-09-17) are programs, and the reedsolomon repo is a fork. ([optimum-common](https://pkg.go.dev/github.com/getoptimum/optimum-common), [mump2p-cli](https://pkg.go.dev/github.com/getoptimum/mump2p-cli), [optimum-gateway](https://pkg.go.dev/github.com/getoptimum/optimum-gateway), [reedsolomon](https://pkg.go.dev/github.com/getoptimum/reedsolomon)) [confirmed]
- No repo name or description in the org listing (20 repos, about half of them forks) names RLNC core code. ([org repos API](https://api.github.com/orgs/getoptimum/repos?per_page=100)) [confirmed]
- The official docs repo has no page that mentions an SDK (searched 2026-10-20). ([docs repo](https://github.com/getoptimum/docs)) [confirmed]

## Disputed

- The optimum-common README calls it a "shared SDK" for Optimum services, while its own package table lists internal utilities and no client for mump2p topics. ([README](https://github.com/getoptimum/optimum-common/blob/main/README.md)) [confirmed]

## Not yet covered

- mump2p-cli install steps: the README has none, though the repo contains an `install.sh`. Whether the README rate limits are plan terms is not stated.
- Whether optimum-common is meant for application developers: the README does not say; the package table suggests internal use.
- Any stability or support commitment for optimum-common's API.
