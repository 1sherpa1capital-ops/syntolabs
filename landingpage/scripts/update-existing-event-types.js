/**
 * Update existing Cal.com event types with custom booking fields
 *
 * This script patches existing event types with qualifying questions
 */

import { config } from 'dotenv';
import { SYNTOLABS_BOOKING_FIELDS } from "../src/lib/calcom";

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;

if (!CAL_API_KEY) {
  console.error("CAL_API_KEY not found in .env.local");
  process.exit(1);
}

const EVENT_TYPE_SLUGS = [
  "discovery-call",
  "sales-call",
  "product-consult",
  "partner-up"
];

async function updateEventTypes() {
  console.log("Updating existing Cal.com event types with booking fields...\n");

  let updatedCount = 0;

  for (const slug of EVENT_TYPE_SLUGS) {
    try {
      console.log(`Updating ${slug}...`);

      // Try different endpoint formats
      const endpoints = [
        `https://api.cal.com/v2/event_types/${slug}`,
        `https://api.cal.com/v2/event-types/${slug}`,
        `https://api.cal.com/v2/event_type/${slug}`,
      ];

      let success = false;
      for (const endpoint of endpoints) {
        const response = await fetch(endpoint, {
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

        if (response.ok) {
          const data = await response.json();
          const fieldCount = data.bookingFieldsResponses?.length || 0;
          console.log(` Updated ${slug}: ${fieldCount} fields added`);
          updatedCount++;
          success = true;
          break;
        }
      }

      if (!success) {
        console.error(`Failed to update ${slug} - tried all endpoint formats`);
      }

    } catch (error) {
      console.error(`Error updating ${slug}:`, error);
    }
  }

  console.log(`\nUpdated ${updatedCount} event types with booking fields`);
}

updateEventTypes().catch(console.error);
