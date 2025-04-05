<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

const BlogBg = () => {
  if (!document.getElementById('mo7_BlogBg')) {
    const bgDiv = document.createElement('div');
    bgDiv.id = 'mo7_BlogBg';
    document.body.appendChild(bgDiv);
  }
};

const CanvasNest = () => {
  // 创建 dom
  if (!document.getElementById('mo7_bg_canvas_nest')) {
    const canvasElm = document.createElement('canvas');
    canvasElm.id = 'mo7_bg_canvas_nest';
    document.body.appendChild(canvasElm);
  }
  // 引入 js 文件
  if (!document.getElementById('canvas_nest_js')) {
    var jsElm = document.createElement('script');
    jsElm.id = 'canvas_nest_js';
    jsElm.src = '/mo7-script/canvas-nest.js';
    jsElm.type = 'text/javascript';
    document.body.appendChild(jsElm);
  }
};

const GrainParallax = () => {
  // 插入 css
  if (!document.getElementById('mo7_grain_parallax_css')) {
    const cssElm = document.createElement('link');
    cssElm.type = 'text/css';
    cssElm.rel = 'stylesheet';
    cssElm.href = '/mo7-script/grain-parallax.css';
    cssElm.id = 'mo7_grain_parallax_css';
    document.body.appendChild(cssElm);
  }

  // 创建 dom
  if (!document.getElementById('mo7_bg_grain_parallax')) {
    const boxElm = document.createElement('div');
    boxElm.id = 'mo7_bg_grain_parallax';
    document.body.appendChild(boxElm);
    boxElm.innerHTML = `
<div id="particles-background"></div>
<div id="particles-foreground"></div>
    `;
  }

  // 插入 js
  if (!document.getElementById('mo7_grain_parallax_js')) {
    console.log('执行 mo7_grain_parallax_js');
    var jsElm = document.createElement('script');
    jsElm.id = 'mo7_grain_parallax_js';
    jsElm.type = 'text/javascript';
    jsElm.src = '/mo7-script/grain-parallax.js';
    document.body.appendChild(jsElm);
  }
};

// 根据主题模式加载不同的动态
function LoadColorModelCanvas() {
  setTimeout(() => {
    const targetNode = document.getElementsByTagName('html')[0];
    const themColor = targetNode.getAttribute('data-theme');
    if (themColor === 'dark') {
      GrainParallax();
    } else if (themColor === 'light') {
      CanvasNest();
    }
  }, 100);
}

// 监听主题模式的切换
var ObserverColorModel = () => {
  const ColorModelBtn = document.getElementById('color-mode-switch');
  if (ColorModelBtn) {
    ColorModelBtn.removeEventListener('click', LoadColorModelCanvas);
    ColorModelBtn.addEventListener('click', LoadColorModelCanvas);
  }
};

onMounted(() => {
  nextTick(() => {
    console.log('执行背景美化');

    BlogBg();
    LoadColorModelCanvas();
    ObserverColorModel();
  });
});
</script>

<template>
  <ClientOnly>
    <div class="none">背景美化</div>
  </ClientOnly>
</template>

<style lang="scss">
@mixin noEvent {
  user-select: none; // 禁止选中
  pointer-events: none; // 禁止点击
}

@mixin bgStyle_light {
  // background-color: rgba(255, 255, 255, 1); // 原色
  background-image: linear-gradient(50deg, #fbc2eb 70%, #a6c1ee 30%);
}

@mixin bgStyle_dark {
  // background-color: rgba(13, 17, 24, 1); // 原色
}

html[data-theme='light'] {
  // --vp-c-gutter: rgba(44, 62, 80, 0.4);
}

html[data-theme='dark'] {
  --vp-c-gutter: rgba(158, 158, 158, 0.5);
}

#mo7_BlogBg {
  // 布局代码
  @include noEvent;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  // 设置蒙层
  &::after {
    @include noEvent;
    content: '';
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
  }
}

@mixin bg-canvas-style {
  @include noEvent;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
}
#mo7_bg_canvas_nest,
#mo7_bg_grain_parallax {
  @include bg-canvas-style;
}

// 层级调整 ， 全部需要 > 5
#app {
  position: relative;
  z-index: 5;
}

.theme-container {
  .vp-page.vp-blog,
  .vp-page.vp-blog-home {
    background: transparent; // 博客背景设置为透明
  }
}

@mixin theme-hope-content-style {
  border-radius: 0.4rem;
  padding-top: 1px !important;
}
@mixin toc-style {
  border-radius: 0.4rem;
  padding: 0.6rem 0;
}

[data-theme='light'] {
  #mo7_bg_grain_parallax {
    display: none;
  }
  #mo7_BlogBg {
    @include bgStyle_light;
  }

  @mixin content-bg-style {
    background-color: rgba($color: #fff, $alpha: 0.8);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  #toc {
    @include toc-style;
    @include content-bg-style;
  }

  .theme-container {
    .vp-sidebar {
      background: transparent; // 侧边栏透明度
      // backdrop-filter: blur(2px); // 毛玻璃效果
    }

    .theme-hope-content {
      @include theme-hope-content-style;
      @include content-bg-style;
    }
  }
}

[data-theme='dark'] {
  #mo7_bg_canvas_nest {
    display: none;
  }
  #mo7_BlogBg {
    @include bgStyle_dark;
  }
  @mixin content-bg-style {
    background-color: rgba($color: #000000, $alpha: 0.6);
    box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 8px 0px;
  }

  #toc {
    @include toc-style;
    @include content-bg-style;
  }

  .theme-container {
    .vp-sidebar {
      background: transparent; // 侧边栏透明度
    }

    .theme-hope-content {
      @include theme-hope-content-style;
      @include content-bg-style;
    }
  }
}

@media screen and (max-width: 1240px) {
  .theme-container {
    .theme-hope-content {
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
}

@media screen and (max-width: 719px) {
  .theme-container {
    .vp-blog-type-switcher {
      padding-top: 20px;
    }

    .theme-hope-content {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }

  [data-theme='light'] {
    .theme-container {
      .vp-sidebar {
        background: rgba(#fff, 0.6);
        backdrop-filter: blur(18px); // 毛玻璃效果
      }
      .vp-nav-screen {
        background: rgba(#fff, 0.6);
        backdrop-filter: blur(18px); // 毛玻璃效果
      }
    }
  }

  [data-theme='dark'] {
    .theme-container {
      .vp-sidebar {
        backdrop-filter: blur(18px); // 毛玻璃效果
      }
      .vp-nav-screen {
        background: transparent;
        backdrop-filter: blur(18px); // 毛玻璃效果
      }
    }
  }
}

.theme-container {
  .vp-sidebar {
    backdrop-filter: none;
  }
  .vp-sidebar > .vp-sidebar-links {
    padding-right: 8px;
  }
  .vp-sidebar > .vp-sidebar-links {
    & > li > .vp-sidebar-group {
      backdrop-filter: blur(2px); // 毛玻璃效果
      border-radius: 0.4rem;
      padding: 8px 0;
    }
  }
}

@media screen and (min-width: 1440px) {
  [data-theme='light'] {
    .theme-container {
      .vp-sidebar > .vp-sidebar-links {
        & > li > .vp-sidebar-group {
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
        }
      }
    }
  }

  [data-theme='dark'] {
    .theme-container {
      .vp-sidebar > .vp-sidebar-links {
        & > li > .vp-sidebar-group {
          box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 8px 0px;
        }
      }
    }
  }
}

[vp-content] {
  @extend .theme-hope-content;
}
</style>
