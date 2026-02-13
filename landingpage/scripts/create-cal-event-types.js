/**
 * Create new Cal.com event types with custom booking fields
 *
 * This script creates 4 event types (discovery, sales-call, product-consult, partner-up)
 * each with custom qualifying questions to collect user information.
 */

import { config } from 'dotenv';
import { SYNTOLABS_BOOKING_FIELDS } from "../src/lib/calcom";

// Load environment variables
config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;

if (!CAL_API_KEY) {
  console.error("CAL_API_KEY not found in .env.local");
  process.exit(1);
}

console.log("API Key loaded:", CAL_API_KEY?.substring(0, 20) + "...");

const EVENT_TYPES = [
  {
    title: "Discovery Call (15 min)",
    slug: "discovery-call",
    duration: 15,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: {
      enabled: true,
      duration: 15,
      interval: 15
    },
    color: {
      lightThemeHex: "#10b981",
      darkThemeHex: "#22c55e"
    }
  },
  {
    title: "Sales Call (30 min)",
    slug: "sales-call",
    duration: 30,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: {
      enabled: true,
      duration: 30,
      interval: 30
    },
    color: {
      lightThemeHex: "#10b981",
      darkThemeHex: "#22c55e"
    }
  },
  {
    title: "Product Consult (60 min)",
    slug: "product-consult",
    duration: 60,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: {
      enabled: true,
      duration: 60,
      interval: 60
    },
    color: {
      lightThemeHex: "#10b981",
      darkThemeHex: "#22c55e"
    }
  },
  {
    title: "Partner Up (45 min)",
    slug: "partner-up",
    duration: 45,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: {
      enabled: true,
      duration: 45,
      interval: 45
    },
    color: {
      lightThemeHex: "#10b981",
      darkThemeHex: "#22c55e"
    }
  }
];

async function createEventTypes() {
  console.log("Testing API access...\n");

  // First, check /me endpoint to see what's available
  console.log("1. Testing /me endpoint...");
  const meResponse = await fetch("https://api.cal.com/v2/me", {
    method: "GET",
    headers: {
      "cal-api-version": "2024-08-13",
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });

  if (meResponse.ok) {
    const meData = await meResponse.json();
    console.log("   User data retrieved:");
    console.log(`     Name: ${meData.data?.name || "N/A"}`);
    console.log(`     Email: ${meData.data?.email || "N/A"}`);
  } else {
    console.error("   Failed to fetch /me endpoint:", await meResponse.text());
  }

  // Try listing event types to see existing ones
  console.log("\n2. Listing existing event types...");
  const listResponse = await fetch("https://api.cal.com/v2/event-types", {
    method: "GET",
    headers: {
      "cal-api-version": "2024-08-13",
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });

  let existingCount = 0;
  if (listResponse.ok) {
    const listData = await listResponse.json();
    existingCount = listData.data?.length || 0;
    console.log(`   Found ${existingCount} existing event type(s)`);
    if (existingCount > 0) {
      console.log("   Existing types:");
      listData.data.forEach(et => console.log(`     - ${et.slug} (${et.id})`));
    }
  } else {
    console.error("   Failed to list event types:", await listResponse.text());
  }

  // Try creating a test event type first
  console.log("\n3. Creating test event type...");
  const testEventType = {
    title: "Test Event Type",
    slug: "test-event-type",
    duration: 15,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: { enabled: true, duration: 15, interval: 15 }
  };

  const testResponse = await fetch("https://api.cal.com/v2/event-types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
      "Authorization": `Bearer ${CAL_API_KEY}`
    },
    body: JSON.stringify(testEventType)
  });

  if (!testResponse.ok) {
    const errorText = await testResponse.text();
    console.error("   Failed to create test event type:");
    console.error(`   Status: ${testResponse.status}`);
    console.error(`   Response: ${errorText}`);
    console.log("\n   The API key may not have permissions to create event types.");
    console.log("   Please create event types manually in the Cal.com dashboard:");
    console.log("   https://app.cal.com/event-types");
    return;
  }

  const testData = await testResponse.json();
  console.log("   Test event type created successfully!");
  console.log(`   ID: ${testData.id}`);
  console.log(`   Slug: ${testData.slug}`);

  // Delete the test event type
  console.log("\n4. Deleting test event type...");
  const deleteResponse = await fetch(`https://api.cal.com/v2/event-types/${testData.id}`, {
    method: "DELETE",
    headers: {
      "cal-api-version": "2024-08-13",
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });

  if (deleteResponse.ok) {
    console.log("   Test event type deleted successfully!");
  } else {
    console.error("   Failed to delete test event type:", await deleteResponse.text());
  }

  // Now create the actual event types
  console.log("\n5. Creating Cal.com event types with qualifying questions...");

  const createdEventTypes = [];

  for (const eventType of EVENT_TYPES) {
    try {
      console.log(`   Creating ${eventType.slug}...`);

      const response = await fetch("https://api.cal.com/v2/event-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": "2024-08-13",
          "Authorization": `Bearer ${CAL_API_KEY}`
        },
        body: JSON.stringify(eventType)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`   Failed to create ${eventType.slug}:`);
        console.error(`   Status: ${response.status}`);
        console.error(`   Response: ${errorText}`);
        continue;
      }

      const data = await response.json();
      console.log(`   Created ${eventType.slug}:`);
      console.log(`     ID: ${data.id}`);
      console.log(`     Slug: ${data.slug}`);

      createdEventTypes.push({
        id: data.id,
        slug: data.slug
      });

    } catch (error) {
      console.error(`   Error creating ${eventType.slug}:`, error);
    }
  }

  console.log(`\nCreated ${createdEventTypes.length} event types`);
  createdEventTypes.forEach(({slug, id}) => {
    console.log(`  - ${slug}: ${id}`);
  });

  console.log("\nUpdate your .env.local with these event type slugs:");
  createdEventTypes.forEach(({slug}) => {
    const envVar = `CAL_LINK_${slug.toUpperCase().replace(/-/g, "_")}`;
    console.log(`${envVar}=${slug}`);
  });
}

createEventTypes().catch(console.error);
