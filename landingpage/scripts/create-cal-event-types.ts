/**
 * Create new Cal.com event types with custom booking fields
 *
 * This script creates 4 event types (discovery, sales-call, product-consult, partner-up)
 * each with custom qualifying questions to collect user information.
 */

import { SYNTOLABS_BOOKING_FIELDS } from "../src/lib/calcom";

const CAL_API_KEY = process.env.CAL_API_KEY;

const EVENT_TYPES = [
  {
    title: "Discovery Call (15 min)",
    slug: "discovery-call",
    duration: 15,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: { enabled: true, duration: 15, interval: 15 }
  },
  {
    title: "Sales Call (30 min)",
    slug: "sales-call",
    duration: 30,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: { enabled: true, duration: 30, interval: 30 }
  },
  {
    title: "Product Consult (60 min)",
    slug: "product-consult",
    duration: 60,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: { enabled: true, duration: 60, interval: 60 }
  },
  {
    title: "Partner Up (45 min)",
    slug: "partner-up",
    duration: 45,
    bookingFieldsResponses: SYNTOLABS_BOOKING_FIELDS,
    availability: { enabled: true, duration: 45, interval: 45 }
  }
];

async function createEventTypes() {
  console.log("Creating Cal.com event types with qualifying questions...\n");
  console.log("API Key:", CAL_API_KEY?.substring(0, 20) + "...");

  const createdEventTypes: Array<{ id: number; slug: string }> = [];

  for (const eventType of EVENT_TYPES) {
    try {
      console.log(`Creating ${eventType.slug}...`);

      const response = await fetch("https://api.cal.com/v2/event_types", {
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
        console.error(`Failed to create ${eventType.slug}:`);
        console.error(`Status: ${response.status}`);
        console.error(`Response: ${errorText}`);
        continue;
      }

      const data = await response.json();
      console.log(`✓ Created ${eventType.slug}:`);
      console.log(`  ID: ${data.id}`);
      console.log(`  Slug: ${data.slug}`);

      createdEventTypes.push({
        id: data.id,
        slug: data.slug
      });

    } catch (error) {
      console.error(`Error creating ${eventType.slug}:`, error);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`Created ${createdEventTypes.length} event types`);
  createdEventTypes.forEach(({slug, id}) => {
    console.log(`  - ${slug}: ${id}`);
  });

  console.log("\n" + "=".repeat(50));
  console.log("Update your .env.local with these event type slugs:");
  createdEventTypes.forEach(({slug}) => {
    const envVar = `CAL_LINK_${slug.toUpperCase().replace(/-/g, "_")}`;
    console.log(`${envVar}=${slug}`);
  });
}

createEventTypes().catch(console.error);
