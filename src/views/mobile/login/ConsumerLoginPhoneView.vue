<template>
  <n-flex
    class="consumer-login-phone"
    vertical
    justify="space-between"
    :size="24"
  >
    <n-space vertical :size="0">
      <n-page-header @back="handleBack"></n-page-header>
      <h2>휴대폰 정보를 입력해 주세요</h2>
      <n-input
        v-model:value="inputPhone"
        :input-props="{ type: 'tel' }"
        placeholder="010-0000-0000"
        type="text"
        maxlength="11"
        show-count
        @input="handlePhoneInput"
      />
    </n-space>
    <n-button
      type="primary"
      size="large"
      @click="handleClick"
      :disabled="!canProceed"
    >
      계정 확인하기
    </n-button>
  </n-flex>
</template>

<script setup lang="js">
import { NButton, NFlex, NPageHeader, NSpace, NInput } from 'naive-ui';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const router = useRouter();
const inputPhone = ref('');

const canProceed = computed(() =>
  inputPhone.value.length === 11 && /^[0-9]+$/.test(inputPhone.value)
);

const handleBack = () => {
  router.back();
};

const handlePhoneInput = (value) => {
  inputPhone.value = value.replace(/\D/g, "").slice(0, 11);
}

const handleClick = async () => {
  try {
    console.log("Checking account with phone number: ", inputPhone.value);
    localStorage.setItem("login_phone_number", inputPhone.value);
    const userDocs = await getDocs(query(collection(db, "users"), where("phone", "==", inputPhone.value)));
    if (userDocs.size > 0) {
      // 회원 정보 있음. 로그인으로 바로 진행.
      router.push('/login/check-password');
    } else {
      // 회원 정보 없음. 개인정보 수집 라인으로 이동.
      router.push("/login/personal-info");
    }
  } catch (error) {
    console.error("Error occurred while checking account: ", error.message);
  }
};
</script>

<style lang="scss" scoped>
.consumer-login-phone {
  padding: 16px 24px;
  height: 100%;

  h2 {
    margin-top: 24px;
  }

  .n-input {
    margin-top: 16px;
  }
}
</style>
