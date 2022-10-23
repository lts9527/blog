<template>
  <!-- <Card style="width:320px"> -->
  <div class="card" style="text-align:center">
    <a @click="Jump">
      <img src="@/assets/private/wallhaven-m9873y.jpeg" />
      <!-- <h3>A high quality UI Toolkit based on Vue.js</h3> -->
    </a>
  </div>
  <!-- </Card> -->
</template>
<script>
export default {
  name: "cards",
  methods: {
    Jump() {
      this.$router.push("about");
    },
  },
};
</script>

<style>
.card {
  position: relative;
  left: 30%;
  top: 40%;
  /* margin: 50px auto 0px; */
  transform: translate(-50%, -50%);
  width: 180px;
  height: 60px;
}
img {
  width: 200px;
  height: 100px;
}
</style>
