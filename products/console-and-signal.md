---
title: Optimum Console and Signal
last_verified: 2026-10-20
status: official docs read in full; Signal availability and report timing depend on Optimum enabling features per account
---

# Optimum Console and Signal

Console is the web app where an operator creates an Optimum account, mints gateway enrollment keys and checks the result, and Signal is the part of Console that connects a gateway you run to your beacon node.

This page describes the official docs as read on 2026-10-20. ([docs repo commits](https://github.com/getoptimum/docs/commits/main))

Ports, mounts, per-client peering and health checks are on [run-the-gateway](../products/run-the-gateway.md). The consumer feed is on [block-stream](../products/block-stream.md). The bid-cutoff product is on [accelerate](../products/accelerate.md). Validator set sync is on [keysync](../products/keysync.md).

## What Console is and who it is for

- The docs are a runbook for staking providers and for people who run their own validators. ([docs: introduction](https://docs.getoptimum.xyz/)) [confirmed]
- Console never changes your infrastructure, and Optimum does not host gateways: you run the container yourself. ([docs: introduction](https://docs.getoptimum.xyz/), [docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- The gateway is a peer of the consensus client, passes blocks to it and never receives validator keys. ([docs: introduction](https://docs.getoptimum.xyz/)) [confirmed]
- There is no Optimum-hosted multiaddr to point a client at; the client peers the gateway you started beside it. ([docs: what Optimum does](https://docs.getoptimum.xyz/start/what-optimum-does)) [confirmed]

## Two paths

- Validator operator: the gateway runs beside the beacon node, you peer the consensus client, then register validator indices. ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]
- Stream-only consumer: for participants without validators. The gateway takes blocks from the mesh and serves them to your own consumers, with no beacon node and no indices asked. Details are on [block-stream](../products/block-stream.md). ([docs: choose a path](https://docs.getoptimum.xyz/start/choose-a-path)) [confirmed]

## Account and registration

- Account type is Individual or Entity. Both get Signal. Who can get Accelerate is covered on [accelerate](../products/accelerate.md). ([docs: account type](https://docs.getoptimum.xyz/getting-in/account-type), [docs: introduction](https://docs.getoptimum.xyz/)) [confirmed]
- Sign-up is with Google or Microsoft. ([docs: create an account](https://docs.getoptimum.xyz/getting-in/create-an-account)) [confirmed]
- If self-serve signup is closed, Optimum creates the account and you sign in with the Google or Microsoft account you gave them. ([docs: create an account](https://docs.getoptimum.xyz/getting-in/create-an-account)) [confirmed]
- Registration asks "Do you run validators?" and requires ticking the terms checkbox on the same screen. Entities also give legal entity details. ([docs: register](https://docs.getoptimum.xyz/getting-in/register)) [confirmed]
- Answering yes to running validators also asks for total stake and stake to connect, in ETH. ([docs: register](https://docs.getoptimum.xyz/getting-in/register)) [confirmed]

## What Signal is

- Signal is the gateway beside your beacon node: it receives blocks from the Optimum mesh and hands them to your consensus client. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Optimum says this makes validators receive blocks sooner and improves attestation performance. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [claimed]
- Optimum switches Signal on per account. Until then there is no Signal sidebar entry, the Verify check answers that it is not available, and no URL gets around it. Ask support. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [docs: FAQ](https://docs.getoptimum.xyz/help/faq)) [confirmed]

## Enrollment

- One enrollment key (OPT_JOIN_KEY, prefix ojk_) can enrol every gateway you run. Each gateway creates its own keypair on first start and keeps the resulting credential in its mump2p identity directory. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- The private key never leaves the host and the server returns no secret, only a client_id. ([ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Network and cluster come from the key, so a gateway cannot choose its own. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Key lifetimes: 14 days for an invited account's first gateway in onboarding, 1 day from the Signal page, or a number of days you choose, up to 365, under Gateways & keys. The secret is shown once. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Each key admits up to 1,000 gateways, and the organisation is capped at 1,000 live gateway credentials. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- Revoking or expiring a key stops new gateways only; gateways already enrolled keep running. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Each gateway needs a name (OPT_GATEWAY_ID) unique per organisation; a second gateway with the same name is refused with HTTP 409. ([docs: before you begin](https://docs.getoptimum.xyz/start/before-you-begin), [docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Losing the identity directory gives a new peer id and a new enrollment that spends another use; it is refused under the same name until the old credential is revoked. Mount details are on [run-the-gateway](../products/run-the-gateway.md). ([docs: troubleshoot](https://docs.getoptimum.xyz/help/troubleshoot), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- A 401 at enrollment can mean an unknown, expired, used-up or revoked key, and a host clock more than about 2 minutes slow looks the same. ([docs: troubleshoot](https://docs.getoptimum.xyz/help/troubleshoot), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]

- Two different identity cases: if the identity directory is lost, the gateway gets a new peer id and enrolls again (docs); if the credential is kept but the peer identity changes, the gateway refuses to start and names both peer IDs (ADR). ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]

## Connect and Verify

- Steps on Signal: 1a name the gateway, 1b start it, 1c point the client at it, 1d verify. Console prints the start command and the client flag; see [run-the-gateway](../products/run-the-gateway.md). ([docs: connect your gateway](https://docs.getoptimum.xyz/signal/connect-your-gateway)) [confirmed]
- Verify reads three things from outside your host, across all gateways in the organisation together: gateway enrolled, seen by Optimum in the last ten minutes, and blocks arriving in recent slots. ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails)) [confirmed]
- Verify shows counts, not names, so it can pass because another gateway is healthy. Check a new host on that host. ([docs: troubleshoot](https://docs.getoptimum.xyz/help/troubleshoot)) [confirmed]
- Verify cannot see whether your consensus client is peered; only the gateway's own /health on its host shows that. ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails)) [confirmed]
- Named failures: gateway not reachable, client not peering, container exit on a permission error, and a changed peer id. Fixes are on [run-the-gateway](../products/run-the-gateway.md). ([docs: when the check fails](https://docs.getoptimum.xyz/signal/when-the-check-fails)) [confirmed]

## Validator keys and bulk onboarding

- Console takes decimal validator indices, pasted or as CSV; BLS public keys are skipped on the self-serve screen. Optimum confirms indices before they count in a report. ([docs: register keys](https://docs.getoptimum.xyz/signal/register-keys)) [confirmed]
- Self-serve accounts have a lifetime limit on validator lookups; a retry does not raise it. ([docs: register keys](https://docs.getoptimum.xyz/signal/register-keys)) [confirmed]
- Invited operator accounts may get Manage validators (Add, Remove, Replace) and [keysync](../products/keysync.md), which reconciles the validator set on a schedule. ([docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Console never lists your registered indices back to you; it shows counts and a change history. ([docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]

## Weekly performance report

- The Blocks received earlier card waits for a week of paired slots, and per-operator figures stay Pending until at least 30 paired slots are in the window. ([docs: your first report](https://docs.getoptimum.xyz/signal/your-first-report)) [confirmed]
- The Attestation accuracy card needs 500 or more indices on record, then the weekly report. ([docs: your first report](https://docs.getoptimum.xyz/signal/your-first-report)) [confirmed]
- Report entries appear only when enabled for the account, and self-serve accounts do not get Attestations. ([docs: your first report](https://docs.getoptimum.xyz/signal/your-first-report)) [confirmed]

## Support

- Support is the validator support channel on Discord; include the gateway name, client and version, the failing list from /health and the Verify result, and never paste the key. ([docs: support](https://docs.getoptimum.xyz/help/support)) [confirmed]

## Disputed

- Terminology: the docs say "enrollment key" and the ADR says "org join key" and "Partner Console". The ADR also describes a legacy per-host ogw_ API key that the docs do not mention. ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [ADR 0013](https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0013-gateway-self-enrollment.md)) [confirmed]
- Menu names for the same Console areas vary by page: Gateways & keys (enrollment keys, consumer tokens), Stream consumers (also written "Keys" then "Stream consumers"), Manage API keys (keysync operator key; the keysync README says partners dashboard), Activate validators and Manage validators. See [block-stream](../products/block-stream.md) and [keysync](../products/keysync.md). ([docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does), [docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]
- Access: the Console docs describe self-serve signup (sometimes closed), while the gateway manual is described on [run-the-gateway](../products/run-the-gateway.md) as invite-only. Signup may be open, but Signal and gateway keys are switched on per account by Optimum. ([docs: create an account](https://docs.getoptimum.xyz/getting-in/create-an-account), [docs: what Signal does](https://docs.getoptimum.xyz/signal/what-signal-does)) [confirmed]
- The docs say the Helm chart values still describe the older API key path. ([docs: onboard in bulk](https://docs.getoptimum.xyz/signal/onboard-in-bulk)) [confirmed]

## Not yet covered

- Which accounts Optimum switches Signal on for, and how long that takes, is not stated.
- No measured numbers for earlier blocks or attestation gain are published in these pages, and they are not independently verified.
- The signup agreement terms are not summarised in the docs.
- What the stake figures asked at registration are used for is not stated.
