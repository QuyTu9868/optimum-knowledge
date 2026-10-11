---
title: Repos and Gateway releases
last_verified: 2026-10-11
status: confirmed from git history and CHANGELOG
---

# Repos and releases

## Public repos

The [getoptimum GitHub org](https://github.com/getoptimum) has about 21 public repos. Main ones: [confirmed]

| Repo | What it is | License |
|---|---|---|
| optimum-gateway | Go sidecar relaying gossip between libp2p consensus clients and mump2p | MIT, plus a PATENTS notice |
| optimum-common | Shared Go SDK | BSD-3-Clause |
| optimum-hop | Quick-try scripts | GPL-3.0 |
| mump2p-cli | CLI for the mump2p pubsub protocol | none listed |
| docs | Documentation site | |
| optimum-keysync | Key sync tool (Python) | MIT |
| hermes, go-libp2p-pubsub, prysm, shadow | Forks used for tracing, pubsub, client and simulation work | |
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
| v1.3.1 | 2026-09-14 | Self-enrollment with one org-wide join key, `ojk_` (#116, docs #129) |
| v1.3.2 | 2026-09-17 | Blocks propagate every slot; v1.3.0 and v1.3.1 skipped some slots |

- The CHANGELOG says v1.3.2 is the only supported version; everything older, including v0.0.1-rc1 to rc12, is deprecated. ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md)) [confirmed]
- Supported consensus clients: Prysm, Lighthouse, Nimbus, Teku, Lodestar. The docs note Nimbus can take a few hours to settle. [confirmed]
