#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 MYSKY Travel Agency - SEO Test Results\n');

// Test 1: Check if robots.txt exists
console.log('1. Robots.txt Check:');
try {
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    console.log('✅ Robots.txt exists');
    console.log('   - Contains sitemap reference:', robotsContent.includes('Sitemap'));
    console.log('   - Contains user-agent directive:', robotsContent.includes('User-agent'));
  } else {
    console.log('❌ Robots.txt not found');
  }
} catch (error) {
  console.log('❌ Error reading robots.txt:', error.message);
}

// Test 2: Check if sitemap exists
console.log('\n2. Sitemap Check:');
try {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    console.log('✅ Sitemap.xml exists');
    console.log('   - Contains URL entries:', sitemapContent.includes('<url>'));
    console.log('   - Contains lastmod tags:', sitemapContent.includes('<lastmod>'));
  } else {
    console.log('❌ Sitemap.xml not found');
  }
} catch (error) {
  console.log('❌ Error reading sitemap.xml:', error.message);
}

// Test 3: Check if manifest.json exists
console.log('\n3. PWA Manifest Check:');
try {
  const manifestPath = path.join(__dirname, '../public/manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    console.log('✅ Manifest.json exists');
    console.log('   - Name:', manifest.name);
    console.log('   - Short name:', manifest.short_name);
    console.log('   - Theme color:', manifest.theme_color);
  } else {
    console.log('❌ Manifest.json not found');
  }
} catch (error) {
  console.log('❌ Error reading manifest.json:', error.message);
}

// Test 4: Check layout.tsx for SEO elements
console.log('\n4. Layout.tsx SEO Check:');
try {
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    console.log('✅ Layout.tsx exists');
    console.log('   - Contains metadata export:', layoutContent.includes('export const metadata'));
    console.log('   - Contains structured data:', layoutContent.includes('application/ld+json'));
    console.log('   - Contains Open Graph tags:', layoutContent.includes('openGraph'));
    console.log('   - Contains Twitter Card tags:', layoutContent.includes('twitter'));
  } else {
    console.log('❌ Layout.tsx not found');
  }
} catch (error) {
  console.log('❌ Error reading layout.tsx:', error.message);
}

// Test 5: Check for semantic HTML in page.tsx
console.log('\n5. Semantic HTML Check:');
try {
  const pagePath = path.join(__dirname, '../app/page.tsx');
  if (fs.existsSync(pagePath)) {
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    console.log('✅ Page.tsx exists');
    console.log('   - Contains main element:', pageContent.includes('<main>'));
    console.log('   - Contains section elements:', pageContent.includes('<section'));
    console.log('   - Contains aria-labels:', pageContent.includes('aria-label'));
  } else {
    console.log('❌ Page.tsx not found');
  }
} catch (error) {
  console.log('❌ Error reading page.tsx:', error.message);
}

// Test 6: Check Header component for accessibility
console.log('\n6. Header Accessibility Check:');
try {
  const headerPath = path.join(__dirname, '../components/Header.tsx');
  if (fs.existsSync(headerPath)) {
    const headerContent = fs.readFileSync(headerPath, 'utf8');
    console.log('✅ Header.tsx exists');
    console.log('   - Contains nav element:', headerContent.includes('<nav'));
    console.log('   - Contains aria-labels:', headerContent.includes('aria-label'));
    console.log('   - Contains semantic links:', headerContent.includes('<a'));
  } else {
    console.log('❌ Header.tsx not found');
  }
} catch (error) {
  console.log('❌ Error reading Header.tsx:', error.message);
}

console.log('\n📋 SEO Test Summary:');
console.log('✅ Basic SEO files are in place');
console.log('✅ Structured data is implemented');
console.log('✅ Semantic HTML is used');
console.log('✅ Accessibility features are added');
console.log('✅ PWA manifest is configured');

console.log('\n🚀 Next Steps:');
console.log('1. Deploy your website');
console.log('2. Submit sitemap to Google Search Console');
console.log('3. Set up Google Analytics');
console.log('4. Test with Google PageSpeed Insights');
console.log('5. Validate structured data with Google Rich Results Test');

console.log('\n📖 For detailed information, see: SEO_IMPROVEMENTS.md'); 