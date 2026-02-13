/**
 * Get Cal.com organization info to find the right endpoint
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_VERSION = '2024-08-13';

async function testEndpoints() {
  console.log("Testing different Cal.com API endpoints...\n");

  // Test 1: GET /v2/me
  console.log("1. Testing /v2/me");
  const meRes = await fetch("https://api.cal.com/v2/me", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${meRes.status}`);
  if (meRes.ok) {
    const meData = await meRes.json();
    console.log(`   User: ${meData.data?.name} (${meData.data?.email})`);
    console.log(`   Organization ID: ${meData.data?.organizationId}`);
  }

  // Test 2: GET /v2/organizations
  console.log("\n2. Testing /v2/organizations");
  const orgRes = await fetch("https://api.cal.com/v2/organizations", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${orgRes.status}`);
  if (orgRes.ok) {
    const orgData = await orgRes.json();
    console.log(`   Found ${orgData.data?.length || 0} organizations`);
    if (orgData.data?.[0]) {
      console.log(`   Org: ${orgData.data[0].name} (ID: ${orgData.data[0].id})`);
    }
  }

  // Test 3: List all event types
  console.log("\n3. Testing /v2/event-types (list)");
  const listRes = await fetch("https://api.cal.com/v2/event-types", {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${listRes.status}`);
  if (listRes.ok) {
    const listData = await listRes.json();
    console.log(`   Found ${listData.data?.length || 0} event types`);
  }

  // Test 4: Try organization-scoped event types
  console.log("\n4. Testing /v2/organizations/{orgId}/event-types");
  if (orgRes.ok) {
    const orgData = await orgRes.json();
    if (orgData.data?.[0]) {
      const orgId = orgData.data[0].id;
      const orgEventsRes = await fetch(`https://api.cal.com/v2/organizations/${orgId}/event-types`, {
        headers: {
          "cal-api-version": CAL_API_VERSION,
          "Authorization": `Bearer ${CAL_API_KEY}`
        }
      });
      console.log(`   Status: ${orgEventsRes.status}`);
      if (orgEventsRes.ok) {
        const orgEventsData = await orgEventsRes.json();
        console.log(`   Found ${orgEventsData.data?.length || 0} event types`);
      }
    }
  }
}

testEndpoints().catch(console.error);
