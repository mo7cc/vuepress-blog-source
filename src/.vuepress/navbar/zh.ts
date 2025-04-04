import { navbar } from 'vuepress-theme-hope';

export const zhNavbar = navbar([
  {
    text: '分类',
    icon: 'sort',
    children: [
      '/coder/',
      '/self_manage/',
      '/theory/',
      '/bookmark/',
      '/misc/',
      // ...
    ],
  },
  {
    text: '索引',
    icon: 'jiansuo',
    children: [
      { text: '全部文章', icon: 'list', link: '/article/' },
      { text: '分类', icon: 'category', link: '/category/' },
      { text: '标签', icon: 'tag', link: '/tag/' },
      { text: '时间轴', icon: 'time', link: '/timeline/' },
      { text: '站点地图', icon: 'map', link: '/about/catalog.html' },
    ],
  },
  {
    text: '收藏',
    icon: 'start',
    link: '/bookmark/',
    children: [
      '/bookmark/books/',
      '/bookmark/tools/',
      '/bookmark/links/',
      '/bookmark/movies/',
      '/bookmark/music/',
      '/bookmark/photos/',
    ],
  },
  '/about/',
]);
