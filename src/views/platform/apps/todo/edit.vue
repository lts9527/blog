<template>
  <div>
    <Edit v-on:before="before"></Edit>
  </div>
</template>
    
    <script>
import { mapActions } from "vuex";
import Edit from "@/components/article/edit/edit.vue";
export default {
  components: {
    Edit,
  },
  data() {
    return {
      activator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      editingIndex: -1,
      itemss: [
        {
          text: "Foo",
          color: "blue",
        },
        {
          text: "Bar",
          color: "red",
        },
      ],
      nonce: 1,
      menu: false,
      x: 0,
      search: null,
      y: 0,

      dialog: false,
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
        },
      ],
      value: {},
      src: {},
      show: false,
      settings: true,
      tags: [
        "foo",
        "bar",
        "fizz",
        "buzz",
        "buzz1",
        "buzz2",
        "buzz3",
        "buzz4",
        "buzz5",
        "buzz6",
      ],
    };
  },
  mounted() {
    this.tags = this.$store.state.tags;
    // console.log("this.tags", this.tags);
  },
  computed: {},

  // 加载页面完毕时获取分类列表
  created() {
    // mapActions("articleModule", {
    //   articleList: "list",
    // });
    // 请求api
    // this.articleList(9527)
    //   .then((list) => {
    //     this.btns = list;
    //   })
    //   .catch((err) => {
    //     console.log("get article list err:", err.response.data.message);
    //   });
  },
  methods: {
    ...mapActions("articleModule", {
      articleCreate: "create",
      // articleList: "list",
    }),
    getCover() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.value);
      fileReader.onload = (temp) => {
        this.src = temp.target.result;
      };
    },

    before() {
      this.$router.go(-1);
    },
  },
};
</script>
    
<style scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}

.v-md-editor {
  box-shadow: none;
}
</style>