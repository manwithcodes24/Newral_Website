/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://newral.in',
  generateRobotsTxt: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/_next/*'
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
};
