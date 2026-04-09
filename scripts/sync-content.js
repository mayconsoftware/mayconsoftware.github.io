#!/usr/bin/env node
/**
 * Sync content/blog/ → src/assets/blog/
 *
 * Runs as prebuild step to copy Markdown files from the content/
 * authoring folder into src/assets/ where Angular can serve them.
 *
 * Usage: node scripts/sync-content.js
 * Runs automatically via "prebuild" script in package.json
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'content', 'blog');
const DEST = path.join(__dirname, '..', 'src', 'assets', 'blog');

if (!fs.existsSync(SRC)) {
  console.log('ℹ️  No content/blog/ directory found, skipping sync.');
  process.exit(0);
}

fs.mkdirSync(DEST, { recursive: true });

const files = fs.readdirSync(SRC);
let copied = 0;

for (const file of files) {
  const srcFile = path.join(SRC, file);
  const destFile = path.join(DEST, file);

  if (fs.statSync(srcFile).isFile()) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`  ✅ ${file}`);
    copied++;
  }
}

console.log(`📝 Synced ${copied} file(s) from content/blog/ → src/assets/blog/`);
