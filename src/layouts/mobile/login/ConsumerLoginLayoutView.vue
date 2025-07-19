<template>
  <div class="consumer-login-layout">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted } from 'vue';

onMounted(async () => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
});
</script>

<style lang="scss" scoped>
.consumer-login-layout {
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  padding-bottom: env(safe-area-inset-bottom);

  > .content {
    flex: 1;
    overflow: scroll;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
