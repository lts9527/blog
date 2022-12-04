<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn icon @click="before">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        <v-row align="center" justify="end">
          <v-icon large left>mdi-circle-edit-outline</v-icon>
          <span class="text-h6">
            <slot name="item-name">编辑文章</slot>
          </span>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-text-field
        v-model="article.title"
        height="68"
        hide-details
        clearable
        solo
        flat
        dense
        placeholder="标题"
      ></v-text-field>
      <v-divider></v-divider>
      <v-md-editor v-model="article.content" height="493px" />
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="submit" color="#3295C5" class="mt-2 white--text" depressed>发布</v-btn>
        <v-btn @click="dialog = true" color="#3295C5" class="mt-2 white--text shadow" depressed>更多设置</v-btn>
        <v-btn color="white " class="mt-2 shadow" depressed>存草稿</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title @click="show" class="text-h5">更多设置</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pl-7">文章封面</v-card-text>
        <v-card-actions>
          <v-file-input
            style="margin-top: -83px;margin-left: 90px;"
            v-model="cover"
            prepend-icon="mdi-image"
            hide-input
            accept="image/*"
            label="File input"
            v-on:change="getCover"
          ></v-file-input>
        </v-card-actions>
        <v-img class="ml-7" :src="article.cover" width="200" :aspect-ratio="16/9"></v-img>

        <v-select
          class="mt-5"
          :items="tags"
          label="标签"
          v-model="article.tags"
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
              <v-icon @click="parent.selectItem(item)" small>mdi-window-close</v-icon>
            </v-chip>
          </template>

          <template v-slot:item="{ item }">
            <v-chip :color="`${item.color} lighten-1`" dark label outlined small>{{ item.text }}</v-chip>
            <v-spacer></v-spacer>
          </template>
        </v-select>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="dialog = false" color="black" text>取消</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="save" color="primary" text>保存</v-btn>
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
      type: Object,
      default: () => {
        return {
          cover: "",
          title: "",
          content: "",
          tags: [],
        };
      },
    },
    mode: {
      type: String,
      default: () => {
        return "create";
      },
    },
  },
  data() {
    return {
      dialog: false,
      cover: {},
      tags: [],
      sendArticle: {},
    };
  },
  mounted() {
    // this.tags = this.$store.state.tags;
  },
  computed: {},

  // 加载页面完毕时获取标签列表
  created() {
    this.tagList()
      .then((tags) => {
        if (tags != null) {
          this.$store.state.tags = tags;
          this.tags = JSON.parse(JSON.stringify(tags).replace(/name/g, "text"));
        }
      })
      .catch((err) => {
        console.log("get article list err:", err.response);
      });
  },
  methods: {
    ...mapActions("articleModule", {
      artCreate: "create",
      artUpdate: "update",
    }),
    ...mapActions("tagModule", {
      tagList: "list",
    }),

    submit() {
      if (!this.prepare()) {
        return;
      }
      let tags = this.buildTags(this.article.tags);
      if (this.mode === "update") {
        let article = {
          id: this.article.id,
          cover: this.article.cover,
          title: this.article.title,
          content: this.article.content,
          tags: tags,
        };
        this.artUpdate(article)
          .then((res) => {
            console.log("update Res", res);
            this.before();
          })
          .catch((err) => {
            console.log("update article err:", err.response.data.message);
          });
        return;
      }
      console.log("tags", tags);
      this.artCreate({
        user_id: 9527,
        cover: this.article.cover,
        title: this.article.title,
        content: this.article.content,
        tags: tags,
      })
        .then((res) => {
          console.log("create Res", res);
          this.before();
        })
        .catch((err) => {
          console.log("submit article err:", err.response.data.message);
        });
    },

    buildTags(tags) {
      const list = [];
      this.tags.forEach((element) => {
        tags.forEach((element2) => {
          if (element.text === element2) {
            list.push(element.id);
          }
        });
      });
      return list;
    },

    prepare() {
      // if (this.sendArticle.tags == undefined) {
      //   console.log("文章标签不能为空");
      //   return false;
      // }
      return true;
    },

    // 获取封面
    getCover() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.cover);
      fileReader.onload = (temp) => {
        this.article.cover = temp.target.result;
      };
    },

    save() {
      this.dialog = false;
      this.sendArticle = this.article;
    },

    // 返回上一级
    before() {
      this.$emit("before");
    },

    show() {
      console.log("article", this.article);
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