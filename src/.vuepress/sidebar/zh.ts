import { sidebar } from 'vuepress-theme-hope';

const back_posts = {
  text: '站点地图',
  icon: 'map',
  link: '/about/catalog.html',
};

const back_developer = {
  text: '返回Developer',
  icon: 'developer',
  link: '/developer/',
};

const back_tutorial = {
  text: '返回教程',
  icon: 'bookone',
  link: '/tutorial/',
};

const back_tools = {
  text: '返回工具',
  icon: 'gongju',
  link: '/tools/',
};

export const zhSidebar = sidebar({
  // 关于
  '/about/': [
    {
      text: '首页',
      icon: 'home',
      link: '/',
    },
    {
      text: '关于',
      icon: 'info',
      link: '/about/',
      children: 'structure',
    },
    {
      text: '域',
      icon: 'domain',
      link: '/domain/',
      prefix: '/domain/',
      children: 'structure',
    },

    {
      text: '术',
      icon: 'solutions',
      link: '/solutions/',
      prefix: '/solutions/',
      children: 'structure',
    },

    {
      text: '技',
      icon: 'techlab',
      link: '/techlab/',
      prefix: '/techlab/',
      children: 'structure',
    },

    {
      text: '阵',
      icon: 'applied',
      link: '/applied/',
      prefix: '/applied/',
      children: 'structure',
    },

    {
      text: '法',
      icon: 'methodology',
      link: '/methodology/',
      prefix: '/methodology/',
      children: 'structure',
    },

    {
      text: '理',
      icon: 'principles',
      link: '/principles/',
      prefix: '/principles/',
      children: 'structure',
    },

    {
      text: '器',
      icon: 'toolkit',
      link: '/toolkit/',
      prefix: '/toolkit/',
      children: 'structure',
    },

    {
      text: '杂',
      icon: 'misc',
      link: '/misc/',
      prefix: '/misc/',
      children: 'structure',
    },
  ],
  // 域
  '/domain/': [
    back_posts,
    {
      text: '域',
      icon: 'domain',
      link: '/domain/',
      children: 'structure',
    },
  ],
  '/solutions/': [
    back_posts,
    {
      text: '术',
      icon: 'solutions',
      link: '/solutions/',
      children: 'structure',
    },
  ],
  '/techlab/': [
    back_posts,
    {
      text: '技',
      icon: 'techlab',
      link: '/techlab/',
      children: 'structure',
    },
  ],

  '/applied/': [
    back_posts,
    {
      text: '阵',
      icon: 'applied',
      link: '/applied/',
      children: 'structure',
    },
  ],

  '/methodology/': [
    back_posts,
    {
      text: '法',
      icon: 'methodology',
      link: '/methodology/',
      children: 'structure',
    },
  ],

  '/principles/': [
    back_posts,
    {
      text: '理',
      icon: 'principles',
      link: '/principles/',
      children: 'structure',
    },
  ],

  '/toolkit/': [
    back_posts,
    {
      text: '器',
      icon: 'toolkit',
      link: '/toolkit/',
      children: 'structure',
    },
  ],

  '/misc/': [
    back_posts,
    {
      text: '杂',
      icon: 'misc',
      link: '/misc/',
      children: 'structure',
    },
  ],
});
