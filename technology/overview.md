---
title: What Optimum is
last_verified: 2026-10-09
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
| mump2p | RLNC-accelerated pub/sub layer, compatible with libp2p GossipSub | Product page marks it live, used for Ethereum validator block propagation |
| OptimumP2P / Optimump2p | Older name used in 2025 blog posts for the same pub/sub protocol | Renamed, see note below |
| deRAM / DeRAM | Decentralized RAM layer giving apps real-time read/write access to chain state | Product page marks it "Soon" |
| DeROM | Listed alongside DeRAM as an upcoming RLNC use case | Planned |
| Optimum Gateway | The sidecar validators run to use mump2p | See [sidecar-gateway.md](sidecar-gateway.md) |
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

## Disputed

- **What is "live".** Product page says mump2p is live now. The team page still lists "Optimum Mainnet" as coming soon. Most likely reading: the Gateway sidecar runs on Ethereum mainnet with operators, while an official Optimum mainnet launch has not been announced. Details in [../team/timeline.md](../team/timeline.md).
