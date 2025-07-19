<template>
  <MobileView v-if="isMobileOnly" />
</template>

<script setup lang="js">
import MobileView from "@/layouts/mobile/login/ConsumerLoginLayoutView.vue";
import { isMobileOnly, isTablet } from "mobile-device-detect";
</script>
