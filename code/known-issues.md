---
title: Known issues and notable fixes
last_verified: 2026-10-11
status: confirmed from PRs, commits and CHANGELOG; GitHub issues list not searched
---

# Known issues and notable fixes

The issues list could not be read during research, so this file covers PRs, commits and the CHANGELOG only.

## Notable fixes

- **Skipped slots in v1.3.0 and v1.3.1:** some slots were skipped; v1.3.2 propagates blocks every slot and is a required upgrade. ([CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md)) [confirmed]
- **Duplicate notifications (PR #121, 2026-09-09):** adds a 30-second dedup window so re-encodings of the same block from the same source don't trigger repeated stream events. The PR does not mention republishing or latency spikes. ([PR #121](https://github.com/getoptimum/optimum-gateway/pull/121)) [confirmed]
- **Handshake gating (PR #8, 2026-07-23):** only accepts messages from peers that complete handshake validation. No client-specific behaviour is mentioned. ([PR #8](https://github.com/getoptimum/optimum-gateway/pull/8)) [confirmed]
- **Health metric (PR #48, v1.0.2):** the consensus client health metric now ticks on outbound relay too, not just inbound gossip. [confirmed]
- Others by title: telemetry data race (#10), TLS concern in the stream service (#84), slot-gating Hermes beacon fanout (#135), recording publisher first-seen time (#161), accepting gossip blocks up to the compressed size limit (#162). [confirmed]

## Audit

- ProbeLab audit phase 2 found 17 issues, none critical; all but F-07 fixed in v1.0.2. See [../technology/security.md](../technology/security.md).

## GossipSub settings in the Gateway code

From [config.go](https://github.com/getoptimum/optimum-gateway/blob/main/pkg/service/mum_p2p/config.go): [confirmed]

- Mesh degree target is configurable; low bound is target minus 1, high bound is target plus 6.
- Heartbeat every 700 ms.
- Full messages kept for 6 windows to answer IWANT requests; gossip covers 3 windows.
- Optional tracing logs GRAFT/PRUNE mesh events.

IDONTWANT handling was not found in the Gateway config.

## Stories without a source

These circulate but nothing in the repo, PRs, CHANGELOG or docs supports them as of last_verified. Listed in [../unverified.md](../unverified.md).

- A bug where blocks were republished after a 30s TTL, causing 30-46s latency spikes.
- Prysm being lenient and Teku/Lighthouse strict about the handshake.
- "Partial RLNC delivery".
