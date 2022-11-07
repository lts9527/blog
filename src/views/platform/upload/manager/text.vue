<template>
  <div style="padding: 20px;">
    <v-card flat v-for="item in templist" :key="item.name">
      <div class="card box-shadow">
        <v-list-item>
          <v-list-item-avatar height="88" width="117" tile color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title id="article-title" v-html="item.title" class="text-h5 pl-7"></v-list-item-title>
            <v-list-item-subtitle
              style="position: relative;left: 28px;top: 15px;"
            >2022-11-06 19:33:13</v-list-item-subtitle>
            <v-row no-gutters style="position: relative;left: 40px;top: 20px;">
              <v-col cols="12" sm="2" v-for="item, i in details" :key="i">
                <v-btn disabled icon>
                  <v-icon small>{{item.icon}}</v-icon>
                  {{item.name}}
                  <v-list-item-action-text v-html="0"></v-list-item-action-text>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <!-- <div style="margin-top: -40px;height:50px;">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-action-text style="color: rgba(0, 0, 0, 0.6);" class="mb-12 ms-5">分类</v-list-item-action-text>
        </div>-->
        <v-menu transition="fade-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              style="bottom: 80px;"
              text
              depressed
              icon
              class="float-right"
            >
              <v-icon large>mdi-dots-horizontal-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item dense link>
              <v-list-item-content>
                <v-list-item-title>编辑文章</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="dialog = true" dense link>
              <v-list-item-content>
                <v-list-item-title>删除文章</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card>
    <v-dialog overlay-opacity="0.1" v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="dialog-text">你确定要删除这篇文章吗?</v-card-text>
        <v-card-actions>
          <v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">确定</v-btn>
          </v-spacer>
          <v-btn text @click="dialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
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
      templist: [
        {
          browse: 0,
          comments: 0,
          stars: 0,
          title: "test",
          name: "tom",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          browse: 0,
          comments: 0,
          stars: 0,
          title: "kubernetes 高可用部署工具:sealos",
          name: "1",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          browse: 0,
          comments: 0,
          stars: 0,
          title: "1",
          name: "mari",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          browse: 0,
          comments: 0,
          stars: 0,
          title: "2",
          name: "2",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
      ],
    };
  },
  methods: {
    test(v) {},
  },
};
</script>

<style>
#article-title:hover {
  color: #2778ce;
}

.dialog-text {
  text-align: center;
  position: relative;
  top: 20px;
}

.card {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e5e9ef;
}
</style>