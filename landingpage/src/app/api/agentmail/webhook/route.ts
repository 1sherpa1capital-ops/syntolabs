import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { z } from 'zod';

const webhookPayloadSchema = z.object({
  type: z.string(),
  data: z.record(z.unknown()),
});

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.AGENTMAIL_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('AGENTMAIL_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const payload = await request.text();
    const headers = request.headers;

    const svixId = headers.get('svix-id');
    const svixTimestamp = headers.get('svix-timestamp');
    const svixSignature = headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing Svix headers' },
        { status: 400 }
      );
    }

    const wh = new Webhook(webhookSecret);

    let event: unknown;

    try {
      event = wh.verify(payload, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const parsedEvent = webhookPayloadSchema.parse(event);

    if (parsedEvent.type === 'message.received') {
      const messageData = parsedEvent.data;
      console.log('Incoming email received:', {
        messageId: messageData.id,
        from: messageData.from,
        to: messageData.to,
        subject: messageData.subject,
        body: messageData.body,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Webhook payload validation error:', error.errors);
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
