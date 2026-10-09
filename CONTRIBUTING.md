# Contributing

This repo is only useful if every line can be checked. So there is one hard rule.

**No source, no merge.**

## Adding or fixing a fact

1. Find the right file. If none fits, open an issue first and propose a new one.
2. Write the fact in your own words, one line, one idea.
3. End the line with a link to the source and a tag:
   - `[confirmed]` the source states it plainly as fact
   - `[claimed]` Optimum describing itself (blog, site, docs marketing copy)
   - `[third-party]` someone other than Optimum: press, audit, partner, forum
4. Update `last_verified` in the file header to today's date.
5. If your source disagrees with an existing line, do not delete the old line. Add both under **Disputed**.

Example:

```
- mump2p builds on libp2p's GossipSub. ([docs](https://docs.getoptimum.xyz/docs/learn/overview/p2p)) [confirmed]
```

## Source quality, best to worst

1. Primary technical source: docs, papers, GitHub code, release notes
2. Independent measurement or audit: ProbeLab, operator reports on forums
3. Press with named reporters
4. Optimum blog and website (fine, but tag as `[claimed]` when it's a performance or market claim)
5. X posts: only from official accounts, link the post itself

Not accepted: screenshots without a link, "someone in Discord said", AI-generated summaries as the source.

## Style

- English
- Short quotes only when exact wording matters, under 15 words, in quotation marks
- No em dashes
- No hype words. Write "claims 6-20x faster than gossipsub", not "blazing fast"

## Moving something out of unverified.md

If you find a real source for a claim listed in `unverified.md`, move it into the right file with the source and remove it from the list.

## Pull request checklist

- [ ] Every new line has a working source link
- [ ] Tag chosen correctly
- [ ] `last_verified` updated
- [ ] No copied paragraphs from the source
