<script setup lang="ts">
const props = defineProps({
  name: String,
  spin: Boolean,
});
</script>

<template>
  <span class="iconfont icon" :class="`icon-${props.name}`" :spin="props.spin"></span>
</template>

<style lang="scss">
.icon {
  font-size: 1em;
}

[spin='true'] {
  animation: turn 5s linear infinite;
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
