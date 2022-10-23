<template>
  <div>
    <v-snackbar v-model="value" top :timeout="timeout" :color="type">{{ alertText }}</v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      timeout: 1000,
      alertText: "",
      sColor: "#199965",
      type: "success",
    };
  },
  methods: {
    alertTipFun({ type, msg }) {
      this.value = true;
      this.type = type;
      this.alertText = msg;
    },
  },
};
</script>

 
<style scoped>
.test {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -50%);
}
</style>