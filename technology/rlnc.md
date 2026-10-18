---
title: RLNC (Random Linear Network Coding)
last_verified: 2026-10-18
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
- The docs add that a receiver checks every shard for linear independence and discards redundant ones, so a shard is not guaranteed to carry new information. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- The docs say the message is split into k fragments and turned into n coded shards by random linear combinations over a finite field. A receiver decodes with linear algebra (matrix inversion) once it holds k linearly independent shards. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]

## A worked example

These are Médard's teaching examples. The numbers are only for illustration. Real systems compute over a finite field with random coefficients, where independent mixes are likely but not guaranteed, and small hand-picked numbers can fail there.

- Take three pieces x1, x2 and x3. A validator far from the source gets three different mixes, for example 3x1 + 2x2 + x3, x1 + x2 + 5x3 and 11x1 + 2x2 + 13x3. Any three independent mixes are enough for it to solve for x1, x2 and x3, whichever mixes arrive first. ([Médard whiteboard video, 2026-07-01](https://www.youtube.com/watch?v=XGxZxzxAe0g)) [claimed]
- A repeated copy of x1 only protects against losing x1. It does not help if x2 is lost instead. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- The smallest repair example: send x1, x2, x3 and also x1 + x2 + x3. If any one piece is lost, the other three recover it. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- In RLNC every mix has its own coefficients, chosen at random from a large enough set of numbers (a field), so none are fixed ahead of time. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- A node can build a new mix from mixes it already holds, by weighting and adding them, without ever seeing the original data. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]

## Recoding at relay nodes

This is the property Optimum leans on most.

- Relays can mix the coded packets they already hold into new coded packets without decoding first. ([gossip problem blog](https://www.getoptimum.xyz/blog/the-gossip-protocol-problem---why-your-blockchain-transactions-are-slow)) [confirmed]
- A node that holds several independent coded shards can create a new coded shard from them without decoding. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- A node can start forwarding shards before the full block is rebuilt. ([implementation blog, 2025-06-06](https://www.getoptimum.xyz/blog/introducing-optimump2p-implementation-and-benefits)) [confirmed]
- Optimum argues relays can help generate missing coded packets at every hop. ([battle of the codes](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- With recoding, a receiver's losses reflect only the last hop, not losses piled up across all hops. ([battle of the codes pt II, 2025-05-16](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- In mump2p, shards from the publisher are forwarded to mesh peers at once. Shards received from peers are recoded and forwarded after a node holds enough shards. The docs state the threshold as ForwardShardThreshold in one place and as ShredFactor times ForwardShardThreshold in another, so the exact rule is unsettled. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- Optimum's chain example has three nodes in a row and one loss per link. Forward-only relays need 9 transmissions. A middle node that decodes and re-encodes needs 8 transmissions in 8 time slots. A middle node that recodes without decoding needs 8 transmissions in 5 time slots, because both links work in a pipeline. ([RLNC encoding video, 2025-08-18](https://www.youtube.com/watch?v=S0ZtWWUKM_k)) [claimed]
- With end-to-end coding the losses of every hop add up and must be covered in advance. With recoding each hop repairs its own loss, so quality follows the weakest link. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]

## RLNC vs Reed-Solomon vs fountain codes

- Reed-Solomon is an MDS code: any k of n shards decode the original. ([battle of the codes](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Fountain codes are rateless: they can generate an unlimited stream of encoded packets. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [confirmed]
- Optimum argues that throughput of block and fountain codes drops as the number of hops grows, while RLNC avoids this because relays can recode. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- The same post calls fixed codes "a degenerate, needlessly constrained version of a random code". Authors: Kishori Konwar, Muriel Médard, Nicolas Nicolaou. ([same](https://www.getoptimum.xyz/blog/battle-of-the-codes-rlnc-vs-reed-solomon-fountain-codes)) [claimed]
- Reed-Solomon cannot recode: an intermediate node either forwards what it has or decodes back to the original data and encodes again. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]
- Reed-Solomon was designed for a single link with one encoder and one decoder, and it uses a polynomial over a finite field, which allows only certain code lengths and rates. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]
- A fixed-rate code decides its repair in advance: 3 data pieces plus 1 repair is rate 3/4, which wastes the repair when nothing is lost and fails when two pieces are lost. Rateless (fountain) codes keep sending equations until the receiver says it has enough. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- Médard calls Reed-Solomon and Raptor codes constrained special cases of RLNC, and says RLNC can run as a block code or as a rateless code. ([erasure coding video, 2025-08-18](https://www.youtube.com/watch?v=KR6sMbBhizE)) [claimed]
- The speakers describe decoding for erasures as solving the received equations, which they call simple and fast. No timings are given. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]
- According to Optimum's speakers, Solana's Turbine and its planned Alpenglow Rotor use Reed-Solomon, and Monad uses Raptor codes. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo)) [claimed]

### How Optimum describes other chains

These are Optimum's descriptions, not independent analysis.

- Solana's Turbine uses Reed-Solomon at rate 1/2: any 32 of 64 shreds recover the data. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Turbine assumes a tree depth of two to three. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- Monad's RaptorCast targets propagation within 2x the worst-case one-way latency. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [claimed]
- The speedup in Part II is shown with one simple illustrative example, not a measured benchmark. ([pt II](https://www.getoptimum.xyz/blog/battle-of-the-codes-pt-ii-rlnc-speedup)) [confirmed]

## Simulator

- Optimum links an interactive network simulator that compares RLNC with other ways of delivering data. The page says it is illustrative, not measured network performance. The domain is gmum.cc, not getoptimum.xyz. ([simulator](https://gmum.cc/simulation-mesh/); linked by [@get_optimum, 2026-07-29](https://x.com/get_optimum/status/2082514252737474686)) [claimed]
- The simulator runs three modes side by side on the same topology: no coding, Reed-Solomon (64 shards, any 32 decode) and RLNC with recoding. Each simulated node has capped inbound bandwidth and about 3 to 5 peers. Médard says it is not a benchmark and not a live system, only an intuition tool. ([simulation video, 2026-04-28](https://www.youtube.com/watch?v=2dal03NwuOQ)) [claimed]
- In one narrated run the figures were roughly 7 s without coding, 1.75 s with Reed-Solomon and 171 ms for RLNC. These come from auto captions and a single run, so treat them as approximate. ([simulation video, 2026-04-28](https://www.youtube.com/watch?v=2dal03NwuOQ)) [claimed]

## Disputed

- **Last hop or weakest link.** Optimum's blog says that with recoding a receiver's losses reflect only the last hop. The March 2026 video says the overall quality is that of the weakest link on the path. These are stated for different setups and may not conflict, but the sources do not reconcile them. ([RLNC vs Reed-Solomon video, 2026-03-25](https://www.youtube.com/watch?v=M1RCYMWJguo))

## Not yet covered

The sources reviewed do not state the size of the finite field, how much space the coefficients add to each shard, or how long decoding takes.

## Academic roots

See [../team/research-history.md](../team/research-history.md).
