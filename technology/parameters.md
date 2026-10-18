---
title: Documented configuration defaults
last_verified: 2026-10-18
status: confirmed, with internal inconsistencies on the docs page
---

# Parameters

All values from the docs parameters page: https://docs.getoptimum.xyz/docs/guides/03-parameters [confirmed]

Defaults change between versions. Check the page before relying on a value.

Check on 2026-10-18: the parameters page above returned HTTP 404, so the values below could not be re-verified. The docs p2p page names the same settings differently: ShredFactor (base fragments per message), PublisherShardMultiplier (coded shards created at publish time are ShredFactor times this), ForwardShardThreshold (a relay recodes and forwards once it holds more than ShredFactor times this many shards) and MeshDegreeTarget, MeshDegreeMin and MeshDegreeMax. The docs do not say which environment variable maps to which name, so the table rows are probably the same settings. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]

## RLNC mode (mump2p)

| Parameter | Default | Meaning (paraphrased) |
|---|---|---|
| OPTIMUM_MESH_TARGET | 6 | Desired number of peers in the mesh |
| OPTIMUM_MESH_MIN | 3 or 4 | Minimum peers before adding more. See Disputed |
| OPTIMUM_MESH_MAX | 12 | Max peers before pruning |
| OPTIMUM_SHARD_FACTOR | 4 | Shards per message |
| OPTIMUM_SHARD_MULT | 1.5 | Redundancy multiplier, extra shards |
| OPTIMUM_THRESHOLD | 0.75 | Fraction of shards needed to forward or decode |
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

- Deployment can go through a proxy, or clients can connect straight to P2P nodes over gRPC. ([guides overview](https://docs.getoptimum.xyz/docs/guides/overview)) [confirmed]

## Gateway ports

- The Gateway listens on TCP 33212 for its consensus-client-facing libp2p host, TCP 33213 for the mump2p mesh (gateway to gateway), and TCP 48123 for the telemetry HTTP server. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]

## Disputed

Values that differ between sections of the same docs page:

- OPTIMUM_MESH_MIN: 3 in the parameter table, 4 in Quick Start and the Defaults Reference. The page does not say which wins.
- API port: 9090 vs 8081.
- Log level: debug vs production.
- Identity directory: `/identity` vs `/tmp`.
- OPTIMUM_THRESHOLD: the parameter table says 0.75 is the fraction of shards needed "to forward or decode". The p2p docs page says the threshold only decides when a relay recodes and forwards, and that decoding needs k linearly independent shards. ([docs p2p](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
- Port 33212: the parameter table lists it as a gRPC port between proxy and P2P node (SIDECAR_PORT). The Gateway README uses 33212 for the consensus-client-facing libp2p host. They may be different products, and neither source says. ([Gateway README](https://github.com/getoptimum/optimum-gateway)) [confirmed]
