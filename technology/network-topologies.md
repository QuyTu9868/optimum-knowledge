---
title: How data reaches many nodes
last_verified: 2026-10-18
status: claimed, Optimum's own explanation, models not measurements
---

# How data reaches many nodes

These are Optimum's explanations from its Network Topology video series and its transaction lifecycle video. They are teaching models, not measurements.

## Journey of a transaction

- A transaction starts on a home device and crosses Wi-Fi, a neighborhood access point and shared fiber, passing many switches and routers. A switch is the machine that links inputs to outputs, and routing is the software that decides what it does with each packet. ([The real transaction lifecycle, 2025-10-22](https://www.youtube.com/watch?v=K_TYCGxfhr0)) [claimed]
- Transactions reach a block builder and the builder assembles a block from them. The block goes to a proposer, who must send it to many validators and gather enough agreement. ([The real transaction lifecycle, 2025-10-22](https://www.youtube.com/watch?v=K_TYCGxfhr0)) [claimed]
- Direct lines from every proposer to every validator are infeasible: about 1,000 validators would need roughly a million dedicated lines. Real systems run over a shared switched network, so a truly dedicated link does not exist. ([The real transaction lifecycle, 2025-10-22](https://www.youtube.com/watch?v=K_TYCGxfhr0)) [claimed]

## Ways to reach many nodes

- **One connection per receiver (star):** the sender reaches every receiver in one hop, but all connections share the sender's outgoing link, so with n receivers each gets about 1/n of the sender's capacity. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- **Daisy chain:** each node relays to the next, so every link carries the full rate and the ideal throughput does not shrink as nodes are added. With a code applied end to end across the chain, throughput falls like (1 - epsilon) to the power n, heading toward zero for long chains. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- **Multicast tree:** one copy travels along each shared link, which fixes the duplication of one connection per receiver. Finding a good tree in a rich mesh is NP hard. ([Exploring Network Topologies: Tree Multicast, 2026-01-22](https://www.youtube.com/watch?v=XdqVpE5qUOo)) [claimed]
- **Gossip mesh:** uncoded gossip fights loss by limiting the number of hops, and the speaker approximates its throughput decay as about 1 - n times epsilon. Ethereum's network is described as closer to a daisy chain than a star, but as a mesh. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- **Coded mesh:** every existing connection can carry equations, so a receiver is not tied to one path. Re-encoding at every relay without decoding keeps throughput at the one-link optimum however many nodes the chain has, at the cost of more hops and some extra delay. ([Network topology series, 2026-01-14](https://www.youtube.com/watch?v=KRb_eRSRBo4)) [claimed]
- Nodes can decide how many equations to send using only their neighbors, with no knowledge of the global topology, and run in polynomial time. ([Exploring Network Topologies: RLNC, 2026-01-30](https://www.youtube.com/watch?v=LPO9iEJPYD4)) [claimed]

## Why resends hurt

- Over one route through a mesh, TCP recovers loss by acknowledgements and resending, and the resends repeat hops that had already succeeded. Throughput falls to (1 - epsilon) per hop compounded, whereas coding on the same route is limited only by the weakest hop. ([Exploring Network Topologies: Point to Point TCP, 2026-01-15](https://www.youtube.com/watch?v=7QBi4cD1sX8)) [claimed]
- TCP/IP reaches many receivers by opening a separate connection to each, so the sender's first link carries the same data once per receiver. ([Exploring Network Topologies: Tree Multicast, 2026-01-22](https://www.youtube.com/watch?v=XdqVpE5qUOo)) [claimed]

See also [rlnc.md](rlnc.md) and [flexnodes.md](flexnodes.md).
