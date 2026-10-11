---
title: Optimum Gateway as a validator sidecar
last_verified: 2026-10-09
status: claimed by Lido post, backed by third-party audit
---

# Sidecar model

A sidecar is a separate program that runs next to the main software and adds a feature without modifying it.

- The Optimum Gateway runs alongside the beacon node as a sidecar. ([Lido PERCH post, 2026-08-10](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- It requires no changes to validator software. ([same](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- It adds no new slashing conditions and does not access validator keys. ([same](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- ProbeLab's audit confirms it runs in parallel to the consensus client's libp2p stack and does not touch signing logic, beacon state or attestation duties. Stopping it does not affect the client's own mesh. ([ProbeLab audit, 2026-08-18](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]

## Repos

- Public code lives in the getoptimum GitHub org, including `optimum-gateway` (MIT license). ([GitHub](https://github.com/getoptimum)) [confirmed]

Release history and fixes: [../code/releases.md](../code/releases.md), [../code/known-issues.md](../code/known-issues.md).
