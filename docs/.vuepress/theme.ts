import { hopeTheme } from 'vuepress-theme-hope';

import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';
import { path } from 'vuepress/utils';

import manifest_json from './public/pwa/manifest.json';
const manifestJson: any = manifest_json;

const footerICP_HTML = `
<a class="mo7-footer-icp" href="https://beian.miit.gov.cn" target="_blank">
  <img src="//file.mo7.cc/static/img/beian.png">
  陕ICP备2022011574号
</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="mo7-footer-about" href="/about/website.html">关于本站</a>
`;

export default hopeTheme({
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
  extraLocales: {},
  darkmode: 'toggle',

  hostname: 'https://mo7.cc',
  author: {
    name: '墨七',
    url: 'https://mo7.cc',
    email: 'mo7@mo7.cc',
  },
  logo: '/pwa/144.png',
  docsDir: 'src',

  blog: {
    name: '墨七',
    avatar: '//file.mo7.cc/static/lxh_gif/lxh_71.gif',
    description: '墨染七弦月，笔耕半亩田。',
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
  displayFooter: false,
  locales: {
    '/': {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      blog: {
        name: '墨七',
        description: '墨染七弦月，笔耕半亩田。',
        intro: '/about/me.html',
        timeline: '墨染七弦月，笔耕半亩田。',
      },
    },
    // '/en/': {
    //   navbar: enNavbar,
    //   sidebar: enSidebar,
    //   blog: {
    //     name: 'Mo7',
    //     description: 'Simple and happy, as it should be.',
    //     intro: '/en/intro.html',
    //     timeline: 'Something wonderful is about to  happen.',
    //   },
    // },
  },

  hotReload: true,

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    obsidianImgSize: true,
    include: {
      resolvePath: (file) => {
        if (file.startsWith('@docs')) {
          return file.replace('@docs', path.resolve(__dirname, '..'));
        }
        return file;
      },
    },
    mark: true,
    spoiler: true,
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
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
    breaks: true,
    linkify: true,
    footnote: true,
    alert: true,
    imgMark: true,
    highlighter: {
      type: 'prismjs', // or "prismjs"
    },
  },

  plugins: {
    photoSwipe: false, // 图片预览插件
    blog: true,
    comment: {
      provider: 'Waline',
      serverURL: 'https://talk.mo7.cc',
    },

    icon: {
      assets: '//at.alicdn.com/t/c/font_3855310_tk9u06ych4.css',
      prefix: 'iconfont icon-',
    },
    components: {
      components: ['Badge', 'VPCard', 'BiliBili', 'PDF'],
    },

    redirect: {
      config: {},
    },

    slimsearch: {
      indexContent: true,
      suggestion: true,
    },

    copyright: false,
    feed: {
      atom: true,
      json: true,
      rss: true,
      image: '/pwa/72.png',
      icon: '/pwa/512.png',
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
