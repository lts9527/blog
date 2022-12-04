<template>
  <ArtList :list="list" :article="article" v-on:opEdit="opEdit"></ArtList>
</template>

<script>
import ArtList from "@/components/article/artList/artList.vue";
export default {
  components: {
    ArtList,
  },
  data() {
    return {
      edit: false,
      article: {},
      list: [],
    };
  },
  created() {
    this.list = this.$store.state.detaultlist;
  },
  methods: {
    // 打开编辑器
    opEdit(id) {
      this.list.forEach((element, index) => {
        if (element.id === id) {
          this.article = element;
          return;
        }
      });
    },

    returnList(value) {
      this.edit = false;
    },

    test() {
      alert(1);
    },
  },
};
</script>

<style>
</style>