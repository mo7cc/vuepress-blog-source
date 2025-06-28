<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const CheckSidebarOpen = () => {
  CheckScrollTopClass();
};

const CheckScrollTopClass = () => {
  const themeElms = document.getElementsByClassName('theme-container');
  if (themeElms.length < 1) {
    return null;
  }
  const themeElm = themeElms[0];

  const blogHeroElms = document.getElementsByClassName('vp-blog-hero');
  let blogHeroElm;
  if (blogHeroElms.length > 0) {
    blogHeroElm = blogHeroElms[0];
  }

  if (blogHeroElm) {
    themeElm.classList.add('mo7-blog-hero');
  } else {
    themeElm.classList.remove('mo7-blog-hero');
  }

  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop < 60) {
    themeElm.classList.add('mo7-scroll-top');
  } else {
    themeElm.classList.remove('mo7-scroll-top');
  }

  if (blogHeroElm) {
    if (scrollTop < blogHeroElm.clientHeight - 30) {
      themeElm.classList.add('mo7-scroll-blog-hero-inner');
    } else {
      themeElm.classList.remove('mo7-scroll-blog-hero-inner');
    }
  }

  const toggleSidebarElms = document.getElementsByClassName('vp-toggle-sidebar-button');

  if (toggleSidebarElms.length > 0) {
    const toggleSidebarElm = toggleSidebarElms[0];
    toggleSidebarElm.removeEventListener('click', CheckSidebarOpen);
    toggleSidebarElm.addEventListener('click', CheckSidebarOpen);
  }
};

onMounted(() => {
  nextTick(() => {
    CheckScrollTopClass(); // 切换时顶栏修改

    window.removeEventListener('scroll', () => {});
    window.addEventListener('scroll', () => {
      CheckScrollTopClass();
    });
  });

  const router = useRouter();
  router.afterEach(() => {
    nextTick(() => {
      setTimeout(() => {
        CheckScrollTopClass(); // 切换时顶栏修改
      }, 50);
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="none">修改顶栏组件</div>
  </ClientOnly>
</template>

<style lang="scss">
// sidebar 跟随顶栏一起上下移动
.theme-container {
  .vp-sidebar {
    transition: top 0.3s;
  }
  .toggle-sidebar-wrapper {
    transition: top 0.3s;
  }

  &.hide-navbar {
    .vp-sidebar {
      top: 0;
    }
    .toggle-sidebar-wrapper {
      top: 0;
    }
    .vp-toc-placeholder {
      top: 0.5rem;
    }
  }
}

// 当导航栏在首页导到达顶部时
.theme-container.mo7-scroll-top.mo7-blog-hero {
  .vp-navbar {
    box-shadow: none;
  }
}

// hero 背景置顶
.theme-container .vp-page.vp-blog-home {
  padding-top: 0;
}
// 索引页面顶部调整
.blog-page-wrapper {
  .vp-blog-main {
    min-height: 710px;
  }
}
// 首页内容位置调整
.theme-container.mo7-blog-hero {
  .blog-page-wrapper {
    .vp-blog-main {
      margin-top: 0.4em;
    }
  }
}

// 简化搜索按钮
.slimsearch-button {
  .slimsearch-placeholder,
  .slimsearch-key-hints {
    display: none;
  }

  border-radius: 100%;
  background-color: transparent;
}

// 导航栏透明
.theme-container {
  .vp-navbar {
    background: transparent;
  }
}
.theme-container.mo7-blog-hero.mo7-scroll-top {
  .vp-navbar {
    backdrop-filter: none;
  }
}

// 给文章顶部添加过渡，让其更加自然
#main-content {
  .vp-toc-placeholder {
    transition: top 0.3s;
  }
}

// 白天
[data-theme='light'] {
  .theme-container {
    .vp-navbar {
      backdrop-filter: blur(2px);
    }
  }

  .theme-container.mo7-scroll-blog-hero-inner {
    // 搜索按钮
    .slimsearch-button {
      color: #eee;
    }
    // 调色盘
    .vp-appearance-button {
      color: #eee;
    }

    // 左边的名字颜色调整
    .vp-site-name {
      color: #eee;
      text-shadow: 0.05rem 0.05rem 0.1rem rgb(0 0 0 / 50%);
      opacity: 0.85;
      &:hover {
        color: var(--theme-color-light);
        opacity: 1;
      }
    }

    .vp-dropdown-title {
      color: #eee;
    }
    .vp-navbar {
      .vp-nav-item > .auto-link {
        color: #eee;
      }
      .vp-dropdown-title .i18n-icon {
        color: #eee;
      }
      .vp-outlook-button {
        color: #eee;
      }
      // 去除下拉图标
      .vp-dropdown-title .arrow {
        display: none;
      }
    }

    // 移动端 菜单按钮
    .vp-toggle-sidebar-button::before,
    .vp-toggle-sidebar-button::after,
    .vp-toggle-sidebar-button .icon {
      background: #eee;
    }

    .vp-toggle-navbar-button .vp-top,
    .vp-toggle-navbar-button .vp-middle,
    .vp-toggle-navbar-button .vp-bottom {
      background: #eee;
    }
  }
}

// 黑夜细节
[data-theme='dark'] {
  .theme-container {
    .vp-navbar {
      backdrop-filter: blur(2px);
    }
  }

  .theme-container.mo7-scroll-blog-hero-inner {
    .vp-navbar {
      // 去除下拉图标
      .vp-dropdown-title .arrow {
        display: none;
      }
    }
  }
}
</style>
