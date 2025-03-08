import { navbar } from 'vuepress-theme-hope';

export const zhNavbar = navbar([
  {
    text: '极',
    icon: 'bagua',
    children: [
      '/domain/',
      '/solutions/',
      '/techlab/',
      '/applied/',
      '/methodology/',
      '/principles/',
      '/toolkit/',
      '/misc/',
    ],
  },
  {
    text: '索引',
    icon: 'jiansuo',
    children: [
      { text: '全部', icon: 'list', link: '/article/' },
      { text: '分类', icon: 'category', link: '/category/' },
      { text: '标签', icon: 'tag', link: '/tag/' },
      { text: '时间轴', icon: 'time', link: '/timeline/' },
      { text: '站点地图', icon: 'map', link: '/about/catalog.html' },
    ],
  },
  '/about/',
]);
