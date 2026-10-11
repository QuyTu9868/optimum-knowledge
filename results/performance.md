---
title: Performance results, testnet and mainnet
last_verified: 2026-10-11
status: mostly Optimum's own claims; one independent mainnet test disagrees; mainnet benchmarks ongoing
---

# Performance results

Read this first: almost every speed number below was published by Optimum or by a report Optimum sponsored. The only independent mainnet measurement found so far found no significant effect on an early build. Both sides are here.

## Early simulations and devnets (2025)

- Ethshadow simulation of 1,000 nodes: OptimumP2P delivered messages more than 2x faster than Gossipsub. ([blog, 2025-06-12](https://www.getoptimum.xyz/blog/comparing-the-performance-of-optimump2p-and-gossipsub)) [claimed]
- Live test on 36 nodes with 6 MB messages: average latency 1.17s vs 2.35s for Gossipsub. ([same post](https://www.getoptimum.xyz/blog/comparing-the-performance-of-optimump2p-and-gossipsub)) [claimed]
- 36-node testnet: 4, 6 and 10 MB blocks delivered at about 1s; Gossipsub took 1.6s at 4 MB and 2.6s at 6 MB. No hardware or duration given. ([blog, 2025-07-10](https://www.getoptimum.xyz/blog/mump2p-unlocking-next-gen-performance-for-tomorrows-killer-apps)) [claimed]

## Hoodi testnet (late 2025)

- Average block propagation about 150 ms across 30 globally distributed gateways. The post calls these first-round numbers. ([blog, 2025-09-23](https://www.getoptimum.xyz/blog/acceleration-mump2p-early-results-on-hoodi-testnet)) [claimed]
- The baseline is the fastest Gossipsub figure from ethPandaOps, about 1s. The same post gives an average 6.5x speedup, "frequently" 7-8x. ([same post](https://www.getoptimum.xyz/blog/acceleration-mump2p-early-results-on-hoodi-testnet)) [claimed]
- Method in the follow-up: each block is sent over mump2p and Gossipsub at the same time from the same gateway; Prometheus histograms scraped every 5s; cross-continental spikes of 200-250 ms. Sample size not stated. ([blog, 2025-10-16](https://www.getoptimum.xyz/blog/behind-the-metrics-mump2ps-6x-latency-win-on-ethereum-hoodi-testnet)) [claimed]
- Everstake COO Bohdan Opryshko told Blockworks average propagation was about 150 ms and the overhead was "not significant". The 5-6x framing is the article's, not his quote. ([Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck)) [third-party]

## Mainnet

- The Lido PERCH post (alan.s, 2026-08-10) says that on mainnet mump2p was measured propagating 2.42x faster with 7.88x lower variance. No method or data is linked. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [claimed]
- Four Pillars repeats 2.42x faster (2.50x by median) than the GossipSub baseline, and 7.88x lower variance than libp2p (2.81x by standard deviation), calling them early test results from 30 gateways worldwide without naming the network. The report is sponsored by Optimum. ([Four Pillars, 2026-08-18](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [claimed]
- The mainnet launch post has no speed figures. It says rollout is in progress with 40+ validators and node operators, and access is permissioned by API key. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Homepage: "Mainnet benchmarks are ongoing." ([homepage](https://www.getoptimum.xyz/)) [claimed]

### Independent mainnet test

- StereumLabs (stefa2k) ran early build v1.1.1 on 36 mainnet full nodes for 11.5 days. ([Lido forum reply, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [third-party]
  - Blocks arrived earlier on Lighthouse (about 120 ms), Prysm (about 60 ms) and Grandine (about 30-50 ms). Lodestar gained less, partly control drift. Teku showed no change.
  - Nimbus nodes running the Gateway got slower.
  - Their summary: none of it significant.
  - The gateway mesh averaged 6.91-6.96 peers against a target of 8.
  - No validators were attached, so the attestation path was never tested.
- As of last_verified, Optimum has not posted a closing summary in that thread.

### Operator reports from the Lido thread (Hoodi)

- HashKey Cloud: about 200 ms lower average attestation propagation. [third-party]
- Blockdaemon: an overall improvement in attestation performance, no numbers. [third-party]
- Ebunker: a noticeable latency reduction in a testnet environment, no figure. [third-party]
- Stakely: zero incidents. FP Validated: measurement still running. [third-party]

All from the [Lido PERCH thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786).

## Bandwidth

- The homepage claims about 90-95% bandwidth reduction vs Gossipsub and 6-20x faster delivery. No method or network is given. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- No measured mainnet bandwidth figure was found anywhere.

## Modeled, not measured

These come from Optimum's own economic models, not from running the network.

- A 50-150 ms latency cut would raise head vote accuracy from about 98.6% to 98.8-99.1%, worth 1,000-2,000 ETH per year. Data window Feb-Mar 2026. ([blog, 2026-03-26](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- The same model puts the APR gain at roughly 0.66-1.97% for major operators. ([same](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- A 150 ms later bid cutoff adds about 16% to the average MEV bid. ([PBS blog, 2026-05-19](https://www.getoptimum.xyz/blog/the-cost-of-uncertainty-in-ethereums-pbs-hot-path)) [claimed]
- The Solana post cites up to 4x lower latency at 1-5% loss from benchmark models; no Solana tests reported. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Disputed

- **Hoodi speedup:** 6x (homepage, Behind the Metrics) vs 6.5x average / often 7-8x (Acceleration post) vs 5-6x (Blockworks).
- **Variance:** 7.88x lower variance (PERCH) vs about 7x on a 90-node benchmark (PBS blog) vs 2.81x by standard deviation (Four Pillars). Variance and standard deviation are different measures, so these are not one number.
- **p95 latency:** 170 ms (Four Pillars) vs about 179 ms (PBS blog).
- **Which network the 2.42x came from:** PERCH says mainnet; Four Pillars does not name one.
- **Speed range:** 6-20x on the homepage vs 2.42x claimed on mainnet.
- **Does it help on mainnet at all:** Optimum claims 2.42x; the only independent test (early build, full nodes only) found nothing significant.
