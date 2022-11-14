<template>
  <v-app id="inspire" class="v-application--wrap">
    <v-app-bar id="head-bar" app color="white">
      <v-avatar style="margin-left: 70px;" class="mr-16" color="grey darken-1" size="32"></v-avatar>
      <v-btn v-for="link in links" :key="link" text>{{ link }}</v-btn>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>
    <v-main class="grey lighten-4" style="padding: 0px">
      <v-col id="col">
        <v-sheet id="sheet" min-height="100%">
          <v-list color="transparent">
            <v-list-item-content>
              <router-link :to="{name:'upload'}">
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
                <v-list-item v-for="v, k in item.sub" :key="k" @click="to(v)">
                  <v-list-item-content>
                    <router-link style="color: #282828;" :to="{name: v}">
                      <v-list-item-subtitle v-text="k"></v-list-item-subtitle>
                    </router-link>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <v-divider class="my-2"></v-divider>
            <v-list-item href="http://localhost:8081/platform/home" link color="grey lighten-4">
              <v-list-item-content>
                <v-list-item-title>Refresh</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-container id="contentarea">
        <v-row>
          <v-col>
            <v-sheet min-height="89vh" max-width="90%" min-width="1000" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
import List from "@/components/article/list/list.vue";
export default {
  name: "centre",

  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    show: false,
    items: [
      {
        icon: "$expand",
        show: false,
        name: "内容管理",
        sub: {
          文章管理: "manager-text",
          视频管理: "",
          分类管理: "category",
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
    to(path) {
      this.$router.push({ name: path });
    },
  },
};
</script>

<style>
html {
  background-color: #fafafa;
}

#contentarea {
  left: 250px;
  right: 200px;
  min-width: 980px;
  max-width: 85%;
  position: absolute;
}

#col {
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

.v-application--wrap {
  min-height: 100%;
}

.Editor {
  width: 800px;
  height: auto;
  background-color: red;
  position: relative;
}

.rowtest {
  bottom: 102%;
  left: 12%;
  position: absolute;
}
</style>