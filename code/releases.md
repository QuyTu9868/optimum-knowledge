---
title: Repos and Gateway releases
last_verified: 2026-11-16
status: confirmed from git history and CHANGELOG
---

# Repos and releases

## Public repos

The [getoptimum GitHub org](https://github.com/getoptimum) had 20 public repos on 2026-10-20 (about half are forks). Main ones: ([org repos API](https://api.github.com/orgs/getoptimum/repos?per_page=100)) [confirmed] Earlier versions of this page listed a hermes fork; it is not in the 2026-10-20 listing. Other non-fork repos include forkdigest-hub and block-explorer.

| Repo | What it is | License |
|---|---|---|
| optimum-gateway | Go sidecar relaying gossip between libp2p consensus clients and mump2p | MIT, plus a PATENTS notice |
| optimum-common | Shared Go library of internal utilities (README calls it a shared SDK); see [sdks-and-tools.md](sdks-and-tools.md) | BSD-3-Clause |
| optimum-hop | Docker Compose framework and test suite for running the Gateway and monitoring | GPL-3.0 |
| mump2p-cli | CLI for the mump2p pubsub protocol; latest tag v0.0.1-rc8 (2025-10-14) | none listed |
| optimum-dev-setup-guide | Docker Compose reference setup for mump2p (4 nodes, 2 proxies), no releases | none listed |
| docs | Documentation site | |
| optimum-keysync | Key sync tool (Python); v1.0.0, v1.1.0 and v1.1.1 all dated 2026-06-25, also on PyPI as optimum-keysync; see [../products/keysync.md](../products/keysync.md) | MIT |
| go-libp2p-pubsub, prysm, shadow, reedsolomon, ethereum-package | Forks (pubsub, Ethereum client, simulator, erasure coding, devnet package) | |
| charon-distributed-validator-node | Obol CDVN setup | |

No public repo for the RLNC core library is visible.

## Gateway license

- Relicensed to MIT with a PATENTS notice in PR #55 on 2026-08-07. ([commit c9603ea](https://github.com/getoptimum/optimum-gateway/commit/c9603ea)) [confirmed]
- Copyright holder: Spice Solutions Inc. ([LICENSE](https://github.com/getoptimum/optimum-gateway/blob/main/LICENSE)) [confirmed]
- The public history starts from an "Initial public snapshot" commit on 2026-07-20, so earlier development is not visible. [confirmed]

## Release timeline

Dates are the commit dates of each tag. ([tags](https://github.com/getoptimum/optimum-gateway/tags)) [confirmed]

| Version | Date | Notes |
|---|---|---|
| v1.1.0 | 2026-07-20 | Initial public snapshot; JWT handshake with the Optimum auth service |
| v1.0.2 | 2026-08-05 | Health metric fix (#48); ProbeLab audit fixes |
| v1.1.1 | 2026-08-06 | Build StereumLabs used for the independent mainnet test |
| v1.2.0 | 2026-08-27 | |
| v1.2.1 | 2026-09-09 | 30-second dedup window for re-encoded blocks (#121) |
| v1.3.0 | 2026-09-10 | Publish rights from JWT scopes (#123, #126); two-way Subscribe with token refresh (#120) |
| v1.3.1 | 2026-09-14 | Self-enrollment with one org-wide join key, `ojk_` (#116, docs #129); introduced in v1.3.1, carried in v1.3.2 (see [../products/console-and-signal.md](../products/console-and-signal.md), [manual v1.3.2 configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) |
| v1.3.2 | 2026-09-17 | Blocks propagate every slot; v1.3.0 and v1.3.1 skipped some slots. Affected by GHSA-rcrq-vcj2-m787 |
| v1.3.3 | 2026-10-27 | Built with Go 1.27.3 (certificate-trust fix, CVE-2026-111943); memory-exhaustion fix for aggregated attestations (GHSA-rcrq-vcj2-m787); stays on the current fork until the CL uses the next; no attestations forwarded when propagation is off; `/health` works with telemetry off; token refresh about every 15 minutes |
| v1.3.4 | 2026-10-30 | Current release. New `telemetry_addr` (`OPT_TELEMETRY_ADDR`) for host-networking gateways (GHSA-gr6w-cqh2-3c5g); listeners use plain TCP, MPTCP off (CVE-2026-98432); registration no longer sends `gateway_http_addr`; Helm chart 0.5.0 |

- As of the 2026-11-16 check, the CHANGELOG lists v1.3.4 as CURRENT, and v1.3.3 and v1.3.2 as supported (upgrade recommended). v1.3.1 and v1.3.0 are deprecated, as is everything older, including v0.0.1-rc1 to rc12. An earlier version of this page said v1.3.2 was the only supported version. ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md), [v1.3.4 release notes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.4/release_notes.md)) [confirmed]
- Helm chart 0.5.0 binds telemetry to node loopback, probes it from inside the pod and adds org-wide join-key enrollment. It needs gateway v1.3.4; older images ignore its loopback bind. ([v1.3.4 release notes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.4/release_notes.md)) [confirmed]
- The latest `main` commit seen on 2026-11-16 is #231 (2026-11-13), a bump of golang.org/x/net for CVE-2026-78661. [confirmed]
- Supported consensus clients: Prysm, Lighthouse, Nimbus, Teku, Lodestar. The docs note Nimbus can take a few hours to settle. [confirmed]
