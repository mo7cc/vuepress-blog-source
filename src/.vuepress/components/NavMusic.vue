<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css';
import MyIcon from './MyIcon.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';

let APlayer: any;
let IsShow = ref(false);
let GlobalMusicList = [];

const SwitchStatus = () => {
  IsShow.value = !IsShow.value;
};

const CloseStatus = () => {
  if (IsShow.value) {
    IsShow.value = false;
  }
};

const InsertMenu = () => {
  const navCenterElm = document.querySelector('.vp-navbar-end');

  if (!navCenterElm) {
    return;
  }

  if (!document.querySelector('#MyMusic_Menu')) {
    const elm = document.createElement('div');
    elm.id = 'MyMusic_Menu';
    elm.classList.add('nav-item');
    elm.innerHTML = `<div id="MyMusic_icon" class="btnImg"></div>`; // spin="true"
    navCenterElm.appendChild(elm);
  }

  const Menu = document.querySelector('#MyMusic_Menu') as HTMLElement;
  Menu.onclick = (event) => {
    SwitchStatus();
    event.stopPropagation();
  };

  const MyMusicWrapper = document.querySelector('.MyMusic') as HTMLElement;
  MyMusicWrapper.onclick = (event) => {
    event.stopPropagation();
  };
};

const NewPlayer = () => {
  if (!APlayer) {
    return;
  }

  const Win: any = window;
  // 如果不存在盒子 则 终止
  const playElm = document.getElementById('GlobalAPlayer');

  if (!playElm) {
    return;
  }

  if (GlobalMusicList.length < 1) {
    return;
  }

  AddBtnSpin();

  // 判断是否被 APlayer 接管
  const playExist = playElm.classList.contains('aplayer');
  if (playExist) {
    return;
  }

  Win.GlobalAPlayer = new APlayer({
    container: document.getElementById('GlobalAPlayer'),
    audio: GlobalMusicList,
    lrcType: 3,
    listFolded: false,
    listMaxHeight: '324px',
    mini: false,
    fixed: false,
    volume: 1,
    storageName: 'GlobalAPlayer',
  });

  // 让按钮旋转
  Win.GlobalAPlayer.on('play', function () {
    AddBtnSpin();
  });
  Win.GlobalAPlayer.on('pause', function () {
    AddBtnSpin();
  });
};

function AddBtnSpin() {
  const Win: any = window;
  if (Win.GlobalAPlayer && Win.GlobalAPlayer.mode) {
    if (Win.GlobalAPlayer.paused) {
      document.getElementById('MyMusic_icon')?.setAttribute('spin', 'false');
    } else {
      document.getElementById('MyMusic_icon')?.setAttribute('spin', 'true');
    }
  }
}

// function StopMusic() {
//   const Win: any = window;
//   let toPath = window.location.pathname;

//   if (toPath.includes('/music/') && Win.GlobalAPlayer) {
//     Win.GlobalAPlayer.pause();
//   }
// }

const LoadMusicList = (callback) => {
  axios({
    method: 'get',
    url: '//file.mo7.cc/music/list.json',
    params: {},
  }).then((response) => {
    var listData = response.data;
    if (listData && listData.length > 0) {
      GlobalMusicList = listData;
    }
    console.log('加载音乐列表', GlobalMusicList);
    callback && callback();
  });
};

onMounted(() => {
  const router = useRouter();

  LoadMusicList(() => {
    import('aplayer').then((res) => {
      nextTick(() => {
        APlayer = res.default;
        InsertMenu();
        NewPlayer();
        // 在这里插入全局事件监听
        window.document.body.onclick = () => {
          CloseStatus();
        };
      });
      router.afterEach(() => {
        setTimeout(() => {
          InsertMenu();
          NewPlayer();
        }, 50);
      });
    });
  });
});
</script>

<template>
  <ClientOnly>
    <div class="MyMusic">
      <div class="MyMusic_Play" :class="{ hide: !IsShow }">
        <div class="close" @click="CloseStatus"><MyIcon name="guanbi" /></div>
        <div id="GlobalAPlayer"></div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
#GlobalAPlayer {
  .aplayer-list-title,
  .aplayer-title {
    color: rgb(60, 60, 67);
  }
}

.MyMusic {
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 100;
  cursor: pointer;
  user-select: none;
}

.MyMusic_Play {
  background-color: #fff;
  user-select: none;
  position: fixed;
  width: 280px;
  height: 392px;
  top: 50%;
  right: 50%;
  margin-right: -140px;
  margin-top: -217px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  transition: 0.3s;
  transform: scale(1);
  opacity: 1;
  &.hide {
    top: 0;
    right: 0;
    opacity: 0;
    transform: scale(0);
    visibility: hidden;
  }

  .aplayer {
    margin: 0;
  }

  .close {
    position: absolute;
    right: 8px;
    top: 8px;
    user-select: none;
    cursor: pointer;
    font-size: 18px;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

#MyMusic_Menu {
  top: 1px;
  user-select: none;
  cursor: pointer;
  opacity: 0.7;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--theme-color);
  .icon {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
  }
  height: 1.6rem;
  width: 1.6rem;
  .btnImg {
    background-image: url('/img/playBtn.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}
</style>
