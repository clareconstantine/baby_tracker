---
status: Accepted
date: 2026-06-07
---

# 001 — Next.js as full-stack framework

## Decision

Use Next.js 14 (App Router) with TypeScript as the sole framework, covering both the signup form (React) and backend logic (API routes).

## Reasons

- Clare is learning TypeScript and wanted a single-language, single-repo project
- Next.js gives a "one framework does everything" feel similar to Rails, which Clare knows well
- API routes handle the subscribe/unsubscribe/cron endpoints without a separate server
- Vercel Cron Jobs integrate natively for the weekly email trigger

## Alternatives considered

- Node.js + Express (backend only, would need a separate frontend)
- Ruby on Rails (familiar, but goal was to learn TypeScript)
