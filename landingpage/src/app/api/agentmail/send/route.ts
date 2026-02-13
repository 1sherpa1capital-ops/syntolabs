import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AgentMailClient } from 'agentmail';

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = sendEmailSchema.parse(body);

    const apiKey = process.env.AGENTMAIL_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AGENTMAIL_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const client = new AgentMailClient({ apiKey });

    const result = await client.inboxes.messages.send('team@syntolabs.com', {
      to: [validatedData.to],
      subject: validatedData.subject,
      text: validatedData.body,
    });

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('AgentMail send error:', error);

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
