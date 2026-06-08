# Baby Tracker 🌱

A personal app for following friends' pregnancies. Enter a due date and receive weekly emails with fetal development info, animal size comparisons, and fun facts — all the way from week 4 to birth.

## How it works

1. Visit the app and enter your email, the parent's first name, and their due date
2. Get an email immediately for the current gestational week
3. Receive a new email each week on the day their week turns over, at 7am PT
4. After week 40, one final "baby is here!" email

Emails include:
- Animal size comparison (e.g. "about the size of a baby hedgehog 🦔")
- Fruit/veggie size for select weeks
- "Did you know?" fun fact for select weeks
- Fetal development content paraphrased from the [American Pregnancy Association](https://americanpregnancy.org), with attribution

## Stack

- **Framework**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database**: Prisma + [Neon](https://neon.tech) (Postgres)
- **Email**: [Resend](https://resend.com)
- **Hosting**: Vercel + Vercel Cron

## Local development

### Prerequisites

- Node.js 18+
- A [Neon](https://console.neon.tech) account (free tier is fine)
- A [Resend](https://resend.com) account with a verified sending domain

### Setup

```bash
npm install
```

Copy `.env` and fill in your values:

```bash
DATABASE_URL="postgresql://..."        # Neon connection string
RESEND_API_KEY="re_..."               # Resend API key
RESEND_FROM="Baby Tracker <noreply@yourdomain.com>"
CRON_SECRET="some-random-string"      # Protects the cron endpoint
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Run the database migration:

```bash
npx prisma migrate dev --name init
```

Start the dev server:

```bash
npm run dev
```

### Populating content

`data/weekly-content.json` contains the week-by-week content (already populated). To regenerate it, use the `/fetch-apa-content` Claude Code skill, which fetches and paraphrases content from the APA website one week at a time.

## Deployment

Deploy to Vercel and set the same environment variables from `.env` in the Vercel dashboard, plus update `NEXT_PUBLIC_BASE_URL` to your production URL.

The cron job (`vercel.json`) runs daily at 15:00 UTC (7am PT) and sends emails to subscribers whose pregnancy week turns over that day. Vercel Cron calls `POST /api/cron/weekly` with the `CRON_SECRET` as a Bearer token.

## Project structure

```
app/
  page.tsx                  # Signup form
  unsubscribe/page.tsx      # Unsubscribe confirmation
  api/
    subscribe/route.ts      # POST: create subscriber, send first email
    unsubscribe/route.ts    # GET: deactivate by token
    cron/weekly/route.ts    # POST: daily email send (Vercel Cron)
emails/
  weeklyEmail.ts            # Weekly email template + subject line
  finalEmail.ts             # Week 40+ "baby is here" template
lib/
  db.ts                     # Prisma client
  email.ts                  # Resend send helpers
  pregnancy.ts              # gestationalWeek(), isWeekTurnoverDay()
  content.ts                # WeekContent type + findWeekContent()
data/
  weekly-content.json       # 37 weeks of content (weeks 4–40)
prisma/
  schema.prisma             # Subscriber + Pregnancy models
docs/
  CONTEXT.md                # Project overview and decisions
  decisions/                # Architecture Decision Records
```
