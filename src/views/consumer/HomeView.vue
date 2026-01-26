<template>
  <div class="consumer-home">
    <div class="inner">
      <MainHeaderComponent />
      <main class="home-main">
        <div class="home-content">
          <!-- 컨텐츠 영역 -->
          <div class="main-banner-container">
            <router-link to="">
              <img src="@/assets/consumer/HomeMainBanner.png" />
            </router-link>
          </div>
          <div class="main-search-container">
            <button>
              <p class="secondary-text">찾으시는 기기를 검색해보세요.</p>
              <Icon size="24" color="#777783">
                <Search48Filled />
              </Icon>
            </button>
          </div>
          <div class="main-function-container">
            <div class="main-function-inner">
              <div class="main-buy-container">
                <div class="main-used-container">asd</div>
                <div class="main-new-container">asd</div>
              </div>
              <div class="main-subscribe-container">asd</div>
              <div class="main-quick-menu-container">
                <div class="main-quick-menu-tab-container">
                  <input
                    type="radio"
                    name="quick-menu"
                    v-model="currentQuickMenuTab"
                    id="quick-menu-buy"
                    value="buy"
                  />
                  <label for="quick-menu-buy">구매할때</label>
                  <input
                    type="radio"
                    name="quick-menu"
                    v-model="currentQuickMenuTab"
                    id="quick-menu-sell"
                    value="sell"
                  />
                  <label for="quick-menu-sell">판매할때</label>
                  <input
                    type="radio"
                    name="quick-menu"
                    v-model="currentQuickMenuTab"
                    id="quick-menu-manage"
                    value="manage"
                  />
                  <label for="quick-menu-manage">관리할때</label>
                  <input
                    type="radio"
                    name="quick-menu"
                    v-model="currentQuickMenuTab"
                    id="quick-menu-life"
                    value="life"
                  />
                  <label for="quick-menu-life">라이프</label>
                </div>
                <div class="main-quick-menu-content-container">
                  <div v-if="currentQuickMenuTab === 'buy'">
                    <button>
                      <img src="https://picsum.photos/54" />
                      <p>네코페이</p>
                    </button>
                    <button>
                      <img src="https://picsum.photos/54" />
                      <p>네코페이</p>
                    </button>
                    <button>
                      <img src="https://picsum.photos/54" />
                      <p>네코페이</p>
                    </button>
                    <button>
                      <img src="https://picsum.photos/54" />
                      <p>네코페이</p>
                    </button>
                  </div>
                  <div v-if="currentQuickMenuTab === 'sell'">2</div>
                  <div v-if="currentQuickMenuTab === 'manage'">3</div>
                  <div v-if="currentQuickMenuTab === 'life'">4</div>
                </div>
                <button>
                  <p>전체 서비스 보기</p>
                  <Icon>
                    <Add16Filled />
                  </Icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavComponent />
    </div>
  </div>
</template>

<style lang="scss" scoped src="@/styles/consumer/HomeStyle.scss"></style>

<script setup lang="js">
import MainHeaderComponent from '@/components/consumer/MainHeaderComponent.vue'; "@/components/consumer/MainHeaderComponent.vue";
import BottomNavComponent from '@/components/consumer/BottomNavComponent.vue';
import { Icon } from "@vicons/utils";
import { Search48Filled, Add16Filled } from "@vicons/fluent";
import { ref } from 'vue';

const currentQuickMenuTab = ref("buy");
</script>
