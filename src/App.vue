<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    background: {
      //     // 背景图片地址
      //     backgroundImage:
      //       "url(" + require("@/assets/private/wallhaven-72d52e.jpeg") + ")",
      //     // 背景图片是否重复
      //     backgroundRepeat: "no-repeat",
      //     // 背景图片大小
      //     backgroundSize: "cover",
      // 背景颜色
      // backgroundColor: "#F6F7F9",
      // // 背景图片位置
      // backgroundPosition: "center top",
    },
  }),
};
</script>

<style>
/* body::before {
  content: " ";
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f6f7f9;
  background-size: 100% auto;
} */
</style>