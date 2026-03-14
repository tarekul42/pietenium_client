export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://pietenium.vercel.app/sitemap.xml

User-agent: GoogleBot
Allow: /

User-agent: GPTBot
Allow: /`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
