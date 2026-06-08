---
status: Accepted
date: 2026-06-07
---

# 005 — One pregnancy in V1, schema supports multiple

## Decision

V1 allows one pregnancy per subscriber. The database schema (`Subscriber` → many `Pregnancy`) already supports multiple pregnancies per subscriber for V2.

## Reasons

- Clare's immediate need is tracking one pregnancy at a time
- The one-to-many schema costs nothing extra now and avoids a migration later
- V2 would allow tracking multiple friends' pregnancies simultaneously

## V2 path

Add UI to let a subscriber add a second `Pregnancy` row. The cron job already iterates `subscriber.pregnancies` so it will handle multiple automatically.
