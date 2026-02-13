/**
 * Update existing Cal.com event types with custom booking fields using PATCH
 */

import { config } from 'dotenv';
import { SYNTOLABS_BOOKING_FIELDS } from "../src/lib/calcom";

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_VERSION = '2024-08-13';

if (!CAL_API_KEY) {
  console.error("Error: CAL_API_KEY not found in .env.local");
  process.exit(1);
}

console.log("API Key loaded:", CAL_API_KEY.substring(0, 20) + "...");
console.log("\nUpdating Cal.com event types with booking fields...\n");

const EVENT_TYPE_SLUGS = [
  'discovery-call',
  'sales-call',
  'product-consult',
  'partner-up'
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateEventTypeWithRetry(slug, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // First, get the event type to find its ID
      console.log(`Fetching ${slug}...`);
      const getResponse = await fetch(`https://api.cal.com/v2/event-types?slug=${slug}`, {
        method: "GET",
        headers: {
          "cal-api-version": CAL_API_VERSION,
          "Authorization": `Bearer ${CAL_API_KEY}`
        }
      });

      if (!getResponse.ok) {
        const error = await getResponse.text();
        if (getResponse.status === 429) {
          const retryAfter = getResponse.headers.get('retry-after') || '5';
          console.log(`   Rate limited. Waiting ${retryAfter}s...`);
          await delay(parseInt(retryAfter) * 1000);
          continue;
        }
        console.log(`   Failed to fetch: ${getResponse.status} - ${error}`);
        return null;
      }

      const getData = await getResponse.json();
      const eventType = getData.data?.find((et) => et.slug === slug);
      
      if (!eventType) {
        console.log(`   Event type not found`);
        return null;
      }

      console.log(`   Found: ID=${eventType.id}, current bookingFields count: ${eventType.bookingFields?.length || 0}`);

      // Now patch to update booking fields
      console.log(`   Patching with booking fields...`);
      const patchResponse = await fetch(`https://api.cal.com/v2/event-types/${eventType.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": CAL_API_VERSION,
          "Authorization": `Bearer ${CAL_API_KEY}`
        },
        body: JSON.stringify({
          bookingFields: SYNTOLABS_BOOKING_FIELDS
        })
      });

      if (!patchResponse.ok) {
        const error = await patchResponse.text();
        if (patchResponse.status === 429) {
          const retryAfter = patchResponse.headers.get('retry-after') || '5';
          console.log(`   Rate limited on patch. Waiting ${retryAfter}s...`);
          await delay(parseInt(retryAfter) * 1000);
          continue;
        }
        console.log(`   Failed to patch: ${patchResponse.status} - ${error}`);
        return null;
      }

      const patchData = await patchResponse.json();
      console.log(`   ✅ Updated! New bookingFields count: ${patchData.data?.bookingFields?.length || 0}`);
      return patchData.data;

    } catch (error) {
      console.log(`   Attempt ${attempt} failed:`, error);
      if (attempt < maxRetries) {
        await delay(2000 * attempt);
      }
    }
  }
  return null;
}

async function main() {
  console.log("Using booking fields:", JSON.stringify(SYNTOLABS_BOOKING_FIELDS, null, 2));
  console.log("\n---\n");

  for (const slug of EVENT_TYPE_SLUGS) {
    await updateEventTypeWithRetry(slug);
    await delay(1000); // Small delay between each
  }

  console.log("\nDone!");
}

main().catch(console.error);
