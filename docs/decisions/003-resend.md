---
status: Accepted
date: 2026-06-07
---

# 003 — Resend for transactional email

## Decision

Use Resend to send all emails. HTML is built as TypeScript template strings (not react-email).

## Reasons

- Modern TypeScript-native API, generous free tier (3k emails/month)
- `@react-email/components` was deprecated at time of build; plain HTML strings are simpler and more durable
- Sending domain: `noreply@send.clarf.dev` (DNS verified via Porkbun)

## Alternatives considered

- SendGrid: more setup, older API feel
- AWS SES: cheapest at scale but significant infrastructure overhead
- react-email: attempted but all sub-packages deprecated; dropped in favour of HTML strings
