export interface FinalEmailData {
  parentName: string;
  unsubscribeUrl: string;
}

export function finalEmailSubject(data: FinalEmailData): string {
  return `${data.parentName}'s baby is here (or coming any day now!) 👶`;
}

export function finalEmailHtml(data: FinalEmailData): string {
  const { parentName, unsubscribeUrl } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${parentName}'s baby is here!</title>
</head>
<body style="margin:0;padding:0;background-color:#fef9f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fef9f0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#9fa8da,#b3c8f0);padding:48px 32px;text-align:center;">
              <div style="font-size:72px;margin-bottom:16px;">👶</div>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">
                ${parentName}'s baby is here!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;text-align:center;">
              <p style="margin:0 0 16px 0;font-size:18px;color:#374151;line-height:1.6;">
                Or coming any day now — either way, it's almost time!
              </p>
              <p style="margin:0;font-size:16px;color:#6b7280;line-height:1.6;">
                You've followed ${parentName}'s pregnancy from the very beginning.
                That's 40 weeks of growth, from the size of an ant larva to a whole entire baby. 🥹
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 32px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                This is your last email from Baby Tracker for this pregnancy.<br/>
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
