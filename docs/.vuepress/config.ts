import { defineUserConfig } from 'vuepress';
import theme from './theme';
import { getDirname, path } from 'vuepress/utils';
const __dirname = getDirname(import.meta.url);
const docsPath = path.resolve(__dirname, '../');

// const urls: any = [];

export default defineUserConfig({
  // onGenerated: (app) => {
  //   for (let i = 0; i < app.pages.length; i++) {
  //     const el = app.pages[i];
  //     urls.push(el.path);
  //   }

  //   console.log(JSON.stringify(urls));
  // },

  base: '/',
  dest: 'dist',
  host: '0.0.0.0',
  port: 9451,
  temp: '.cache/.vp-temp',
  cache: '.cache/.vp-cache',

  alias: {
    '@components': path.resolve(__dirname, 'components'),
    '@docs': docsPath,
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '墨七',
      description: '墨七 - 墨染七弦月，笔耕半亩田。',
    },
    // '/en/': {
    //   lang: 'en',
    //   title: 'Mo7',
    //   description: 'Mo7 - Simple and happy, as it should be.',
    // },
  },

  theme,
  shouldPrefetch: false,
});
