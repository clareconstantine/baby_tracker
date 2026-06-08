# Baby Tracker — Project Context

## What This Is

A personal app for Clare to follow friends' pregnancies. They enter a due date and the pregnant parent's first name, then receive weekly emails with fetal development info and a fun animal size comparison. Built as a TypeScript learning project.

## Core User Flow

1. Clare visits the app and enters their email, the parent's first name, and the parent's due date
2. App sends an email immediately for the current gestational week
3. Every week on the same day of the week as the due date, a new email goes out at 7am PT
4. After week 40, one final "baby is here!" email is sent and emails stop

## Key Decisions

| Topic | Decision |
|-------|----------|
| Stack | Next.js 14 (App Router), TypeScript, Tailwind |
| Database | Prisma + Neon (Postgres) |
| Email | Resend, HTML string templates |
| Hosting | Vercel + Vercel Cron |
| Auth | Email-only, no accounts |
| Sender domain | noreply@send.clarf.dev |
| Weeks 1–3 | No email sent (too early) |
| Week 40+ | One final email, then subscriber marked inactive |
| Mid-pregnancy signup | Send current week's email immediately |
| Email timing | Daily cron at 7am PT; emails go to users whose week turns over that day |
| Pronouns | They/them for the pregnant person throughout |
| Animal visuals | Emoji (no photos) |
| Content source | Paraphrased from americanpregnancy.org/week-by-week/, with attribution link |
| Fruit/veggie sizes | Provided for select weeks (4, 6, 8, 12, 14, 20, 24, 32, 33, 40) |
| V1 scope | One pregnancy tracked at a time; DB schema supports multiple (V2) |

## Data Model

```
Subscriber   { id, email, unsubscribeToken, active, createdAt }
  └── Pregnancy  { id, parentName, dueDate, subscriberId, createdAt }
```

## Content

`data/weekly-content.json` — 37 entries (weeks 4–40), each with:
- `animal`, `emoji`, `size` — Clare's animal size dataset
- `fruitSize`, `funFact` — Clare's fruit/veggie data (10 weeks)
- `bodyChanges`, `babySize`, `babyDevelopment` — paraphrased from APA
- `apaUrl` — link back to source page

## Principles

- Personal use only (Clare + friends/family) — no public auth, no scale concerns
- No invented content — all medical info sourced from APA
- Keep it simple: no editing, no dashboards, no accounts
