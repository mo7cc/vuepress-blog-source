<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const ReplaceHeroContent = () => {
  const mo7HeroContentElm = document.getElementById('mo7-blog-hero-content');
  if (!mo7HeroContentElm) {
    return;
  }

  const vpBlogHeroImage = document.querySelector('.vp-blog-hero-image');
  if (vpBlogHeroImage) {
    vpBlogHeroImage.remove();
  }
  const vpBlogHeroInfo = document.querySelector('.vp-blog-hero-info');
  if (vpBlogHeroInfo) {
    vpBlogHeroInfo.innerHTML = '';
    vpBlogHeroInfo.appendChild(mo7HeroContentElm);
  }
};

onMounted(() => {
  nextTick(() => {
    ReplaceHeroContent();
  });

  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      setTimeout(() => {
        ReplaceHeroContent();
      }, 50);
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="none">HeroContent修改</div>
  </ClientOnly>
</template>

<style lang="scss">
// 隐藏元素

#mo7-blog-hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .vp-blog-hero-image {
    transition: all 0.5s;
    width: 124px;
    display: block;
    padding: 0;
    border: none;
    margin: 0 auto;
  }

  .link {
    transition: all 0.5s;
    display: block;
    color: #eee;
    cursor: pointer;
    padding: 10px 26px;
    border-radius: 8px;
    text-shadow: 5px 3px 3px rgba(0, 0, 0, 0.7);
    text-align: center;
    &.image-link {
      padding: 10px;
    }
    h2 {
      padding: 0;
      margin: 0;
      font-size: 1.8rem;
      border: none;
    }
    span {
      font-size: 1rem;
    }
    h1 {
      padding: 0;
      margin: 0;
      border: none;
      font-size: 3.8em;
      .vp-blog-hero-subtitle {
        font-size: 2.4rem;
      }
    }
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      text-decoration: underline;
    }
  }

  .link-1 {
    animation: 1s showAnimation;
  }
  .link-2 {
    animation: 1.4s showAnimation;
  }
  .link-3 {
    animation: 1.8s showAnimation;
  }
  .link-4 {
    animation: 2.2s showAnimation;
  }
  .link-5 {
    animation: 2.6s showAnimation;
  }
  .link-6 {
    animation: 3s showAnimation;
  }
  .mo7-signature {
    margin: 0 auto;
    text-align: center;
    font-family: Arial, '华文行楷';
    font-style: italic;
    font-size: 2.1rem;
    font-weight: 400;
    margin-top: 0.6rem;
    animation: 4s showAnimation;
    text-shadow: 5px 3px 3px rgba(0, 0, 0, 0.7);
  }
}

@keyframes showAnimation {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
