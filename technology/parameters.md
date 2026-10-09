---
title: Documented configuration defaults
last_verified: 2026-10-09
status: confirmed, with internal inconsistencies on the docs page
---

# Parameters

All values from the docs parameters page: https://docs.getoptimum.xyz/docs/guides/03-parameters [confirmed]

Defaults change between versions. Check the page before relying on a value.

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

## Disputed

Values that differ between sections of the same docs page:

- OPTIMUM_MESH_MIN: 3 in the parameter table, 4 in Quick Start and the Defaults Reference. The page does not say which wins.
- API port: 9090 vs 8081.
- Log level: debug vs production.
- Identity directory: `/identity` vs `/tmp`.
