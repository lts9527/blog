<template>
  <v-card class="d-flex flex-row" color="#EEF0F3" flat tile>
    <div style="width: 240px; margin-right: 30px;">
      <v-card height="700" width="240" class="pa-4 shadow-1" flat>
        <router-link :to="{name:'edit'}">
          <v-btn height="44" width="208" depressed color="#3295C5" class="rounded-lg">
            <v-list-item-title class="pr-4 white--text text-overline">添加分类</v-list-item-title>
          </v-btn>
        </router-link>
        <v-btn height="44" width="208" depressed color="#3295C5" class="rounded-lg mt-4">
          <v-list-item-title @click="tag =true" class="pr-4 white--text text-overline">添加标签</v-list-item-title>
        </v-btn>
        <v-list nav class="pa-0 pt-6 text-left">
          <v-list-item-group v-model="selectedItem" color="#3295C5">
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

            <div>
              <v-subheader style="margin-left: -10px;" class="pa-0 ma-0">
                标签
                <p class="caption ma-0 ml-12">{{page}} of {{lastPage}}</p>
                <v-list-item-action class="ml-auto">
                  <v-btn icon small @click="previous" :disabled="page == 1 ? true: false">
                    <v-icon small color="rgba(0,0,0,.26)">mdi-chevron-left</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action class="ma-0 pr-0">
                  <v-btn icon small @click="next" :disabled="page == lastPage ? true: false">
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-subheader>
            </div>

            <v-list-item
              @click="separator(itemTag.name, itemTag.id)"
              dense
              class="width-208 height-40"
              v-for="(itemTag, i) in tagsc"
              :key="itemTag.name"
            >
              <v-list-item-icon>
                <v-icon small>mdi-tag-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium text-caption" v-text="itemTag.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="pa-0 px-0">
                <v-menu transition="fade-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon small @click="edit = true" v-bind="attrs" v-on="on">
                      <v-icon small>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item dense @click="editTag(itemTag, i)">
                      <v-list-item-content>
                        <v-list-item-title>编辑标签</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="delTag(itemTag.id, i)" dense>
                      <v-list-item-content>
                        <v-list-item-title>删除标签</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>

            <v-dialog v-model="tag" width="250">
              <v-card height="120" width="100%" class="pb-5 pt-2 shadow-1">
                <v-text-field
                  dense
                  autofocus
                  v-model="editedTag.name"
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
            </v-dialog>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <v-card class="mr-6 shadow-1" width="100%" flat>
      <router-view ref="child"></router-view>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { pagerCount } from "@/utils/utils.js";
export default {
  data() {
    return {
      tag: false,
      edit: false,
      page: 1,
      lastPage: 0,
      selectedItem: 0,
      editedIndex: -1,
      editedTag: {
        id: 0,
        icon: "",
        name: "",
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
      tags: [],
      templist: [],
    };
  },
  created() {
    // 请求标签列表
    this.tagList()
      .then((tags) => {
        // this.tags = JSON.parse(JSON.stringify(tags));
        // this.$store.state.tags = JSON.parse(JSON.stringify(tags));
        this.tags = tags;
        this.$store.state.tags = tags;
      })
      .catch((err) => {
        console.log("get article list err:", err);
      });
    // this.tags = this.$store.state.tags;
  },
  computed: {
    // 获取当前页数的标签列表
    tagsc() {
      if (this.tags.length == 0) {
        return;
      }
      let num = 0;
      let index = 0;
      let arr = new Array();
      let last = Number(pagerCount(this.tags.length, 9));
      let art = JSON.parse(JSON.stringify(this.tags));

      if (art.length != 0) {
        this.lastPage = last;
        // 根据最后页码生成分页的二维数组大小
        for (let i = 0; i < last; i++) {
          // 二维数组
          arr[i] = new Array();
        }

        // 以8个标签为一页添加
        for (let i = 0, len = art.length; i < len; i++) {
          if (num === 9) {
            num = 0;
            index++;
          }
          arr[index].push(art[i]);
          num++;
        }
        this.tempTags = arr;
        // 返回当前页数的标签列表
        return this.tempTags[this.page - 1];
      }
    },
  },
  // 初始化文章列表
  mounted() {
    // this.defaultList();
  },
  methods: {
    ...mapActions("tagModule", {
      tagList: "list",
      addTag: "add",
      deleteTag: "del",
      updateTag: "update",
    }),

    ...mapActions("articleModule", {
      artList: "list",
    }),

    previous() {
      if (this.page === 1) {
        return;
      }
      this.page--;
    },

    next() {
      if (this.page === this.lastPage) {
        return;
      }
      this.page++;
    },

    jump(name, i) {
      if (name === "articles") {
        // this.setdefaultTagsList();
      }
      // this.$router.push({ name: i });
    },

    // setdefaultTagsList() {
    //   this.$refs.child.settemplist(this.$store.state.detaultlist);
    // },

    separator(tag, id) {
      if (id == undefined) {
        return;
      }
      // let list = this.$store.state.artData.list;
      let list = JSON.parse(JSON.stringify(this.$store.state.artData.list));
      let templist = [];
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].tags.forEach((element) => {
          // console.log("element", element);
          if (id === element) {
            templist.push(list[i]);
          }
        });
      }
      if (this.$refs.child.setList) {
        this.$refs.child.setList(templist);
      }
      this.$router.push({
        name: `tags`,
        params: { id: id },
      });
    },

    delTag(id, i) {
      this.deleteTag({ id })
        .then((res) => {
          this.tags.splice(i, 1);
          console.log("this router", this.$router.options.routes);
        })
        .catch((err) => {
          console.log("addTag err:", err.response.data.message);
        });
    },

    editTag(item) {
      this.tag = true;
      this.editedIndex = this.tags.indexOf(item);
      this.editedTag = Object.assign({}, this.tags[this.editedIndex]);
    },

    save() {
      let exist = false;
      if (this.editedTag.name === "") {
        return;
      }
      if (this.editedIndex > -1) {
        let index = this.editedIndex;
        let editedTag = this.editedTag;
        this.updateTag({
          id: this.editedTag.id,
          name: this.editedTag.name,
        })
          .then((res) => {
            Object.assign(this.tags[index], editedTag);
          })
          .catch((err) => {
            console.log("updateTag err:", err);
          });
      } else {
        for (let i = 0, len = this.tags.length; i < len; i++) {
          if (this.editedTag.name === this.tags[i].name) {
            exist = true;
            break;
          }
        }
        if (exist) {
          return;
        }
        let name = this.editedTag.name;
        this.addTag({ name: this.editedTag.name })
          .then((res) => {
            this.tags.push({
              id: res.details.id,
              icon: "mdi-tag-outline",
              name: name,
            });
          })
          .catch((err) => {
            console.log("addTag err:", err.response.data.message);
          });
      }
      this.close();
    },

    close() {
      this.$nextTick(() => {
        this.tag = false;
        this.editedIndex = -1;
        this.editedTag = {
          id: 0,
          icon: "",
          name: "",
        };
      });
    },

    addTagRoute(id) {
      const route = {
        name: "tags",
        params: {
          id,
        },
        meta: {
          title: `动态路由-${id}`,
        },
      };
      this.$router.push(route);
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