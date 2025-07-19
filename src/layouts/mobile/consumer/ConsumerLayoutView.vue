<template>
  <div class="consumer-layout">
    <header>
      <router-link to="/service/home" class="home-btn">
        <p class="logo">🚬 담팔</p>
      </router-link>
      <div class="function-container">
        <router-link to="/service/search">
          <Icon size="24">
            <SearchOutlined />
          </Icon>
        </router-link>
        <router-link to="/service/alert">
          <Icon size="24">
            <MarkEmailUnreadOutlined />
          </Icon>
        </router-link>
        <router-link to="/service/cart">
          <Icon size="24">
            <ShoppingCartOutlined />
          </Icon>
        </router-link>
      </div>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
    <footer>
      <router-link
        to="/service"
        :class="$route.name === 'consumer-home' ? 'active' : ''"
      >
        <Icon size="28">
          <HomeFilled />
        </Icon>
        <p>홈</p>
      </router-link>
      <router-link
        to="/service/mypage/favorites"
        :class="$route.name === 'consumer-mypage-favorites' ? 'active' : ''"
      >
        <Icon size="28">
          <FavoriteFilled />
        </Icon>
        <p>관심</p>
      </router-link>
      <router-link
        to="/service/product/add"
        :class="$route.name === 'consumer-product-add' ? 'active' : ''"
      >
        <Icon size="28">
          <AddCircleFilled />
        </Icon>
        <p>등록</p>
      </router-link>
      <router-link
        to="/service/chat/list"
        :class="$route.name === 'consumer-chat-list' ? 'active' : ''"
      >
        <Icon size="28">
          <MarkChatUnreadFilled />
        </Icon>
        <p>담톡</p>
      </router-link>
      <router-link
        to="/service/mypage/profile"
        :class="$route.name === 'consumer-mypage-profile' ? 'active' : ''"
      >
        <Icon size="28">
          <PersonFilled />
        </Icon>
        <p>MY</p>
      </router-link>
    </footer>
  </div>
</template>

<script setup lang="js">
import { auth, db } from '@/lib/firebase';
import { AddCircleFilled, FavoriteFilled, HomeFilled, HomeOutlined, MarkChatUnreadFilled, MarkEmailUnreadOutlined, PersonFilled, SearchOutlined, ShoppingCartOutlined } from '@vicons/material';
import { Icon } from '@vicons/utils';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const currentUser = ref(null);

onMounted(async () => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  auth.onAuthStateChanged(async (user) => {
    currentUser.value = user;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        visitedAt: Timestamp.fromDate(new Date()),
      });
    }
  });
});
</script>

<style lang="scss" scoped>
.consumer-layout {
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  padding-bottom: env(safe-area-inset-bottom);
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    z-index: 1;
    box-shadow: 2px 0 8px 0 rgba($color: #000000, $alpha: 0.25);

    > .home-btn {
      > .logo {
        font-size: 18px;
        font-weight: 800;
        line-height: 24px;
      }
    }

    > .function-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    a {
      display: block;
      height: 24px;
    }
  }

  > .content {
    flex: 1;
    overflow: scroll;
    padding-bottom: calc(72px + env(safe-area-inset-bottom));
  }

  > footer {
    box-shadow: 2px 0 8px 0 rgba($color: #000000, $alpha: 0.25);
    padding: 4px 8px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding-bottom: env(safe-area-inset-bottom);

    > a {
      text-align: center;
      > p {
        font-size: 14px;
        margin-top: -6px;
        font-weight: 500;
      }

      &.active {
        * {
          color: #007bff;
        }
      }
    }
  }
}
</style>
