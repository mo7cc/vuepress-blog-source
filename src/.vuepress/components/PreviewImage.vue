<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import { GetDeviceInfo } from '../utils/tools';
import MyIcon from './MyIcon.vue';
// 图标需要引入 iconfont

let DeviceInfo: any = ref({});

let ImageArr = ref([]);
let ShowPreviewBox = ref(false);
let CurrentImgIdx = ref(0);

function ClosePreviewBox() {
  ShowPreviewBox.value = false;
  document.body.style.overflow = 'auto';
}

function zoomFunc() {
  const imgElm = document.getElementById('Mo7PreviewBox-img');
  if (!imgElm) {
    return;
  }

  let width = imgElm.clientWidth;
  let height = imgElm.clientHeight;
  width = width * 1.1;
  imgElm.style.width = width + 'px';
  height = height * 1.1;
  imgElm.style.height = height + 'px';
}

function shrinkFunc() {
  const imgElm = document.getElementById('Mo7PreviewBox-img');
  if (!imgElm) {
    return;
  }
  let width = imgElm.clientWidth;
  let height = imgElm.clientHeight;
  width = width * 0.9;
  imgElm.style.width = width + 'px';
  height = height * 0.9;
  imgElm.style.height = height + 'px';
}

function fullscreenFunc() {
  const imgElm = document.getElementById('Mo7PreviewBox-img');
  if (!imgElm) {
    return;
  }
  window.open(imgElm.getAttribute('src'));
}

function leftFunc() {
  if (CurrentImgIdx.value > 0) {
    CurrentImgIdx.value--;
  }
  nextTick(() => {
    ImageBoxReset();
  });
}

function rightFunc() {
  if (CurrentImgIdx.value < ImageArr.value.length - 1) {
    CurrentImgIdx.value++;
  }
  nextTick(() => {
    ImageBoxReset();
  });
}

function ImageBoxReset() {
  const boxElm = document.getElementById('Mo7PreviewBox');
  if (!boxElm) {
    return;
  }
  const boxWidth = boxElm.clientWidth;
  const boxHeight = boxElm.clientHeight;

  const imgElm = document.getElementById('Mo7PreviewBox-img');
  if (!imgElm) {
    return;
  }

  imgElm.style.width = boxWidth * 0.9 + 'px';
  imgElm.style.height = '';
  imgElm.style.maxWidth = '';
  imgElm.style.maxHeight = '';
  imgElm.style.left = '';
  imgElm.style.top = '';
  imgElm.style.cursor = '';

  const height = imgElm.clientHeight;

  if (height > boxHeight) {
    imgElm.style.width = '';
    imgElm.style.height = boxHeight * 0.9 + 'px';
  }
}

function ImageClick(e) {
  const elm = e.target;
  const src = elm.getAttribute('src');
  let index = CurrentImgIdx.value;
  for (let i = 0; i < ImageArr.value.length; i++) {
    const el = ImageArr.value[i];
    if (el.src === src) {
      index = i;
      break;
    }
  }
  CurrentImgIdx.value = index;
  ShowPreviewBox.value = true;
  document.body.style.overflow = 'hidden';

  nextTick(() => {
    ImageBoxReset();
  });
}

function keyUpFunc(event) {
  if (event.type == 'wheel') {
    if (event.deltaY > 0) {
      shrinkFunc();
    } else {
      zoomFunc();
    }
  }

  if (event.key === 'Enter') {
    fullscreenFunc();
  }

  if (event.key === 'Escape') {
    ClosePreviewBox();
  }
  if (event.key === 'ArrowUp') {
    zoomFunc();
  }
  if (event.key === 'ArrowDown') {
    shrinkFunc();
  }
  if (event.key === 'ArrowLeft') {
    leftFunc();
  }
  if (event.key === 'ArrowRight') {
    rightFunc();
  }
}

function InitPreviewImage(type) {
  let contentElms = document.getElementsByClassName('theme-hope-content');
  let contentElm = null;
  if (contentElms.length > 0) {
    contentElm = contentElms[0];
  }

  if (!contentElm) {
    return;
  }

  const images = contentElm.getElementsByTagName('img');
  const imaArr = [];
  for (let i = 0; i < images.length; i++) {
    const elm = images[i];
    if (type === 'bind') {
      imaArr.push({
        alt: elm.getAttribute('alt'),
        src: elm.getAttribute('src'),
      });
    }

    elm.removeEventListener('click', ImageClick);
    document.removeEventListener('keyup', keyUpFunc);
    if (type === 'bind') {
      elm.addEventListener('click', ImageClick);
      document.addEventListener('keyup', keyUpFunc);
    }
  }
  ImageArr.value = imaArr;

  document.removeEventListener('keyup', keyUpFunc);
  if (type === 'bind' && DeviceInfo.isPC) {
    document.addEventListener('keyup', keyUpFunc);
  }

  document.removeEventListener('wheel', keyUpFunc);
  if (type === 'bind' && DeviceInfo.isPC) {
    document.addEventListener('wheel', keyUpFunc);
  }
}

let mouseStatus = false;
let mouseDownX = 0;
let mouseDownY = 0;
let imgElmLeft = 0;
let imgElmTop = 0;
function Mousemove(e) {
  if (!mouseStatus) {
    return;
  }

  const xDiff = e.clientX - mouseDownX;
  const yDiff = e.clientY - mouseDownY;
  const left = imgElmLeft + xDiff;
  const top = imgElmTop + yDiff;

  // 移动赋值
  const imgElm = document.getElementById('Mo7PreviewBox-img');
  imgElm.style.left = left + 'px';
  imgElm.style.top = top + 'px';
}

function ImgMouseUp() {
  const imgElm = document.getElementById('Mo7PreviewBox-img');
  imgElm.style.cursor = 'default';
  mouseStatus = false;
  mouseDownX = 0;
  mouseDownY = 0;
  imgElmLeft = 0;
  imgElmTop = 0;
}

function ImgMouseDown(e) {
  const imgElm = document.getElementById('Mo7PreviewBox-img');
  imgElm.style.cursor = 'move';
  mouseStatus = true;

  mouseDownX = e.clientX;
  mouseDownY = e.clientY;

  let computedStyle;
  if (window.getComputedStyle) {
    computedStyle = window.getComputedStyle(imgElm, null);
  } else {
    computedStyle = (imgElm as any).currentStyle; //兼容IE的写法
  }

  imgElmLeft = parseInt(computedStyle.left);
  imgElmTop = parseInt(computedStyle.top);
}

function on_mousemove(e) {
  if (e.type === 'touchmove') {
    if (e.touches.length == 1) {
      Mousemove(e.touches[0]);
    }
  }
  if (e.type === 'mousemove') {
    Mousemove(e);
  }
}

function on_mouseup(e) {
  ImgMouseUp();
}

function on_mousedown(e) {
  if (e.type === 'touchstart') {
    if (e.touches.length == 1) {
      ImgMouseDown(e.touches[0]);
    }
  }
  if (e.type === 'mousedown') {
    ImgMouseDown(e);
  }
}

onMounted(() => {
  DeviceInfo = GetDeviceInfo();
  console.info('DeviceInfo', DeviceInfo);

  nextTick(() => {
    InitPreviewImage('bind');
  });

  const router = useRouter();
  router.beforeEach((to, from) => {
    if (to.path === from.path) {
      return;
    }
    InitPreviewImage('unbind');
  });

  router.afterEach((to, from) => {
    if (to.path === from.path) {
      return;
    }
    nextTick(() => {
      setTimeout(() => {
        InitPreviewImage('bind');
      }, 1000);
    });
  });
});
</script>
<template>
  <ClientOnly>
    <div
      v-if="ShowPreviewBox"
      id="Mo7PreviewBox"
      @mousemove="on_mousemove"
      @touchmove="on_mousemove"
      @mouseup="on_mouseup"
      @touchend="on_mouseup"
    >
      <div class="Mo7PreviewBox-topBar">
        <div class="btn" @click="leftFunc" :class="{ hide: CurrentImgIdx === 0 }">
          <MyIcon class="icon" name="xiangzuo"></MyIcon>
        </div>
        <div class="btn" @click="rightFunc" :class="{ hide: CurrentImgIdx === ImageArr.length - 1 }">
          <MyIcon class="icon" name="xiangyou"></MyIcon>
        </div>
        <div class="btn" @click.stop="zoomFunc">
          <MyIcon class="icon" name="fangda"></MyIcon>
        </div>
        <div class="btn" @click.stop="shrinkFunc">
          <MyIcon class="icon" name="suoxiao"></MyIcon>
        </div>
        <div class="btn" @click.stop="fullscreenFunc">
          <MyIcon class="icon" name="quanping"></MyIcon>
        </div>
        <a class="btn" :href="ImageArr[CurrentImgIdx].src" download>
          <MyIcon class="icon" name="xiazai"></MyIcon>
        </a>
        <div class="btn" @click.stop="ClosePreviewBox">
          <MyIcon class="icon" name="guanbi"></MyIcon>
        </div>
      </div>

      <img
        id="Mo7PreviewBox-img"
        @mousedown="on_mousedown"
        @touchstart="on_mousedown"
        :src="ImageArr[CurrentImgIdx].src"
        :alt="ImageArr[CurrentImgIdx].alt"
        srcset=""
      />

      <div class="Mo7PreviewBox-idxView">
        <div class="Mo7PreviewBox-idxView-box">
          <div class="Mo7PreviewBox-idxView-idx">{{ CurrentImgIdx + 1 }}/{{ ImageArr.length }}</div>
          <div class="Mo7PreviewBox-idxView-alt" v-if="ImageArr[CurrentImgIdx].alt">
            {{ ImageArr[CurrentImgIdx].alt }}
          </div>
          <div class="Mo7PreviewBox-idxView-key" v-if="DeviceInfo.isPC">
            快捷键:放大↑，缩小↓，上一张←，下一张→，新页面打开↵，Esc关闭预览
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.theme-hope-content {
  img {
    cursor: pointer;
  }
}

#Mo7PreviewBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;

  .icon {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 6px;
    display: block;
  }

  .Mo7PreviewBox-topBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 10px;
    z-index: 99;
    .btn {
      display: block;
      margin-left: 10px;
      background-color: rgba(0, 0, 0, 0.4);
      &.hide {
        opacity: 0.4;
      }
    }
  }

  .Mo7PreviewBox-idxView {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .Mo7PreviewBox-idxView-box {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 8px;
    color: #fff;
    text-align: center;
  }
  .Mo7PreviewBox-idxView-idx {
    font-size: 14px;
  }
  .Mo7PreviewBox-idxView-alt {
    font-size: 20px;
  }
  .Mo7PreviewBox-idxView-key {
    font-size: 12px;
    margin-top: 10px;
  }
}

#Mo7PreviewBox-img {
  position: relative;
  user-select: none;
  -webkit-user-drag: none;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 5px 15px;
}
</style>
