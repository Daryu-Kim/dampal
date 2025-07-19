<template>
  <div class="status-wrapper">
    <div v-if="status === 'pending'" class="status-content">
      <div class="loader"></div>
      <h2>회원 승인 대기 중입니다</h2>
      <p>관리자가 회원 정보를 확인하고 있습니다.<br />조금만 기다려 주세요.</p>
    </div>

    <div v-else-if="status === 'approved'" class="status-content approved">
      <h2>🎉 승인이 완료되었습니다!</h2>
      <p>서비스 이용을 환영합니다.<br />3초 후 메인 화면으로 이동합니다.</p>
    </div>

    <div v-else-if="status === 'rejected'" class="status-content rejected">
      <h2>❌ 회원 승인 거부됨</h2>
      <p>회원 정보가 승인되지 않았습니다.</p>
      <n-button class="button" type="error" size="large" block @click="contactSupport">
        문의하기
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { NButton } from 'naive-ui';
import { onAuthStateChanged } from 'firebase/auth';
import router from '@/router';

const status = ref(null);

const contactSupport = () => {
  window.location.href = 'mailto:support@example.com?subject=회원 승인 문의';
};

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      status.value = await (await getDoc(doc(db, "users", user.uid))).data().status;
      if (status.value === "approved") {
        setTimeout(() => {
          router.push("/service");
        }, 3000);
      }
      // 로그인 된 상태라면 여기서 원하는 로직 수행 가능
    } else {
      console.log("로그인 안됨");
      // 비로그인 상태 처리
    }
  });
});
</script>

<style scoped lang="scss">
.status-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  padding: 24px;
  text-align: center;

  .status-content {
    width: 90%;
    max-width: 400px;
    background: rgba(0,0,0,0.25);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);

    h2 {
      margin-bottom: 16px;
      font-weight: 700;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
    }

    .button {
      margin-top: 24px;
    }
  }

  .approved {
    background: rgba(34, 139, 34, 0.6);
    box-shadow: 0 8px 24px rgba(34,139,34,0.4);
  }

  .rejected {
    background: rgba(220, 20, 60, 0.6);
    box-shadow: 0 8px 24px rgba(220,20,60,0.4);
  }

  .loader {
    margin: 0 auto 24px;
    width: 48px;
    height: 48px;
    border: 5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>