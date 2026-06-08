import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendWeeklyEmail, sendFinalEmail } from "@/lib/email";
import { gestationalWeek } from "@/lib/pregnancy";
import { findWeekContent, type WeekContent } from "@/lib/content";
import rawContent from "@/data/weekly-content.json";

const weeklyContent = rawContent as WeekContent[];

export async function POST(request: Request) {
  const body = await request.json();
  const { email, parentName, dueDate } = body as {
    email: string;
    parentName: string;
    dueDate: string;
  };

  if (!email || !parentName || !dueDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const dueDateObj = new Date(dueDate);
  if (isNaN(dueDateObj.getTime())) {
    return NextResponse.json({ error: "Invalid due date" }, { status: 400 });
  }

  // Upsert subscriber (in case they're re-subscribing with a new pregnancy)
  const subscriber = await prisma.subscriber.upsert({
    where: { email },
    update: { active: true },
    create: { email },
  });

  await prisma.pregnancy.create({
    data: {
      parentName,
      dueDate: dueDateObj,
      subscriberId: subscriber.id,
    },
  });

  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/unsubscribe?token=${subscriber.unsubscribeToken}`;
  const week = gestationalWeek(dueDateObj);

  if (week > 40) {
    await sendFinalEmail(email, { parentName, unsubscribeUrl });
  } else if (week >= 4) {
    const content = findWeekContent(weeklyContent, week);
    if (content) {
      await sendWeeklyEmail(email, {
        parentName,
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
    }
  }

  return NextResponse.json({ success: true });
}
