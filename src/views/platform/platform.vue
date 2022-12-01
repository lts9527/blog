<template>
  <v-app id="inspire" class="v-application--wrap">
    <v-app-bar id="head-bar" app color="white">
      <v-avatar class="mr-16 ml-16" color="grey darken-1" size="32"></v-avatar>
      <v-btn v-for="link in links" :key="link" text>{{ link }}</v-btn>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>
    <v-main style="padding: 0px;background-color: #eef0f3;">
      <v-col id="col-1">
        <v-sheet id="sheet" min-height="100%">
          <v-list color="transparent">
            <v-list-item-content>
              <router-link :to="{name:'edit'}">
                <v-btn class="ml-7" height="41" width="136" depressed color="primary">
                  <v-icon class="pr-3">mdi-export-variant</v-icon>
                  <v-list-item-title class="pr-4">发布</v-list-item-title>
                </v-btn>
              </router-link>
            </v-list-item-content>
            <template v-for="item, i in items">
              <v-list-group :append-icon="test(item.icon)" v-if="item" :key="i">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title @click="item.show = !item.show">{{item.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="v, k in item.minor" :key="k" :to="{name: v}">
                  <v-list-item-content>
                    <router-link :to="{name: v}">
                      <v-list-item-subtitle v-text="k"></v-list-item-subtitle>
                    </router-link>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <v-divider class="my-2"></v-divider>
            <v-list-item href="http://localhost:8081/platform/apps" link color="grey lighten-4">
              <v-list-item-content>
                <v-list-item-title>Refresh</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet rounded="lg" id="contentarea">
          <router-view></router-view>
        </v-sheet>
      </v-col>
    </v-main>
  </v-app>
</template>
  
  <script>
export default {
  name: "centre",

  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    items: [
      {
        icon: "$expand",
        show: false,
        name: "内容管理",
        minor: {
          // 旧版
          // 文章管理: "manager-text",
          // 视频管理: "video",
          // 分类管理: "articles",
          文章管理: "todo",
          视频管理: "videoman",
          分类管理: "classman",
        },
      },
      {
        name: "数据中心",
      },
      {
        name: "设置",
      },
    ],
  }),
  methods: {
    test(icon) {
      if (icon === "$expand") {
        return "$expand";
      }
      return "";
    },
  },
};
</script>

<style>
html,
body {
  background-color: #eef0f3;
}

#contentarea {
  margin-top: 20px;
  margin-left: 220px;
  /* background-color: #eef0f3; */
}

#col-1 {
  position: fixed;
  left: 0;
  height: 100%;
  padding: 0px;
  width: 200px;
}

#sheet {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}

#head-bar {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
}

/* 
消除滚动条
*/
.v-application--wrap {
  min-height: 100%;
}
</style>