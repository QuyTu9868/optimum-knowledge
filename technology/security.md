---
title: Security, pollution attacks and audits
last_verified: 2026-10-18
status: confirmed
---

# Security

## Pollution attacks

In network coding, a malicious node can send a bad coded packet. Because relays mix packets together, one bad packet can spoil many others. This is called a pollution attack.

- After decoding, nodes check the rebuilt data against the publisher's original signature and hash. Verification is end-to-end, not per shard. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Peers who send invalid shards get their reputation scores lowered, and are eventually cut off from the network. The docs admit it can be hard to pinpoint which shard was bad. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- The research reading list includes papers on countering Byzantine attacks in network-coded P2P systems, for example Kim et al., IEEE JSAC 2010. ([research list](https://docs.getoptimum.xyz/docs/research/gossip/gossip)) [confirmed]

## Inherited from libp2p

- Channels between nodes are encrypted and authenticated with Noise or TLS, and the docs say mump2p uses libp2p's peer discovery and management, which include Sybil and eclipse defenses. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]

## ProbeLab audit of the Optimum Gateway

- ProbeLab published a security audit of the Optimum Gateway on 2026-08-18. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- Phase 2 (July 2026) found 17 issues, none critical: 1 high, 9 medium, 1 low, 6 informational. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- All were fixed in v1.0.2 except F-07 (medium), which was only partly resolved. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]
- The audit says the Gateway does not change validator signing logic, beacon state or attestation duties. ([ProbeLab](https://probelab.io/blog/security-audit-report-optimum-gateway/)) [third-party]

See also [sidecar-gateway.md](sidecar-gateway.md).

## Quantum security opinion

- Médard argues in a CoinDesk opinion column that RLNC could support quantum-safe data storage, because encrypting only a fraction of the coded pieces (she gives one in ten as an example) would protect the whole dataset. It is her opinion, and the column cites no independent test. ([CoinDesk, 2026-09-13](https://www.coindesk.com/opinion/2026/09/13/quantum-proof-blockchain-why-math-not-machines-holds-the-key)) [claimed]
