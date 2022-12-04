<template>
  <div>
    <!-- <h2>ID: {{ $route.params.id }}</h2> -->
    <ArtList :list="list" :article="article" v-on:opEdit="opEdit"></ArtList>
  </div>
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
      article: {},
      list: [],
    };
  },
  created() {
    if (this.$store.state.artList.length === 0) {
      this.artList({})
        .then((res) => {
          if (res != null) {
            res.forEach((element) => {
              element.active = false;
            });
            this.list = res;
            this.$store.state.artList = JSON.parse(JSON.stringify(res));
            this.filtrt();
          }
        })
        .catch((err) => {
          console.log("get article list err:", err);
        });
    } else {
      this.list = this.$store.state.artList;
      // this.list = JSON.parse(JSON.stringify(this.$store.state.artList));
      this.filtrt();
    }
  },
  methods: {
    ...mapActions("articleModule", {
      artList: "list",
    }),

    settemplist(value) {
      this.list = value;
      // console.log("value", value);
    },

    filtrt() {
      let temp = [];
      this.list.forEach((element, index) => {
        element.tags.forEach((child) => {
          if (child === Number(this.tagID)) {
            temp.push(this.list[index]);
          }
        });
      });
      this.list = temp;
    },

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