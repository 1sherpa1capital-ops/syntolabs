/**
 * Patch event type by ID directly
 */

import { config } from 'dotenv';
import { SYNTOLABS_BOOKING_FIELDS } from "../src/lib/calcom";

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_VERSION = '2024-08-13';

// Known event type IDs from bookings
const EVENT_TYPES = [
  { id: '4753610', slug: 'discovery-call' },
];

async function patchEventType(eventTypeId, slug) {
  console.log(`\nTrying to patch event type: ${slug} (ID: ${eventTypeId})`);

  // First try GET to see current state
  console.log("  Fetching current state...");
  const getRes = await fetch(`https://api.cal.com/v2/event-types/${eventTypeId}`, {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });

  console.log(`  GET Status: ${getRes.status}`);
  if (getRes.ok) {
    const getData = await getRes.json();
    console.log(`  Current bookingFields count: ${getData.data?.bookingFields?.length || 0}`);
    console.log(`  Title: ${getData.data?.title}`);
    console.log(`  Slug: ${getData.data?.slug}`);
  } else {
    console.log(`  Error: ${await getRes.text()}`);
    return;
  }

  // Now try PATCH
  console.log("  Patching with booking fields...");
  const patchRes = await fetch(`https://api.cal.com/v2/event-types/${eventTypeId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    },
    body: JSON.stringify({
      bookingFields: SYNTOLABS_BOOKING_FIELDS
    })
  });

  console.log(`  PATCH Status: ${patchRes.status}`);
  if (patchRes.ok) {
    const patchData = await patchRes.json();
    console.log(`  ✅ Success! New bookingFields count: ${patchData.data?.bookingFields?.length || 0}`);
  } else {
    const error = await patchRes.text();
    console.log(`  Error: ${error}`);
  }
}

async function main() {
  console.log("Patching event types by ID...\n");
  console.log("Booking fields to apply:", SYNTOLABS_BOOKING_FIELDS.length, "fields");

  for (const et of EVENT_TYPES) {
    await patchEventType(et.id, et.slug);
  }
}

main().catch(console.error);
