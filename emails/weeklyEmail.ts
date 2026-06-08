export interface WeeklyEmailData {
  parentName: string;
  week: number;
  animal: string;
  emoji: string;
  size: string;
  bodyChanges: string | null;
  babySize: string | null;
  babyDevelopment: string | null;
  apaUrl: string;
  unsubscribeUrl: string;
  fruitSize: string | null;
  funFact: string | null;
}

export function weeklyEmailSubject(data: WeeklyEmailData): string {
  return `Week ${data.week}: ${data.parentName}'s baby is the size of a ${data.animal} ${data.emoji}`;
}

export function weeklyEmailHtml(data: WeeklyEmailData): string {
  const { parentName, week, animal, emoji, size, bodyChanges, babySize, babyDevelopment, apaUrl, unsubscribeUrl, fruitSize, funFact } = data;

  const section = (heading: string, content: string | null) =>
    content
      ? `
        <div style="margin-bottom:24px;">
          <h2 style="font-size:16px;font-weight:600;color:#6b7bbd;margin:0 0 8px 0;">${heading}</h2>
          <p style="margin:0;color:#374151;line-height:1.6;">${content}</p>
        </div>`
      : "";

  const fruitSizeBlock = fruitSize
    ? `<p style="margin:6px 0 0 0;font-size:13px;color:#6b7280;">Also about the size of a <strong>${fruitSize}</strong> 🍑</p>`
    : "";

  const funFactBlock = funFact
    ? `
      <div style="background:#f0f4ff;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;font-weight:600;color:#6b7bbd;text-transform:uppercase;letter-spacing:0.06em;">Did you know?</p>
        <p style="margin:6px 0 0 0;color:#374151;line-height:1.6;font-size:14px;">${funFact}</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Week ${week}: ${parentName}'s baby</title>
</head>
<body style="margin:0;padding:0;background-color:#fef9f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fef9f0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#9fa8da,#b3c8f0);padding:32px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:13px;font-weight:600;letter-spacing:0.08em;color:#ffffff;text-transform:uppercase;">Week ${week}</p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">${parentName}'s baby</h1>
            </td>
          </tr>

          <!-- Animal card -->
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <div style="background:#fef3c7;border-radius:12px;padding:24px;text-align:center;">
                <div style="font-size:56px;margin-bottom:8px;">${emoji}</div>
                <p style="margin:0;font-size:18px;font-weight:600;color:#374151;">
                  About the size of a <strong>${animal}</strong>
                </p>
                <p style="margin:6px 0 0 0;font-size:14px;color:#6b7280;">${size}</p>
                ${fruitSizeBlock}
              </div>
            </td>
          </tr>

          <!-- APA content -->
          <tr>
            <td style="padding:32px;">
              ${funFactBlock}
              ${section("What's happening with their body?", bodyChanges)}
              ${section("How big is their baby?", babySize)}
              ${section("What's happening with the baby?", babyDevelopment)}

              <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-top:8px;">
                <a href="${apaUrl}" style="color:#6b7bbd;font-size:14px;">
                  Read more on the American Pregnancy Association website →
                </a>
                <p style="margin:4px 0 0 0;font-size:12px;color:#9ca3af;">
                  Content sourced from the American Pregnancy Association.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 32px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                You're receiving this because you signed up for Baby Tracker.<br/>
                <a href="${unsubscribeUrl}" style="color:#9ca3af;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
