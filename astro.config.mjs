// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://caryjunkremovers.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/404') &&
        !page.includes('/admin'),
      serialize(item) {
        if (item.url === 'https://caryjunkremovers.com/') {
          return { ...item, changefreq: 'weekly', priority: 1.0 };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, changefreq: 'weekly', priority: 0.6 };
        }
        return { ...item, changefreq: 'monthly', priority: 0.8 };
      },
    }),
    mdx(),
  ]
});