---
title: Validators and operators
last_verified: 2026-10-14
status: names mostly claimed by Optimum; a few self-reported tests
---

# Validators and operators

Being named by Optimum is not the same as running it. Each operator below is checked separately.

## Named operators

| Operator | What the evidence shows | Source | Tag |
|---|---|---|---|
| Everstake | Tested on Hoodi; COO interviewed | [Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck) | [third-party] |
| Blockdaemon | Self-reported Hoodi trial, better attestation performance | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| InfStones | Self-reported run on a private testnet, no figures | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| Ebunker | Self-reported run in a testnet environment, network not named | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| P2P.org | Named and quoted in Optimum's press release; no test data | [Chainwire, 2025-06-24](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/) | [claimed] |
| Kiln | Named and COO quoted in the same release; no test data | [Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/) | [claimed] |
| Luganodes | Testimonial on Optimum's site only | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| FP Validated | Optimum says it is testing mump2p; FP Validated says it joined as a validator partner. No test data | [@get_optimum, 2026-08-04](https://x.com/get_optimum/status/2084681995741995255); [@FPvalidated, 2026-08-05](https://x.com/FPvalidated/status/2084816155177537577) | [claimed] |
| DSRV | Named by Optimum as a testing partner, a Korean operator it says stakes over 300k ETH. No test data | [@get_optimum, 2026-09-10](https://x.com/get_optimum/status/2098033786915287228) | [claimed] |
| Twinstake | Named as a testing partner. Optimum adds that Twinstake's own MEV APR was about 35% above the Ethereum average over 12 months; that is not a mump2p result and no source is given | [@get_optimum, 2026-09-15](https://x.com/get_optimum/status/2099900356671295884) | [claimed] |
| Finoa Consensus Services | Named as a new partner; the post does not say it is testing or running mump2p | [@get_optimum, 2026-08-31](https://x.com/get_optimum/status/2094450916095361404) | [claimed] |
| Nodemonster | Self-reports several months on testnet, about 150 ms average block propagation, roughly 6x faster than the GossipSub baseline, no method given. Optimum quoted it | [@Nodemonste post](https://x.com/Nodemonste/status/2095105880807051525); [quoted by @get_optimum, 2026-09-02](https://x.com/get_optimum/status/2095189075892531257) | [third-party] |

Other operators reporting in the Lido thread: HashKey Cloud (Hoodi, about 200 ms lower attestation propagation), Stakely (Hoodi, zero incidents), FP Validated (Hoodi, still measuring). stakefish and SenseiNode only signed up or showed interest. StereumLabs ran the only independent mainnet measurement, see [../results/performance.md](../results/performance.md). [third-party]

No primary post from Everstake, P2P.org, Kiln or Luganodes saying they run it was found.

## Partner counts

- Homepage: "40" testnet partners and "$24b" ETH stake connected. These are testnet partners, not production validators. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The mainnet launch post says rollout is in progress with 40+ enterprise-grade validators and node operators. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- The June 2025 release said partners held about 15% of Ethereum's total stake, per Rated data. ([Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/)) [claimed]

## Lido PERCH

- Posted 2026-08-10 by alan.s, writing as the proposer. It asks Lido Curated Module operators to run the Optimum Gateway next to their beacon node for a one-month evaluation on Hoodi. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [confirmed]
- As of last_verified the thread is open, with no closing summary and no governance decision. [confirmed]

## Disputed

- **Stake connected:** $24B (homepage) vs about $30B (Four Pillars citing Optimum) vs about 15% of total stake (2025 release). Different dates, possibly different partner sets.
- **"40 validators":** the homepage counts testnet partners; the launch post says 40+ validators in the mainnet rollout. Neither lists them all.
