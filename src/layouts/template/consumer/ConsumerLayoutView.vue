<template>
  <DesktopView v-if="!isMobileOnly && !isTablet" />
  <MobileView v-if="isMobileOnly" />
</template>

<script setup lang="js">
import DesktopView from "@/layouts/desktop/consumer/ConsumerLayoutView.vue";
import MobileView from "@/layouts/mobile/consumer/ConsumerLayoutView.vue";
import { isMobileOnly, isTablet } from "mobile-device-detect";
</script>
