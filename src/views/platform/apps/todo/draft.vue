<template>
  <ArtList :pagination="pagination" :artData="artData" :article="article" v-on:opEdit="opEdit"></ArtList>
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
      artData: [],
      pagination: true,
    };
  },
  mounted() {
    this.artData = this.$store.state.detaultlist;
  },
  methods: {
    // 打开编辑器
    opEdit(id) {
      this.artData.forEach((element, index) => {
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