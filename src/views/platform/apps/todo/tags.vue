<template>
  <div>tags</div>
  <!-- <articles ref="child" :key="key"></articles> -->
</template>

<script>
import articles from "@/views/platform/apps/todo/articles.vue";
export default {
  components: { articles },
  data() {
    return {
      // templist: [],
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
  },
  methods: {
    // test() {
    //   this.$refs.child.settemplist(this.templist);
    // },
  },
};
</script>

<style>
</style>