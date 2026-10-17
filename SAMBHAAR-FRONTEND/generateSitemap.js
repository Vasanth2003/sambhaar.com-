import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const websiteUrl = "https://sambhaar.com";
const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/shop", changefreq: "weekly", priority: 0.9 },
  { url: "/category/:categoryName", changefreq: "weekly", priority: 0.7 },
];

const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname: websiteUrl });

  pages.forEach((page) => stream.write(page));
  stream.end();

  const sitemap = await streamToPromise(stream).then((data) => data.toString());

  fs.writeFileSync("./public/sitemap.xml", sitemap);

  console.log("✅ Sitemap generated successfully!");
};

generateSitemap();
