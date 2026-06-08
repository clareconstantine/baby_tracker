import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribe?error=missing", request.url));
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: { unsubscribeToken: token },
  });

  if (!subscriber) {
    return NextResponse.redirect(new URL("/unsubscribe?error=invalid", request.url));
  }

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: { active: false },
  });

  return NextResponse.redirect(new URL("/unsubscribe?success=true", request.url));
}
