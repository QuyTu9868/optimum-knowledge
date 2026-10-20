---
title: Optimum Accelerate
last_verified: 2026-10-20
status: official docs only, gated by Optimum, no independent results
---

# Optimum Accelerate

Accelerate is a Console feature that recommends a bid cutoff for the MEV sidecar a validator operator already runs.

This page describes what the official docs say as of 2026-10-20. Account types and Console basics are in [console-and-signal.md](console-and-signal.md).

## What it is

- Accelerate recommends the bid cutoff for the MEV sidecar you already run. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
- The stated purpose is that a proposal can take a better bid without waiting so long that the block is late. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [claimed]
- The number comes from slots your validators already proposed. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
- You download a config and deploy it yourself. Console never writes to your infrastructure, and Optimum has no write access to either sidecar. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does), [docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- The screen says accepting bids closer to the deadline captures more MEV. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [claimed]

## Who can use it

- The sidebar shows Accelerate only when Optimum has enabled it for your organisation and you have at least 200 active validators on mainnet. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does), [docs: FAQ](https://docs.getoptimum.xyz/help/faq)) [confirmed]
- It is offered to entity accounts. Registering as an entity does not enable it, and an individual account with 200 active mainnet validators can be enabled the same way. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
- If the entry is missing there is no other URL to use. Ask support. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]

## Steps

- Step 1, Start Accelerate: you must acknowledge a disclaimer dialog first, and staff cannot accept it for you. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Step 2, Recommendation: you upload the config you run, either the mev-boost `config.yaml` or the Commit-Boost `cb-config.toml`. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- From the upload, Console reads your cutoff, your `late_in_slot_time_ms` and your relay set. From a Commit-Boost file it reads only the `[pbs]` timings and each `[[relays]]` url, and ignores chain, port, signer and metrics settings. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Without a config you can download a starter file, which is not a recommendation. A file Console cannot read is refused with each problem listed by line. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Step 3, Adjust: you set the bid cutoff and late-in-slot on sliders, optionally apply the recommendation, then download the config. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- MEV-Boost gets a complete `mev-boost-config.yaml` with the cutoff in `timeout_get_header_ms`. Commit-Boost gets `cb-config-pbs.toml`, a `[pbs]` block to merge into your own `cb-config.toml`. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- A getHeader bid after `late_in_slot_time_ms` skips all relays and the block is built locally, so the cutoff must stay before it. A later cutoff can take a higher bid, and set too late the proposal misses the slot. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]
- After deploying the file yourself, "I have adjusted my cutoff" records the slider values. Recording does not deploy anything. ([docs: MEV sidecar configuration](https://docs.getoptimum.xyz/accelerate/adjust-mev-boost)) [confirmed]

## Readiness

- A recommendation needs 200 measured proposals across all your validators, not per key. Before that the screen says there are not enough proposals, though you can still start and upload a config. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]
- Validator keys must be registered so Console knows which slots you propose. Pending validators get no proposal slots, so nothing is measured until they activate. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]
- The modelled annual gain needs 30 days of ingested history and 30 MEV blocks. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]

## What the numbers mean

- Slots that could have improved: the share of MEV blocks that had a better bid within a stated offset past the bid you took. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- Slots modelled: MEV blocks in the modelling window. Relays on file: how many relays your uploaded config names. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- The figure is uplift that was available at that offset on blocks already proposed. It does not price the risk of waiting. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]
- The modelled annual gain is what a later cutoff could have captured, held at that rate for a year. ([docs: readiness](https://docs.getoptimum.xyz/accelerate/readiness)) [confirmed]
- "No cutoff change indicated" means the window does not support moving the cutoff. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]

## Where results show

- Results are under "MEV outcome" on the Accelerate screen, not under Performance. Figures run from the day after you recorded a cutoff. If nothing is measured since then, the screen says so and shows the wider window the recommendation was read from. ([docs: acceleration](https://docs.getoptimum.xyz/accelerate/where-results-show)) [confirmed]
- It shows total accepted ETH, average accepted bid per slot, and average unrealised MEV. Total accepted is everything captured, not the part the cutoff change caused. ([docs: acceleration](https://docs.getoptimum.xyz/accelerate/where-results-show)) [confirmed]
- Some older messages still say MumBoost, the previous name for the same terms check. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]

## Disclaimer

- The dialog says the configuration information is a simulation from current network data, for information only. Optimum does not guarantee a performance outcome, and changes on your own infrastructure are your decision. The dialog text is the agreement, so read it there. ([docs: recommendation](https://docs.getoptimum.xyz/accelerate/recommendation)) [confirmed]

## A different gateway feature with a similar name: ADR 0012

- ADR 0012 (accepted, implemented) is about which beacon blocks a gateway hands to its consensus client, using a list of slot numbers that bootstrap serves at `accelerate_slots`. It does not mention Console, MEV-Boost, Commit-Boost or a bid cutoff. ([ADR 0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md)) [confirmed]
- The list filter applies only to gateways with the hermes role, which pass a block to the client if its slot is on the list or past the list horizon. Partner gateways give their client every block, and relay gateways give their client none from the mesh. ([ADR 0012](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0012-slot-based-block-acceleration.md), [gateway-design.md](../technology/gateway-design.md)) [confirmed]
- The Console docs do not mention slot lists or gateways in the Accelerate pages. ([docs: what Accelerate does](https://docs.getoptimum.xyz/accelerate/what-accelerate-does)) [confirmed]
Neither source says the two are related, so this page treats them as separate. Details of the ADR are in [gateway-design.md](../technology/gateway-design.md).

## Not yet covered

- How the recommended cutoff is computed, the offsets used, and the modelling window length.
- Whether any operator has deployed a recommendation, and what it did. No independent results found.
- Whether the Console feature and ADR 0012 share any logic or data. Both sources are silent.
- Terms of enablement by Optimum, and whether sub-200 operators can ever get it.

Related: [sidecar gateway](../technology/sidecar-gateway.md), [unverified claims](../unverified.md).
