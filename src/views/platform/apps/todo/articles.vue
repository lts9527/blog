<template>
  <ArtList :artData="artData" :article="article" :pagination="pagination" v-on:opEdit="opEdit"></ArtList>
</template>

<script>
import { mapActions } from "vuex";
import ArtList from "@/components/article/artList/artList.vue";
export default {
  name: "articles",
  components: {
    ArtList,
  },
  props: {},
  data() {
    return {
      edit: false,
      artData: [],
      article: {},
      pagination: true,
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
            this.artData = JSON.parse(JSON.stringify(res));
            this.$store.state.artData = JSON.parse(JSON.stringify(res));
            console.log("this.artData ", this.artData);
          }
        })
        .catch((err) => {
          console.log("get article list err:", err.response);
        });
    } else {
      this.artData = JSON.parse(JSON.stringify(this.$store.state.artData));
    }
  },
  methods: {
    ...mapActions("articleModule", {
      artList: "list",
    }),

    setList(value) {
      this.artData = value;
      if (value.length == 0) {
        this.pagination = false;
      } else {
        this.pagination = true;
      }
    },

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
  },
};
</script>

<style scoped>
.time-bar {
  position: relative;
  left: 28px;
  top: 15px;
}

.info-bar {
  left: 40px;
  top: 20px;
  margin-bottom: 10px;
  max-width: 300px;
  position: relative;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}
</style>
