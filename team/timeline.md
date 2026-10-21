---
title: Timeline
last_verified: 2026-10-21
status: mainnet launch announced by Optimum on 2026-10-20, independent verification missing
---

# Timeline

| When | What | Source | Tag |
|---|---|---|---|
| 2002-2006 | Core RLNC papers published | [research-history.md](research-history.md) | [confirmed] |
| 2024 | Optimum founded | [team page](https://www.getoptimum.xyz/team) | [claimed] |
| 2025 | Tests on Ethereum's Hoodi testnet | [homepage](https://www.getoptimum.xyz/) | [claimed] |
| 2025-04-15 | Public launch, $11M seed led by 1kx, private testnet live | [launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3) | [confirmed] |
| 2025-09-23 | Blockworks reports Hoodi tests, and Everstake's estimate of moving to mainnet within about three months | [Blockworks](https://blockworks.com/news/ethereum-networking-bottleneck) | [third-party] |
| 2026-06-25 | optimum-keysync v1.0.0, v1.1.0 and v1.1.1 released | [keysync releases](https://github.com/getoptimum/optimum-keysync/releases) | [confirmed] |
| 2026-06-25 | Hub fleet-stake series starts at 6,720 ETH; it passes 1.2M ETH on 2026-08-31 | [Hub fleet-stake data](https://console.getoptimum.xyz/api/public/fleet-stake) | [claimed] |
| 2026-07 | ProbeLab audit phase 2 of the Gateway | [ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/) | [third-party] |
| 2026-07-20 | Gateway source made public (initial snapshot, v1.1.0) | [GitHub](https://github.com/getoptimum/optimum-gateway) | [confirmed] |
| 2026-07-30 | Médard presents mump2p at the Flashbots MEV-SBC workshop | [@MurielMedard post, 2026-07-31](https://x.com/MurielMedard/status/2083306781821038829) | [claimed] |
| 2026-08 | Mainnet rollout post: 40+ validators, access permissioned by API key, free for validators | [blog](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation) | [claimed] |
| 2026 | "Optimum Mainnet" listed as coming soon (superseded by 2026-10-21, see next row) | [team page](https://www.getoptimum.xyz/team) | [claimed] |
| 2026-08-04 | Kent Lin says Optimum is about to go live on Ethereum mainnet with 40+ operators lined up | [@kentlinyy post](https://x.com/kentlinyy/status/2084655348456321157) | [claimed] |
| 2026-08-05 | ADR-0011 (consumer block stream) dated | [ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md) | [confirmed] |
| 2026-08-10 | Lido PERCH post asks node operators to run and test mump2p on mainnet | [Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [confirmed] |
| 2026-08-18 | ADR-0012 (slot-based block acceleration) dated | [ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md) | [confirmed] |
| 2026-08-18 | ProbeLab audit report published | [ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/) | [third-party] |
| 2026-08-20 | Optimum announces it joined the Ethereum Korea Consortium | [@get_optimum post](https://x.com/get_optimum/status/2090239160208764986) | [claimed] |
| 2026-08-21 | Médard presents at the Nanyang Blockchain Conference, Singapore | [@get_optimum, 2026-08-17](https://x.com/get_optimum/status/2089392492626280941); [@MurielMedard, 2026-08-26](https://x.com/MurielMedard/status/2092639088943956374) | [claimed] |
| 2026-09-08 | ADR-0013 (gateway self-enrollment) dated | [ADR-0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md) | [confirmed] |
| 2026-09-09 | Independent operator reports no significant effect on an early build | [Lido forum](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786) | [third-party] |
| 2026-09-14 | Gateway v1.3.1 adds self-enrollment with an org-wide join key | [CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md) | [confirmed] |
| 2026-09-15 | Optimum posts a job ad for a remote trader to help design products for traders | [@get_optimum](https://x.com/get_optimum/status/2099914538753888345) | [claimed] |
| 2026-09-17 | Gateway v1.3.2, now the only supported version | [CHANGELOG](https://github.com/getoptimum/optimum-gateway/blob/main/docs/CHANGELOG.md) | [confirmed] |
| 2026-09-28 | Ethereum Korea lists a staking infra panel with Kent Lin (Optimum), Nodeinfra, DSRV and Lido at Conrad Seoul; occurrence not checked | [@ethereumkoreaio, 2026-09-18](https://x.com/ethereumkoreaio/status/2100848959766024699) | [third-party] |
| 2026-09-29 | CODED event at Korea Blockchain Week, co-hosted with Google Cloud, Four Pillars, LINE NEXT and Auros | [@get_optimum post, 2026-09-17](https://x.com/get_optimum/status/2100671701965271457) | [claimed] |
| 2026-10-13 | Lido PERCH forum update: Hoodi window "wrapping up", fleet summary to come; poster affiliation not stated | [Lido forum, post 12](https://research.lido.fi/t/perch-request-for-node-operators-to-run-and-test-optimum-mump2p/11786/12) | [confirmed] |
| 2026-10-20 | Note: current docs describe an enrollment (org join) key; Signal is switched on per account; the API key path (`ogw_`) is the older route | [docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does); [ADR-0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md); [manual v1.3.2 configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md); [console-and-signal.md](../products/console-and-signal.md) | [confirmed] |
| 2026-10-20 | By this date the official docs describe an operator journey from Console (enrollment key, gateways, Signal, Accelerate) | [docs site](https://docs.getoptimum.xyz/); [console-and-signal.md](../products/console-and-signal.md) | [confirmed] |
| 2026-10-20 | P2P.org, stakefish, Stakely, Twinstake, Validatrium, Nodemonster say they run mump2p on mainnet; Blockdaemon and Finoa (10-21) say launch partner; details in validators.md | [@P2Pvalidator](https://x.com/P2Pvalidator/status/2112574739789267067); [@stakefish](https://x.com/stakefish/status/2112669319553257684); [@Stakely_io](https://x.com/Stakely_io/status/2112582924499308700); [@twinstake_io](https://x.com/twinstake_io/status/2112572641349669235); [@validatrium](https://x.com/validatrium/status/2112568062218015224); [@Nodemonste](https://x.com/Nodemonste/status/2112663008015163608); [@BlockdaemonHQ](https://x.com/BlockdaemonHQ/status/2112567298083147836); [@FinoaConsensus](https://x.com/FinoaConsensus/status/2112896608522346590) | [third-party] |
| 2026-10-20 | Unchained reports 16 operators, about 22,000 validator keys, over 3% of staked ETH (Optimum figures) and an ether.fi mandate for its 12 operators | [Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/) | [third-party] |
| 2026-10-20 | Propagation switched on for mainnet, per the Hub's "since" field (05:45 UTC) | [Hub propagation-status](https://console.getoptimum.xyz/api/public/propagation-status) | [claimed] |
| 2026-10-20 | Launch blog "mump2p is Live on Ethereum Mainnet": Signal free for validator operators, Accelerate for 200+ keys | [launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet) | [claimed] |
| 2026-10-20 | @get_optimum announces the first mainnet deployment (15:01 UTC) and points to the Hub and self-serve onboarding | [@get_optimum post](https://x.com/get_optimum/status/2112559939126206552) | [claimed] |
| 2026-10-20 | Hub fleet-stake series steps from 1,401,158 to 1,419,036 ETH | [Hub fleet-stake data](https://console.getoptimum.xyz/api/public/fleet-stake) | [claimed] |
| 2026-10-21 | Team page now reads "Live: Optimum on Ethereum Mainnet", with 20+ validators and over 1.4 million staked ETH; no "coming soon" text | [team page](https://www.getoptimum.xyz/team) | [claimed] |

Other numbers on the team page: 40 validator partners and over $24B in staked ETH. ([team page](https://www.getoptimum.xyz/team)) [claimed]. See [../ecosystem/validators.md](../ecosystem/validators.md).

## Disputed

**Is Optimum on mainnet?** Sources as of 2026-10-09 (kept as dated evidence):

- Product page: mump2p "Live now". [claimed]
- Kent Lin, 2026-08-04: Optimum is "about to go live on Ethereum mainnet", with 40+ operators lined up. Future tense, before the launch post. [claimed]
- Homepage: mainnet benchmarks are ongoing; headline speed numbers are from Hoodi testnet. [claimed]
- Lido PERCH post: mump2p propagating on Ethereum mainnet. [claimed]
- Independent operator: 36 mainnet full nodes running the Gateway. [third-party]
- Team page: "Optimum Mainnet" still coming soon. Superseded by 2026-10-21, see below. ([team page](https://www.getoptimum.xyz/team)) [claimed]

Added 2026-10-21:

- Launch blog, 2026-10-20: "mump2p is Live on Ethereum Mainnet", called Optimum's first mainnet deployment. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- @get_optimum, 2026-10-20: announces "our first mainnet deployment". ([post](https://x.com/get_optimum/status/2112559939126206552)) [claimed]
- Hub propagation-status endpoint: network "mainnet", propagation "on", since 2026-10-20T05:45:32Z. ([Hub](https://console.getoptimum.xyz/api/public/propagation-status)) [claimed]
- Hub fleet-stake series already shows large stake before the announcement (6,720 ETH on 2026-06-25, over 1.2M ETH from 2026-08-31), so 2026-10-20 reads as the public opening, not the first mainnet use. ([Hub](https://console.getoptimum.xyz/api/public/fleet-stake)) [claimed]
- Team page, 2026-10-21: "Live: Optimum on Ethereum Mainnet", 20+ validators, over 1.4 million staked ETH. ([team page](https://www.getoptimum.xyz/team)) [claimed]

Most likely reading (superseded 2026-10-20, kept for history): the Gateway sidecar already runs on Ethereum mainnet with operators, while Optimum's own network launch is not announced yet. Say "running on Ethereum mainnet via the Gateway sidecar", not "Optimum mainnet is live".

Updated reading (2026-10-21): Optimum itself, in its blog, tweet and Hub, now says mump2p is live on Ethereum mainnet, with free Signal for validator operators. Every source for this is Optimum's own, so tag it as a claim and attribute it ("Optimum says"). Earlier "not announced yet" is superseded from 2026-10-20. Still unverified: the speed multiple, the stake dollar figure and the operator count (see [../unverified.md](../unverified.md), [../results/performance.md](../results/performance.md) and [../ecosystem/validators.md](../ecosystem/validators.md)), plus any independent measurement of the Hub data.

**Testnet wording.** The launch blog says private testnet. The homepage later mentions Hoodi, a public Ethereum testnet. Both can be true at different times.
