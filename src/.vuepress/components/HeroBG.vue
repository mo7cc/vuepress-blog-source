<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { mStorage, LoadImage } from '../utils/tools';

const UpdateBingImg = () => {
  let toPath = window.location.pathname;

  let nowBingImgIndex = mStorage.get('BingImgIndex');
  const imgList = mStorage.get('BingImgList');

  if (!nowBingImgIndex || nowBingImgIndex < 0) {
    nowBingImgIndex = 0;
  }
  if (nowBingImgIndex > imgList.length - 1) {
    nowBingImgIndex = imgList.length - 1;
  }
  mStorage.set('BingImgIndex', nowBingImgIndex);

  const maskElm = document.querySelector('.vp-blog-mask') as HTMLElement;

  if (nowBingImgIndex == 0) {
    document.getElementById('leftNav')?.classList.add('disabled');
  }
  if (nowBingImgIndex == imgList.length - 1) {
    document.getElementById('rightNav')?.classList.add('disabled');
  }
  if (nowBingImgIndex > 0 && nowBingImgIndex < imgList.length - 1) {
    document.getElementById('leftNav')?.classList.remove('disabled');
    document.getElementById('rightNav')?.classList.remove('disabled');
  }

  let NowData = imgList[nowBingImgIndex];
  // 区分英文版
  if (toPath.includes('/en')) {
    NowData = NowData.EN;
  }

  // 填充文案
  const linkText = document.getElementById('bingLink_text');

  if (linkText) {
    linkText.innerHTML = NowData.Title;
  }
  // 填充链接
  document.getElementById('bingLink')?.setAttribute('href', NowData.CopyrightLink);

  const bgUrl = NowData.Path;

  // 填充背景
  maskElm.style.background = '';
  maskElm.style.backgroundImage = `url(${bgUrl})`;

  const footerElm = document.querySelector('.vp-footer-wrapper') as HTMLElement;
  if (footerElm) {
    footerElm.style.backgroundImage = `url(${bgUrl})`;
  }
};

// 更换背景图片
const InsertBtn = (path?) => {
  const maskElm = document.querySelector('.vp-blog-mask');
  if (!maskElm) {
    return;
  }

  const imgList = mStorage.get('BingImgList');

  if (imgList && imgList.length < 1) {
    return;
  }
  // 创建元素
  if (!document.getElementById('BingSwitchWrapper')) {
    const divElm = document.createElement('div');
    divElm.id = 'BingSwitchWrapper';
    divElm.innerHTML = `
<a href="" target="_Blank" id="bingLink">
  <div class="bingLink_icon"><svg class="mapPin" height="16" width="16" viewBox="0 0 12 12" aria-hidden="true" role="presentation"><path d="M0 0h12v12h-12z" fill="none"></path><path d="M6.5 3a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zm0-3a4.5 4.5 0 0 0-4.5 4.5 5.607 5.607 0 0 0 .087.873c.453 2.892 2.951 5.579 3.706 6.334a1 1 0 0 0 1.414 0c.755-.755 3.253-3.442 3.706-6.334a5.549 5.549 0 0 0 .087-.873 4.5 4.5 0 0 0-4.5-4.5zm3.425 5.218c-.36 2.296-2.293 4.65-3.425 5.782-1.131-1.132-3.065-3.486-3.425-5.782a4.694 4.694 0 0 1-.075-.718 3.5 3.5 0 0 1 7 0 4.634 4.634 0 0 1-.075.718z"></path></svg></div>
  <div id="bingLink_text"></div>
</a>
<div id="leftNav"></div>
<div id="rightNav"></div>`;
    maskElm.parentElement?.insertBefore(divElm, maskElm);
  }
  // 更新背景图片

  const LeftBtn = document.getElementById('leftNav');
  const rightBtn = document.getElementById('rightNav');

  if (LeftBtn && rightBtn) {
  } else {
    return;
  }
  UpdateBingImg();

  LeftBtn.onclick = () => {
    let nowBingImgIndex = mStorage.get('BingImgIndex');
    nowBingImgIndex--;
    mStorage.set('BingImgIndex', nowBingImgIndex);
    UpdateBingImg();
  };
  rightBtn.onclick = () => {
    let nowBingImgIndex = mStorage.get('BingImgIndex');
    nowBingImgIndex++;
    mStorage.set('BingImgIndex', nowBingImgIndex);
    UpdateBingImg();
  };
};

// 请求背景图
const GetBingImgList = () => {
  axios({
    method: 'get',
    url: '//file.mo7.cc/api/public/url',
    params: {},
  }).then((response) => {
    const imgList = response.data.Data;
    if (imgList && imgList.length < 1) {
      return;
    }

    for (const item of imgList) {
      LoadImage(item.Path);
    }
    mStorage.set('BingImgList', imgList);
    InsertBtn();
  });
};

onMounted(() => {
  nextTick(() => {
    GetBingImgList();
  });

  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      setTimeout(() => {
        InsertBtn();
      }, 50);
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="none">Bing壁纸</div>
  </ClientOnly>
</template>

<style lang="scss">
// 图片切换按钮
#BingSwitchWrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.75rem;
  box-sizing: border-box;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 100%;
  z-index: 5;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  #leftNav,
  #rightNav {
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(34, 34, 34, 0.8);
    cursor: pointer;
    border-radius: 0.375rem;
    position: relative;
    margin-left: 0.25rem;
    &::after {
      border-radius: 0.375rem;
      border-left: 0.375rem solid rgba(255, 255, 255, 0.8);
      border-bottom: 0.375rem solid rgba(255, 255, 255, 0.8);
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      content: '';
      position: absolute;
    }
    &.disabled {
      &::after {
        border-left: 0.375rem solid rgba(255, 255, 255, 0.4);
        border-bottom: 0.375rem solid rgba(255, 255, 255, 0.4);
      }
    }
  }

  #leftNav {
    &::after {
      transform: scale(0.25) translateX(25%) rotate(45deg);
    }
  }
  #rightNav {
    &::after {
      transform: scale(0.25) translateX(-25%) rotate(225deg);
    }
  }
  .bingLink_icon {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    .mapPin {
      fill: #fff;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      left: 50%;
      position: absolute;
    }
  }
  #bingLink {
    flex-shrink: 1;
    display: flex;
    align-items: center;
    background-color: rgba(34, 34, 34, 0.4);
    border-radius: 0.375rem;
    cursor: pointer;
    height: 2.5rem;
  }
  #bingLink_text {
    flex-shrink: 1;
    text-align: left;
    box-sizing: border-box;
    padding: 0.625rem;
    min-height: 2.5rem;
    max-width: 12rem;
    color: #fff;
    padding-left: 0rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

// 底部背景
.vp-footer-wrapper {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .vp-copyright,
  .vp-footer {
    color: #fff;
    z-index: 5;
    opacity: 0.8;
  }
}

.vp-blog-hero .slide-down-button {
  bottom: 4.75rem;
}

.vp-blog-hero.hero-fullscreen .vp-blog-mask {
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: top;
  background-position-x: center;
  background-attachment: fixed;
}

.vp-blog-hero.hero-fullscreen {
  z-index: 5;
  height: 100vh !important;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
}

.vp-footer-wrapper {
  border-top: none;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: top;
  background-position-x: center;
  background-attachment: fixed;
}

[data-theme='light'] {
  .vp-blog-hero .vp-blog-mask::after {
    background: #000;
    opacity: 0.3 !important;
  }
  .vp-footer-wrapper {
    &::before {
      background: #000;
      opacity: 0.3;
    }
  }
}

[data-theme='dark'] {
  .vp-blog-hero .vp-blog-mask::after {
    background: #000;
    opacity: 0.7 !important;
  }
  .vp-footer-wrapper {
    &::before {
      background: #000;
      opacity: 0.7;
    }
  }
}
</style>
