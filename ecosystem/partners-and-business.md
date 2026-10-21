---
title: Partners, research coverage and business model
last_verified: 2026-10-21
status: mixed
---

# Partners and business model

## Obol

- Obol announced it is testing Optimum with a potential distributed validator integration in mind. Nothing is live (disputed from 2026-10-20, see Disputed). ([Obol blog, 2025-10-07](https://blog.obol.org/obol-and-optimum-unite-to-supercharge-ethereum-scaling/)) [third-party]
- The Gateway repo has an opt-in overlay for Obol's CDVN setup (PR #5, 2026-08-03), and the getoptimum org hosts a charon-distributed-validator-node repo. ([GitHub](https://github.com/getoptimum/optimum-gateway)) [confirmed]

- Day-1 recap on 2026-10-20 by X account EliLaipson (role not stated in the post and no bio was checked; the wording "our partners" and "We launched" suggests it posts for Optimum, so treat it as third-party): thanks "our partners" ether.fi, Lido, Blockdaemon, Everstake, P2P, Meria, Stakely and Obol "and a whole bunch more". It does not say Obol runs mump2p on mainnet. ([@EliLaipson](https://x.com/EliLaipson/status/2112653066432573466)) [third-party]

## Four Pillars report

- Four Pillars published "Optimum: Rethinking the Blockchain Network Layer" by c4lvin on 2026-08-18. It discloses that the research was sponsored and funded by Optimum. ([Four Pillars](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [confirmed]
- FP Validated, a Four Pillars division, is also one of the operators testing in the Lido thread. [third-party]
- FP Validated posted on 2026-08-05 that it joined Optimum as a validator partner. ([@FPvalidated post](https://x.com/FPvalidated/status/2084816155177537577)) [third-party]

## Ethereum Korea

- Optimum announced on 2026-08-20 that it is officially part of the Ethereum Korea Consortium. ([@get_optimum post, 2026-08-20](https://x.com/get_optimum/status/2090239160208764986)) [claimed]
- Ethereum Korea posted the same news in Korean that day. ([@ethereumkoreaio post, 2026-08-20](https://x.com/ethereumkoreaio/status/2090242415776891250)) [third-party]
- Ethereum Korea listed Optimum as General Sponsor of its Ethereum Korea One event, 28-29 September 2026 in Seoul. ([@ethereumkoreaio post, 2026-09-05](https://x.com/ethereumkoreaio/status/2096244461659689119)) [third-party]

## Who pays

- Optimum says access to faster blocks and attestations is and will remain free for validators. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Four Pillars describes a planned Latency Marketplace: validators pay, Flexnode operators who supply bandwidth get paid. Pricing, settlement and any token role are not disclosed. ([Four Pillars](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [third-party]
- Launch post, 2026-10-20: Signal is "free and available to all Ethereum validator operators", and Accelerate is available through self-serve onboarding to entities operating at least 200 validator keys. The post does not say whether Accelerate is free. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Homepage FAQ on 2026-10-21: "Signal is free for Ethereum validators"; it states no price for Accelerate. ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The announcement tweet says Optimum is "opening up free access for all Ethereum node operators". ([@get_optimum, 2026-10-20](https://x.com/get_optimum/status/2112559939126206552)) [claimed]
- Token, Flexnode operator fees and the Latency Marketplace are not mentioned in the launch post or homepage; the lines above are unchanged. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- See also [../technology/flexnodes.md](../technology/flexnodes.md).

## Permissioned or permissionless

- The homepage uses the heading "Permissionless, Zero-Setup Integration". ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The Gateway uses a JWT handshake backed by the Optimum auth service, and the mainnet launch post says access is permissioned by API key. ([v1.1.0 release notes](https://github.com/getoptimum/optimum-gateway/releases), [launch post](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [confirmed]
- Since v1.3.1, operators can self-enroll gateways with one org-wide join key instead of one key per host. See [../code/releases.md](../code/releases.md). [confirmed]
- Four Pillars treats permissionless Flexnodes as a future goal. [third-party]
- Launch post, 2026-10-20: Ethereum validator operators "can get started" through the Console with self-serve setup, and the post says "any node operator can now onboard themselves". Signal is open to all validator operators; Accelerate is gated by size (200 keys). ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Homepage FAQ: "Signal is open to any Ethereum validator. Accelerate is available to operators running 200 or more validators." The homepage heading still reads "Permissionless, Zero-Setup Integration". ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The Console docs read on 2026-10-20 say Optimum enables Signal and Accelerate per account, see [../products/console-and-signal.md](../products/console-and-signal.md) and [../products/accelerate.md](../products/accelerate.md). ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]

## Launch-day recap and direction (added 2026-10-21)

- The same recap mentions a DefiLlama dashboard, a blocmates livestream with Kent Lin and Muriel Medard, the Optimum Hub, and coverage by The Defiant, Unchained and Laura Shin. ([@EliLaipson](https://x.com/EliLaipson/status/2112653066432573466)) [third-party]
- Unchained, 2026-10-20, reports ether.fi now requires all 12 of its node operators to run mump2p; see [validators.md](validators.md). ([Unchained](https://unchainedcrypto.com/ether-fi-mandates-optimums-mump2p-for-all-its-node-operators/)) [third-party]
- Optimum posted on 2026-09-15 that it is hiring a fully remote trader with a crypto trading, quant or market-making background, to find where latency matters and design products for traders. ([@get_optimum](https://x.com/get_optimum/status/2099914538753888345)) [claimed]
- Muriel Medard repeated it the same day, saying Optimum has built an "ultra-low latency data acceleration network" and wants to productize it for traders. This is a hiring signal and a stated direction, not a shipped product. ([@MurielMedard](https://x.com/MurielMedard/status/2099935717728436606)) [claimed]

## Solana

- No Solana deployment found. Optimum has written about Turbine and a possible RLNC extension only. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Events

- Optimum hosted its CODED event on 2026-09-29 during Korea Blockchain Week, co-hosted with Google Cloud, Four Pillars, LINE NEXT and Auros. ([@get_optimum post, 2026-09-17](https://x.com/get_optimum/status/2100671701965271457); [event page](https://luma.com/bkffotv7), which gives the venue as Google Startup Campus in Seoul, 15:00 to 20:00) [claimed]
- Four Pillars also announced CODED@KBW, saying its validator brand FP Validated hosts it with Google Cloud, LINE NEXT, Optimum and Auros. ([@FourPillarsFP post, 2026-09-17](https://x.com/FourPillarsFP/status/2100470989926654170)) FP Validated's own post of the same day repeats the host list and gives the venue as Google for Startups Campus in Seoul. ([@FPvalidated post, 2026-09-17](https://x.com/FPvalidated/status/2100462173436965321)) [third-party]
- P2P.org posted that its Korea representative joined an institutions panel at CODED@KBW with Muriel Medard of Optimum. The event page lists P2P, Four Pillars, Lido, Auros and Optimum on that panel (Panel #2). ([@P2Pvalidator post, 2026-10-14](https://x.com/P2Pvalidator/status/2110323311473504382); [event page](https://luma.com/bkffotv7)) [third-party]
- Ethereum Korea listed a panel "Staking Infra: Custody, Yield, and Compliance for ETH" on 2026-09-28 at Conrad Seoul, with Kent Lin named as COO of Optimum alongside speakers from Nodeinfra, DSRV and Lido. ([@ethereumkoreaio post, 2026-09-18](https://x.com/ethereumkoreaio/status/2100848959766024699)) [third-party]
- Optimum said Kent Lin would speak on that panel on 9/28, that its CODED event is on 9/29, and that the team attends DAS Asia on 10/7. Whether the panel took place as listed was not checked. ([@get_optimum post, 2026-09-22](https://x.com/get_optimum/status/2102361934700138960)) [claimed]
- Optimum said it co-hosted an afternoon on agentic trading with AMBR at AMBR's Singapore offices on 2026-10-06. ([@get_optimum post, 2026-10-02](https://x.com/get_optimum/status/2106167385522880702); [recap, 2026-10-07](https://x.com/get_optimum/status/2107874916330877387)) [claimed]
- AMBR listed a session on agentic trading, AI agents and financial infrastructure with Optimum on 6 Oct during Token2049 Singapore week. The post gives no venue and does not call Optimum a co-host. ([@ambr_io post, 2026-09-29](https://x.com/ambr_io/status/2104862584650518757)) [third-party]

## Disputed

- **Obol (2026-10-20):** the Obol blog of 2025-10-07 says Obol is testing and nothing is live, and the line above is kept. The day-1 recap thanks Obol among "our partners" at the mainnet launch without saying what Obol runs, and the Hub's validators.js lists Obol; no Obol post about mainnet was found. Partner status and live status are not the same claim. ([Obol blog](https://blog.obol.org/obol-and-optimum-unite-to-supercharge-ethereum-scaling/); [@EliLaipson](https://x.com/EliLaipson/status/2112653066432573466)) [third-party]
- **Permissionless:** marketing copy says permissionless; the running system requires an Optimum-issued key or join key.
- **Open to all vs enabled per account (after launch):** the launch post and homepage FAQ say Signal is open to any Ethereum validator operator with self-serve onboarding, while the Console docs read on 2026-10-20 say Optimum switches Signal on per account. The docs repo has no commit after 2026-10-20 13:04 UTC, before the launch tweet. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/); [docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [claimed], [confirmed]
- **Free for all or only Signal:** the tweet says "free access for all Ethereum node operators" and the blog intro says free for any validator to run, while the blog onboarding section and homepage FAQ state a price only for Signal; Accelerate is gated at 200 keys and unpriced. ([tweet](https://x.com/get_optimum/status/2112559939126206552); [blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- **Accelerate eligibility wording:** blog says "entities operating at least 200 validator keys", homepage FAQ says "operators running 200 or more validators", docs say 200 active mainnet validators and also allow individual accounts. See [../products/accelerate.md](../products/accelerate.md). ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [homepage](https://www.getoptimum.xyz/)) [claimed]
- **CODED@KBW panel details:** P2P.org's post says its Head of Korea spoke, a Four Pillars moderator led the panel and Nethermind was on it. The event page names P2P's speaker as "Justin, APAC BD", names no moderator and lists Nethermind's speaker without a panel. ([@P2Pvalidator post](https://x.com/P2Pvalidator/status/2110323311473504382); [event page](https://luma.com/bkffotv7))
