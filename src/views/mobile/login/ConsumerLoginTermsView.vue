<template>
  <n-flex
    class="consumer-login-phone"
    vertical
    justify="space-between"
    :size="24"
    style="padding: 16px 24px; height: 100%"
  >
    <n-space vertical :size="0">
      <n-page-header @back="handleBack"></n-page-header>
      <p style="margin-top: 24px; font-size: 48px">🚬</p>
      <h2 style="margin-top: 8px; line-height: 28px">
        고객님<br />환영합니다!
      </h2>
    </n-space>
    <n-space vertical size="large">
      <n-checkbox v-model:checked="allAgree" @update:checked="toggleAll">
        전체 동의
      </n-checkbox>

      <n-divider style="margin: 8px 0" />

      <n-checkbox v-model:checked="terms.service">
        <span>
          (필수) <strong>서비스 이용약관</strong> 동의
          <n-button
            text
            type="primary"
            size="small"
            @click="showModal('service')"
            >보기</n-button
          >
        </span>
      </n-checkbox>

      <n-checkbox v-model:checked="terms.privacy">
        <span>
          (필수) <strong>개인정보 수집 및 이용</strong> 동의
          <n-button
            text
            type="primary"
            size="small"
            @click="showModal('privacy')"
            >보기</n-button
          >
        </span>
      </n-checkbox>

      <n-checkbox v-model:checked="terms.identity">
        <span>
          (필수) <strong>고유식별정보 수집 및 이용</strong> 동의
          <n-button
            text
            type="primary"
            size="small"
            @click="showModal('identity')"
            >보기</n-button
          >
        </span>
      </n-checkbox>

      <n-checkbox v-model:checked="terms.phone">
        <span>
          (필수) <strong>휴대폰 번호 수집 및 이용</strong> 동의
          <n-button text type="primary" size="small" @click="showModal('phone')"
            >보기</n-button
          >
        </span>
      </n-checkbox>

      <n-checkbox v-model:checked="terms.age">
        <span> (필수) <strong>만 19세 이상입니다</strong> </span>
      </n-checkbox>

      <n-button
        type="primary"
        :disabled="!canProceed"
        block
        @click="proceed"
        style="margin-top: 16px"
      >
        동의하고 계속하기
      </n-button>
    </n-space>
  </n-flex>
  <n-modal v-model:show="modalVisible">
    <n-card :title="modalTitle" style="max-width: 90%">
      <div style="max-height: 300px; overflow-y: auto">
        <p v-html="modalContent"></p>
      </div>
      <template #footer>
        <n-button @click="modalVisible = false">닫기</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  NCard,
  NSpace,
  NCheckbox,
  NButton,
  NDivider,
  NModal,
  NPageHeader,
  NFlex,
} from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();
const allAgree = ref(false);
const terms = ref({
  service: false,
  privacy: false,
  identity: false,
  phone: false,
  age: false,
});

const canProceed = computed(
  () =>
    terms.value.service &&
    terms.value.privacy &&
    terms.value.identity &&
    terms.value.phone &&
    terms.value.age
);

const toggleAll = (val) => {
  terms.value.service = val;
  terms.value.privacy = val;
  terms.value.identity = val;
  terms.value.phone = val;
  terms.value.age = val;
};

const modalVisible = ref(false);
const modalTitle = ref("");
const modalContent = ref("");

const showModal = (type) => {
  modalVisible.value = true;

  switch (type) {
    case "service":
      modalTitle.value = "서비스 이용약관";
      modalContent.value = `
        <h3>제1조(목적)</h3>
        <p>이 약관은 담팔(이하 "회사")이 운영하는 전자담배 중고 거래 플랫폼(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
        
        <h3>제2조(이용자의 정의)</h3>
        <p>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</p>
        
        <h3>제3조(서비스의 제공 및 변경)</h3>
        <ol>
          <li>회사는 이용자에게 다음과 같은 서비스를 제공합니다.<br/>
          ① 중고 전자담배 상품 등록 및 검색<br/>
          ② 사용자 간 거래 지원 기능 (채팅 등)<br/>
          ③ 기타 회사가 정하는 서비스</li>
          <li>회사는 서비스의 전부 또는 일부를 변경할 수 있습니다.</li>
        </ol>

        <h3>제4조(이용계약의 성립)</h3>
        <ol>
          <li>회사는 성인 인증이 완료된 만 19세 이상의 사용자만 회원가입을 허용합니다.</li>
          <li>이용계약은 이용자가 본 약관에 동의하고, 회사가 정한 절차에 따라 가입을 완료함으로써 성립합니다.</li>
        </ol>

        <h3>제5조(이용자의 의무)</h3>
        <p>이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</p>
        <ul>
          <li>허위 정보 등록</li>
          <li>타인의 개인정보 도용</li>
          <li>불법 제품 등록 또는 거래</li>
          <li>기타 법령 및 공서양속에 반하는 행위</li>
        </ul>

        <h3>제6조(계약 해지 및 이용 제한)</h3>
        <p>회사는 이용자가 본 약관에 위반하는 경우 사전 통지 없이 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.</p>
      `;
      break;

    case "privacy":
      modalTitle.value = "개인정보 수집 및 이용";
      modalContent.value = `
        <h3>1. 수집 항목</h3>
        <p>이름, 생년월일, 휴대폰 번호, 기기 정보, IP 주소, 로그인 기록, 접속 기기 정보</p>
        
        <h3>2. 수집 목적</h3>
        <p>본인 확인 및 성인 인증, 거래 기능 제공 및 알림 발송, 부정 이용 방지 및 고객 응대</p>
        
        <h3>3. 보유 및 이용 기간</h3>
        <p>회원 탈퇴 시 또는 수집 목적 달성 시까지<br/>
        단, 관련 법령에 따라 보존이 필요한 경우 해당 기간까지</p>
        
        <h3>4. 동의 거부 권리 및 불이익</h3>
        <p>이용자는 동의를 거부할 권리가 있으며, 동의하지 않을 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.</p>
      `;
      break;

    case "identity":
      modalTitle.value = "고유식별정보 수집 및 이용";
      modalContent.value = `
        <h3>1. 수집 항목</h3>
        <p>주민등록번호 앞 6자리, 신분증 사본, 발급일자 등</p>
        
        <h3>2. 수집 목적</h3>
        <p>성인 인증 및 본인 확인</p>
        
        <h3>3. 보유 및 이용 기간</h3>
        <p>인증 완료 즉시 파기<br/>
        단, 관련 법령에 의해 보존이 필요한 경우 해당 기간까지 보관</p>
        
        <h3>4. 동의 거부 시 불이익</h3>
        <p>동의를 거부할 수 있으나, 이 경우 성인 인증 및 서비스 이용이 불가능합니다.</p>
      `;
      break;

    case "phone":
      modalTitle.value = "휴대폰 번호 수집 및 이용";
      modalContent.value = `
        <h3>1. 수집 항목</h3>
        <p>휴대폰 번호</p>
        
        <h3>2. 이용 목적</h3>
        <p>본인 확인, 거래 및 채팅 알림 발송, 고객 상담 등</p>
        
        <h3>3. 보유 및 이용 기간</h3>
        <p>회원 탈퇴 시까지 또는 법령에서 정한 기간까지 보관</p>
        
        <h3>4. 동의 거부 시 불이익</h3>
        <p>동의를 거부할 경우 서비스 이용이 제한될 수 있습니다.</p>
      `;
      break;

    default:
      modalTitle.value = "";
      modalContent.value = "";
      break;
  }
};

const handleBack = () => {
  router.back();
};

const proceed = () => {
  // 동의 완료 후 처리 로직
  console.log("동의 완료:", terms.value);
  router.push("/login/phone");
};
</script>
