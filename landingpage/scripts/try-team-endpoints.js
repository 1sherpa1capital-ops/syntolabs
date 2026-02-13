/**
 * Try team-scoped endpoints
 */

import { config } from 'dotenv';

config({ path: '.env.local' });

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_VERSION = '2024-08-13';

// The user's URL shows: /rhigden-sonam-sherpa-624tui/partner-up
// The team/user slug appears to be: rhigden-sonam-sherpa-624tui
const TEAM_SLUG = 'rhigden-sonam-sherpa-624tui';

async function tryTeamEndpoints() {
  console.log("Testing team-scoped endpoints...\n");

  // Try /v2/teams/{slug}/event-types
  console.log(`1. GET /v2/teams/${TEAM_SLUG}/event-types`);
  const teamRes = await fetch(`https://api.cal.com/v2/teams/${TEAM_SLUG}/event-types`, {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${teamRes.status}`);
  if (teamRes.ok) {
    const data = await teamRes.json();
    console.log(`   Found: ${data.data?.length || 0} event types`);
    data.data?.forEach(et => console.log(`   - ${et.slug} (${et.id})`));
  } else {
    console.log(`   Error: ${await teamRes.text()}`);
  }

  // Try /v2/teams/me/event-types
  console.log("\n2. GET /v2/teams/me/event-types");
  const meTeamRes = await fetch(`https://api.cal.com/v2/teams/me/event-types`, {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${meTeamRes.status}`);
  if (meTeamRes.ok) {
    const data = await meTeamRes.json();
    console.log(`   Found: ${data.data?.length || 0} event types`);
  } else {
    console.log(`   Error: ${await meTeamRes.text()}`);
  }

  // Try to get current user's teams
  console.log("\n3. GET /v2/teams");
  const teamsRes = await fetch(`https://api.cal.com/v2/teams`, {
    headers: {
      "cal-api-version": CAL_API_VERSION,
      "Authorization": `Bearer ${CAL_API_KEY}`
    }
  });
  console.log(`   Status: ${teamsRes.status}`);
  if (teamsRes.ok) {
    const data = await teamsRes.json();
    console.log(`   Found: ${data.data?.length || 0} teams`);
    data.data?.forEach(t => console.log(`   - ${t.name} (${t.id})`));
  } else {
    console.log(`   Error: ${await teamsRes.text()}`);
  }
}

tryTeamEndpoints().catch(console.error);
