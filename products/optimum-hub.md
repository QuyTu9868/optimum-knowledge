---
title: Optimum Hub
last_verified: 2026-10-21
status: Optimum's own dashboard and public JSON, read 2026-10-21; method described only in the launch blog, not independently audited
---

# Optimum Hub

The Hub is Optimum's public performance dashboard for mump2p on Ethereum mainnet, announced with the mainnet launch on 2026-10-20. The blog says its figures came from the Hub a week earlier, so the Hub existed before the announcement. Every number on it is Optimum's own, so it is tagged as a claim throughout. Speed comparisons are in [../results/performance.md](../results/performance.md).

## What it is

- Optimum built the Hub as "proof of performance": a dashboard fed by its connected nodes, aggregated across the operators running mump2p. ([launch blog, 2026-10-20](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- The dashboard is at [hub.getoptimum.xyz](https://hub.getoptimum.xyz/). The second launch tweet points to it for the metrics behind the announcement. ([tweet](https://x.com/get_optimum/status/2112559943123349769)) [claimed]
- The homepage FAQ says the current mainnet partner list, stake and live performance figures are published on the Hub. ([homepage](https://www.getoptimum.xyz/)) [claimed]

## Method, as the blog states it

- The Hub shows a snapshot of mump2p acceleration over recent blocks and uses Xatu sentry nodes to measure libp2p performance over those same blocks. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- So the baseline is libp2p as seen by Xatu sentries, and the mump2p side comes from Optimum's connected nodes. The post does not say how sentry and gateway timestamps are aligned. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog figures: 50,292 slots, mump2p ahead by 335 ms, "3.3x faster", taken from the Hub one week before publishing. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Blog says mump2p accelerates 85-90% of blocks by 2.5-3.5x. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- One operator case study: wrong head votes down 51% over 1 week, before versus after adopting mump2p. The operator is not named. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]

## The three public endpoints

All under `https://console.getoptimum.xyz/api/public/`. No login was needed when fetched on 2026-10-21. Field meanings below are what the JSON shows; the blog does not document the schema.

- `network-performance`: `network` mainnet, `window` (start, end, hours, slots measured), `observers` (gateway and Xatu sentry counts), `headline` (spread factor, lead in ms with a confidence interval, share of slots accelerated), `spread` and `arrival` (ms for mump2p and libp2p, statistic not stated, and slots compared), `percentile_lead` (lead in ms at p50 to p95) and `distribution` (10 ms buckets, counts per side). ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- `fleet-stake`: `unit` eth, a daily `series` of `eth` values with a `carried` flag. One day (2026-09-14) is marked carried, which presumably means a copied-forward value; the JSON does not say. ([API](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- `propagation-status`: whether propagation is `on` for mainnet, since when, and when it was last checked. ([API](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- The JSON never defines "spread", "arrival" or what "stake" counts (for example whether it is validator balance or effective balance). Treat those names as unexplained.

## Snapshot of live values (fetched 2026-10-21T13:50Z; values change)

- network-performance generated 2026-10-21T13:50:43Z; window 2026-10-20T06:00:33Z to 2026-10-21T13:00:00Z, 31 hours, 9,281 slots measured. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Observers: 300 gateways and 155 Xatu sentries. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Headline: spread factor 3.21, lead 262 ms (CI 8.5 ms), 87.9% of slots accelerated. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Spread: mump2p 133.7 ms vs libp2p 429.3 ms over 9,279 compared slots. Arrival: 1,987 ms vs 2,249.4 ms. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- Lead by percentile: p50 49 ms, p75 102 ms, p80 112 ms, p95 262 ms. ([API](https://console.getoptimum.xyz/api/public/network-performance)) [claimed]
- propagation-status: mainnet "on", since 2026-10-20T05:45:32Z, checked 2026-10-21T13:45:56Z. ([API](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- fleet-stake: 119 daily points from 2026-06-25 to 2026-10-21. The last value is 1,419,082 ETH; 2026-10-19 was 1,401,158 and 2026-10-20 was 1,419,036. ([API](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- The same series shows 6,720 ETH on 2026-06-25, 1,228,316 on 2026-09-01 and 1,315,896 on 2026-09-05. Large stake was therefore recorded long before the 2026-10-20 public opening; the series does not say why. ([API](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- No dollar value is in the JSON; any dollar figure depends on an ETH price that the sources do not state.
- The Hub front-end script lists operator names (for example Blockdaemon, Everstake, Kiln, ether.fi, P2P.org). Its status is unclear, so this is only "the Hub's source lists these names", not proof of participation. ([Hub validators.js](https://hub.getoptimum.xyz/dashboard/services/validators.js)) [claimed]

## Not independently verified

- Everything on the Hub: no third party has audited the sentry selection, slot filtering, timestamp alignment or the definition of "spread".
- Whether the blog's 335 ms and the API's 262 ms lead are the same measure. The API's arrival gap is 262 ms and its spread gap is about 296 ms.
- Stake and operator counts (see Disputed).
- The 51% wrong-head-vote result: one unnamed operator, no control group.

## Disputed

- **Speed:** blog 3.3x and 335 ms over 50,292 slots (data a week before publishing) vs API 3.21 and 262 ms lead over 31 hours and 9,281 slots (2026-10-21). Different windows, so some drift is expected; the blog does not define its measure.
- **Stake:** tweet and blog title "$3.4B"; blog body "over $3.7B in Total Value Boosted"; homepage "$3.4b"; API ends at 1,419,082 ETH on 2026-10-21 with no price. ([tweet](https://x.com/get_optimum/status/2112559939126206552), [launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet), [homepage](https://www.getoptimum.xyz/), [API](https://console.getoptimum.xyz/api/public/fleet-stake))
- **Operators:** blog says 16 leading node operators; homepage says "20 Mainnet partners & counting". Not reconciled. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet), [homepage](https://www.getoptimum.xyz/))
- **Launch date vs data:** the announcement tweet is 2026-10-20T15:01Z. The status `since` time is 2026-10-20T05:45Z, hours earlier on the same day. The stake series shows 144,847 ETH on 2026-06-29 and passes 1.2M ETH on 2026-08-31, so stake was recorded long before the announcement; the JSON does not say why. ([propagation-status API](https://console.getoptimum.xyz/api/public/propagation-status), [fleet-stake API](https://console.getoptimum.xyz/api/public/fleet-stake), [tweet](https://x.com/get_optimum/status/2112559939126206552))
- **DefiLlama dashboard:** DefiLlama says it launched an Investor Relations dashboard with Optimum showing Total Value Boosted (1.4M ETH, $3.4B) and Optimum block speed against a benchmark. The page investors.defillama.com/optimum returned HTTP 403 on 2026-10-21, so it was not read and its source (Hub or other) is unknown. ([@DefiLlama](https://x.com/DefiLlama/status/2112561379651514602)) [third-party]
- **Operator and press speed figures vs Hub:** Nodemonster about 5x, Validation Cloud 2.2x versus libp2p, Kent Lin 2.5-3.5x, Hub API 3.21 and blog 3.3x; methods unstated or different. See [../results/performance.md](../results/performance.md). ([Nodemonste](https://x.com/Nodemonste/status/2112663008015163608), [ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714), [@kentlinyy](https://x.com/kentlinyy/status/2112563195395399866)) [third-party]
- **Acceleration scope:** Optimum says global acceleration was active across Ethereum mainnet during the StereumLabs test window, and plans registered-operator-only acceleration after October 26. ([Lido forum post 11](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/11)) [claimed]
  - Editorial note (not from the post): if network-wide acceleration was active at other times, the Hub's libp2p baseline might be affected; the sources do not say.

See also: [console-and-signal.md](console-and-signal.md), [accelerate.md](accelerate.md)
