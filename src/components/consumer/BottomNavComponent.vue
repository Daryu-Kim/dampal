<template>
  <nav class="bottom-nav">
    <button>
      <Icon size="24">
        <Home48Filled />
      </Icon>
      <p>홈</p>
    </button>
    <button>
      <Icon size="24">
        <Chat48Filled />
      </Icon>
      <p>커뮤니티</p>
    </button>
    <button>
      <Icon size="24">
        <BuildingShop24Filled />
      </Icon>
      <p>구매</p>
    </button>
    <button>
      <Icon size="24">
        <Mail48Filled />
      </Icon>
      <p>채팅</p>
    </button>
    <button>
      <Icon size="24">
        <Person48Filled />
      </Icon>
      <p>내 정보</p>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
$bottom-height: 56px;

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 768px;

  height: $bottom-height;
  padding-bottom: var(--safe-bottom);

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  background: #fff;
  color: #fff;
  box-shadow: 0px 0px 4px rgba($color: #000000, $alpha: 0.5);

  z-index: 100;

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
</style>

<script setup>
import {
  Home48Filled,
  Chat48Filled,
  BuildingShop24Filled,
  Mail48Filled,
  Person48Filled,
} from "@vicons/fluent";
import { Icon } from "@vicons/utils";
</script>
