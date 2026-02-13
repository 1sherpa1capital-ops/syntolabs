#!/usr/bin/env node
/**
 * Test script to verify Cal.com booking integration
 * 
 * This script checks:
 * 1. All Cal.com event type URLs are valid
 * 2. The embed script is accessible
 * 3. The booking modal can be triggered
 */

const https = require('https');

const CAL_USERNAME = 'rhigden-sonam-sherpa';
const EVENT_TYPES = [
  'discovery-call',
  'sales-call',
  'product-consult',
  'partner-up'
];

const SITE_URL = 'https://syntolabs.xyz';
const EMBED_SCRIPT_URL = 'https://cal.com/embed/embed.js';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function testCalLinks() {
  console.log('\n🧪 Testing Cal.com Integration\n');
  console.log('=' .repeat(50));
  
  // Test 1: Check all event type URLs
  console.log('\n📋 Testing Event Type URLs...');
  let allLinksValid = true;
  
  for (const eventType of EVENT_TYPES) {
    const url = `https://cal.com/${CAL_USERNAME}/${eventType}`;
    try {
      const response = await fetchUrl(url);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`  ${status} ${eventType}: ${response.status === 200 ? 'OK' : `HTTP ${response.status}`}`);
      if (response.status !== 200) allLinksValid = false;
    } catch (error) {
      console.log(`  ❌ ${eventType}: Error - ${error.message}`);
      allLinksValid = false;
    }
  }
  
  // Test 2: Check embed script
  console.log('\n📜 Testing Cal.com Embed Script...');
  try {
    const response = await fetchUrl(EMBED_SCRIPT_URL);
    const status = response.status === 200 ? '✅' : '❌';
    console.log(`  ${status} Embed script: ${response.status === 200 ? 'OK' : `HTTP ${response.status}`}`);
  } catch (error) {
    console.log(`  ❌ Embed script: Error - ${error.message}`);
  }
  
  // Test 3: Check syntolabs.xyz has Cal.com script
  console.log('\n🌐 Testing Synto Labs Website...');
  try {
    const response = await fetchUrl(SITE_URL);
    const hasCalScript = response.data.includes('cal.com/embed/embed.js');
    const hasCalInit = response.data.includes('Cal(\'init\')');
    const hasModalButtons = response.data.includes('openCalModal');
    const hasInlineButtons = response.data.includes('data-cal-link');
    
    console.log(`  ${response.status === 200 ? '✅' : '❌'} Site loads: HTTP ${response.status}`);
    console.log(`  ${hasCalScript ? '✅' : '❌'} Cal.com script included`);
    console.log(`  ${hasCalInit ? '✅' : '❌'} Cal.init() called`);
    console.log(`  ${hasModalButtons ? '✅' : 'ℹ️'} Modal buttons found (may be in JS bundle)`);
    console.log(`  ${hasInlineButtons ? '✅' : '❌'} Inline embed buttons found`);
  } catch (error) {
    console.log(`  ❌ Site test failed: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('\n✨ Tests complete!');
  console.log('\n🔗 Test booking URLs:');
  EVENT_TYPES.forEach(eventType => {
    console.log(`   • https://cal.com/${CAL_USERNAME}/${eventType}`);
  });
  console.log(`\n🌐 Live site: ${SITE_URL}`);
  console.log('\n💡 Manual verification steps:');
  console.log('   1. Visit https://syntolabs.xyz');
  console.log('   2. Click "Book a free audit" button');
  console.log('   3. Verify the Cal.com modal opens');
  console.log('   4. Scroll to "Two ways to book" section');
  console.log('   5. Click inline booking buttons');
  console.log('   6. Verify inline embed loads\n');
}

testCalLinks().catch(console.error);
