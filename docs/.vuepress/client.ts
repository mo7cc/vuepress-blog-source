import { defineClientConfig } from 'vuepress/client';
import { onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';

import('./components/PrintVersion').then((res) => {
  res.default();
});

const MyIcon = defineAsyncComponent(() => import('./components/MyIcon.vue'));
const TopNavBeautify = defineAsyncComponent(() => import('./components/TopNavBeautify.vue'));
const NavMusic = defineAsyncComponent(() => import('./components/NavMusic.vue'));
const CommentHideBtn = defineAsyncComponent(() => import('./components/CommentHideBtn.vue'));
const BlogBg = defineAsyncComponent(() => import('./components/BlogBg.vue'));
const PreviewImage = defineAsyncComponent(() => import('./components/PreviewImage.vue'));

const HeroContent = defineAsyncComponent(() => import('./components/HeroContent.vue'));
const HeroBG = defineAsyncComponent(() => import('./components/HeroBG.vue'));
const Hitokoto = defineAsyncComponent(() => import('./components/Hitokoto.vue'));

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('MyIcon', MyIcon);
  },
  setup() {
    onMounted(() => {});
  },
  rootComponents: [
    TopNavBeautify,
    NavMusic,
    CommentHideBtn,
    BlogBg,
    PreviewImage,
    HeroBG,
    HeroContent,
    Hitokoto,
    // ...
  ],
});
