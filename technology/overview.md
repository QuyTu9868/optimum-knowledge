---
title: What Optimum is
last_verified: 2026-10-21
status: mostly confirmed, product status changes often
---

# What Optimum is

## Self-description

- Optimum describes its goal as building the missing memory layer for Web3. ([launch blog, 2025-04-15](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]
- The same post calls it the first decentralized, high-performance memory infrastructure for any blockchain. ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]
- The docs describe Optimum as the fastest decentralized internet protocol for web3. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [claimed]
- The underlying technique is RLNC (Random Linear Network Coding), which Optimum presents as developed at MIT. ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]. See [rlnc.md](rlnc.md).

## Product names

| Name | What it is | Status (as of last_verified) |
|---|---|---|
| mump2p | RLNC-accelerated pub/sub layer, compatible with libp2p GossipSub | Product page marks it live, used for Ethereum validator block propagation. Optimum announced its first mainnet deployment on 2026-10-20 ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] |
| OptimumP2P / Optimump2p | Older name used in 2025 blog posts for the same pub/sub protocol | Renamed, see note below |
| deRAM / DeRAM | Decentralized RAM layer giving apps real-time read/write access to chain state | Product page marks it "Soon" |
| DeROM | Listed alongside DeRAM as an upcoming RLNC use case | Planned |
| Optimum Gateway | Program run beside a beacon node (validator sidecar), or alone in stream-only mode | See [sidecar-gateway.md](sidecar-gateway.md), [../products/run-the-gateway.md](../products/run-the-gateway.md), [gateway-design.md](gateway-design.md) |
| Console and Signal | Web console where operators enrol gateways and manage keys, and the Signal service it switches on per account. The launch blog says Signal is free for all Ethereum validator operators ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] | See [../products/console-and-signal.md](../products/console-and-signal.md) |
| Accelerate | Console feature that recommends a bid cutoff for the MEV sidecar (mev-boost or Commit-Boost). The launch blog adds it is self-serve for entities with at least 200 validator keys ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] | See [../products/accelerate.md](../products/accelerate.md) |
| Slot-based block acceleration | Gateway mechanism from ADR-0012: bootstrap lists slots to accelerate and Hermes-role gateways pass only listed blocks to their client. The sources do not link it to the Console Accelerate feature | See [gateway-design.md](gateway-design.md) |
| keysync | Tool that syncs validator keys with Optimum | See [../products/keysync.md](../products/keysync.md) |
| Consumer block stream | Opt-in read-only block feed from a gateway (ADR-0011) | See [../products/block-stream.md](../products/block-stream.md) |
| Optimum Hub | Public dashboard at hub.getoptimum.xyz with mainnet propagation, speed and stake figures from Optimum's connected nodes | Announced 2026-10-20 ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed] |
| Flexnodes | Operator-run nodes in the coded gossip network | See [flexnodes.md](flexnodes.md) |

Sources:
- mump2p definition: ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [confirmed]
- mump2p live for Ethereum validators, DeRAM and DeROM upcoming: ([product page](https://www.getoptimum.xyz/product)) [claimed]
- deRAM gives apps real-time read/write access to blockchain state: ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]
- OptimumP2P described as a pub-sub protocol meant to replace older gossip networks with coding-based propagation: ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [claimed]

**Naming note:** 2025 posts say "OptimumP2P". Docs and the product page say "mump2p". The June 2025 post is now titled "Introducing mump2p", which points to a rename. No page states the rename outright. ([implementation blog](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed: wording only]

## ACD or ACID

deRAM is said to guarantee three properties: Atomicity, Consistency, Durability. The launch blog labels this "ACD" in one place and "ACID" in another on the same page. Isolation, the "I" in ACID, is never named. ([launch blog](https://www.getoptimum.xyz/blog/introducing-optimum-building-the-missing-memory-layer-for-web3)) [confirmed: wording]

Press coverage tends to repeat "ACID". If you write about it, the three named properties are the safe version.

## Announced plans

- Optimum said it is preparing to offer its services to the builder market once Ethereum's Glamsterdam upgrade (headline feature ePBS, EIP-7732) goes live. ([@get_optimum post, 2026-09-08](https://x.com/get_optimum/status/2097402261194547656)) [claimed]

## Disputed

- **What is "live".** Product page says mump2p is live now. The team page still lists "Optimum Mainnet" as coming soon. Most likely reading: the Gateway sidecar runs on Ethereum mainnet with operators, while an official Optimum mainnet launch has not been announced. Superseded 2026-10-20/21, kept for history; details in [../team/timeline.md](../team/timeline.md). ([team page](https://www.getoptimum.xyz/team)) [claimed]
- **What is "live", update.** On 2026-10-20 Optimum announced mump2p live on Ethereum mainnet. ([launch blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- **Team page, 2026-10-21.** Now reads "Live: Optimum on Ethereum Mainnet", with 20+ validators and over 1.4 million staked ETH. ([team page](https://www.getoptimum.xyz/team)) [claimed]
- All sources are Optimum's own; speed, stake and operator numbers differ between them, see [../results/performance.md](../results/performance.md) and [../ecosystem/validators.md](../ecosystem/validators.md).
