---
title: Security, pollution attacks and audits
last_verified: 2026-10-20
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

## Not shown to be covered by the audit

The audit phase was July 2026. These surfaces are documented later or in places the sources do not tie to the audit; this page does not claim the audit covers them.

- Gateway self-enrolment with a reusable org join key and a locally generated keypair (ADR-0013, 2026-09-08). ([ADR-0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- The consumer block stream: bearer stream tokens, and the gateway does not terminate TLS, so public exposure needs a TLS proxy (ADR-0011, 2026-08-05). See [../products/block-stream.md](../products/block-stream.md). ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Operator API key (`ovi_live_*`, `KEYSYNC_API_KEY`) for keysync. See [../products/keysync.md](../products/keysync.md). ([optimum-keysync README](https://github.com/getoptimum/optimum-keysync)) [confirmed]
- Remote push of gateway logs to Optimum's Loki and metrics to its Mimir, when enabled. See [../products/run-the-gateway.md](../products/run-the-gateway.md). ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Hermes-role block withholding (ADR-0012). See [gateway-design.md](gateway-design.md). ([ADR-0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]

See also [sidecar-gateway.md](sidecar-gateway.md).

## Quantum security opinion

- Médard argues in a CoinDesk opinion column that RLNC could support quantum-safe data storage, because encrypting only a fraction of the coded pieces (she gives one in ten as an example) would protect the whole dataset. It is her opinion, and the column cites no independent test. ([CoinDesk, 2026-09-13](https://www.coindesk.com/opinion/2026/09/13/quantum-proof-blockchain-why-math-not-machines-holds-the-key)) [claimed]
