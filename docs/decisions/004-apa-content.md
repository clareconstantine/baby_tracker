---
status: Accepted
date: 2026-06-07
---

# 004 — Paraphrase APA content with attribution

## Decision

Week-by-week fetal development content is paraphrased (not copied verbatim) from the American Pregnancy Association website, with a "Read more on the American Pregnancy Association website" link in every email.

## Reasons

- APA is a trusted, medically accurate source
- Direct scraping was blocked (403); paraphrasing sidesteps both the technical and legal issues
- Attribution link gives readers access to the full original content
- No medical information is invented — only phrasing is changed

## How content was produced

Pages fetched via WebFetch from `americanpregnancy.org/week-by-week/{N}-weeks-pregnant/` and paraphrased using Claude, with they/them pronouns throughout. Output stored in `data/weekly-content.json`.

## Alternatives considered

- Verbatim scraping: blocked by APA (403) and likely a ToS violation
- Claude-generated content: rejected because Clare wanted content from a trusted source, not invented
- Hand-written: too time-consuming for 37 weeks
