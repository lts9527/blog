<template>
  <v-snackbar color="success" height="50" v-model="snackbar" right="right" top="top">
    {{ content }}
    <template v-slot:action="{ attrs }">
      <v-icon class="mr-4" v-bind="attrs" v-if="loading" color="primary">mdi-check-circle-outline</v-icon>
      <!-- <v-progress-circular size="25" v-if="loading" indeterminate color="primary"></v-progress-circular> -->
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Notification",
  props: {
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "pink",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      snackbar: true,
    };
  },
  // methods: {
  //   _destroy() {
  //     setTimeout(() => {
  //       this.$destroy();
  //     }, 500);
  //   },
  // },
};
</script>