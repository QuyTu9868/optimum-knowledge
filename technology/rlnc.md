---
title: RLNC (Random Linear Network Coding)
last_verified: 2026-10-14
status: confirmed for mechanism, claimed for advantages
---

# RLNC

## One-line version

Instead of forwarding copies of a message, each node sends random mixes of the pieces. A receiver needs enough independent mixes, not specific pieces.

## Mechanism

- mump2p splits each message into coded shards rather than sending the whole message. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Each node sends a small, linearly combined fragment of the original data instead of a full copy. ([gossip problem blog, 2025-08-20](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- The combinations use random coefficients, with no fixed or deterministic structure. ([battle of the codes, 2025-04-30](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- A node needs only k linearly independent shards to rebuild the original message. Which shards does not matter. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Optimum says each coded packet keeps carrying new information until the receiver can decode. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [claimed]
- Docs say RLNC lowers redundancy and tolerates packet loss better. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [claimed]

## Recoding at relay nodes

This is the property Optimum leans on most.

- Relays can mix the coded packets they already hold into new coded packets without decoding first. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- Any node that receives a shard can create a new coded shard right away. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- A node can start forwarding shards before the full block is rebuilt. ([implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed]
- Optimum argues relays can help generate missing coded packets at every hop. ([battle of the codes](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- With recoding, a receiver's losses reflect only the last hop, not losses piled up across all hops. ([battle of the codes pt II, 2025-05-16](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]

## RLNC vs Reed-Solomon vs fountain codes

- Reed-Solomon is an MDS code: any k of n shards decode the original. ([battle of the codes](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Fountain codes are rateless: they can generate an unlimited stream of encoded packets. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Optimum argues that throughput of block and fountain codes drops as the number of hops grows, while RLNC avoids this because relays can recode. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- The same post calls fixed codes "a degenerate, needlessly constrained version of a random code". Authors: Kishori Konwar, Muriel Médard, Nicolas Nicolaou. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]

### How Optimum describes other chains

These are Optimum's descriptions, not independent analysis.

- Solana's Turbine uses Reed-Solomon at rate 1/2: any 32 of 64 shreds recover the data. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Turbine assumes a tree depth of two to three. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Monad's RaptorCast targets propagation within 2x the worst-case one-way latency. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- The speedup in Part II is shown with one simple illustrative example, not a measured benchmark. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [confirmed]

## Simulator

- Optimum links an interactive network simulator that compares RLNC with other ways of delivering data. The page says it is illustrative, not measured network performance. The domain is gmum.cc, not getoptimum.xyz. ([simulator](https://gmum.cc/simulation-mesh/); linked by [@get_optimum, 2026-07-29](https://x.com/get_optimum/status/2082514252737474686)) [claimed]

## Academic roots

See [../team/research-history.md](../team/research-history.md).
