---
title: Consumer block stream
last_verified: 2026-10-20
status: documented in gateway manual and ADR-0011; account enablement not documented
---

# Consumer block stream

The consumer block stream is a gateway feature that serves decoded beacon blocks over WebSocket or gRPC to your own downstream consumers, and it is the path for accounts that do not run validators.

This page describes what the official docs and gateway manual say as of 2026-10-20. Manual links point to the "latest" version as read on that date (the same text is in v1.3.2). The docs say "block stream" is a gateway feature, not a separate Optimum product. ([docs: block stream](https://docs.getoptimum.xyz/operate/block-stream)) [confirmed]

## Gateway side

- The feed is off by default and read-only; consumers cannot publish into the mesh. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md), [gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- A stream-only gateway is started with `OPT_STREAM_ENABLE` and `OPT_STREAM_ONLY`; it will not start with only one of them. Port 33212 is not published. ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- A no-validator account picks "A feed for my consumers" in Console to get the stream-only command; the full command, ports and health checks are on [run-the-gateway.md](run-the-gateway.md). ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- In stream-only mode the gateway still joins the mesh but does not publish. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream), [docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- The manual says the stream is live on Hoodi and Mainnet; this is Optimum's own availability statement. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [claimed]

## Endpoints and defaults

- WebSocket: `ws://127.0.0.1:9600/api/v1/stream/blocks`, with `mode=metadata` (default) or `mode=raw`. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- gRPC: `127.0.0.1:9601`, service `BlockStreamService`, method `Subscribe`. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Both listeners bind to loopback by default (but see Disputed for the Console command). A non-loopback bind must keep auth on, and the gateway does not terminate TLS, so public exposure needs a TLS proxy. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- Defaults: 256 connections in total, 8 per key, per-connection buffer of 64 events. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]

## Tokens and authentication

- A consumer key (prefix `osc_`) is minted in the Console under a "Stream consumers" tab, shown once, one key per consumer, and matched to the gateway's network (Hoodi or Mainnet). ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- The consumer posts the key to `https://auth.getoptimum.io/api/v1/stream/token` and gets a Bearer JWT with `aud=stream`. Default lifetime is 3600 s, ceiling 21600 s. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- The JWT goes in the `Authorization` header; browsers send it through `Sec-WebSocket-Protocol` as `bearer.<jwt>` next to the marker `optimum.stream.v1`. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- The gateway checks the signature locally against the JWKS at `remote_auth_url`. Revoking a key stops new tokens, but an issued token works until it expires. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- A new token can be sent on the open stream to refresh it. Re-verification mode defaults to `observe`, which counts failures but keeps the stream; `enforce` closes it. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]

## Protocol behaviour

- Frames are `block`, `lagged` (cumulative dropped count after a buffer overflow) and `heartbeat` (every 20 s by default). ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- Metadata mode carries slot, proposer index, parent and state roots, size, source (`libp2p` or `mump2p`), receive time and gateway id; raw mode adds the `ssz_snappy` block bytes. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- There is no replay: every reconnect leaves a permanent gap, and a block seen on both paths arrives twice, once per source. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)) [confirmed]
- ADR-0011 says metadata mode and all timing fields cannot be verified by the consumer, so they need a trusted transport. ([ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]

## Disputed

- The manual and ADR-0011 say both listeners bind to loopback by default. The Console stream-only command sets `OPT_STREAM_ADDR` and `OPT_STREAM_GRPC_ADDR` to 0.0.0.0 inside the container, published only to host loopback (also noted in [run-the-gateway.md](run-the-gateway.md)). ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway), [ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]
- The Console location differs by page: "Keys" then "Stream consumers" ([docs: block stream](https://docs.getoptimum.xyz/operate/block-stream)); "Gateways & keys" then "Stream consumers" ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)); "API keys" or "Manage Gateways" ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream)). [confirmed]
- The docs say the stream carries blocks. The manual's diagram labels also say "blobs", but its text and ADR-0011 name beacon blocks only, with other topics a non-goal. ([gateway manual](https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream), [ADR-0011](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0011-gateway-consumer-block-stream.md)) [confirmed]

## Not yet covered

- Whether stream-only access needs Optimum to enable the account, and any pricing or fees: not stated in these sources.
- Measured latency or uptime of the feed: no source gives numbers.
- The `osc_` key and token endpoint appear only in the gateway manual, not on the docs site.
- Whether the ProbeLab audit covered the stream: not stated. Related pages: ../technology/gateway-design.md, ../technology/sidecar-gateway.md.
