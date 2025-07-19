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
      <h2 style="margin-top: 24px; margin-bottom: 8px">
        주민등록증이나<br />운전면허증을 준비해주세요
      </h2>
      <n-highlight
        style="font-weight: 700"
        text="생각보다 쉬워요. 30초면 충분해요."
        :patterns="['30초']"
        :highlight-style="{
          padding: '0 6px',
          borderRadius: themeVars.borderRadius,
          display: 'inline-block',
          color: themeVars.baseColor,
          background: themeVars.primaryColor,
          transition: `all .3s ${themeVars.cubicBezierEaseInOut}`,
          marginRight: '2px',
        }"
      />
      <n-flex align="center" justify="center" style="margin-top: 48px">
        <Icon size="256">
          <VideoLabelFilled />
        </Icon>
      </n-flex>
    </n-space>
    <n-button type="primary" size="large" @click="handleClick">
      신분증 인증하기
    </n-button>
  </n-flex>
</template>

<script setup lang="js">
import { NButton, NFlex, NPageHeader, NSpace, NHighlight, useThemeVars } from 'naive-ui';
import { useRouter } from 'vue-router';
import { Icon } from '@vicons/utils';
import { VideoLabelFilled } from '@vicons/material';

const router = useRouter();
const themeVars = useThemeVars();

const handleBack = () => {
  router.back();
};

const handleClick = async () => {
  try {
    router.push('/login/scan-id-card');
  } catch (error) {
    console.error("Error occurred while checking account: ", error.message);
  }
};
</script>
