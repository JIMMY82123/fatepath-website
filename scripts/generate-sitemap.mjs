import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPostsData } from "../src/data/blogPostsData.js";

const siteUrl = 'https://fatepath.me';
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// 静态页面配置
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2025-12-17' },
  { url: '/services', priority: '0.9', changefreq: 'monthly', lastmod: '2025-12-23' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: today },
  { url: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: '2025-12-17' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: '2025-12-17' },
  { url: '/testimonials', priority: '0.6', changefreq: 'monthly', lastmod: '2025-12-17' },
  { url: '/free-bazi-report', priority: '0.9', changefreq: 'weekly', lastmod: '2025-12-17' },
  { url: '/love-compatibility-test', priority: '0.6', changefreq: 'monthly', lastmod: '2025-12-17' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: '2025-12-17' },
  { url: '/wealth-sign', priority: '0.8', changefreq: 'weekly', lastmod: '2025-12-17' },
  { url: '/2026-forecast', priority: '0.9', changefreq: 'monthly', lastmod: today },
];

// 获取所有博客文章并按日期排序
const blogPosts = Object.entries(blogPostsData)
  .map(([slug, post]) => ({
    slug,
    date: post.date || today,
    lastmod: post.date || today
  }))
  .sort((a, b) => {
    // 按日期降序排列（最新的在前）
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

// 生成静态页面的 XML
const staticPagesXml = staticPages.map(page => {
  return `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n');

// 生成博客文章的 XML
const blogPostsXml = blogPosts.map(post => {
  return `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n');

// 生成完整的 sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 主页 -->
${staticPagesXml}

  <!-- 博客文章 - 按发布时间排序（最新的在前） -->
${blogPostsXml}

</urlset>
`;

// 写入文件
const outputPath = resolve('public', 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf8');
console.log(`✅ Sitemap generated successfully!`);
console.log(`   📄 Location: ${outputPath}`);
console.log(`   📊 Total URLs: ${staticPages.length + blogPosts.length}`);
console.log(`   📝 Blog posts: ${blogPosts.length}`);
console.log(`   🗓️  Last updated: ${today}`);

