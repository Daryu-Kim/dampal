<template>
  <div class="camera-wrapper" ref="wrapperRef">
    <video ref="videoRef" autoplay playsinline class="video-feed"></video>

    <div class="instruction-text">
      인쇄물이 아닌 실제 신분증을 촬영해 주세요.
    </div>

    <!-- 신분증 가이드 박스 -->
    <div class="id-card-guide"></div>

    <div class="privacy-note">
      본인 확인용으로만 사용되며, 촬영된 사진은 폐기됩니다.
    </div>

    <div class="camera-overlay">
      <n-button block type="primary" size="large" @click="capturePhoto"
        >📸 촬영하기</n-button
      >
    </div>

    <div v-if="photoUrl" class="preview">
      <div class="preview-content">
        <p class="preview-message">아래 사진으로 제출할까요?</p>
        <img :src="photoUrl" alt="Captured ID" class="preview-image" />
        <n-space vertical style="width: 100%; margin-top: 24px">
          <n-button
            type="primary"
            block
            size="large"
            @click="submitPhoto"
            :loading="loading"
            :disabled="loading"
          >
            ✅ 제출하기
          </n-button>
          <n-button
            block
            size="large"
            @click="retakePhoto"
            :loading="loading"
            :disabled="loading"
            style="color: white"
          >
            🔄 다시 촬영하기
          </n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { NButton, NSpace } from "naive-ui";
import { createUser } from "@/lib/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadRrnImage } from "@/lib/storage";
import { useRouter } from "vue-router";

const videoRef = ref(null);
const wrapperRef = ref(null);
const photoUrl = ref(null);
const loading = ref(false);

const router = useRouter();

let stream = null;

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  } catch (err) {
    console.error("Camera access error:", err);
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

const capturePhoto = () => {
  const video = videoRef.value;
  const guide = document.querySelector(".id-card-guide");
  if (!video || !guide) return;

  const videoRect = video.getBoundingClientRect();
  const guideRect = guide.getBoundingClientRect();

  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  const videoRatio = videoWidth / videoHeight;
  const containerRatio = videoRect.width / videoRect.height;

  let offsetX = 0;
  let offsetY = 0;

  if (videoRatio > containerRatio) {
    const displayedWidth = videoRect.height * videoRatio;
    offsetX = (displayedWidth - videoRect.width) / 2;
  } else {
    const displayedHeight = videoRect.width / videoRatio;
    offsetY = (displayedHeight - videoRect.height) / 2;
  }

  const scaleX = videoWidth / (videoRect.width + offsetX * 2);
  const scaleY = videoHeight / (videoRect.height + offsetY * 2);

  const sx = (guideRect.left - videoRect.left + offsetX) * scaleX;
  const sy = (guideRect.top - videoRect.top + offsetY) * scaleY;
  const sw = guideRect.width * scaleX;
  const sh = guideRect.height * scaleY;

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

  photoUrl.value = canvas.toDataURL("image/jpeg");
  stopCamera();
};

const retakePhoto = () => {
  photoUrl.value = null;
  startCamera();
};

const submitPhoto = async () => {
  try {
    if (!photoUrl.value) return;

    loading.value = true;

    console.log("📤 캡처된 이미지:", photoUrl.value);
    const phone = localStorage.getItem("login_phone_number");
    const password = localStorage.getItem("login_password");
    const rrn = localStorage.getItem("login_rrn");
    const name = localStorage.getItem("login_name");
    const carrier = localStorage.getItem("login_carrier");

    if (!phone || !password || !rrn || !name || !carrier) {
      alert("❌ 유효하지 않은 토큰 정보입니다. 로그인 페이지로 이동합니다.");
      localStorage.clear(); // 필요시 초기화
      router.replace("/login"); // 뒤로가기 방지
    }

    const uid = await createUser(phone, password);
    const rrnImageUrl = await uploadRrnImage(uid.toString(), photoUrl.value);

    await setDoc(doc(db, "users", uid.toString()), {
      id: uid.toString(),
      name: name,
      carrier: carrier,
      password: password,
      rrn: rrn,
      rrnImageUrl: rrnImageUrl,
      status: "pending",
    });

    localStorage.clear();
    router.replace("/login/pending");
  } catch (error) {
    console.error("회원 생성 실패", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  startCamera();
});
</script>

<style scoped lang="scss">
.camera-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;

  .video-feed {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .instruction-text {
    position: absolute;
    top: 30.5%;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 18px;
    width: 100%;
    font-weight: 600;
    text-align: center;
    z-index: 5;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
    padding: 0 24px;
  }

  .id-card-guide {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    max-width: 320px;
    aspect-ratio: 1.586;
    border: 3px dashed rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    transform: translate(-50%, -50%);
    z-index: 3;
    pointer-events: none;
  }

  .privacy-note {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    z-index: 5;
    width: 100%;
    padding: 0 24px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }

  .camera-overlay {
    position: absolute;
    bottom: 16px;
    width: 100%;
    padding: 0 24px;
    z-index: 10;
    text-align: center;
  }

  .preview {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-in-out;

    .preview-content {
      max-width: 90%;
      width: 360px;
      background: #121212;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .preview-message {
      color: #fff;
      font-size: 16px;
      margin-bottom: 16px;
      text-align: center;
    }

    .preview-image {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
