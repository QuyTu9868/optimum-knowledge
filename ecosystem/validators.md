---
title: Validators and operators
last_verified: 2026-10-21
status: names mostly claimed by Optimum; a few self-reported tests
---

# Validators and operators

Being named by Optimum is not the same as running it. Each operator below is checked separately.

## Named operators

| Operator | What the evidence shows | Source | Tag |
|---|---|---|---|
| Everstake | Tested on Hoodi; COO interviewed | [Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck) | [third-party] |
| Blockdaemon | Self-reported Hoodi trial, better attestation performance. Launch partner on mainnet since 2026-10-20 (superseded, see below) | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| InfStones | Self-reported run on a private testnet, no figures | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| Ebunker | Self-reported run in a testnet environment, network not named | [Lido thread](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| P2P.org | Named and quoted in Optimum's press release; no test data. Own post of 2026-10-20 says it runs it on mainnet (superseded, see below) | [Chainwire, 2025-06-24](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/); [@P2Pvalidator, 2026-10-20](https://x.com/P2Pvalidator/status/2112574739789267067) | [claimed], [third-party] |
| Kiln | Named and COO quoted in the same release; no test data | [Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/) | [claimed] |
| Luganodes | Testimonial on Optimum's site only. Superseded 2026-10-21: its own post says it runs mump2p on mainnet, see below | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| FP Validated | Optimum says it is testing mump2p; FP Validated says it joined as a validator partner. No test data | [@get_optimum, 2026-08-04](https://x.com/get_optimum/status/2084681995741995255); [@FPvalidated, 2026-08-05](https://x.com/FPvalidated/status/2084816155177537577) | [claimed] |
| DSRV | Named by Optimum as a testing partner, a Korean operator it says stakes over 300k ETH. No test data | [@get_optimum, 2026-09-10](https://x.com/get_optimum/status/2098033786915287228) | [claimed] |
| Twinstake | Named as a testing partner. Optimum adds that Twinstake's own MEV APR was about 35% above the Ethereum average over 12 months; that is not a mump2p result and no source is given. Twinstake itself posted that it is testing mump2p alongside its Ethereum infrastructure, with no results yet. Superseded 2026-10-20: it posted that it runs it on mainnet, see below | [@get_optimum, 2026-09-15](https://x.com/get_optimum/status/2099900356671295884); [@twinstake_io, 2026-09-15](https://x.com/twinstake_io/status/2099967006338359471) | [claimed], [third-party] |
| Finoa Consensus Services | Named as a new partner; the post does not say it is testing or running mump2p. Finoa itself posted that it is excited to partner with Optimum, also without mentioning testing. Superseded 2026-10-21: Finoa calls itself a launch partner live on mainnet, see below | [@get_optimum, 2026-08-31](https://x.com/get_optimum/status/2094450916095361404); [@FinoaConsensus, 2026-09-01](https://x.com/FinoaConsensus/status/2094817254609211903) | [claimed], [third-party] |
| Nodemonster | Self-reports several months on testnet, about 150 ms average block propagation, roughly 6x faster than the GossipSub baseline, no method given. Optimum quoted it. Mainnet post of 2026-10-20 below supersedes the testnet-only status | [@Nodemonste post](https://x.com/Nodemonste/status/2095105880807051525); [quoted by @get_optimum, 2026-09-02](https://x.com/get_optimum/status/2095189075892531257) | [third-party] |

Other operators reporting in the Lido thread: HashKey Cloud (Hoodi, about 200 ms lower attestation propagation), Stakely (Hoodi, zero incidents), FP Validated (Hoodi, still measuring). stakefish and SenseiNode only signed up or showed interest (stakefish part superseded 2026-10-20: it posted that it runs mump2p on mainnet, see below). StereumLabs ran the only independent mainnet measurement, see [../results/performance.md](../results/performance.md). [third-party]

No primary post from Everstake, P2P.org, Kiln or Luganodes saying they run it was found. Superseded 2026-10-20 for P2P.org (it posted that it runs it on mainnet) and Everstake (it posted that it is evaluating mainnet results); Luganodes also posted on 2026-10-21 (see below); still no post found from Kiln.

## Mainnet operator posts (added 2026-10-21)

Each bullet is what the operator's own post says; none comes with a method or data from Optimum's Hub. Post text was checked against each operator's own account where a second scan was available (Everstake, Stakely, stakefish, Validation Cloud, Luganodes, P2P.org, Nodemonster, Twinstake, Finoa); the rest were read as reposts.

- P2P.org, 2026-10-20: its account says it is "now running" Optimum on Ethereum mainnet and cites less bandwidth and more rewards captured. ([@P2Pvalidator](https://x.com/P2Pvalidator/status/2112574739789267067)) [third-party]
- stakefish, 2026-10-20: says it is "now running" mump2p on Ethereum mainnet. ([@stakefish](https://x.com/stakefish/status/2112669319553257684)) [third-party]
- Stakely, 2026-10-20: says it is "now running" mump2p on Ethereum mainnet and writes "From testing to mainnet". ([@Stakely_io](https://x.com/Stakely_io/status/2112582924499308700)) [third-party]
- Twinstake, 2026-10-20: says it is running mump2p "across our gateways" on mainnet. ([@twinstake_io](https://x.com/twinstake_io/status/2112572641349669235)) [third-party]
- Validatrium, 2026-10-20: says it is "now running" mump2p in its Ethereum validator infrastructure. ([@validatrium](https://x.com/validatrium/status/2112568062218015224)) [third-party]
- Meria, 2026-10-20: says it is proud to "join" Optimum mainnet as a validator; it does not use the word running. ([@Meria_Finance](https://x.com/Meria_Finance/status/2112565899026976769)) [third-party]
- Luganodes, 2026-10-21: says it is "running mump2p" on Ethereum mainnet. ([@Luganodes](https://x.com/Luganodes/status/2112788160338169916)) [third-party]
- Finoa Consensus Services, 2026-10-21: says it is a launch partner for mump2p, live on mainnet, and that its validators now see blocks and attestations sooner. ([@FinoaConsensus](https://x.com/FinoaConsensus/status/2112896608522346590)) [third-party]
- Blockdaemon, 2026-10-20: says it is a launch partner for Optimum, now live on mainnet, and expects better performance and more rewards. ([@BlockdaemonHQ](https://x.com/BlockdaemonHQ/status/2112567298083147836)) [third-party]
- Nodemonster, 2026-10-20: says its validators run on the Optimum mainnet after testnet, with "84.2%" of blocks arriving faster and about 5x faster propagation on average; no method given. ([@Nodemonste](https://x.com/Nodemonste/status/2112663008015163608)) [third-party]
- Validation Cloud, 2026-10-20: says it saw over 98% of blocks arrive faster and an average speed boost of 2.2 times versus libp2p; no method given. ([@ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714)) [third-party]
- Everstake, 2026-10-20: says it took part in testing and is "now evaluating the results" on mainnet; wording is evaluating, not running in production. ([@everstake_pool](https://x.com/everstake_pool/status/2112577152298148217)) [third-party]
- Everstake, 2026-10-20: a separate post only congratulates Optimum on the mainnet launch. ([@everstake_pool](https://x.com/everstake_pool/status/2112567194953335050)) [third-party]
- Ebunker, 2026-10-21: congratulates Optimum and says it is "part of this milestone" and working alongside the team; it does not say outright that it runs mump2p on mainnet. ([@ebunker_eth](https://x.com/ebunker_eth/status/2112743473975882088)) [third-party]
- ether.fi, 2026-10-20: congratulates Optimum and calls itself a "Proud user"; this is the first ether.fi post found, and it does not mention the node operator requirement. ([@ether_fi](https://x.com/ether_fi/status/2112560807385145596)) [third-party]

## Unchained coverage (added 2026-10-21)

- Unchained, 2026-10-20, reports that Optimum told it that it counts 16 node operators running mump2p on mainnet with roughly 22,000 validator keys and more than 1.4 million ETH (Optimum's figures, not independently checked), which Optimum put at over 3% of staked ETH. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- The article says ether.fi now requires all 12 of its node operators to run mump2p, and quotes ether.fi's Rok Kopp; Optimum says ether.fi had previously left it optional. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- It says operators Optimum named include Blockdaemon, Everstake, P2P.org, Stakefish and Bitcoin Suisse; it does not say where Optimum named them. This is wider than the launch blog's list (see "Partner counts"). ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- It calls the 2.42x speed figure self-reported and says Optimum did not say how it was gathered. The page shows no named author, only "Unchained" and an editor, so it is not a byline by Laura Shin. ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]

## Partner counts

- Homepage: "40" testnet partners and "$24b" ETH stake connected. These are testnet partners, not production validators. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The mainnet launch post says rollout is in progress with 40+ enterprise-grade validators and node operators. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- The June 2025 release said partners held about 15% of Ethereum's total stake, per Rated data. ([Chainwire](https://chainwire.org/2025/06/24/optimum-debuts-optimump2p-testnet-with-support-from-ethereums-largest-node-operators/)) [claimed]

- Launch post, 2026-10-20: "16 leading node operators" are boosting their ETH stake. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- The same post names Blockdaemon and Everstake as "some of the largest Ethereum node operators" among its adopters, plus "all ether.fi validators" and operators "from every major global region". It lists no other names. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- The post says it has worked with some of these partners for over a year. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Team page on 2026-10-21: "Live: Optimum on Ethereum Mainnet" with "20+ validators" and "over 1.4 million staked ETH". ([team page](https://www.getoptimum.xyz/team)) [claimed]
- Homepage on 2026-10-21: "20 Mainnet partners & counting"; the FAQ says the current partner list is on the Hub. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The Hub's validators.js source lists 26 operator names in its roster: Blockdaemon, InfStones, Luganodes, EBunker, P2P.org, ether.fi, Meria, NodeMonster, RockX, Obol, Simply Staking, Gateway.fm, HashKey Cloud, Stakely, ChainUp, Everstake, Kiln, DSRV, Finoa Consensus, FP Validated, Puffer, Nansen, Validation Cloud, Stakefish, Validatrium, Twinstake. The same file also generates thousands of mock synthetic validators, so it is front-end code of unclear status. Treat the names as "the Hub's source lists these", not as proof any operator runs mump2p on mainnet. ([Hub validators.js](https://hub.getoptimum.xyz/dashboard/services/validators.js)) [claimed]
- Of the named operators, only Blockdaemon, Everstake and ether.fi are named as adopters by Optimum's own launch post; for the rest, the earlier rows above remain the evidence. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]

## Lido PERCH

- Posted 2026-08-10 by alan.s, writing as the proposer. It asks Lido Curated Module operators to run the Optimum Gateway next to their beacon node for a one-month evaluation on Hoodi. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [confirmed]
- As of last_verified the thread is open, with no closing summary and no governance decision. [confirmed]
- Reply 12, 2026-10-13, by forum user Chandler_Otterbein (affiliation not stated in the post): the one-month Hoodi measurement window is "wrapping up", a fleet-level Hoodi summary will be posted after the end-of-window review, and next steps for Lido delegated stake on mainnet will be coordinated with Lido after the PERCH report is reviewed. ([Lido forum, post 12](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/12)) [confirmed]
- The same post calls the Hoodi attestation numbers "a directional read" because of missed and orphaned slots, and says separate mainnet testing gave "very positive results", with no data shown. ([Lido forum, post 12](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/12)) [claimed]
- No fleet summary was in the thread when read on 2026-10-21. ([Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786)) [confirmed]

## Disputed

- **Which operators run it on mainnet (2026-10-21):** older lines said no primary post from P2P.org or Everstake and that stakefish only signed up; later posts say P2P.org and stakefish run it, while Everstake says only that it is evaluating. Unchained adds Bitcoin Suisse, which has no post here. All are operator or press statements, none independently measured. ([@P2Pvalidator](https://x.com/P2Pvalidator/status/2112574739789267067); [@stakefish](https://x.com/stakefish/status/2112669319553257684); [@everstake_pool](https://x.com/everstake_pool/status/2112577152298148217); [Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- **Operator speed claims:** Nodemonster says about 5x with 84.2% of blocks faster, Validation Cloud says 2.2x with over 98% faster, Optimum's launch blog says 2.5 - 3.5x. Different operators, no shared method. ([@Nodemonste](https://x.com/Nodemonste/status/2112663008015163608); [@ValidationCloud](https://x.com/ValidationCloud/status/2112605801621995714); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [third-party], [claimed]
- **Stake connected:** $24B (homepage) vs about $30B (Four Pillars citing Optimum) vs about 15% of total stake (2025 release). Different dates, possibly different partner sets.
- **Operator count at launch:** blog "16 leading node operators" vs homepage "20 Mainnet partners & counting" vs team page "20+ validators" and "over 1.4 million staked ETH" vs 26 names in the Hub's validators.js roster vs the earlier "40+" validators and "40" testnet partners. Different dates and definitions (operators, partners, validators) are possible; no source gives the list behind any count. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/); [team page](https://www.getoptimum.xyz/team); [Hub validators.js](https://hub.getoptimum.xyz/dashboard/services/validators.js)) [claimed]
- **"40 validators":** the homepage counts testnet partners; the launch post says 40+ validators in the mainnet rollout. Neither lists them all.
