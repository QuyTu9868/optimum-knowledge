---
title: Optimum keysync
last_verified: 2026-10-20
status: open-source CLI, v1.1.1; needs an Optimum operator account
---

# Optimum keysync

Keysync is a customer-run command line tool that reconciles the Ethereum validators you run against the set held by the Optimum console.

This page describes what the official docs and the repository say as of 2026-10-20. Console and gateway terms are in [console-and-signal.md](console-and-signal.md) and [run-the-gateway.md](run-the-gateway.md).

## What it is

- The repository describes it as a customer-run CLI that reconciles validator assignments against the Optimum console API, authenticating with an operator API key and applying the difference, cron-friendly. ([GitHub: optimum-keysync](https://github.com/getoptimum/optimum-keysync)) [confirmed]
- It is written in Python and licensed MIT. ([GitHub API: optimum-keysync](https://api.github.com/repos/getoptimum/optimum-keysync)) [confirmed]
- Releases are v1.0.0, v1.1.0 and v1.1.1, all published 2026-06-25; v1.1.1 is the latest. ([GitHub releases](https://github.com/getoptimum/optimum-keysync/releases)) [confirmed]
- The docs position it for a validator set that keeps changing; one-off adds, removals and replacements stay in Console. ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]

## Install and run

- Install with `pip install optimum-keysync`; the command is `keysync`. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- `keysync diff` prints planned adds and removes and writes nothing; `keysync sync` is a dry run until `--apply` is passed; `keysync show` lists current assignments. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Re-runs are idempotent, so a steady state reports nothing to do. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- It is meant for cron, a systemd timer or a Kubernetes CronJob; templates for the last two are in the repo. ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync), [README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Config is by `KEYSYNC_*` environment variables, each with a flag override; API, auth, network and chain id default to Optimum production and Ethereum mainnet (chain `0x1`). ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Exit codes: 0 success, 2 auth, 3 console API, 4 configuration, 5 delete guardrail, 6 beacon node. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]

## Data it handles

- The one secret is the operator API key (`ovi_live_*`, `KEYSYNC_API_KEY`), created under Manage API keys in Console; revoking it takes effect on the next run. ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync), [README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Input is a file of validators you run: BLS public keys, validator indices, or JSON records of index, chain and key. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- Pubkey or index lists need a beacon node that answers `/eth/v1/beacon/states/head/validators` without auth; the JSON records option needs none. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- The README mentions only public keys and indices as input, not signing keys, withdrawal keys or keystores; this is what the README says, not a guarantee about the code. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- It runs on the customer side and only reads the beacon node's validators endpoint; the README describes no write to the node. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]
- It looks up your operator id with the key, lists current assignments, computes adds and removes, then registers, assigns and unassigns. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]

## Limits

- It refuses to remove more than 10 validators in one run unless `--max-deletes` is raised, to stop a bad input file clearing the set. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- The docs place it after registering keys in the operator setup, separate from running a gateway; gateway facts are in [run-the-gateway.md](run-the-gateway.md). ([docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]
- HTTP calls retry only on 5xx, 429 and network errors; other 4xx fail at once. ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md)) [confirmed]

## Disputed

- Where the key comes from: the README says the Optimum partners dashboard; the docs say Manage API keys in Console. Neither source says whether they are the same screen; see the terminology note in [console-and-signal.md](console-and-signal.md). ([README](https://github.com/getoptimum/optimum-keysync/blob/main/README.md), [docs: sync validator keys](https://docs.getoptimum.xyz/keysync)) [confirmed]

## Not yet covered

- Whether keysync is available to every Console account; the docs mention invited operator accounts starting it from Activate validators, so access depends on Optimum enabling it.
- No independent audit or third-party review of the tool was found.
- What the registered validators are used for downstream is described in other docs, not in the keysync sources.
