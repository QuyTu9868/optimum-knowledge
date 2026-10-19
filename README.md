# Optimum Knowledge Base

A community-maintained, source-cited fact base about [Optimum](https://www.getoptimum.xyz/), the team building an RLNC-based networking and memory layer for blockchains.

Built for AI agents and content creators. Paste this repo link into your agent, let it read `llms.txt` first, then pull the files it needs.

This is not an official Optimum repository.

Vietnamese translation of the technology pages (community translation, English is the source): [vi/README.md](vi/README.md).

## How to read a fact

Every fact line ends with a source link and a tag:

- `[confirmed]` the source states it plainly, and it was re-checked by an independent pass
- `[claimed]` Optimum's own marketing or self-description, not independently verified
- `[third-party]` reported by someone other than Optimum (press, audit, forum, partner)

Each file has a `last_verified` date in its header. Things move fast, check the date before you quote a number.

When two sources disagree, the file says so under **Disputed** and lists both sides. Nothing is resolved by guessing.

## Files

### Technology
| File | What's in it |
|---|---|
| [technology/overview.md](technology/overview.md) | What Optimum is, product names (mump2p, OptimumP2P, deRAM, DeROM), what is live vs planned |
| [technology/rlnc.md](technology/rlnc.md) | Random Linear Network Coding, recoding at relay nodes, RLNC vs Reed-Solomon vs fountain codes |
| [technology/network-topologies.md](technology/network-topologies.md) | How data reaches many nodes: star, chain, tree, gossip mesh, coded mesh, and the transaction journey |
| [technology/mump2p-and-gossipsub.md](technology/mump2p-and-gossipsub.md) | How mump2p sits on top of libp2p GossipSub, speed claims and where each number comes from |
| [technology/parameters.md](technology/parameters.md) | Documented config defaults (mesh, shards, threshold, ports) |
| [technology/security.md](technology/security.md) | Pollution attack defense, ProbeLab audit |
| [technology/sidecar-gateway.md](technology/sidecar-gateway.md) | Optimum Gateway as a validator sidecar, what it does and doesn't touch |
| [technology/flexnodes.md](technology/flexnodes.md) | Flexnodes and the planned Latency Marketplace |
| [technology/provably-optimal.md](technology/provably-optimal.md) | The "provably optimal" claim and the conditions behind it |

### Team and history
| File | What's in it |
|---|---|
| [team/people.md](team/people.md) | Co-founders, advisors, research partners, photo links |
| [team/funding.md](team/funding.md) | Seed round, lead and participating investors, angels |
| [team/research-history.md](team/research-history.md) | Academic roots of RLNC, key papers, awards |
| [team/timeline.md](team/timeline.md) | Company milestones and the mainnet status question |
| [team/ip-and-licensing.md](team/ip-and-licensing.md) | What is known about patents, licenses and open source |

### Results
| File | What's in it |
|---|---|
| [results/performance.md](results/performance.md) | Testnet and mainnet speed claims, how each was measured, the independent mainnet test, modeled economics |

### Ecosystem
| File | What's in it |
|---|---|
| [ecosystem/validators.md](ecosystem/validators.md) | Which operators are named vs actually reported testing, partner counts, Lido PERCH |
| [ecosystem/partners-and-business.md](ecosystem/partners-and-business.md) | Obol, Four Pillars, who pays, permissioned vs permissionless, Solana |

### Code
| File | What's in it |
|---|---|
| [code/releases.md](code/releases.md) | Public repos, licenses, Gateway release timeline |
| [code/known-issues.md](code/known-issues.md) | Notable fixes, GossipSub settings in code, stories with no source |

### Meta
| File | What's in it |
|---|---|
| [unverified.md](unverified.md) | Claims people repeat that no source in this repo supports yet. Help wanted |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to add or fix a fact |

## Official links

- Website: https://www.getoptimum.xyz/
- Team: https://www.getoptimum.xyz/team
- Docs: https://docs.getoptimum.xyz/
- GitHub: https://github.com/getoptimum
- X: https://x.com/get_optimum
- Discord: https://discord.gg/getoptimum

## Copyright

Facts here are written in our own words with links back to the original. Short quotes are used only where exact wording matters. Read the source for the full text.
