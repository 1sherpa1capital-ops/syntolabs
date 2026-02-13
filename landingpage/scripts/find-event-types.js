/**
 * Find event types using different approaches
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_VERSION = '2024-08-13';

async function findEventTypes() {
  console.log("Trying different approaches to find event types...\n");

  // Approach 1: List ALL event types (no params)
  console.log("1. GET /v2/event-types");
  const listRes = await fetch("https://api.cal.com/v2/event-types", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${listRes.status}`);
  if (listRes.ok) {
    const data = await listRes.json();
    console.log(`   Found: ${data.data?.length || 0} event types`);
    if (data.data?.[0]) {
      console.log(`   Sample:`, JSON.stringify(data.data[0], null, 2).substring(0, 500));
    }
  } else {
    console.log(`   Error: ${await listRes.text()}`);
  }

  // Approach 2: Try with pagination
  console.log("\n2. GET /v2/event-types?limit=10");
  const pageRes = await fetch("https://api.cal.com/v2/event-types?limit=10", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${pageRes.status}`);

  // Approach 3: Try bookings to see if any exist
  console.log("\n3. GET /v2/bookings?limit=1");
  const bookingsRes = await fetch("https://api.cal.com/v2/bookings?limit=1", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${bookingsRes.status}`);
  if (bookingsRes.ok) {
    const bData = await bookingsRes.json();
    console.log(`   Found: ${bData.data?.length || 0} bookings`);
  }
}

findEventTypes().catch(console.error);
