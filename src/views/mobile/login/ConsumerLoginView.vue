<template>
  <n-flex
    class="consumer-login"
    vertical
    justify="space-between"
    :size="24"
    style="padding: 16px 24px; height: 100%"
  >
    <n-flex
      class="title-container"
      vertical
      justify="center"
      align="center"
      :size="0"
    >
      <p class="logo-text">🚬</p>
      <h2>전자담배 중고거래, 담팔에서</h2>
      <p class="subtitle-text">
        신규 기기부터 일회용, 액상까지<br />믿을 수 있는 사용자 간 직거래 플랫폼
      </p>
    </n-flex>
    <n-button type="primary" size="large" @click="handleClick">
      지금 시작하기
    </n-button>
  </n-flex>
</template>

<script setup lang="js">
import { NButton, NFlex } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = () => {
  router.push('/login/terms');
};
</script>

<style lang="scss" scoped>
.consumer-login {
  padding: 16px 24px;
  height: 100%;
  .title-container {
    flex: 1;
    > .logo-text {
      font-size: 64px;
    }

    > h2 {
      margin-top: 16px;
    }

    > .subtitle-text {
      margin-top: 8px;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }
}
</style>
