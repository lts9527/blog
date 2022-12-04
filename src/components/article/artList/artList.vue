<template>
  <div>
    <List v-show="!edit" :list="list" v-on:opEdit="opEdit"></List>
    <Edit v-if="edit" :article="article" mode="update" v-on:before="returnList">
      <template #item-name>修改文章</template>
    </Edit>
  </div>
</template>
  
  <script>
import List from "@/components/article/list/list.vue";
import Edit from "@/components/article/edit/edit.vue";
export default {
  name: "articles",
  components: {
    List,
    Edit,
  },
  props: {
    article: {},
    list: [],
  },
  data() {
    return {
      edit: false,
    };
  },
  created() {},
  methods: {
    settemplist(value) {
      this.list = value;
    },

    opEdit(id) {
      this.edit = true;
      this.$emit("opEdit", id);
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
  