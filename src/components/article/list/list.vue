<template>
  <div>
    <div>
      <v-text-field
        class="shadow text-center"
        height="80"
        hide-details
        clearable
        solo
        flat
        dense
        placeholder="搜索"
      >
        <template v-slot:prepend-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </div>

    <div style="padding-top: 1px;">
      <v-card flat>
        <v-list-item style="height: 80px;">
          <v-list-item-action class="ma-0" @click="allActives">
            <v-checkbox @click="activeAll = !activeAll" :input-value="active" color="primary"></v-checkbox>
          </v-list-item-action>
          <v-list-item-action class="ml-2">
            <v-btn icon>
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action class="ma-0">
            <v-btn icon>
              <v-icon v-show="!activeAll">mdi-reload</v-icon>
              <v-icon v-show="activeAll" @click="deleteArtList">mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <v-divider></v-divider>
      <v-list class="pa-0">
        <v-card flat>
          <template v-for="(item,i) in listc">
            <v-list-item
              :color="item.active ? 'blue' : ''"
              :input-value="item.active"
              style="height: 120px;"
              @click="opEdit(item.id)"
              flat
              v-if="item"
              :key="i"
            >
              <!-- 复选框 -->
              <v-list-item-action>
                <v-checkbox
                  :input-value="item.active"
                  color="primary"
                  @click.stop="ac(item, $event)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-avatar height="80" width="120" tile color="grey">
                <v-img :src="item.cover"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  id="article-title"
                  v-html="item.title"
                  class="text-h5 pl-7 black--text"
                ></v-list-item-title>

                <div style="position: absolute;" class="black--text">
                  <div class="create-time">
                    <span class="mr-2">
                      <slot name="create-name">创建于</slot>
                    </span>
                    <span>
                      {{item.createdAt}}
                      <!-- <slot name="create-time"></slot> -->
                    </span>
                  </div>
                  <div class="edit-time">
                    <span class="mr-2">修改于</span>
                    <span>
                      {{ item.updatedAt}}
                      <!-- <slot name="edit-time"></slot> -->
                    </span>
                  </div>
                </div>

                <v-row no-gutter class="info-bar">
                  <slot name="info-bar">
                    <v-col>
                      <v-btn disabled icon>
                        <v-icon small>mdi-eye</v-icon>浏览
                        <v-list-item-action-text class="ml-1" v-html="item.browse"></v-list-item-action-text>
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn disabled icon>
                        <v-icon small>mdi-message-processing</v-icon>评论
                        <v-list-item-action-text class="ml-1" v-html="item.comments"></v-list-item-action-text>
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn disabled icon>
                        <v-icon small>mdi-thumb-up-outline</v-icon>点赞
                        <v-list-item-action-text class="ml-1" v-html="item.stars"></v-list-item-action-text>
                      </v-btn>
                    </v-col>
                  </slot>
                  <!-- <v-col v-for="(info, ii) in details" :key="ii">
                    <v-btn disabled icon>
                      <v-icon small>{{info.icon}}</v-icon>
                      {{info.name}}
                      <v-list-item-action-text class="ml-1" v-html="item.browse"></v-list-item-action-text>
                    </v-btn>
                  </v-col>-->
                </v-row>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click.stop="deleteArticle(item.id, i)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-card>
      </v-list>

      <div id="paging-bar" @click.stop="pags(page)">
        <v-pagination
          v-if="pagination"
          v-on:next="next"
          circle
          v-model="page"
          :length="lastPage"
          :total-visible="9"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { pagerCount } from "@/utils/utils.js";
export default {
  name: "list",
  props: ["artData", "pagination"],
  data() {
    return {
      page: 1,
      lastPage: 0,
      active: [],
      tempList: [],
      mark: false,
      activeAll: false,
      details: [
        {
          name: "浏览",
          icon: "mdi-eye",
          num: 0,
        },
        {
          name: "评论",
          icon: "mdi-message-processing",
          num: 0,
        },
        {
          name: "点赞",
          icon: "mdi-thumb-up-outline",
          num: 0,
        },
      ],
    };
  },
  created() {},
  computed: {
    // 获取当前页数的文章列表
    listc() {
      if (this.artData.list == undefined) {
        // this.pagination = false;
        return;
      }
      let num = 0;
      let index = 0;
      let last = Number(pagerCount(this.artData.total, 4));
      let arr = new Array();
      const art = JSON.parse(JSON.stringify(this.artData));

      if (art.length != 0) {
        this.lastPage = last;
        // 根据最后页码生成分页的二维数组大小
        for (let i = 0; i < last; i++) {
          // 二维数组
          arr[i] = new Array();
        }
        // 以4篇文章为一页添加
        for (let i = 0, len = art.list.length; i < len; i++) {
          if (num === 4) {
            num = 0;
            index++;
          }
          arr[index].push(art.list[i]);
          num++;
        }

        // console.log("index", index);
        this.tempList = arr;
        // 返回当前页数的文章
        return this.tempList[this.page - 1];
      }
    },
  },
  methods: {
    ...mapActions("articleModule", {
      artDelete: "del",
    }),

    pags(index) {
      // console.log("pag index", index)
    },

    next(index) {
      // console.log("index", this.page)
    },

    // settemplist(value) {
    //   this.templist = value;
    // },

    opEdit(id) {
      this.$emit("opEdit", id);
    },

    deleteArticle(id, i) {
      console.log("id", id);
      confirm("Are you sure you want to delete this item?") &&
        this.artDelete({ id: id })
          .then((res) => {
            console.log("delete article res", res);
            this.artData.list.splice(i, 1);
          })
          .catch((err) => {
            console.log("delete article  err:", err.response);
          });
    },

    deleteArtList() {
      this.tempList[this.page - 1].forEach((element) => {
        if (element.active) {
          console.log("delete art ", element.title);
        }
      });
    },

    allActives() {
      this.mark = !this.mark;
      this.tempList[this.page - 1].forEach((element) => {
        if (this.mark) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
    },

    ac(item, event) {
      item.active = !item.active;
    },
  },
};
</script>

<style scoped>
#paging-bar {
  position: absolute;
  width: 100%;
  bottom: 5px;
  box-shadow: 0 0px 0px;
}

#article-title {
  position: absolute;
  top: 15px;
}
.create-time {
  position: relative;
  left: 28px;
  top: 10px;
}

.edit-time {
  position: relative;
  left: 200px;
  top: -3px;
}

.info-bar {
  margin-top: 50px;
  left: 50px;
  max-width: 300px;
  position: relative;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}
</style>
