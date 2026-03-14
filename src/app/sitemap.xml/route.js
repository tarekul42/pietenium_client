export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pietenium.vercel.app</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/services</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/services/hotel</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/services/real-estate</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/our-works</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/articles</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/about</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pietenium.vercel.app/contact-us</loc>
    <lastmod>2026-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
