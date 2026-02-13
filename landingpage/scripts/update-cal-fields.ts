/**
 * Update Cal.com event types with custom booking fields
 *
 * This script adds qualifying questions to our Synto Labs event types
 * to collect information about leads before booking.
 */

import { SYNTOLABS_BOOKING_FIELDS } from "../src/lib/calcom";

const CAL_API_KEY = process.env.CAL_API_KEY;

async function updateEventTypes() {
  console.log("Fetching existing Cal.com event types...");

  // First, get all event types
  const listResponse = await fetch("https://api.cal.com/v2/event-types", {
    method: "GET",
    headers: {
      "cal-api-version": "2024-08-13",
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });

  if (!listResponse.ok) {
    throw new Error(`Failed to fetch event types: ${listResponse.statusText}`);
  }

  const eventTypes = await listResponse.json();
  console.log(`Found ${eventTypes.data.length} event types`);

  // Update each event type with custom booking fields
  for (const eventType of eventTypes.data) {
    try {
      console.log(`Updating ${eventType.slug} (${eventType.id})...`);

      const response = await fetch(`https://api.cal.com/v2/event-types/${eventType.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": "2024-08-13",
          "Authorization": `Bearer ${CAL_API_KEY}`
        },
        body: JSON.stringify({
          bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS
        })
      });

      if (!response.ok) {
        console.error(`Failed to update ${eventType.slug}:`, await response.text());
        continue;
      }

      const data = await response.json();
      const fieldCount = data.bookingFieldsResponses?.length || 0;
      console.log(`✓ Updated ${eventType.slug}:`, fieldCount, "fields added");

    } catch (error) {
      console.error(`Error updating ${eventType.slug}:`, error);
    }
  }

  console.log("✅ All event types updated with qualifying questions!");
}

// Run the update
updateEventTypes().catch(console.error);
