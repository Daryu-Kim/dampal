<template>
  <router-view />
</template>

<style lang="scss">
@use "@/styles/safe-area";
@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Light.woff2")
    format("woff2");
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2")
    format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Medium.woff2")
    format("woff2");
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-SemiBold.woff2")
    format("woff2");
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Bold.woff2")
    format("woff2");
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-ExtraBold.woff2")
    format("woff2");
  font-weight: 800;
  font-display: swap;
}

@font-face {
  font-family: "Sweet";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Heavy.woff2")
    format("woff2");
  font-weight: 900;
  font-display: swap;
}

#app {
  font-family: "Sweet", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  height: 100vh;
  height: 100dvh; // iOS / 최신 브라우저
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Sweet";
  transition: all 200ms ease-in-out;
}

.secondary-text {
  color: #777783;
}

.accent-text {
  color: #6002ee;
}
</style>
