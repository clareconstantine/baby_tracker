import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendWeeklyEmail, sendFinalEmail } from "@/lib/email";
import { gestationalWeek, isWeekTurnoverDay } from "@/lib/pregnancy";
import { findWeekContent, type WeekContent } from "@/lib/content";
import rawContent from "@/data/weekly-content.json";

const weeklyContent = rawContent as WeekContent[];

export async function GET(request: Request) {
  // Verify this is being called by Vercel Cron (or a trusted caller in dev)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  const subscribers = await prisma.subscriber.findMany({
    where: { active: true },
    include: { pregnancies: true },
  });

  let sent = 0;
  let skipped = 0;

  for (const subscriber of subscribers) {
    for (const pregnancy of subscriber.pregnancies) {
      if (!isWeekTurnoverDay(pregnancy.dueDate, today)) {
        skipped++;
        continue;
      }

      const week = gestationalWeek(pregnancy.dueDate, today);
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${basePath}/api/unsubscribe?token=${subscriber.unsubscribeToken}`;

      if (week > 40) {
        await sendFinalEmail(subscriber.email, {
          parentName: pregnancy.parentName,
          unsubscribeUrl,
        });
        await prisma.subscriber.update({
          where: { id: subscriber.id },
          data: { active: false },
        });
        sent++;
      } else if (week >= 4) {
        const content = findWeekContent(weeklyContent, week);
        if (content) {
          await sendWeeklyEmail(subscriber.email, {
            parentName: pregnancy.parentName,
            week,
            animal: content.animal,
            emoji: content.emoji,
            size: content.size,
            bodyChanges: content.bodyChanges,
            babySize: content.babySize,
            babyDevelopment: content.babyDevelopment,
            apaUrl: content.apaUrl,
            unsubscribeUrl,
            fruitSize: content.fruitSize,
            funFact: content.funFact,
          });
          sent++;
        } else {
          skipped++;
        }
      } else {
        // Week < 4: too early, skip
        skipped++;
      }
    }
  }

  return NextResponse.json({ sent, skipped });
}
