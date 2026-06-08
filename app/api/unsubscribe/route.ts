import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  const redirect = (search: string) => {
    const url = request.nextUrl.clone();
    url.pathname = "/unsubscribe";
    url.search = search;
    return NextResponse.redirect(url);
  };

  if (!token) {
    return redirect("?error=missing");
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: { unsubscribeToken: token },
  });

  if (!subscriber) {
    return redirect("?error=invalid");
  }

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: { active: false },
  });

  return redirect("?success=true");
}
