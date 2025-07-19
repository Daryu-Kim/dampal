import { createRouter, createWebHistory } from "vue-router";
import { auth, db } from "../lib/firebase";
import {
  collection,
  where,
  getDocs,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import ConsumerLayoutView from "@/layouts/template/consumer/ConsumerLayoutView.vue";
import ConsumerHomeView from "@/views/template/consumer/ConsumerHomeView.vue";
import { isMobileOnly, isTablet } from "mobile-device-detect";
import ConsumerLoginLayoutView from "@/layouts/template/login/ConsumerLoginLayoutView.vue";
import ConsumerLoginView from "@/views/template/login/ConsumerLoginView.vue";
import ConsumerLoginPhoneView from "@/views/template/login/ConsumerLoginPhoneView.vue";
import ConsumerLoginTermsView from "@/views/template/login/ConsumerLoginTermsView.vue";
import ConsumerLoginPersonalInfoView from "@/views/template/login/ConsumerLoginPersonalInfoView.vue";
import ConsumerLoginSetPasswordView from "@/views/template/login/ConsumerLoginSetPasswordView.vue";
import ConsumerLoginRePasswordView from "@/views/template/login/ConsumerLoginRePasswordView.vue";
import ConsumerLoginCaptureIdCardView from "@/views/template/login/ConsumerLoginCaptureIdCardView.vue";
import ConsumerLoginScanIdCardView from "@/views/template/login/ConsumerLoginScanIdCardView.vue";
import ConsumerLoginPendingView from "@/views/template/login/ConsumerLoginPendingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ConsumerLayoutView,
    meta: { requiresOnlyDesktop: true },
  },
  {
    path: "/login",
    name: "consumer-login",
    component: ConsumerLoginLayoutView,
    meta: { requiresMobileTablet: true },
    redirect: "/login/home",
    children: [
      {
        path: "home",
        name: "consumer-login-home",
        component: ConsumerLoginView,
      },
      {
        path: "terms",
        name: "consumer-login-terms",
        component: ConsumerLoginTermsView,
      },
      {
        path: "phone",
        name: "consumer-login-phone",
        component: ConsumerLoginPhoneView,
      },
      {
        path: "personal-info",
        name: "consumer-login-personal-info",
        component: ConsumerLoginPersonalInfoView,
      },
      {
        path: "set-password",
        name: "consumer-login-set-password",
        component: ConsumerLoginSetPasswordView,
      },
      {
        path: "re-password",
        name: "consumer-login-re-password",
        component: ConsumerLoginRePasswordView,
      },
      {
        path: "capture-id-card",
        name: "consumer-login-capture-id-card",
        component: ConsumerLoginCaptureIdCardView,
      },
      {
        path: "scan-id-card",
        name: "consumer-login-scan-id-card",
        component: ConsumerLoginScanIdCardView,
      },
      {
        path: "pending",
        name: "consumer-login-pending",
        component: ConsumerLoginPendingView,
      },
    ],
  },
  {
    path: "/service",
    name: "service",
    component: ConsumerLayoutView,
    redirect: "/service/home",
    meta: { requiresMobileTablet: true },
    children: [
      {
        path: "home",
        name: "consumer-home",
        component: ConsumerHomeView,
        meta: { requiresAuthConsumer: true },
        // meta: { requiresAuthAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresOnlyDesktop)) {
    if (!isMobileOnly && !isTablet) {
      next();
    } else {
      next({ path: "/service" });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresMobileTablet)) {
    if (isMobileOnly || isTablet) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuthConsumer)) {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe(); // Unsubscribe the listener immediately after getting the result
      if (user) {
        const data = await (
          await getDoc(doc(db, "users", user.uid.toString()))
        ).data();
        if (data.status === "approved") {
          next();
        } else {
          alert("회원 승인 대기 중입니다.");
          next({ path: "/login/pending" });
        }
      } else {
        alert("로그인 후 이용가능합니다.");
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuthAdmin)) {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe(); // Unsubscribe the listener immediately after getting the result
      if (user) {
        try {
          const userDocs = await getDocs(
            query(
              collection(db, "managers"),
              where("uid", "==", user.uid),
              where("role", "==", "admin")
            )
          );
          if (userDocs.size > 0) {
            next();
          } else {
            console.warn(`No document found for user ID: ${user.uid}`);
            alert("관리자만 접근할 수 있습니다.");
            next({ path: "/" });
          }
        } catch (error) {
          alert("관리자만 접근할 수 있습니다.");
          next({ path: "/" });
        }
      } else {
        alert("관리자 로그인 후 이용가능합니다.");
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});

export default router;
