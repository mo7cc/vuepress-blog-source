import store from 'store';

export const mStorage = store;

export const LoadImage = (url) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {};
};

function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
  }
}

export const CheckStorage = () => {
  const nowTime = Date.now() - 0;

  const localTime = mStorage.get('LastStoreDataTime');
  if (!(localTime - 0)) {
    mStorage.set('LastStoreDataTime', nowTime);
    return;
  }

  const Diff = nowTime - localTime;

  if (Diff > 86400000) {
    mStorage.clearAll();
    clearAllCookie();
  }
};

export const GetDeviceInfo = () => {
  const u = window.navigator.userAgent.toLowerCase();
  const bIsIpad = u.match(/ipad/i) !== null;
  const bIsIphoneOs = u.match(/iphone os/i) !== null;
  const bIsMidp = u.match(/midp/i) !== null;
  const bIsUc7 = u.match(/rv:1.2.3.4/i) !== null;
  const bIsUc = u.match(/ucweb/i) !== null;
  const bIsAndroid = u.match(/android/i) !== null;
  const bIsCE = u.match(/windows ce/i) !== null;
  const bIsWM = u.match(/windows mobile/i) !== null;
  const bIsIOS = !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) || u.indexOf('ios') > -1;
  let isPhone = false;
  let isPc = false;
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsIOS) {
    isPhone = true;
  } else {
    isPc = true;
  }
  const obj = {
    userAgent: u,
    isWindows: u.match(/windows/i) !== null,
    isMac: u.match(/macintosh/i) !== null,
    isWeChat: u.match(/MicroMessenger/i) !== null,
    isWeibo: u.match(/WeiBo/i) !== null,
    isAndroid: u.indexOf('android') > -1 || u.indexOf('adr') > -1,
    isIOS: bIsIOS,
    isQQ: u.match(/qq\//i) !== null,
    isPC: isPc,
    isPhone: isPhone,
    isDingTalk: u.match(/dingtalk/i),
  };
  return obj;
};
