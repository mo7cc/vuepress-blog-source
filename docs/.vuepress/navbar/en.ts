import { navbar } from 'vuepress-theme-hope';

export const enNavbar = navbar([
  '/en/',
  '/en/demo/',
  {
    text: 'Posts',
    icon: 'pen-to-square',
    prefix: '/en/posts/',
    children: [
      {
        text: 'Apple',
        icon: 'pen-to-square',
        prefix: 'apple/',
        children: [{ text: 'Apple1', icon: 'pen-to-square', link: '1' }, '2'],
      },
      {
        text: 'Banana',
        icon: 'pen-to-square',
        prefix: 'banana/',
        children: [
          {
            text: 'Banana 1',
            icon: 'pen-to-square',
            link: '1',
          },
          '2',
        ],
      },
      { text: 'Cherry', icon: 'pen-to-square', link: 'cherry' },
      { text: 'Dragon Fruit', icon: 'pen-to-square', link: 'dragonfruit' },
      'tomato',
      'strawberry',
    ],
  },
]);
