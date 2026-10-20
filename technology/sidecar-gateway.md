---
title: Optimum Gateway as a validator sidecar
last_verified: 2026-10-20
status: claimed by Lido post, backed by third-party audit
---

# Sidecar model

A sidecar is a separate program that runs next to the main software and adds a feature without modifying it.

- The Optimum Gateway runs alongside the beacon node as a sidecar. ([Lido PERCH post, 2026-08-10](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- It requires no changes to validator software. ([same](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- It adds no new slashing conditions and does not access validator keys. ([same](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- ProbeLab's audit confirms it runs in parallel to the consensus client's libp2p stack and does not touch signing logic, beacon state or attestation duties. Stopping it does not affect the client's own mesh. ([ProbeLab audit, 2026-08-18](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]

## What the Gateway does

- It connects an Ethereum consensus-layer client to the mump2p mesh. It subscribes to Ethereum gossip topics, forwards that traffic into the mesh, and receives mump2p messages that it re-encodes and re-injects into the local client network. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Client to mesh: each message is fingerprinted with XXHash and kept in a short cache of about one minute to drop duplicates, then forwarded to mump2p peers, with optional batching for topics other than blocks. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Mesh to client: a message already in the cache is ignored, otherwise it is SSZ-decoded, re-encoded and published to the local libp2p network. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- It runs two libp2p hosts: TCP 33212 faces the consensus client and TCP 33213 faces other gateways on the mump2p mesh. A telemetry HTTP server listens on 48123 with /health and /api/v1/self_info. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- The client needs no code change: it is pointed at the Gateway as a peer, for example with Prysm's --peer flag and the Gateway's multiaddress. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
- Scope of forwarding (corrects the first bullet above): from client to mesh the gateway forwards only beacon blocks and the account's own attestations; other topics are dropped. ADR-0008 is marked "Superseded in part": the role now comes from the JWT type claim and per-role block forwarding moved to ADR-0012. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- Wiring differs by client: Prysm, Teku, Nimbus and Lodestar dial the gateway; for Lighthouse the gateway dials the node through `OPT_DIRECT_CL_PEERS`. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- A stream-only gateway has no client peer and never publishes. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Exposure rules: 48123 is published to loopback only, and 33212 is not published in stream-only mode. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- ADR-0011, 0012 and 0013 are dated August and September 2026. ADR-0012 has Hermes-role gateways pass only listed blocks to their client, and ADR-0001 lists a gateway bug hitting both directions as a trade-off. ([ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md), [ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- Editorial note: the ProbeLab audit phase was July 2026 and none of the sources say it covered ADR-0011, 0012 or 0013, so "stopping it does not affect the client's own mesh" should be read with those ADRs in mind.
- A 2025 validator integration video covers the beacon block and attestation topics and says beacon aggregate was coming soon. ([validator implementation video, 2025-09-29](https://www.youtube.com/watch?v=xe1u2Ct6WNY)) [claimed]

## Repos

- Public code lives in the getoptimum GitHub org, including `optimum-gateway` (MIT license). ([GitHub](https://github.com/getoptimum)) [confirmed]

## Disputed

- "Forwards that traffic into the mesh" (What the Gateway does) vs ADR-0008: only blocks and the account's own attestations are forwarded to the mesh. See [gateway-design.md](gateway-design.md).
- "The client is pointed at the Gateway as a peer" holds for Prysm, Teku, Nimbus and Lodestar; Lighthouse is the reverse, and stream-only has no client.
- "Stopping it does not affect the client's own mesh" (ProbeLab, Lido) vs ADR-0012 (Hermes-role gateways withhold unlisted blocks from the client) and ADR-0001 (critical-path risk).

Newer pages: [../products/run-the-gateway.md](../products/run-the-gateway.md), [../products/console-and-signal.md](../products/console-and-signal.md), [gateway-design.md](gateway-design.md), [../products/block-stream.md](../products/block-stream.md), [../products/keysync.md](../products/keysync.md).

Release history and fixes: [../code/releases.md](../code/releases.md), [../code/known-issues.md](../code/known-issues.md).
