import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPostsData } from "../src/data/blogPostsData.js";

const siteUrl = 'https://fatepath.me';
const blogUrl = `${siteUrl}/blog`;

const posts = Object.entries(blogPostsData)
  .map(([slug, post]) => ({
    slug,
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date),
    author: post.author || 'FatePath',
    readTime: post.readTime || '6 min read'
  }))
  .filter(post => !Number.isNaN(post.date.getTime()))
  .sort((a, b) => b.date - a.date);

const formatDate = (date) => date.toUTCString();

const itemsXml = posts.map(post => {
  const link = `${siteUrl}/blog/${post.slug}`;
  const description = `<![CDATA[${post.excerpt}]]>`;
  return `    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>${link}</link>\n      <guid isPermaLink="true">${link}</guid>\n      <pubDate>${formatDate(post.date)}</pubDate>\n      <description>${description}</description>\n    </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>FatePath BaZi & Chinese Astrology Blog</title>\n    <link>${blogUrl}</link>\n    <description>Latest BaZi insights, US-focused forecasts, and Chinese astrology guidance from FatePath.</description>\n    <language>en-us</language>\n    <lastBuildDate>${formatDate(new Date())}</lastBuildDate>\n${itemsXml}\n  </channel>\n</rss>\n`;

const outputPath = resolve('public', 'feed.xml');
writeFileSync(outputPath, rss);
console.log(`RSS feed generated at ${outputPath}`);
