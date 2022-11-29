<template>
  <div>
    <v-card class="d-flex flex-row" color="#EEF0F3" flat tile>
      <div style="width: 240px; margin-right: 30px;">
        <v-card height="700" width="240" class="pa-4 shadow-1" flat>
          <router-link :to="{name:'upload'}">
            <v-btn height="44" width="208" depressed color="#3295C5" class="rounded-lg">
              <v-list-item-title class="pr-4 white--text text-overline">添加分类</v-list-item-title>
            </v-btn>
          </router-link>
          <v-btn height="44" width="208" depressed color="#3295C5" class="rounded-lg mt-4">
            <v-list-item-title @click="tag =true" class="pr-4 white--text text-overline">添加标签</v-list-item-title>
          </v-btn>
          <v-list nav class="pa-0 pt-6 text-left">
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                :to="{name: item.route}"
                @click="jump(item.route)"
                class="height-48 width-208"
                v-for="(item, i) in items"
                :key="item.text"
              >
                <v-list-item-icon>
                  <v-icon dense v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-left font-weight-medium" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-subheader style="margin-left: -10px">标签</v-subheader>

              <v-list-item
                @click="separator(item.text, i)"
                dense
                class="width-208 height-40"
                v-for="(item, i) in tags"
                :key="item.text"
              >
                <v-list-item-icon>
                  <v-icon small v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium text-caption" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="pa-0 px-0">
                  <v-menu transition="fade-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon small @click="edit = true" v-bind="attrs" v-on="on">
                        <v-icon small>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item dense @click="editTag(item, i)">
                        <v-list-item-content>
                          <v-list-item-title>编辑标签</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item @click="delTag(i)" dense>
                        <v-list-item-content>
                          <v-list-item-title>删除标签</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
              <v-card v-show="tag" height="105px" width="100%" class="mb-5 mt-2 shadow-1">
                <v-text-field
                  dense
                  autofocus
                  v-model="editedTag.text"
                  height="28"
                  hide-details="auto"
                  placeholder="输入标签名称"
                  class="mt-2 pt-4 text-caption px-5"
                ></v-text-field>
                <v-card-actions class="px-5 mt-2">
                  <v-spacer>
                    <v-btn
                      width="70"
                      color="#FFFFFF"
                      class="black--text shadow"
                      small
                      depressed
                      @click="close"
                    >取消</v-btn>
                  </v-spacer>
                  <v-btn
                    width="70"
                    color="#3295C5"
                    class="white--text"
                    small
                    depressed
                    @click="save"
                  >确定</v-btn>
                </v-card-actions>
              </v-card>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <v-card class="mr-6 shadow-1" width="100%" flat>
        <router-view ref="child"></router-view>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import component from "@/views/platform/apps/todo/tags.vue";
export default {
  data() {
    return {
      tag: false,
      edit: false,
      selectedItem: 0,
      editedIndex: -1,
      tagcontent: "",
      editedTag: {
        icon: "",
        text: "",
      },
      items: [
        {
          route: "articles",
          icon: "mdi-check-circle-outline",
          text: "文章",
        },
        {
          route: "draft",
          icon: "mdi-check",
          text: "草稿",
        },
      ],
      tags: [
        {
          icon: "mdi-tag-outline",
          text: "标签一",
        },
        {
          icon: "mdi-tag-outline",
          text: "标签二",
        },
        {
          icon: "mdi-tag-outline",
          text: "标签三",
        },
      ],
      templist: [
        {
          tags: ["标签一"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "test",
          name: "tom",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          tags: ["标签三", "标签二"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "kubernetes 高可用部署工具:sealos",
          name: "1",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
      ],
    };
  },
  created() {},
  // 初始化文章列表
  mounted() {
    // this.defaultList();
  },
  methods: {
    jump(name, i) {
      if (name === "articles") {
        this.setdefaultTagsList();
      }
      // this.$router.push({ name: i });
    },

    setdefaultTagsList() {
      this.$refs.child.settemplist(this.$store.state.detaultlist);
    },

    separator(tag, i) {
      let templist = [];
      for (let i = 0, len = this.templist.length; i < len; i++) {
        this.templist[i].tags.forEach((element) => {
          if (tag === element) {
            templist.push(this.templist[i]);
          }
        });
      }
      if (this.$refs.child.settemplist) {
        this.$refs.child.settemplist(templist);
      }
      // this.$store.state.templist = templist;
      this.$router.push({ name: `tags-${i}`, params: { templist: templist } });
    },

    delTag(i) {
      this.tags.splice(i, 1);
    },

    editTag(item) {
      this.tag = true;
      this.editedIndex = this.tags.indexOf(item);
      this.editedTag = Object.assign({}, this.tags[this.editedIndex]);
    },

    save() {
      if (this.editedTag.text === "") {
        return;
      }
      if (this.editedIndex > -1) {
        Object.assign(this.tags[this.editedIndex], this.editedTag);
      } else {
        for (let i = 0, len = this.tags.length; i < len; i++) {
          if (this.editedTag.text === this.tags[i].text) {
            return;
          }
        }
        this.tags.push({
          icon: "mdi-tag-outline",
          text: this.editedTag.text,
        });
      }
      this.close();
    },

    close() {
      this.$nextTick(() => {
        this.tag = false;
        this.editedIndex = -1;
        this.editedTag = {
          icon: "",
          text: "",
        };
      });
    },
  },
};
</script>

<style>
#wrap div {
  max-height: 700px;
  height: 700px;
  /* margin: 10px; */
  /* display: inline-block; */
}

.width-208 {
  width: 208px;
}

.height-48 {
  height: 48px;
}

.height-40 {
  height: 40px;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}

.shadow-1 {
  box-shadow: 0 2px 10px -1px rgba(85, 85, 85, 0.08),
    0 1px 10px 0 rgba(85, 85, 85, 0.06), 0 1px 30px 0 rgba(85, 85, 85, 0.03) !important;
}

#sheet {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}
</style>