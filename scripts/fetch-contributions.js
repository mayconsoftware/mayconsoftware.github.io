#!/usr/bin/env node
/**
 * Fetch GitHub Contributions and pre-bake into src/assets/contributions.json
 *
 * Used by GitHub Actions during the build step.
 * Requires:
 *   - GH_TOKEN env var (GitHub Personal Access Token with read:user scope)
 *   - GH_USERNAME env var (GitHub username)
 *
 * Usage:
 *   GH_TOKEN=xxx GH_USERNAME=visaodeempresa node scripts/fetch-contributions.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GH_TOKEN = process.env.GH_TOKEN;
const GH_USERNAME = process.env.GH_USERNAME || 'visaodeempresa';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'assets', 'contributions.json');

if (!GH_TOKEN) {
  console.warn('⚠️  GH_TOKEN not set. Writing empty contributions placeholder.');
  const empty = { totalContributions: 0, weeks: [] };
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(empty, null, 2));
  process.exit(0);
}

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

const body = JSON.stringify({
  query,
  variables: { login: GH_USERNAME }
});

const options = {
  hostname: 'api.github.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GH_TOKEN}`,
    'User-Agent': 'mayconsoftware-portfolio-build',
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log(`🔍 Fetching contributions for @${GH_USERNAME}...`);

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', chunk => data += chunk);

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`❌ GitHub API returned ${res.statusCode}: ${data}`);
      // Write empty fallback on error
      const empty = { totalContributions: 0, weeks: [] };
      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(empty, null, 2));
      process.exit(0);
    }

    try {
      const json = JSON.parse(data);

      if (json.errors) {
        console.error('❌ GraphQL errors:', JSON.stringify(json.errors, null, 2));
        const empty = { totalContributions: 0, weeks: [] };
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(empty, null, 2));
        process.exit(0);
      }

      const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

      if (!calendar) {
        console.error('❌ No calendar data in response');
        const empty = { totalContributions: 0, weeks: [] };
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(empty, null, 2));
        process.exit(0);
      }

      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(calendar, null, 2));

      console.log(`✅ Contributions saved: ${calendar.totalContributions} total contributions`);
      console.log(`📁 Written to: ${OUTPUT_PATH}`);
    } catch (err) {
      console.error('❌ Failed to parse response:', err.message);
      const empty = { totalContributions: 0, weeks: [] };
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(empty, null, 2));
      process.exit(0);
    }
  });
});

req.on('error', (err) => {
  console.error('❌ Request error:', err.message);
  const empty = { totalContributions: 0, weeks: [] };
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(empty, null, 2));
  process.exit(0);
});

req.write(body);
req.end();
