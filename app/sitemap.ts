import { MetadataRoute } from "next";

export default  function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feeds.tdmu.xyz";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/feeds`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/feeds/pages-info`,
      lastModified: new Date(),
      changeFrequency: "hourly",
    },
  ];
}
