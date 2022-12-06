<template>
  <ArtList :artData="artData" :pagination="pagination" :article="article" v-on:opEdit="opEdit"></ArtList>
</template>

<script>
import ArtList from "@/components/article/artList/artList.vue";
import { mapActions } from "vuex";
export default {
  name: "tags",
  components: {
    ArtList,
  },
  data() {
    return {
      tagID: this.$route.params.id,
      edit: false,
      pagination: true,
      article: {},
      artData: [],
    };
  },
  created() {
    if (this.$store.state.artData.length === 0) {
      this.artList({})
        .then((res) => {
          if (res != null) {
            res.list.forEach((element) => {
              element.active = false;
            });
            this.artData = res;
            this.$store.state.artData = JSON.parse(JSON.stringify(res));
            this.filtrt();
          }
        })
        .catch((err) => {
          console.log("get article list err:", err);
        });
    } else {
      // this.artData = this.$store.state.artData;
      this.artData = JSON.parse(JSON.stringify(this.$store.state.artData));
      this.filtrt();
    }
  },
  methods: {
    ...mapActions("articleModule", {
      artList: "list",
    }),

    setList(value) {
      this.artData.list = value;
      if (value.length == 0) {
        this.pagination = false;
      } else {
        this.pagination = true;
      }
    },

    filtrt() {
      let temp = [];
      this.artData.list.forEach((element, index) => {
        element.tags.forEach((child) => {
          if (child === Number(this.tagID)) {
            temp.push(this.artData.list[index]);
          }
        });
      });
      this.artData.list = temp;
    },

    // 打开编辑器
    opEdit(id) {
      this.artData.list.forEach((element, index) => {
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