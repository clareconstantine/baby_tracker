import { Resend } from "resend";
import { weeklyEmailHtml, weeklyEmailSubject, type WeeklyEmailData } from "@/emails/weeklyEmail";
import { finalEmailHtml, finalEmailSubject, type FinalEmailData } from "@/emails/finalEmail";

const from = process.env.RESEND_FROM ?? "Baby Tracker <noreply@example.com>";

async function send(payload: Parameters<Resend["emails"]["send"]>[0]) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send(payload);
  if (error) throw new Error(`Resend error: ${error.message}`);
  return data;
}

export async function sendWeeklyEmail(to: string, data: WeeklyEmailData) {
  return send({
    from,
    to,
    subject: weeklyEmailSubject(data),
    html: weeklyEmailHtml(data),
  });
}

export async function sendFinalEmail(to: string, data: FinalEmailData) {
  return send({
    from,
    to,
    subject: finalEmailSubject(data),
    html: finalEmailHtml(data),
  });
}
