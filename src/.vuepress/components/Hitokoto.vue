<script setup lang="ts">
// import { ref, onMounted, nextTick } from 'vue';
// import { useRouter } from 'vue-router';
// import axios from 'axios';
// let hitokotoUrl = 'https://v1.hitokoto.cn';

// const InsertText = (data) => {
//   const Win: any = window;

//   clearInterval(Win.Mo7HitokotoTimer);

//   const hitokotoElm = document.getElementById('hitokoto_text');
//   if (!hitokotoElm) {
//     return;
//   }

//   const authorElm = document.getElementById('hitokoto_author');
//   if (!authorElm) {
//     return;
//   }
//   authorElm.innerHTML = `——「${data.from}」`;
//   authorElm.style.opacity = '0';

//   const arr = data.hitokoto.split('');

//   let index = 0;
//   let indexMax = arr.length - 1;
//   const innerTextArr: any = [];
//   let isReverse = false;
//   let stopNumMax = 10; // 停留 等待时长
//   let stopNum = stopNumMax;

//   let doneNumMax = 6; // 完成 等待时长
//   let doneNum = doneNumMax;

//   Win.Mo7HitokotoTimer = setInterval(() => {
//     const el = arr[index];

//     if (stopNum == stopNumMax && doneNum == doneNumMax) {
//       if (isReverse) {
//         index--;
//         innerTextArr.pop();
//       } else {
//         index++;
//         innerTextArr.push(el);
//       }
//     }
//     hitokotoElm.innerHTML = innerTextArr.join('');

//     if (arr.length > 5) {
//       if (innerTextArr.length > arr.length / 2) {
//         authorElm.style.opacity = '1';
//       }
//       if (innerTextArr.length < arr.length / 3) {
//         authorElm.style.opacity = '0';
//       }
//     } else {
//       authorElm.style.opacity = '1';
//     }

//     if (innerTextArr.length >= arr.length) {
//       stopNum--;
//       authorElm.style.opacity = '1';
//       if (stopNum == 0) {
//         stopNum = stopNumMax;
//       }
//     }

//     if (innerTextArr.length == 0) {
//       doneNum--;
//       authorElm.style.opacity = '0';
//       if (doneNum == 0) {
//         doneNum = doneNumMax;
//         clearInterval(Win.Mo7HitokotoTimer);
//         GetWord();
//       }
//     }

//     if (index > indexMax) {
//       isReverse = !isReverse;
//       index = indexMax;
//     }

//     if (index < 0) {
//       isReverse = !isReverse;
//       index = 0;
//     }
//   }, 200);
// };

// const GetWord = () => {
//   const Elm = document.getElementById('mo7-hitokoto-wrapper');
//   if (!Elm) {
//     return;
//   }

//   axios({
//     method: 'get',
//     url: hitokotoUrl,
//     params: {},
//   })
//     .then((response) => {
//       InsertText(response.data);
//     })
//     .catch(() => {
//       hitokotoUrl = 'https://international.v1.hitokoto.cn';
//       GetWord();
//     });
// };

// onMounted(() => {
//   nextTick(() => {
//     GetWord();
//   });

//   const router = useRouter();
//   router.afterEach((to) => {
//     nextTick(() => {
//       setTimeout(() => {
//         GetWord();
//       }, 50);
//     });
//   });
// });
</script>

<template>
  <ClientOnly>
    <div class="none">一言插件</div>
  </ClientOnly>
</template>

<style lang="scss">
// 隐藏首页的内容区域
[data-theme='dark'] {
  .theme-container.mo7-blog-home {
    .theme-hope-content {
      background-color: transparent;
      padding-top: 2rem !important;
      margin-bottom: 1.5rem;
    }
  }
}

[data-theme='light'] {
  .theme-container.mo7-blog-home {
    .theme-hope-content {
      background-color: transparent;
      padding-top: 2rem !important;
      margin-bottom: 1.5rem;
    }
  }
}

#mo7-hitokoto-wrapper {
  padding: 30px;
  font-weight: 600;
  font-family: Arial, '华文行楷';
  .word {
    position: relative;
    padding: 1rem 2.5rem;
    text-align: center;
    .left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .right {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  #hitokoto_text {
    max-width: 80vw;
    position: relative;
    display: inline-block;
    font-size: 1.8rem;
    // &::after {
    //   content: '|';
    //   font-size: 1.3rem;
    //   animation: san 0.8s infinite;
    // }
  }
  #hitokoto_text2 {
    max-width: 80vw;
    position: relative;
    display: inline-block;
    font-size: 1.4rem;
    font-style: italic;
  }
  #hitokoto_author {
    transition: 1s;
    font-style: italic;
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 1rem;
    float: right;
  }
}

@keyframes san {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

[vp-content] {
  @extend .theme-hope-content;
}
</style>
