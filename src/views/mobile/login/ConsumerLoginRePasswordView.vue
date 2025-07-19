<template>
  <n-flex
    class="consumer-login-re-password"
    vertical
    justify="space-between"
    :size="24"
    style="padding: 16px 24px; height: 100%"
  >
    <n-space vertical :size="0">
      <n-page-header @back="handleBack"></n-page-header>
      <h2 style="margin-top: 24px">비밀번호를 한번 더 입력해 주세요</h2>
      <n-space vertical :size="0" style="margin-top: 16px">
        <n-input-otp v-model:value="inputPassword" mask block size="large" />
      </n-space>
    </n-space>
    <n-button
      type="primary"
      size="large"
      :disabled="!canProceed"
      @click="handleClick"
    >
      다음
    </n-button>
  </n-flex>
</template>

<script setup lang="js">
import { NButton, NFlex, NPageHeader, NSpace, NInputOtp } from 'naive-ui';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { decryptText } from '@/lib/crypto';

const router = useRouter();
const inputPassword = ref([""]);

const passwordString = computed(() => inputPassword.value.join(""));

const canProceed = computed(() =>
  inputPassword.value.every(v => v.trim() !== "")
);

const handleBack = () => {
  router.back();
};

const handleClick = async () => {
  try {
    const checkPassword = await decryptText(localStorage.getItem("login_password"));
    if (checkPassword !== passwordString.value) {
      alert("비밀번호가 일치하지 않습니다!");
      inputPassword.value = [""];
      return;
    }
    router.push('/login/capture-id-card');
  } catch (error) {
    console.error("Error occurred while checking account: ", error.message);
  }
};
</script>
