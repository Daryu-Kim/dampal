<template>
  <n-flex
    class="consumer-login-personal-info"
    vertical
    justify="space-between"
    :size="24"
    style="padding: 16px 24px; height: 100%"
  >
    <n-space vertical :size="0">
      <n-page-header @back="handleBack"></n-page-header>
      <h2 style="margin-top: 24px">
        회원가입을 위해<br />기본 정보를 입력해 주세요
      </h2>
      <n-space vertical :size="0" style="margin-top: 16px">
        <h3>이름</h3>
        <n-input
          v-model:value="inputName"
          placeholder="휴대폰 명의자 이름을 입력해 주세요."
          type="text"
          maxlength="8"
          style="margin-top: 8px"
          show-count
        />
      </n-space>
      <n-space vertical :size="0" style="margin-top: 16px">
        <h3>주민번호</h3>
        <n-input-group style="margin-top: 8px">
          <n-input
            v-model:value="front"
            placeholder="예) 950101"
            maxlength="6"
            @input="onFrontInput"
          />
          <p style="line-height: 34px; width: 64px; text-align: center">-</p>
          <n-input
            v-model:value="back"
            placeholder="주민번호 뒷자리"
            maxlength="7"
            type="password"
            show-password-on="click"
            @input="onBackInput"
          />
        </n-input-group>
      </n-space>
      <n-space vertical :size="0" style="margin-top: 16px">
        <h3>통신사</h3>
        <n-select
          style="margin-top: 8px"
          v-model:value="inputCarrier"
          :options="options"
        />
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
import { NButton, NFlex, NPageHeader, NSpace, NInput, NInputGroup, NSelect } from 'naive-ui';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { encryptText } from '@/lib/crypto';

const router = useRouter();
const inputName = ref('');
const front = ref('');
const back = ref('');
const inputCarrier = ref('');

const options = [
  {
    label: "통신사를 선택해주세요",
    value: "",
    disabled: true,
  },
  {
    label: "SKT",
    value: "SKT",
  },
  {
    label: "KT",
    value: "KT",
  },
  {
    label: "LG U+",
    value: "LGU",
  },
  {
    label: "SKT 알뜰폰",
    value: "SKT2",
  },
  {
    label: "KT 알뜰폰",
    value: "KT2",
  },
  {
    label: "LG U+ 알뜰폰",
    value: "LGU2",
  },
]

const canProceed = computed(() =>
  inputName.value.length > 0 &&
  front.value.length === 6 &&
  back.value.length === 7 &&
  inputCarrier.value !== ""
);

const onFrontInput = (value) => {
  front.value = value.replace(/\D/g, '').slice(0, 6);
};

const onBackInput = (value) => {
  back.value = value.replace(/\D/g, '').slice(0, 7);
};

const handleBack = () => {
  router.back();
};

const handleClick = async () => {
  try {
    const encryptedRrn = await encryptText(`${front.value}-${back.value}`)
    localStorage.setItem("login_name", inputName.value);
    localStorage.setItem("login_rrn", encryptedRrn);
    localStorage.setItem("login_carrier", inputCarrier.value);
    router.push('/login/set-password');
  } catch (error) {
    console.error("Error occurred while checking account: ", error.message);
  }
};
</script>
