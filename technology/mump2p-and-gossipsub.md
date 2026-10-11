---
title: mump2p and libp2p GossipSub
last_verified: 2026-10-11
status: relationship confirmed, speed numbers disputed
---

# mump2p and GossipSub

## Relationship

- mump2p builds on libp2p's GossipSub protocol. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- It keeps a configurable gossip mesh with peer counts similar to GossipSub. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Ethereum's gossip network uses GossipSub today. ([gossip problem blog, 2025-08-20](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- Validators keep using standard GossipSub to talk to peers that don't run mump2p. ([implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed]
- A third-party audit describes the Gateway as running in parallel to the consensus client's own libp2p stack, not replacing it. ([ProbeLab audit, 2026-08-18](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]

## Why Optimum says gossip needs fixing

- Optimum argues gossip does not scale linearly: as networks grow, latency spikes and throughput hits a ceiling. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [claimed]

## Speed and bandwidth claims, by source

These numbers come from different setups and dates. Do not compare them as if they were one benchmark.

| Claim | Setting | Source | Tag |
|---|---|---|---|
| 50%+ lower latency, less variation vs GossipSub | Early tests, 2025 | [implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits) | [claimed] |
| 6-20x faster than gossipsub | Product page, no setup given | [product page](https://www.getoptimum.xyz/product) | [claimed] |
| ~150ms average, at least 6x faster than GossipSub baseline | Hoodi testnet | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| 90-95% bandwidth saving vs gossipsub | Homepage, no setup given | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| 2.42x faster, 7.88x lower variance | Ethereum mainnet vs libp2p baseline, posted by alan.s | [Lido PERCH post, 2026-08-10](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [claimed] |
| No significant effect; Nimbus slower on treated nodes | 36 mainnet full nodes, no validators attached, 11.5 days, build v1.1.1, operator stefa2k | [reply in the same Lido thread, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |

## Disputed

- **How much faster on mainnet.** Optimum's numbers show a clear speedup. One independent operator test on an early build found nothing significant. That test used full nodes without validators, so the attestation path was never tested. Both are reported here. When you use 2.42x, mention the independent result too.

## Not yet covered

The docs do not describe GRAFT/PRUNE or IHAVE / IWANT / IDONTWANT. The Gateway code does set GossipSub parameters (700 ms heartbeat, IWANT cache of 6 windows, GRAFT/PRUNE tracing); see [../code/known-issues.md](../code/known-issues.md). IDONTWANT handling was not found.

Full results, methods and the independent test are in [../results/performance.md](../results/performance.md).
