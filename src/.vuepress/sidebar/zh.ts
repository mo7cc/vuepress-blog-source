import { sidebar } from 'vuepress-theme-hope';

const go_home = {
  text: '首页',
  icon: 'home',
  link: '/',
};

export const zhSidebar = sidebar({
  '/': [],
  '/about/': [
    go_home,
    {
      text: '关于',
      icon: 'info',
      link: '/about/',
      children: 'structure',
    },
    {
      text: '资源收藏',
      icon: 'start',
      link: '/bookmark/',
      prefix: '/bookmark/',
      children: 'structure',
    },
    {
      text: '编程开发',
      icon: 'developer',
      link: '/coder/',
      prefix: '/coder/',
      children: 'structure',
    },

    {
      text: '杂七杂八',
      icon: 'misc',
      link: '/misc/',
      prefix: '/misc/',
      children: 'structure',
    },
    {
      text: '个人管理',
      icon: 'selfmanage',
      link: '/self_manage/',
      prefix: '/self_manage/',
      children: 'structure',
    },
    {
      text: '理论研究',
      icon: 'principles',
      link: '/theory/',
      prefix: '/theory/',
      children: 'structure',
    },
  ],
  '/bookmark/': [
    go_home,
    {
      text: '资源收藏',
      icon: 'start',
      link: '/bookmark/',
      children: 'structure',
    },
  ],
  '/coder/': [
    go_home,
    {
      text: '编程开发',
      icon: 'developer',
      link: '/coder/',
      children: 'structure',
    },
  ],
  '/misc/': [
    go_home,
    {
      text: '杂七杂八',
      icon: 'misc',
      link: '/misc/',
      children: 'structure',
    },
  ],
  '/self_manage/': [
    go_home,
    {
      text: '个人管理',
      icon: 'selfmanage',
      link: '/self_manage/',
      children: 'structure',
    },
  ],
  '/theory/': [
    go_home,
    {
      text: '理论研究',
      icon: 'principles',
      link: '/theory/',
      children: 'structure',
    },
  ],
});
