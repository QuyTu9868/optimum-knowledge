---
title: Gateway design decisions (ADRs)
last_verified: 2026-10-20
status: summary of 13 public ADRs; some decisions are proposals or pending, marked per item
---

# Gateway design decisions (ADRs)

The optimum-gateway repository keeps 13 architecture decision records (ADRs) that explain why the gateway is built the way it is.

This page describes what the ADRs say as of 2026-10-20. ADRs are design documents, so each item says whether the ADR states it as implemented, proposed or pending. Purposes and intended effects are tagged claimed; what an ADR plainly defines, including its own admissions, is tagged confirmed.

## ADR-0001 Architecture (Accepted, 2025-12-04)

- One gateway process holds a libp2p host facing the consensus client and an embedded mump2p node, and bridges messages both ways. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- High-volume topics can be batched by an aggregator roughly every 25 ms. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- The ADR gives bandwidth reduction as the purpose of batching. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [claimed]
- A fleet-wide `propagation_enabled` switch gates mump2p to client forwarding of blocks and attestations; client to mump2p forwarding and arrival measurement are not gated. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]
- The ADR lists its own trade-off: the gateway sits on the critical path for both sides, so a bug can affect both directions. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md)) [confirmed]

## ADR-0002 to 0005 Measurement

- ADR-0002 (Accepted, 2025-12-04) chose to compute block latency on the bootstrap side from gateway reports, and rejected adding a timestamp to the wire message. A note says later ADRs superseded much of its naming. ([ADR-0002](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0002-beacon-block-latency.md)) [confirmed]
- ADR-0003 (Accepted, 2026-01-07): gateways emit raw per-block timestamps (`t_eth_seen_ms`, `t_mum_seen_ms`, `t_mum_published_ms`) and the bootstrap service computes KPIs such as gap to the best gateway. ([ADR-0003](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md)) [confirmed]
- ADR-0003 argues that a raw "mump2p minus Ethereum" delta is a debug signal, not a stable KPI. ([ADR-0003](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md)) [confirmed]
- ADR-0003 says the snapshot API for publishing KPIs is not yet implemented. ([ADR-0003](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md)) [confirmed]
- ADR-0004 (Accepted, 2026-02-09) adds origin and upstream peer fields so routing paths can be traced. The per-peer counters are stated as implemented. ([ADR-0004](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0004-hop-by-hop-latency-tracking.md)) [confirmed]
- The hop-latency KPIs derived from those fields (hop latency, processing delay, bottleneck rate) are explicitly marked not implemented. ([ADR-0004](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0004-hop-by-hop-latency-tracking.md)) [confirmed]
- ADR-0005 (Approved, 2026-02-17; implementation status not stated) defines how to trace which entry source (consensus node, relay, Hermes node) delivered a block first, plus derived metrics such as relay impact and missed blocks. ([ADR-0005](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0005-block-ingestion-tracing-and-analysis.md)) [confirmed]

## ADR-0006 and 0007 Health and arrival tracking

- ADR-0006 (Accepted, 2026-03-18) adds `GET /health` on telemetry port 48123: 200 when healthy, 503 when degraded. ([ADR-0006](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0006-gateway-health-check.md)) [confirmed]
- It checks client peers at least 1, mump2p peers at least 1, subscribed topics at least 1, and last block age under 60 seconds. Later gateway versions add `cl_health` and `mump2p_health`, see [../products/run-the-gateway.md](../products/run-the-gateway.md). ([ADR-0006](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0006-gateway-health-check.md)) [confirmed]
- ADR-0007 (Accepted, 2026-04-14) records which consensus-client peer delivered each block, and adds gateway-local first-seen counters and arrival histograms per path. ([ADR-0007](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0007-slot-based-block-arrival-tracking.md)) [confirmed]

## ADR-0008 to 0010 Attestations

- ADR-0008 (Accepted, 2026-04-17): the gateway forwards to mump2p only attestations from the account's own validators, learned from a `validator_indexes` claim in its auth token. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- ADR-0008 states the purpose as cutting duplicate attestation traffic across gateways. Its worked example (80 percent wasted bandwidth before) is illustrative, and it estimates about 98 percent less attestation traffic, while ADR-0009 repeats about 95 percent. Both are estimates, with no measurement. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md), [ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [claimed]
- ADR-0008 says attestations more than 3 slots from the current slot are dropped (see Disputed for ADR-0009). In the client to mump2p direction, topics other than blocks and attestations are dropped. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- ADR-0009 (Accepted, 2026-04-27): the aggregator holds attestations and publishes only between 4 s and 8 s into each slot. The values are compile-time constants. ([ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [confirmed]
- The ADR gives the purpose as keeping attestations from competing with block propagation. ([ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [claimed]
- The ADR admits the benefit is a hypothesis, shipped on by default without measurements, to be checked later with optimum-bench. ([ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [confirmed]
- ADR-0010 (Approved, implementation pending, 2026-06-10) proposes deterministic validator chunks so gateways of one account build identical attestation payloads. It is not stated as implemented. ([ADR-0010](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0010-attestation-synchronization.md)) [confirmed]

## ADR-0011 to 0013 (summary only)

- ADR-0011 (Approved, implemented, 2026-08-05): opt-in read-only block feed; details on [../products/block-stream.md](../products/block-stream.md). ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- ADR-0012 (Accepted, implemented, 2026-08-18, updated 2026-10-02): bootstrap publishes a list of slots to accelerate; Hermes-role gateways pass only listed blocks (or blocks beyond the list horizon) to their client, while partner-role gateways pass every block. The Accelerate product page does not link itself to this ADR, see [../products/accelerate.md](../products/accelerate.md). ([ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]
- ADR-0013 (Accepted, implemented, 2026-09-08): a gateway enrols itself with a reusable enrollment key (called org join key in the ADR) and a locally generated keypair, instead of one API key per host. ([ADR-0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]

## Disputed

- ADR-0008 says attestations more than 3 slots from the current slot are dropped; ADR-0009 later lists a max slot age constant of 0, meaning current slot only. The ADRs do not reconcile this. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md), [ADR-0009](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0009-slot-aware-attestation-gate.md)) [confirmed]
- [sidecar-gateway.md](sidecar-gateway.md) says the gateway subscribes to Ethereum gossip topics and forwards that traffic into the mesh. ADR-0008 says that from client to mump2p only blocks and the account's own attestations are forwarded, other topics are dropped. ([ADR-0008](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md)) [confirmed]
- The sidecar page describes a gateway run next to a beacon node. ADR-0011 defines a stream-only mode that skips the client side and never publishes. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- The sidecar page says the gateway needs no changes to validator software and does not touch signing, beacon state or attestation duties. ADR-0001 lists a gateway bug hitting both directions as a trade-off, and ADR-0012 has Hermes-role gateways withhold unlisted blocks from the client. These do not directly contradict the quoted claims; they are behaviour the sidecar page does not mention. ([ADR-0001](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md), [ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]

## Not yet covered

- No ADR gives measured latency or reward results; benefit statements are intentions.
- ADR-0010 has no implementation date, and the bootstrap KPI snapshot API has no date.
- Whether the ProbeLab audit in security.md, phase 2 in July 2026, covered the stream, selective block forwarding or self-enrollment: not stated, and ADR-0011 to 0013 are dated August and September 2026.
- Metric lists and field-level formats are not repeated here.
