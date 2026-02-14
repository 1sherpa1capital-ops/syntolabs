import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';



// Simple in-memory store for recent booking events
const recentBookings: Array<{
  uid: string;
  email?: string;
  start?: string;
  status: string;
  type: "created" | "cancelled";
  createdAt: string;
}> = [];

export async function GET(request: NextRequest) {
  // Return recent bookings for frontend polling
  return NextResponse.json({ bookings: recentBookings.slice(-10) });
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.CAL_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('CAL_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const payload = await request.text();
    const headers = request.headers;

    const calSignature = headers.get('x-cal-signature') as string;
    const calTimestamp = headers.get('x-cal-timestamp') as string;

    if (!calSignature || !calTimestamp) {
      return NextResponse.json(
        { error: 'Missing Cal.com headers' },
        { status: 400 }
      );
    }

    // Verify webhook signature using HMAC-SHA256
    const hmac = createHmac('sha256', webhookSecret);
    hmac.update(payload);
    const expectedSignature = hmac.digest('base64');

    if (calSignature !== expectedSignature) {
      console.error('Cal.com webhook signature verification failed');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(payload);

    // Process booking events
    if (event.triggerEvent === 'BOOKING_CREATED') {
      const booking = {
        uid: event.payload?.uid,
        email: event.payload?.attendee?.email,
        start: event.payload?.start,
        status: event.payload?.status,
        type: "created" as const,
        createdAt: new Date().toISOString(),
      };

      recentBookings.push(booking);
      console.log('Cal.com booking created:', booking);
    } else if (event.triggerEvent === 'BOOKING_CANCELLED') {
      const booking = {
        uid: event.payload?.uid,
        email: event.payload?.attendee?.email,
        start: event.payload?.start,
        status: event.payload?.status,
        type: "cancelled" as const,
        createdAt: new Date().toISOString(),
      };

      recentBookings.push(booking);
      console.log('Cal.com booking cancelled:', booking);
    } else {
      console.log('Cal.com webhook event:', event.triggerEvent, event);
    }

    // Keep only last 50 bookings
    if (recentBookings.length > 50) {
      recentBookings.splice(0, recentBookings.length - 50);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Cal.com webhook processing error:', error);

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
