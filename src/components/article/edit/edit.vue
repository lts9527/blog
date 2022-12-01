<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn icon @click="before">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        <v-row align="center" justify="end">
          <v-icon large left>mdi-circle-edit-outline</v-icon>
          <span class="text-h6">编辑文章</span>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-text-field height="68" hide-details clearable solo flat dense placeholder="标题"></v-text-field>
      <v-divider></v-divider>
      <v-md-editor v-model="article.content" height="493px" />
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="#3295C5" class="mt-2 white--text" depressed>发布</v-btn>
        <v-btn @click="dialog = true" color="#3295C5" class="mt-2 white--text shadow" depressed>更多设置</v-btn>
        <v-btn color="white " class="mt-2 shadow" depressed>存草稿</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5">更多设置</v-card-title>
        <v-divider></v-divider>
        <v-card-content>
          <v-card-text class="pl-7">文章封面</v-card-text>
          <v-card-actions>
            <v-file-input
              style="margin-top: -83px;margin-left: 90px;"
              v-model="value"
              prepend-icon="mdi-image"
              hide-input
              accept="image/*"
              label="File input"
              v-on:change="getCover"
            ></v-file-input>
          </v-card-actions>
          <v-img class="ml-7" :src="src" width="200" :aspect-ratio="16/9"></v-img>

          <v-select
            class="mt-5"
            :items="itemss"
            label="标签"
            multiple
            rounded
            single-line
            hide-selected
            disable-lookup
            :menu-props="{
                nudgeBottom: 45
                }"
            chips
          >
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                :color="`${item.color}`"
                :input-value="selected"
                label
                outlined
              >
                <span class="pr-2">{{ item.text }}</span>
                <v-icon small @click="parent.selectItem(item)">mdi-window-close</v-icon>
              </v-chip>
            </template>

            <template v-slot:item="{ index, item }">
              <v-chip :color="`${item.color} lighten-1`" dark label outlined small>{{ item.text }}</v-chip>
              <v-spacer></v-spacer>
            </template>
          </v-select>
        </v-card-content>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="black" text @click="dialog = false">取消</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
      
<script>
import { mapActions } from "vuex";
export default {
  props: {
    article: {
      default: {
        content: "",
      },
    },
  },
  data() {
    return {
      src: {},
      value: {},
      dialog: false,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
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
    };
  },
  mounted() {
    this.tags = this.$store.state.tags;
  },
  computed: {},

  // 加载页面完毕时获取标签列表
  created() {
    mapActions("articleModule", {
      articleList: "list",
    });
    // 请求标签列表api
    this.articleList(9527)
      .then((list) => {
        this.btns = list;
      })
      .catch((err) => {
        console.log("get article list err:", err.response.data.message);
      });
  },
  methods: {
    ...mapActions("articleModule", {
      articleList: "list",
    }),
    // 获取封面
    getCover() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.value);
      fileReader.onload = (temp) => {
        this.src = temp.target.result;
      };
    },
    // 返回上一级
    before() {
      this.$emit("before");
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