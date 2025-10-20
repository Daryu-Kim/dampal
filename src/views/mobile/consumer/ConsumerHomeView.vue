<template>
  <n-layout class="consumer-home">
    <n-flex :size="8" :wrap="false" class="category-container">
      <n-button
        :type="selectedCategoryId === '' ? 'primary' : 'default'"
        @click="selectedCategoryId = ''"
        round
      >
        전체
      </n-button>
      <n-button
        v-for="item in categoryDatas"
        :key="item.id"
        :type="selectedCategoryId === item.id ? 'primary' : 'default'"
        @click="selectedCategoryId = item.id"
        round
      >
        {{ item.title }}
      </n-button>
    </n-flex>
    <n-list>
      <n-list-item v-for="item in productDatas" :key="item.id"></n-list-item>
    </n-list>
  </n-layout>
</template>

<script setup src="@/scripts/consumer/home.js"></script>

<style lang="scss" scoped>
.consumer-home {
  padding: 16px 24px;

  .category-container {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
