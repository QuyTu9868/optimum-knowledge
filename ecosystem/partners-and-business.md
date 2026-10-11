---
title: Partners, research coverage and business model
last_verified: 2026-10-11
status: mixed
---

# Partners and business model

## Obol

- Obol announced it is testing Optimum with a potential distributed validator integration in mind. Nothing is live. ([Obol blog, 2025-10-07](https://blog.obol.org/obol-and-optimum-unite-to-supercharge-ethereum-scaling/)) [third-party]
- The Gateway repo has an opt-in overlay for Obol's CDVN setup (PR #5, 2026-08-03), and the getoptimum org hosts a charon-distributed-validator-node repo. ([GitHub](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Four Pillars report

- Four Pillars published "Optimum: Rethinking the Blockchain Network Layer" by c4lvin on 2026-08-18. It discloses that the research was sponsored and funded by Optimum. ([Four Pillars](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [confirmed]
- FP Validated, a Four Pillars division, is also one of the operators testing in the Lido thread. [confirmed]

## Who pays

- Optimum says access to faster blocks and attestations is and will remain free for validators. ([blog, Aug 2026](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [claimed]
- Four Pillars describes a planned Latency Marketplace: validators pay, Flexnode operators who supply bandwidth get paid. Pricing, settlement and any token role are not disclosed. ([Four Pillars](https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer)) [third-party]
- See also [../technology/flexnodes.md](../technology/flexnodes.md).

## Permissioned or permissionless

- The homepage uses the heading "Permissionless, Zero-Setup Integration". ([homepage](https://www.getoptimum.xyz/)) [claimed]
- The Gateway uses a JWT handshake backed by the Optimum auth service, and the mainnet launch post says access is permissioned by API key. ([v1.1.0 release notes](https://github.com/getoptimum/optimum-gateway/releases), [launch post](https://www.getoptimum.xyz/blog/free-and-faster-ethereum-beacon-block-propagation)) [confirmed]
- Since v1.3.1, operators can self-enroll gateways with one org-wide join key instead of one key per host. See [../code/releases.md](../code/releases.md). [confirmed]
- Four Pillars treats permissionless Flexnodes as a future goal. [third-party]

## Solana

- No Solana deployment found. Optimum has written about Turbine and a possible RLNC extension only. ([blog, 2025-12-09](https://www.getoptimum.xyz/blog/why-solana-needs-faster-data-propagation)) [claimed]

## Disputed

- **Permissionless:** marketing copy says permissionless; the running system requires an Optimum-issued key or join key.

## Not found

- Any link between Optimum and the Ethereum Korea Consortium.
