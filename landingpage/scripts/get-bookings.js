/**
 * Get event type IDs from bookings
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_VERSION = '2024-08-13';

async function getEventTypeIdsFromBookings() {
  console.log("Fetching bookings to find event type IDs...\n");

  const res = await fetch("https://api.cal.com/v2/bookings?limit=20", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });

  if (!res.ok) {
    console.log(`Error: ${res.status} - ${await res.text()}`);
    return;
  }

  const data = await res.json();
  console.log(`Found ${data.data?.length || 0} bookings\n`);

  // Extract unique event types
  const eventTypeIds = new Set();
  const eventTypeSlugs = new Set();
  
  data.data?.forEach(booking => {
    if (booking.eventTypeId) {
      eventTypeIds.add(booking.eventTypeId);
    }
    if (booking.eventType?.slug) {
      eventTypeSlugs.add(booking.eventType.slug);
    }
    console.log(`Booking: ${booking.title}`);
    console.log(`  Event Type ID: ${booking.eventTypeId}`);
    console.log(`  Event Type Slug: ${booking.eventType?.slug}`);
    console.log(`  Status: ${booking.status}`);
    console.log("");
  });

  console.log("Unique Event Type IDs:", [...eventTypeIds]);
  console.log("Unique Event Type Slugs:", [...eventTypeSlugs]);
}

getEventTypeIdsFromBookings().catch(console.error);
