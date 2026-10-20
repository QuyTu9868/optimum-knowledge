---
title: Running the Optimum Gateway
last_verified: 2026-10-20
status: operator facts from official docs and gateway manual (v1.3.2); the manual says enrollment is invite-only, the Console docs describe self-service sign-up
---

# Running the Optimum Gateway

The gateway is the program an operator runs beside a beacon node (or alone, in stream-only mode) to join the Optimum mesh; this page lists the run facts from the official docs.

This page describes what the official docs and gateway manual say as of 2026-10-20. The enrollment flow and the product names are covered in [console-and-signal.md](console-and-signal.md), including where the docs, the ADR and the manual use different terms.

Background on what the gateway does is in [../technology/sidecar-gateway.md](../technology/sidecar-gateway.md).

## Requirements

- Needs a host with Docker, placed beside the beacon node; a stream-only gateway can run on any host you control. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Needs a Console account and an enrollment key, which is shown once. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Minimum hardware is 2+ vCPUs, 512MB RAM and 500MB+ disk; 4+ vCPUs recommended. ([gateway manual v1.3.2: quick start](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/01_quick_start.md)) [confirmed]
- Supported consensus clients are Prysm, Lighthouse, Teku, Nimbus and Lodestar. ([gateway manual v1.3.2: index](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/index.md)) [confirmed]
- The gateway manual says access is invite-only: Optimum must onboard an operator before a key can be generated. ([gateway manual v1.3.2: quick start](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/01_quick_start.md)) [confirmed]

## One container and enrollment

- Console's production command is one `docker run` of `docker.io/getoptimum/gateway:latest` with `-config ""`; without that flag the process looks for a config file that is not in the image and exits. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- `OPT_JOIN_KEY` carries the enrollment key; `OPT_GATEWAY_CLUSTER_ID` has no default and the process exits if it is empty. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- The cluster id must be the one Console prints for the key; a different value authenticates and then fails every mesh handshake. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- `OPT_GATEWAY_ID` is only the enrollment label for this host. Unset, it is `dev-gateway` and enrols with no label; after enrollment the runtime id comes from the token. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- One key can cover many gateways, each with its own name; a second gateway enrolling under a used name is refused with HTTP 409 (ADR 0013 also uses 409 for the key cap). ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Do not set `OPT_CHAIN_ID`; the chain comes from the key. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Auth and bootstrap endpoints (`auth.getoptimum.io`, `bootstrap.getoptimum.io`) are built in; override both together only if Optimum gives another environment. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Changing any `-e` means removing and re-creating the container; a plain restart keeps the old environment. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]

## Ports

- `33212/tcp` is what the consensus client dials; published on all interfaces for validator gateways only, not for stream-only. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- `33213/tcp` is the mesh port, published on all interfaces. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- `48123/tcp` serves `/health`, `/metrics` and `/api/v1/self_info`, and is published to `127.0.0.1` only; do not use `--network host`. ([docs: network](https://docs.getoptimum.xyz/signal/network), [docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- Stream-only also publishes WebSocket `9600` and gRPC `9601` to loopback, with consumer auth on by default. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- Outbound access to the auth and bootstrap endpoints and to mesh peers is needed; remote push needs outbound HTTPS (443). ([docs: network](https://docs.getoptimum.xyz/signal/network), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]

## Identity directories

- Mount persistent host directories over `/tmp/libp2p` and `/tmp/mump2p` (the docs use `$HOME/optimum-gateway/libp2p` and `.../mump2p`); the defaults do not survive a restart and a new identity invalidates the peer id given to the client. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin)) [confirmed]
- On SELinux hosts add `:z` to each mount, or the container fails with `write identity data: permission denied`. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin), [docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]

## Peering the consensus client

- Get the peer id from `curl -s http://localhost:48123/api/v1/self_info` and build `/ip4/<host>/tcp/33212/p2p/<peer id>` with an address the client can reach; do not take the first listed multiaddr, which is often a container address. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Prysm uses `--peer`, Teku `--p2p-direct-peers` plus the same address in `--p2p-static-peers`, Nimbus `--direct-peer` (stable netkey file), Lodestar `--directPeers`. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Lighthouse is wired the other way: the gateway dials the node through `OPT_DIRECT_CL_PEERS`. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Once `OPT_DIRECT_CL_PEERS` is set it is also an allowlist: any consensus client not named is disconnected. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]

## Kubernetes

- The Console command is `docker run`; the same gateway runs under an official Helm chart, and a pod that does not persist the identity data gets a new peer id on restart. ([docs: Kubernetes](https://docs.getoptimum.xyz/operate/kubernetes)) [confirmed]
- The chart needs Kubernetes 1.25+, Helm 3.8+, a node with a public IP, inbound TCP 33213, and a namespace allowing `hostNetwork` and `hostPort` (Pod Security `privileged`). ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]
- `hostNetwork` is the default because the gateway advertises the addresses it sees in its own namespace and has no announce-address override. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]
- One Helm release is one gateway and one client; the chart refuses an empty `gateway.directClPeers`. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]
- The chart values target an API key (`apiKey.existingSecret`); using an enrollment (join) key on Helm needs your own wiring, and the Console docs say the chart values still describe the API key path. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md), [docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Stated resources are requests of 150m CPU and 2Gi memory, with a 4Gi memory limit. ([gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]

## Telemetry and /health

- Console sets both `OPT_ENABLE_TELEMETRY` and `OPT_REMOTE_PUSH_ENABLE`; push without telemetry is refused at startup, and telemetry alone does not push. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Remote push sends gateway logs and metrics to Optimum's own Loki and Mimir. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- `/metrics` is not served until telemetry is enabled. ([docs: telemetry](https://docs.getoptimum.xyz/operate/telemetry)) [confirmed]
- `/health` returns 200 with `"healthy"` or 503 with `"degraded"` and a `failing` list, from six checks: cl_peers, mump2p_peers, subscribed_topics, last_block_age_sec (under 60 s), cl_health and mump2p_health (traffic in the last 30 s). ([gateway manual v1.3.2: telemetry](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/03_telemetry.md)) [confirmed]
- A 503 right after start is expected: mesh checks pass only after the first block arrives, and for a validator gateway the client checks stay failing until the client is peered. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- On a stream-only gateway `cl_peers`, `cl_health` and `subscribed_topics` are `skipped`, not failed. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: telemetry](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/03_telemetry.md)) [confirmed]

## Main settings

- Defaults: `OPT_AGENT_LIB_P2P_PORT` 33212, `OPT_AGENT_MUMP2P_PORT` 33213, `OPT_TELEMETRY_PORT` 48123, `OPT_LOG_LEVEL` debug, telemetry and remote push false. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- `OPT_ENROLL_CRED_DIR` defaults to the mump2p identity directory and must be persistent. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Consumer block stream is switched on with `OPT_STREAM_ENABLE`; `OPT_STREAM_ONLY` requires it, and further `OPT_STREAM_*` variables set addresses, auth and connection limits. Defaults and the bind dispute are in [block-stream.md](block-stream.md). ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Topics are fixed in the binary: `beacon_block` and attestation subnets 0 to 63. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Tokens last 6 hours and refresh automatically; a revoked credential loses access at the next expiry. ([gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]

## Disputed

- Ports: the port numbers agree between the Gateway README (as summarised in [../technology/sidecar-gateway.md](../technology/sidecar-gateway.md)), the docs and the manual. The README's Docker example publishes 48123 on all interfaces (`-p 48123:48123/tcp`), while the docs and the manual bind it to 127.0.0.1 only. ([Gateway README](https://github.com/getoptimum/optimum-gateway), [docs: network](https://docs.getoptimum.xyz/signal/network), [gateway manual v1.3.2: network requirements](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/00_network_requirements.md)) [confirmed]
- [../technology/parameters.md](../technology/parameters.md) lists `SIDECAR_PORT` 33212 as a gRPC proxy-to-node port (the sidecar in the optimum-dev-setup-guide README, see [../code/sdks-and-tools.md](../code/sdks-and-tools.md)); the gateway docs use 33212 for the consensus-client libp2p listener. These look like two different stacks that use the same number. ([docs: network](https://docs.getoptimum.xyz/signal/network)) [confirmed]
- Credentials: Console docs use `OPT_JOIN_KEY` (the "enrollment key"; the ADR calls it an org join key) only; the manual v1.3.2 also documents `OPT_API_KEY` (`ogw_live_...`), one per gateway, mutually exclusive with the join key. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: configuration](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/02_configuration.md)) [confirmed]
- Image: Console uses the moving `:latest` tag; the manual shows `v1.3.2` and the Helm guide asks for a digest. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [gateway manual v1.3.2: quick start](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/01_quick_start.md), [gateway manual v1.3.2: Kubernetes](https://github.com/getoptimum/optimum-gateway/blob/main/docs/versions/v1.3.2/05_kubernetes.md)) [confirmed]

## Not yet covered

- Whether enrollment is open to anyone: the manual says invite-only while the Console docs describe self-service sign-up, so access may depend on Optimum enabling an account.
- What the gateway costs, or what an operator gets in return; the docs give no figures.
- Lighthouse v8 PeerDAS flags: the docs point to the gateway quick start (latest) for them; they are not in the v1.3.2 files read here. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
