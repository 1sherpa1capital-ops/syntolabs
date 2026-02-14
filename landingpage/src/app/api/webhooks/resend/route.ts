import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface ResendEmailPayload {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: string;
  }>;
}

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

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("resend-signature") || "";
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(body, signature, webhookSecret);
      if (!isValid) {
        console.error("[Resend Webhook] Invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(body);

    console.log("[Resend Webhook] Received event:", event.type);

    if (event.type === "email.received") {
      const emailData: ResendEmailPayload = {
        from: event.data.from,
        to: event.data.to,
        subject: event.data.subject,
        text: event.data.text,
        html: event.data.html,
        attachments: event.data.attachments,
      };

      console.log("[Resend Webhook] Received email:", {
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        hasAttachments: !!emailData.attachments?.length,
      });

      return NextResponse.json({ received: true }, { status: 200 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[Resend Webhook] Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
