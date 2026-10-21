---
title: Flexnodes and the Latency Marketplace
last_verified: 2026-10-21
status: claimed, forward-looking, plans not final
---

# Flexnodes

- The docs define a flexnode as an operator-run node that takes part in Optimum's coded gossip and serves memory requests. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro)) [confirmed]
- Optimum describes Flexnodes as a global network of nodes that speed up its data propagation, with storage products planned later. ([flexnodes blog, 2026-01-20](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- The product page calls the network a global mesh of Flexnodes using RLNC to move blockchain data faster. ([product page](https://www.getoptimum.xyz/product)) [claimed]
- Any internet-connected device can run Flexnode software, according to the blog. ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]

## What a Flexnode does, per Optimum's videos

- A Flexnode is a node that sends coded equations to receivers such as validators. It may or may not be a validator itself. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- In the topology Flexnodes are intermediate relays between the proposer and a receiver. They regenerate new coded equations on the path, and the receiver connects to several of them. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0), [Exploring Network Topologies: Optimum Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- The receiver does not choose which equations it gets. It takes whatever arrives and chooses which Flexnodes to connect to. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- As of the January 2026 video, Flexnodes run mump2p for propagation. DeRAM and other services come later, and operators will pick which services to offer. ([Flexnodes: a global network of data accelerators, 2026-01-20](https://www.youtube.com/watch?v=DguSwGFvftc)) [claimed]
- Optimum says it does not plan to use slashing for Flexnodes. A Flexnode that goes offline simply earns nothing, while the coded mesh keeps working without it. ([Exploring Network Topologies: Flexnodes and slashing, 2026-02-24](https://www.youtube.com/watch?v=3BIGj-vso2I)) [claimed]
- A passing remark in Flexnodes Explained says deliberate misbehavior would be punished, but no mechanism for that is described. This sits uneasily with the no-slashing plan above. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]
- Resource needs are described as light: a laptop, with a smartphone as a goal. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]

## Latency Marketplace (planned)

- Running a Flexnode would be rewarded through a "Latency Marketplace". ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Validators would pay for the coded equations they need, and operators would be paid for supplying them. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- The first operators would likely be Optimum's existing validator partners. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [claimed]
- Optimum says nothing here is final yet. ([same](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators)) [confirmed]
- In the topology videos the receiver pays each Flexnode that supplies equations. This is described as the plan and not yet running. ([Exploring Network Topologies: Flexnodes, 2026-02-12](https://www.youtube.com/watch?v=RXHBf7SRygI)) [claimed]
- Whether a sustainable marketplace works is described as an open question to be tested. ([Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0)) [claimed]

## Launch post usage (2026-10-20)

- The mainnet post calls the Optimum Network "a global mesh of all the nodes running our chain specific network protocols" and says "We refer to these as Flexnodes". ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- It says Flexnodes perform RLNC sharding, encoding and decoding on block data, forward shards swiftly and create new shards, and that a larger, more geographically diverse mesh speeds delivery. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- The post does not mention the Latency Marketplace, payment, or storage products. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]
- Layering in the post: mump2p is built on RLNC, and the Optimum Network (Flexnodes) sits above it. The two services are on [../products/console-and-signal.md](../products/console-and-signal.md). ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet)) [claimed]

## Disputed

- **Who counts as a Flexnode.** The blog defines Flexnodes as all nodes running Optimum's network protocols in the mesh, which reads as including validator-side mump2p nodes. The earlier video lines describe Flexnodes as separate intermediate relays, operator-run and possibly not validators, paid via a planned marketplace. The post does not say whether the 16 or 20 launch operators run Flexnodes in that sense. ([blog](https://www.getoptimum.xyz/blog/3-4b-total-value-boosted-mump2p-is-live-on-ethereum-mainnet); [Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0))
- **Date of the Flexnodes blog post.** The older line above dates it 2026-01-20. The post's own page metadata says published 2026-04-04, the blog listing shows April 4, 2026, and the page text also contains "January 20, 2026". The YouTube video of the same title is dated 2026-01-20, so January is probably the video date, but no source says so. ([flexnodes blog](https://www.getoptimum.xyz/blog/flexnodes-a-global-network-of-data-accelerators); [video](https://www.youtube.com/watch?v=DguSwGFvftc))
- **Memory requests.** The docs intro says a flexnode serves memory requests. The February 2026 Flexnodes video says data at rest (updatable memory, DeRAM) is still to be added and that today Flexnodes only do propagation. ([docs intro](https://docs.getoptimum.xyz/docs/learn/overview/intro); [Flexnodes Explained, 2026-02-10](https://www.youtube.com/watch?v=mCCcJcAzXY0))
