import { hopeTheme } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';
import { getDirname, path } from 'vuepress/utils';

import AppPackage from '../../package.json';
import manifest_json from './public/pwa/manifest.json';

const manifestJson: any = manifest_json;

const __dirname = getDirname(import.meta.url);

const footerICP_HTML = `
<a class="footer-icp" href="https://beian.miit.gov.cn" target="_blank">
  <img src="//file.mo7.cc/static/img/beian.png">
  陕ICP备2022011574号
</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="footer-about" href="/about/website.html">关于本站</a>
`;

export default hopeTheme({
  hostname: 'https://mo7.cc',
  author: {
    name: '墨七',
    url: 'https://mo7.cc',
    email: 'mo7@mo7.cc',
  },
  lastUpdated: true,
  darkmode: 'toggle',
  // editLink: true,
  contributors: true,
  fullscreen: true,
  license: AppPackage.license,
  navbarAutoHide: 'always',
  pageInfo: [
    'Author',
    'Category',
    'Date',
    'Original',
    'Tag',
    'ReadingTime',
    'Word',
    'PageView',
    //..
  ],
  navbarLayout: {
    start: ['Brand'],
    center: [],
    end: ['Search', 'Links', 'Language', 'Outlook'],
  },
  sidebarSorter: ['order', 'readme', 'title', 'filename'],

  logo: '/pwa/144.png',
  docsDir: 'src',
  blog: {
    name: '墨七',
    avatar: '//file.mo7.cc/static/lxh_gif/lxh_71.gif',
    description: '简单快乐，理应如此。',
    intro: 'https://mo7.cc/about/me.html',
    medias: {
      Email: 'mailto:mo7@mo7.cc',
      GitHub: 'https://github.com/mo7cc',
      Discord: 'https://discord.gg/8yXKxbSDDg',
      Lark: 'https://www.larksuite.com/invitation/page/add_contact/?token=c8co337a-9dd7-4976-998f-5d2898o763r5&amp;unique_id=cgjGUk53Y2dh_FCZPuqY_A==',
      WechatPay: 'https://file.mo7.cc/static/img/wx_proceeds.jpg',
      QQ: 'https://file.mo7.cc/static/img/myqq.jpeg',
      Wechat: 'https://file.mo7.cc/static/img/mywchart.jpeg',
      Zhihu: 'https://www.zhihu.com/people/meichangliang',
      BiliBili: 'https://space.bilibili.com/24452567',
      Rss: 'https://mo7.cc/atom.xml',
    },
  },

  footer: footerICP_HTML,
  locales: {
    '/': {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      blog: {
        name: '墨七',
        description: '简单快乐，理应如此。',
        intro: '/about/me.html',
        timeline: '简单快乐，理应如此。',
      },
    },

    '/en/': {
      navbar: enNavbar,
      sidebar: enSidebar,
      blog: {
        name: 'Mo7',
        description: 'Simple and happy, as it should be.',
        intro: '/en/intro.html',
        timeline: 'Something wonderful is about to  happen.',
      },
    },
  },

  hotReload: true,

  markdown: {
    include: {
      resolvePath: (file) => {
        if (file.startsWith('@src')) {
          return file.replace('@src', path.resolve(__dirname, '..'));
        }
        return file;
      },
    },
    stylize: [
      {
        matcher: 'Recommended',
        replacer: ({ tag }) => {
          if (tag === 'em')
            return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: 'Recommended',
            };
        },
      },
    ],
    align: true,
    attrs: true,
    alert: true,
    tabs: true,
    component: true,
    spoiler: true,
    demo: true,
    echarts: true,
    imgMark: true,
    sub: true,
    sup: true,
    tasklist: true,
    vPre: true,
    breaks: true,
    linkify: true,
    footnote: true,
    mark: true,
    obsidianImgSize: true,
  },

  plugins: {
    blog: true,
    photoSwipe: false, // 这个插件难用的 一 B
    icon: {
      assets: '//at.alicdn.com/t/c/font_3855310_jmob2kjgwlo.css',
    },

    comment: {
      provider: 'Waline',
      serverURL: 'https://talk.mo7.cc',
    },

    components: {
      components: ['Badge', 'VPCard', 'BiliBili', 'PDF'],
    },

    copyright: false,

    feed: {
      atom: true,
      json: true,
      rss: true,
      image: '/pwa/72.png',
      icon: '/pwa/512.png',
    },
    slimsearch: {
      indexContent: true,
    },
    pwa: {
      favicon: '/favicon.ico',
      themeColor: '#af7ac5',
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      manifest: manifestJson,
    },
  },
});
