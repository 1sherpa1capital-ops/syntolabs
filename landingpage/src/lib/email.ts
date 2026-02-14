export interface SendEmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

export interface SendEmailResponse {
  success: boolean;
  data?: {
    id: string;
    from: string;
    to: string;
    subject: string;
  };
  error?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResponse> {
  const { to, subject, text, html, attachments } = params;

  if (!to || !subject) {
    return { success: false, error: "Missing required fields: to, subject" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY is not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Synto Labs <team@syntolabs.xyz>",
        to,
        subject,
        text,
        html,
        attachments,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Resend] Error sending email:", data);
      return { success: false, error: data.message || "Failed to send email" };
    }

    console.log("[Resend] Email sent successfully:", data);
    return {
      success: true,
      data: {
        id: data.id,
        from: data.from,
        to: data.to,
        subject: data.subject,
      },
    };
  } catch (error) {
    console.error("[Resend] Exception sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendTestEmail(): Promise<SendEmailResponse> {
  return sendEmail({
    to: "team@syntolabs.xyz",
    subject: "Test Email from Synto Labs",
    text: "This is a test email sent via Resend API.",
    html: `
      <html>
        <body>
          <h1>Test Email from Synto Labs</h1>
          <p>This is a test email sent via Resend API.</p>
        </body>
      </html>
    `,
  });
}
