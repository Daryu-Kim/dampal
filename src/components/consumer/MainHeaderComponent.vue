<template>
  <header class="app-header">
    <p>담팔</p>
    <nav>
      <button>
        <Icon size="24">
          <Heart48Filled />
        </Icon>
      </button>
      <button>
        <Icon size="24">
          <Alert32Filled />
        </Icon>
      </button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
$header-height: 56px;

.app-header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 768px;

  height: $header-height;
  padding: 16px;
  padding-top: calc(16px + var(--safe-top));

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;

  z-index: 100;

  > p {
    font-weight: 700;
    font-size: 18px;
  }

  > nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    > button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      cursor: pointer;
      background: none;
      outline: none;
      border: none;

      > p {
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
}
</style>

<script setup>
import { Icon } from "@vicons/utils";
import { Heart48Filled, Alert32Filled } from "@vicons/fluent";
</script>
