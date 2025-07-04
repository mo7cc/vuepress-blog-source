<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
const css_list = [
  {
    id: 'klipse_codemirror_css',
    href: '//storage.googleapis.com/app.klipse.tech/css/codemirror.css',
  },
  {
    id: 'klipse_prolog_css',
    href: '//storage.googleapis.com/app.klipse.tech/css/prolog.css',
  },
];

// 插入 css 文件
function init_klipse_css(cssInfo) {
  const linkElm = window.document.getElementById(cssInfo.id);
  if (!linkElm) {
    const linkElm = document.createElement('link');
    linkElm.type = 'text/css';
    linkElm.rel = 'stylesheet';
    linkElm.href = cssInfo.href;
    linkElm.id = cssInfo.id;
    window.document.body.appendChild(linkElm);
  }
}
// 插入 js 文件
function init_klipse_lib() {
  var jsElm = document.createElement('script');
  jsElm.src = '//storage.googleapis.com/app.klipse.tech/plugin_prod/js/klipse_plugin.min.js?the_version=7.11.2';
  window.document.body.appendChild(jsElm);
}

function Start() {
  const Win: any = window;
  Win.klipse_settings = {
    codemirror_options_in: {
      lineWrapping: true,
      autoCloseBrackets: true,
    },
    codemirror_options_out: {
      lineWrapping: true,
    },
    beautify_strings: true,
    selector_eval_cpp: '.language-klipse-cpp',
  };
  init_klipse_lib();
  init_klipse_css(css_list[0]);
  init_klipse_css(css_list[1]);
}

onMounted(() => {
  nextTick(() => {
    Start();
  });
});
</script>

<template>
  <ClientOnly>
    <div class="none">Klipse 插件支持</div>
  </ClientOnly>
</template>

<style lang="scss">
.klipse-demo pre {
  margin: 0;
  padding: 0;
}
</style>
