<template>
  <MobileView v-if="isMobileOnly" />
</template>

<script setup lang="js">
import MobileView from "@/views/mobile/login/ConsumerLoginView.vue";
import { isMobileOnly, isTablet } from "mobile-device-detect";
</script>
