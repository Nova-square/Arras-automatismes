import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = 'dist';
const ASSETS_DIR = join(DIST_DIR, 'assets');

async function optimizeImages() {
  try {
    const files = await readdir(ASSETS_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/.test(file));

    for (const file of imageFiles) {
      const filePath = join(ASSETS_DIR, file);
      const image = sharp(await readFile(filePath));
      
      // Convert to WebP with optimized settings
      await image
        .webp({ quality: 80, effort: 6 })
        .toFile(filePath.replace(/\.[^.]+$/, '.webp'));

      // Create responsive versions
      const sizes = [640, 1024, 1920];
      for (const width of sizes) {
        await image
          .resize(width)
          .webp({ quality: 80, effort: 6 })
          .toFile(filePath.replace(/\.[^.]+$/, `-${width}.webp`));
      }
    }

    console.log('✅ Images optimized successfully');
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

async function injectPreloadTags() {
  try {
    const indexPath = join(DIST_DIR, 'index.html');
    let html = await readFile(indexPath, 'utf-8');

    // Add preload tags for critical assets
    const preloadTags = `
    <link rel="preload" href="/assets/vendor.js" as="script">
    <link rel="preload" href="/assets/index.css" as="style">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    `;

    html = html.replace('</head>', `${preloadTags}\n</head>`);
    await writeFile(indexPath, html);

    console.log('✅ Preload tags injected successfully');
  } catch (error) {
    console.error('❌ Error injecting preload tags:', error);
  }
}

async function generateSitemap() {
  try {
    const pages = [
      '/',
      '/solutions',
      '/services',
      '/portfolio',
      '/contact',
      '/devis',
      '/about',
      '/rendez-vous',
      '/blog',
      '/ressources',
      '/pergolas'
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>https://arras-automatismes.fr${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    await writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

async function generateRobotsTxt() {
  try {
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://arras-automatismes.fr/sitemap.xml`;

    await writeFile(join(DIST_DIR, 'robots.txt'), robotsTxt);
    console.log('✅ robots.txt generated successfully');
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error);
  }
}

// Run all optimization tasks
(async () => {
  console.log('🚀 Starting optimization process...');
  await optimizeImages();
  await injectPreloadTags();
  await generateSitemap();
  await generateRobotsTxt();
  console.log('✨ Optimization complete!');
})();