<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { mStorage } from '../utils/tools.js';

const ShowComments = () => {
  const CommentElm = document.getElementById('comment') as HTMLElement;
  if (!CommentElm) {
    return;
  }
  CommentElm.classList.add('show');
  CommentElm.classList.remove('hide');
  mStorage.set('CommentIsDisplay', true);
};
const HideComments = () => {
  const CommentElm = document.getElementById('comment') as HTMLElement;
  if (!CommentElm) {
    return;
  }
  CommentElm.classList.add('hide');
  CommentElm.classList.remove('show');
  mStorage.set('CommentIsDisplay', false);
};

const ReadeCommentIsDisplay = () => {
  const CommentElm = document.getElementById('comment') as HTMLElement;
  if (!CommentElm) {
    return;
  }

  const CommentIsDisplay = mStorage.get('CommentIsDisplay');
  if (CommentIsDisplay) {
    ShowComments();
  } else {
    HideComments();
  }

  CommentElm.style.opacity = '1';
};

const CreateCommentBtn = () => {
  const CommentElm = document.getElementById('comment');
  if (!CommentElm) {
    return;
  }

  if (!document.getElementById('ShowComment')) {
    const BtnElm = document.createElement('button');
    BtnElm.id = 'ShowComment';
    BtnElm.classList.add('primary');
    BtnElm.classList.add('wl-btn');
    BtnElm.innerHTML = '显示评论区';
    CommentElm.appendChild(BtnElm);
  }
  if (!document.getElementById('HideComment')) {
    const BtnElm = document.createElement('button');
    BtnElm.id = 'HideComment';
    BtnElm.classList.add('primary');
    BtnElm.classList.add('wl-btn');
    BtnElm.innerHTML = '隐藏评论区';
    CommentElm.appendChild(BtnElm);
  }

  const showBtn = document.getElementById('ShowComment');
  const hideBtn = document.getElementById('HideComment');
  if (showBtn && hideBtn) {
    showBtn.onclick = ShowComments;
    hideBtn.onclick = HideComments;
  }
};

onMounted(() => {
  nextTick(() => {
    CreateCommentBtn();
    ReadeCommentIsDisplay();
  });

  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      setTimeout(() => {
        CreateCommentBtn();
        ReadeCommentIsDisplay();
      }, 500);
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="none">评论区隐藏按钮</div>
  </ClientOnly>
</template>

<style lang="scss">
// 评论插件的样式修改
.wl-card .wl-meta > span {
  background: transparent;
}

.vp-comment {
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: 0.3s;
  margin-bottom: 2rem;
  [provider='Waline'] {
    opacity: 0;
    margin-bottom: 5rem;
  }
  &.hide {
    max-height: 0;
    [provider='Waline'] {
      opacity: 0;
      transition: 0.3s;
    }
    #ShowComment {
      display: block;
    }
    #HideComment {
      display: none;
    }
  }
  &.show {
    max-height: 9999px;
    [provider='Waline'] {
      opacity: 1;
      transition: 0.3s;
    }
    #ShowComment {
      display: none;
    }
    #HideComment {
      display: block;
    }
  }
}

#ShowComment {
  top: 0;
}
#HideComment {
  bottom: 0;
}
#ShowComment,
#HideComment {
  display: none;
  position: absolute;
  left: 50%;
  margin-left: -4em;
  width: 8em;
  z-index: 5;
  user-select: none;
  transition: 0.3s;
  font-size: 0.9rem;
}
</style>
