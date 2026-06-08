import { Resend } from "resend";
import { weeklyEmailHtml, weeklyEmailSubject, type WeeklyEmailData } from "@/emails/weeklyEmail";
import { finalEmailHtml, finalEmailSubject, type FinalEmailData } from "@/emails/finalEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.RESEND_FROM ?? "Baby Tracker <noreply@example.com>";

export async function sendWeeklyEmail(to: string, data: WeeklyEmailData) {
  return resend.emails.send({
    from,
    to,
    subject: weeklyEmailSubject(data),
    html: weeklyEmailHtml(data),
  });
}

export async function sendFinalEmail(to: string, data: FinalEmailData) {
  return resend.emails.send({
    from,
    to,
    subject: finalEmailSubject(data),
    html: finalEmailHtml(data),
  });
}
