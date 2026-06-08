---
status: Accepted
date: 2026-06-07
---

# 002 — Email-only signup, no accounts

## Decision

Users sign up with just their email, the parent's first name, and a due date. No password, no login. Unsubscribe via a unique token link in every email.

## Reasons

- Personal use app — no need for account management complexity
- Fewer moving parts: no session handling, no password reset flow
- Unsubscribe token provides sufficient control for the use case

## Alternatives considered

- Full accounts (email + password): rejected as unnecessary overhead for a personal tool
