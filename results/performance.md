---
title: Performance results, testnet and mainnet
last_verified: 2026-10-21
status: mostly Optimum's own claims, now including its 2026-10-20 mainnet launch figures and live Hub data; the one independent mainnet test (early build) disagrees; no independent test of the launch figures found yet
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
- The August 2026 "Free and faster" post (the earlier rollout post, not the 2026-10-20 launch blog) has no speed figures. It says rollout is in progress with 40+ validators and node operators, and access is permissioned by API key. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Homepage: "Mainnet benchmarks are ongoing." ([homepage](https://www.getoptimum.xyz/)) [claimed]
  - Superseded: the homepage text read on 2026-10-21 no longer contains that line (nor the 6-20x and 90-95% lines below) and now gives mainnet figures, see the next section. The older lines are kept as dated history.

### Mainnet launch figures (announced 2026-10-20, read 2026-10-21)

All sources here are Optimum's own. Each measures something slightly different, so they are listed separately. Sample, window and observers are given only where the source gives them.

- Tweet (@get_optimum, 2026-10-20): data moves across Ethereum "2-3x faster". No sample, window or baseline stated. ([tweet](https://x.com/get_optimum/status/2112559939126206552)) [claimed]
- Blog headline: block data is faster "by 2.5 - 3.5x on average". No window stated for this range. ([launch blog, 2026-10-20](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog Hub figures: over a sample of 50,292 slots mump2p beat libp2p by 335 ms, called 3.3x faster. The post says the figures were taken from the Hub 1 week before publishing; the window length is not stated. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog baseline: the Hub uses Xatu sentry nodes to measure libp2p performance over the same blocks. The post does not say who runs the sentries or how many. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog consistency claim: mump2p accelerates 85-90% of blocks by 2.5-3.5x, with a larger gain toward the tail (first 50% up to 95% of nodes). No per-percentile numbers in the text. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog operator case study: one unnamed operator had 51% fewer wrong head votes over 1 week after adopting mump2p, versus the week before. One operator, before and after, not a controlled test. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Homepage: "2-4x" faster propagation (avg) vs Gossipsub and "90%" Optimum network first seen. The FAQ repeats both for mainnet. No sample, window or observer count. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- Live Hub API, fetched 2026-10-21T13:50Z (values change as the window moves): mainnet, window 2026-10-20T06:00Z to 2026-10-21T13:00Z (31 hours), 9,281 slots measured, observers 300 gateways and 155 Xatu sentries. Spread factor 3.21 (mump2p 133.7 ms vs libp2p 429.3 ms, 9,279 slots compared). ([network-performance API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Same API, other fields: arrival 1,987 ms (mump2p) vs 2,249.4 ms (libp2p); headline lead 262 ms (CI 8.5 ms); lead at p50 49 ms, p75 102 ms, p95 262 ms; slots accelerated 87.9%. The JSON does not define "spread" or "arrival", so they are reported as raw fields. ([network-performance API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Calculation from those fields (editorial, not an Optimum statement): 3.21 is 429.3 divided by 133.7 (the spread values), while the arrival values give a ratio of about 1.13. So the "3x" in the API possibly refers to the spread measure rather than total arrival time; the blog calls its own measure "block arrival times" and does not say which of the two its 335 ms is. ([network-performance API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Status API: mainnet propagation "on" since 2026-10-20T05:45:32Z, checked 2026-10-21T13:45:56Z. ([propagation-status API](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- No independent measurement of the launch figures was found as of last_verified. Hub details are in [../products/optimum-hub.md](../products/optimum-hub.md).

### Independent mainnet test

- StereumLabs (stefa2k) ran early build v1.1.1 on 36 mainnet full nodes for 11.5 days. ([Lido forum reply, 2026-09-09](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [third-party]
  - Blocks arrived earlier on Lighthouse (about 120 ms), Prysm (about 60 ms) and Grandine (about 30-50 ms). Lodestar gained less, partly control drift. Teku showed no change.
  - Nimbus nodes running the Gateway got slower.
  - Their summary: none of it significant.
  - The gateway mesh averaged 6.91-6.96 peers against a target of 8.
  - No validators were attached, so the attestation path was never tested.
- As of last_verified, Optimum has not posted a closing summary in that thread.
- Optimum reply (alan.s, post 11, 2026-10-12): says global acceleration was active across Ethereum mainnet during the StereumLabs window, so blocks relayed through its network could help non-mump2p nodes too, which makes the direct mump2p effect hard to isolate. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]
- Same reply: after October 26 Optimum plans to switch to a setup where only registered operators receive acceleration, and to compare each operator against its own baseline from before global acceleration was switched on, using block arrival at the operator's gateways relative to slot start plus on-chain attestation outcomes. No data is given. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]
- The reply does not retract or dispute StereumLabs' measurements. It offers a reason for the null result; the StereumLabs lines above stay as the independent record. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]

### Operator-reported mainnet figures (X, 2026-10-20)

Posted by the operators themselves on launch day. Neither post says how the figures were measured (no window, sample, observer or baseline, apart from the libp2p comparison named by Validation Cloud). Both are unaudited and operators are Optimum partners.

- Nodemonster: "84.2% of our blocks are now arriving faster", boosting data propagation "by 5x on average". Measure, window and baseline not stated. ([@Nodemonste, 2026-10-20](https://x.com/Nodemonste/status/2112663008015163608)) [third-party]
- Validation Cloud: "over 98% of blocks arrive faster", with an average speed boost of "2.2 times faster than libp2p". The post says "since implementing" but gives no window, sample or what was timed. ([@ValidationCloud, 2026-10-20](https://x.com/ValidationCloud/status/2112605801621995714)) [third-party]
- Other launch-day operator posts found (P2P.org, stakefish, Stakely, Twinstake, Finoa, Validatrium, Blockdaemon, Ebunker) give no speed figure; Finoa says only that its validators "now see blocks and attestations sooner". ([Finoa](https://x.com/FinoaConsensus/status/2112896608522346590)) [third-party]
- Kent Lin (Optimum) says it has seen "consistent high-performance propagation" at 2.5-3.5x faster; this is Optimum speaking, no method. ([@kentlinyy, 2026-10-20](https://x.com/kentlinyy/status/2112563195395399866)) [claimed]

### Press and dashboards

- Unchained (2026-10-20) repeats Optimum's claim that mump2p users got the block first in nine of 10 measurements, and flags the 2.42x figure as self-reported, saying the announcement did not explain how the numbers were gathered. The article attributes the measurements to Optimum, so this is a third party repeating an Optimum result, not a new test. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- DefiLlama says it launched an Investor Relations dashboard with Optimum showing Total Value Boosted of 1.4M ETH ($3.4B) and a comparison of Optimum block speed against a benchmark. The dashboard at investors.defillama.com/optimum returned HTTP 403 when fetched on 2026-10-21, so its figures and benchmark were not read. ([@DefiLlama, 2026-10-20](https://x.com/DefiLlama/status/2112561379651514602)) [third-party]

### Operator reports from the Lido thread (Hoodi)

- HashKey Cloud: about 200 ms lower average attestation propagation. [third-party]
- Blockdaemon: an overall improvement in attestation performance, no numbers. [third-party]
- Ebunker: a noticeable latency reduction in a testnet environment, no figure. [third-party]
- Stakely: zero incidents. FP Validated: measurement still running. [third-party]

All from the [Lido PERCH thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786).

## Bandwidth

- The homepage claims about 90-95% bandwidth reduction vs Gossipsub and 6-20x faster delivery. No method or network is given. ([homepage](https://www.getoptimum.xyz/)) [claimed] Superseded: homepage text no longer has this line as of 2026-10-21 (product page not rechecked).
- No measured mainnet bandwidth figure was found anywhere.

## Modeled, not measured

These come from Optimum's own economic models, not from running the network.

- A 50-150 ms latency cut would raise head vote accuracy from about 98.6% to 98.8-99.1%, worth 1,000-2,000 ETH per year. Data window Feb-Mar 2026. ([blog, 2026-03-26](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- The same model puts the APR gain at roughly 0.66-1.97% for major operators. ([same](https://www.getoptimum.xyz/blog/optimizing-a-100b-market-effects-of-latency-reduction-on-eth-staking-revenue)) [claimed]
- A 150 ms later bid cutoff adds about 16% to the average MEV bid. ([PBS blog, 2026-05-19](https://www.getoptimum.xyz/blog/the-cost-of-uncertainty-in-ethereums-pbs-hot-path)) [claimed]
- Optimum's research team says a study found that MEV missed in one slot's selected bid is not always fully captured in the next slot (cross-slot MEV). The post gives no figures. ([@get_optimum post, 2026-07-27](https://x.com/get_optimum/status/2081835782785159418)) [claimed]
- The Solana post cites up to 4x lower latency at 1-5% loss from benchmark models; no Solana tests reported. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Disputed

- **Mainnet speed multiple (launch week):** tweet 2-3x; blog 2.5-3.5x on average and 3.3x (335 ms, 50,292 slots, Hub data a week before publishing); homepage 2-4x; live Hub API on 2026-10-21 spread factor 3.21 over 31 hours and 9,281 slots. Earlier: 2.42x (Lido PERCH, Four Pillars) and 6-20x (homepage, old). Windows, samples and measures differ, so these are not one number. None is independently verified.
- **Lead in ms:** blog 335 ms vs API headline lead 262 ms (equal to the arrival gap and the p95 lead). The API spread gap is about 296 ms (429.3 minus 133.7). The blog does not say which measure its 335 ms is.
- **Share of blocks accelerated:** blog 85-90% and API 87.9% agree roughly; the homepage "90% first seen" is a different framing.
- **Mainnet benchmarks ongoing (old) vs launch figures (new):** the homepage line was current on 2026-10-14; by 2026-10-21 the homepage shows mainnet figures instead.
- **Hoodi speedup:** 6x (older homepage, no longer there on 2026-10-21; Behind the Metrics) vs 6.5x average / often 7-8x (Acceleration post) vs 5-6x (Blockworks).
- **Variance:** 7.88x lower variance (PERCH) vs about 7x on a 90-node benchmark (PBS blog) vs 2.81x by standard deviation (Four Pillars). Variance and standard deviation are different measures, so these are not one number.
- **p95 latency:** 170 ms (Four Pillars) vs about 179 ms (PBS blog).
- **Which network the 2.42x came from:** PERCH says mainnet; Four Pillars does not name one.
- **Speed range:** 6-20x on the older homepage (no longer there on 2026-10-21) vs 2.42x claimed on mainnet.
- **Does it help on mainnet at all:** Optimum claims 2.42x; the only independent test (early build, full nodes only) found nothing significant. Optimum replied (Lido post 11, 2026-10-12) that global acceleration was active during the test window, which made the effect hard to isolate; it did not dispute the measurements. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11))
- **Operator figures vs Optimum figures:** Nodemonster about 5x and 84.2% of blocks faster; Validation Cloud 2.2x versus libp2p and over 98% of blocks; Optimum 2-3x (tweet), 2.5-3.5x (blog, Kent Lin), 3.3x (blog Hub), 3.21 (live API); Optimum, via Unchained: 9 of 10 first (a first-seen share, not a multiple). Measures, windows and baselines are unstated or differ, so none is comparable. Operators' per-block share (84.2%, over 98%) also differs from the blog's 85-90% and the API's 87.9%. ([Nodemonste](https://x.com/Nodemonste/status/2112663008015163608), [ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714), [launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet))
- **Why StereumLabs found nothing:** StereumLabs says no significant effect on early build v1.1.1 over 11.5 days; Optimum says global acceleration was active in that window and also helped non-mump2p nodes (post 11, 2026-10-12). Optimum's explanation is untested, and the launch-week "2-3x across all of Ethereum" framing fits network-wide acceleration. After October 26 Optimum says it will accelerate registered operators only. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11))
