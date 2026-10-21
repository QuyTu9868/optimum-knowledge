---
title: mump2p and libp2p GossipSub
last_verified: 2026-10-21
status: relationship confirmed, speed numbers disputed (2026-10-20 mainnet launch claims added, none independently checked)
---

# mump2p and GossipSub

## Relationship

- mump2p builds on libp2p's GossipSub protocol. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- It keeps a configurable gossip mesh with peer counts similar to GossipSub. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Ethereum's gossip network uses GossipSub today. ([gossip problem blog, 2025-08-20](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- Validators keep using standard GossipSub to talk to peers that don't run mump2p. ([implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed]
- A third-party audit describes the Gateway as running in parallel to the consensus client's own libp2p stack, not replacing it. ([ProbeLab audit, 2026-08-18](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- A mump2p node is a libp2p host with a GossipSub-style mesh plus an RLNC module that encodes, recodes and decodes shards. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- The docs call mump2p a high-performance alternative to GossipSub that builds on libp2p. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- In the Gateway design the consensus client keeps its normal libp2p stack. The Gateway is a separate libp2p peer that subscribes to Ethereum gossip topics, forwards them into the mump2p mesh and re-injects mesh messages into the client's network. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Why Optimum says gossip needs fixing

- Optimum argues gossip does not scale linearly: as networks grow, latency spikes and throughput hits a ceiling. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [claimed]
- A node on a GossipSub mesh can receive the same piece several times while still waiting for a piece it lacks. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- Médard ties the cost to Ethereum's slot clock: a slot lasts 12 seconds, and she points to about 4 seconds in which validators agree on the head of the chain, so time spent on stale data comes out of that budget. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- In the Ethereum consensus spec, attesters vote for the head they see at about one third of the slot (ATTESTATION_DUE_BPS 3333, roughly 4 seconds). ([consensus-specs validator.md](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/validator.md)) [third-party]
- She argues repeats hurt validators far from the block source most, which creates a premium for being colocated and works against decentralization. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- A research talk says a proposed block must cross the global network before attesters can vote, and the votes then travel on to aggregators, so both legs are latency sensitive. ([research talk, 2026-05-07](https://www.youtube.com/watch?v=fgeXDbORuz0)) [claimed]

## How publishing and relaying work

Summarised from the docs p2p page.

- **Publishing:** the node adds a length prefix and pads the message if needed, splits it into k fragments using ShredFactor, creates ShredFactor times PublisherShardMultiplier coded shards, and sends different shards to different peers in round-robin order. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- **Receiving a shard:** the node checks it for linear independence and drops redundant ones, stores it with the message's other shards, and tries to decode once k unique shards are there. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- **Forwarding:** shards from the publisher go to all mesh peers right away. Shards from other peers are recoded and forwarded once the node holds enough of them. The docs give the threshold as ForwardShardThreshold in one place and as ShredFactor times ForwardShardThreshold in another. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- **Control messages** extend GossipSub's: IDONTWANT tells peers to stop sending shards of a message that is already decoded, IHAVE advertises held shards, IWANT requests more shards of an undecoded message, and GRAFT and PRUNE grow or shrink the mesh. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- **Mesh size:** MeshDegreeTarget, MeshDegreeMin and MeshDegreeMax set how many peers a node keeps. The docs cite libp2p's default ideal degree of 6, with 4 to 12 acceptable. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- The libp2p gossipsub v1.0 spec lists D 6, D_low 4 and D_high 12. Ethereum's consensus spec sets its own values: D 8, D_low 6, D_high 12 and a heartbeat of 0.7 s. ([libp2p gossipsub v1.0 spec](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md), [consensus-specs p2p-interface](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md)) [third-party]
- Default values for these settings are in [parameters.md](parameters.md).


## Speed and bandwidth claims, by source

These numbers come from different setups and dates. Do not compare them as if they were one benchmark.

| Claim | Setting | Source | Tag |
|---|---|---|---|
| 50%+ lower latency, less variation vs GossipSub | Early tests, 2025 | [implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits) | [claimed] |
| 6-20x faster than gossipsub | Product page, no setup given (homepage 6-20x line gone on 2026-10-21; product page not rechecked) | [product page](https://www.getoptimum.xyz/product) | [claimed] |
| ~150ms average, at least 6x faster than GossipSub baseline | Hoodi testnet; older homepage, no longer there on 2026-10-21 | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| 90-95% bandwidth saving vs gossipsub | Older homepage, no setup given, no longer there on 2026-10-21 | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| 2.42x faster, 7.88x lower variance | Ethereum mainnet vs libp2p baseline, posted by alan.s | [Lido PERCH post, 2026-08-10](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [claimed] |
| No significant effect; Nimbus slower on treated nodes | 36 mainnet full nodes, no validators attached, 11.5 days, build v1.1.1, operator stefa2k | [reply in the same Lido thread, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| 2-3x faster | Ethereum mainnet, no sample or baseline given | [@get_optimum tweet, 2026-10-20](https://x.com/get_optimum/status/2112559939126206552) | [claimed] |
| 2.5-3.5x on average; 3.3x (335 ms) over 50,292 slots, libp2p baseline measured by Xatu sentries | Ethereum mainnet, Hub data from a week before publishing | [launch blog, 2026-10-20](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet) | [claimed] |
| 2-4x faster (avg) vs Gossipsub; Optimum first seen about 90% of the time | Ethereum mainnet, no sample given | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| Spread factor 3.21 (133.7 ms vs 429.3 ms), 31 hours, 9,281 slots, 300 gateways and 155 Xatu sentries; fetched 2026-10-21T13:50Z, values change | Ethereum mainnet, live Hub API | [network-performance API](https://console.getoptimum.xyz/api/public/network-performance) | [claimed] |

## The 2025 live speed demo

- The demo ran 72 nodes spread around the world: 36 on mump2p and 36 on GossipSub, in near-identical geographic layouts. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- Messages of 5 MB, then 8 MB, were published from randomly chosen nodes. L1 blocks are described in the video as 2 to 5 MB. "Delay" meant the time until 95% of nodes had the message. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- At 5 MB and one message per second the presenter reported about 1 s for mump2p against about 2 s for GossipSub, with less variability. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- At 8 MB and two messages per second mump2p kept up, while GossipSub latency kept growing as a backlog built. ([mump2p vs GossipSub speed demo, 2025-08-18](https://www.youtube.com/watch?v=Ggnz_7a8Ri0)) [claimed]
- Optimum presents it as a speed demo. The revenue study in the May 2026 research talk used a different metric, the time for a block to reach 80% of the network. ([research talk, 2026-05-07](https://www.youtube.com/watch?v=fgeXDbORuz0)) [claimed]

## Disputed

- **Mainnet launch speed multiple.** Tweet 2-3x, blog 2.5-3.5x (and 3.3x), homepage 2-4x, live Hub API 3.21 on 2026-10-21, against 2.42x earlier on the Lido post. Windows, samples and measures differ, and the independent early-build test above has not been answered. Details in [../results/performance.md](../results/performance.md).
- **How much faster on mainnet.** Optimum's numbers show a clear speedup. One independent operator test on an early build found nothing significant. That test used full nodes without validators, so the attestation path was never tested. Both are reported here. When you use 2.42x, mention the independent result too.

## Not yet covered

- Earlier versions of this file said the docs do not describe GRAFT/PRUNE or IHAVE / IWANT / IDONTWANT. The docs p2p page now lists all of them, see "How publishing and relaying work" above. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Still not documented in the sources reviewed: the shard wire format, how many shards a real message is split into, topic names beyond the Ethereum gossip topics, and how blobs are handled.
- The Gateway code sets GossipSub parameters (700 ms heartbeat, IWANT cache of 6 windows, GRAFT/PRUNE tracing); see [../code/known-issues.md](../code/known-issues.md).

Full results, methods and the independent test are in [../results/performance.md](../results/performance.md).
