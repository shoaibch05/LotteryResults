// frontend/scripts/copySitemap.mjs
// Note: .mjs extension or can use .js with import statements

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Copies sitemap from backend/public to frontend/public
 * For Vite projects with ES modules
 * Usage: node scripts/copySitemap.mjs
 */

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendPath = path.join(
  __dirname,
  "../../Lottery Backend/public/sitemap.xml"
);
const frontendPath = path.join(__dirname, "../public/sitemap.xml");

console.log("🔄 Syncing sitemap...");
console.log(`   From: ${backendPath}`);
console.log(`   To:   ${frontendPath}`);

try {
  // Check if backend sitemap exists
  if (!fs.existsSync(backendPath)) {
    console.warn(`⚠️  Backend sitemap not found at: ${backendPath}`);
    console.log("   Make sure your backend has generated sitemap.xml");
    process.exit(0); // Don't fail, just warn
  }

  // Check if frontend public folder exists, create if not
  const frontendPublicDir = path.dirname(frontendPath);
  if (!fs.existsSync(frontendPublicDir)) {
    fs.mkdirSync(frontendPublicDir, { recursive: true });
    console.log(`   📁 Created frontend/public directory`);
  }

  // Copy the file
  fs.copyFileSync(backendPath, frontendPath);

  // Get file size for confirmation
  const stats = fs.statSync(frontendPath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);

  console.log(`✅ Sitemap synced successfully!`);
  console.log(`   File size: ${fileSizeKB} KB`);
  console.log(`   Updated: ${new Date().toLocaleString()}`);
} catch (error) {
  console.error(`❌ Error syncing sitemap:`);
  console.error(`   ${error.message}`);
  process.exit(1);
}

// ======================================
// For Vite ES module projects:
// ======================================
//
// 1. Save this file as: frontend/scripts/copySitemap.mjs
//    (or frontend/scripts/copySitemap.js)
//
// 2. Update package.json:
//    "scripts": {
//      "dev": "vite",
//      "build": "npm run copy-sitemap && vite build",
//      "copy-sitemap": "node scripts/copySitemap.mjs",
//      "lint": "eslint .",
//      "preview": "vite preview",
//      "build:analyze": "npm run copy-sitemap && vite build --mode analyze"
//    }
//
// ======================================
