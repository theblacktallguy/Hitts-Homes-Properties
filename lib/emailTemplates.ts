type EmailLayoutOptions = {
  title: string;
  preview: string;
  greeting: string;
  content: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function companyEmail({ title, preview, greeting, content }: EmailLayoutOptions) {
  return `
    <div style="margin:0;padding:32px 16px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#162033;">
      <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">${escapeHtml(preview)}</span>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 32px rgba(11,31,58,.10);">
        
        <tr><td style="padding:22px 32px;background:#0B1F3A;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="vertical-align:middle;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;padding-right:12px;">
                      <div style="width:48px;height:48px;background:#ffffff;border-radius:12px;padding:4px;box-sizing:border-box;box-shadow:0 2px 8px rgba(0,0,0,.16);">
                        <img src="https://hittshomes.com/logo/logobg.png" alt="Hitts Homes Logo" width="40" height="40" style="display:block;width:40px;height:40px;object-fit:contain;border-radius:8px;" />
                      </div>
                    </td>
                    <td style="vertical-align:middle;">
                      <span style="font-size:16px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">Hitts Homes &amp; Properties</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:18px;font-size:25px;font-weight:700;line-height:1.25;color:#ffffff;text-align:center;">${escapeHtml(title)}</div>
        </td></tr>

        <tr><td style="padding:32px;">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.6;">${escapeHtml(greeting)}</p>
          ${content}
        </td></tr>
        <tr><td style="padding:22px 32px;background:#f8f7f4;border-top:1px solid #e9e6df;color:#667085;font-size:12px;line-height:1.6;text-align:center;">
          This is an automated no-reply email. Questions? Contact your Hitts Homes agent at <a href="mailto:agentdavidhitt@gmail.com" style="color:#0B1F3A;font-weight:700;text-decoration:none;">agentdavidhitt@gmail.com</a> or (248) 636-0376.<br />
          © ${new Date().getFullYear()} Hitts Homes &amp; Properties. All rights reserved.
        </td></tr>
      </table>
    </div>`;
}

export function detailCard(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">${rows
    .map(
      ([label, value]) => `<tr><td style="padding:13px 16px;border-bottom:1px solid #e5e7eb;color:#667085;font-size:13px;width:38%;">${escapeHtml(label)}</td><td style="padding:13px 16px;border-bottom:1px solid #e5e7eb;color:#162033;font-size:14px;font-weight:600;">${escapeHtml(value)}</td></tr>`
    )
    .join("")}</table>`;
}
