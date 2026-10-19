---
title: Documented configuration defaults
last_verified: 2026-10-18
status: confirmed, with internal inconsistencies on the docs page
---

# Parameters

All values from the docs parameters page: https://docs.getoptimum.xyz/docs/guides/03-parameters (page returned 404 on 2026-10-18) [claimed]

Defaults change between versions. Check the page before relying on a value.

Check on 2026-10-18: the parameters page above returned HTTP 404, so the values below could not be re-verified. The docs p2p page names similar settings: ShredFactor (base fragments per message), PublisherShardMultiplier (coded shards created at publish time are ShredFactor times this), ForwardShardThreshold (a relay recodes and forwards once the shard count exceeds a threshold, which the docs write both as ForwardShardThreshold and as ShredFactor times ForwardShardThreshold) and MeshDegreeTarget, MeshDegreeMin and MeshDegreeMax. The docs do not say which environment variable maps to which name, so any mapping to the table below is an inference. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]

## RLNC mode (mump2p)

| Parameter | Default | Meaning (paraphrased) |
|---|---|---|
| OPTIMUM_MESH_TARGET | 6 | Desired number of peers in the mesh |
| OPTIMUM_MESH_MIN | 3 or 4 | Minimum peers before adding more. See Disputed |
| OPTIMUM_MESH_MAX | 12 | Max peers before pruning |
| OPTIMUM_SHARD_FACTOR | 4 | Shards per message |
| OPTIMUM_SHARD_MULT | 1.5 | Redundancy multiplier, extra shards |
| OPTIMUM_THRESHOLD | 0.75 | Fraction of shards needed to forward or decode (disputed, see below) |
| OPTIMUM_PORT | 7070 | TCP port for RLNC gossip |
| Max message size | 1048576 bytes (1 MB) | Max full payload, same in both modes |

## GossipSub mode

| Parameter | Default |
|---|---|
| GOSSIPSUB_PORT | 6060 |
| Mesh target / min / max | 6 / 4 / 12 |

## Proxy and sidecar

| Parameter | Default | Meaning |
|---|---|---|
| SIDECAR_PORT | 33212 | gRPC port between proxy and P2P node |
| SUBSCRIBER_THRESHOLD | 0.1 | Share of connected subscribers needed to forward a message |

- An earlier version of the docs described deployment through a proxy or direct gRPC connections to P2P nodes. The cited guides page now shows only "Under Construction", so this could not be re-verified on 2026-10-18. ([guides overview](https://docs.getoptimum.xyz/docs/how-to-guides/overview)) [claimed]

## Gateway ports

- The Gateway listens on TCP 33212 for its consensus-client-facing libp2p host, TCP 33213 for the mump2p mesh (gateway to gateway), and TCP 48123 for the telemetry HTTP server. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Disputed

Values that differ between sections of the same docs page:

- OPTIMUM_MESH_MIN: 3 in the parameter table, 4 in Quick Start and the Defaults Reference. The page does not say which wins.
- API port: 9090 vs 8081.
- Log level: debug vs production.
- Identity directory: `/identity` vs `/tmp`.
- OPTIMUM_THRESHOLD: the parameter table says 0.75 is the fraction of shards needed "to forward or decode". The p2p docs page describes ForwardShardThreshold as the forwarding threshold and says decoding needs k linearly independent shards. Whether OPTIMUM_THRESHOLD is the same setting is assumed, not stated. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [claimed]
- Port 33212: the parameter table lists it as a gRPC port between proxy and P2P node (SIDECAR_PORT). The Gateway README uses 33212 for the consensus-client-facing libp2p host. They may be different products, and neither source says. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
