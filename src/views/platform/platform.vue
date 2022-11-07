<template>
  <v-app id="inspire" class="v-application--wrap">
    <v-app-bar id="test" app color="white">
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
        <v-btn v-for="link in links" :key="link" text>{{ link }}</v-btn>
        <v-spacer></v-spacer>
        <v-responsive max-width="260">
          <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-4" style="padding: 0px">
      <v-col id="col">
        <v-sheet id="sheet" min-height="100%">
          <v-list color="transparent">
            <template v-for="item, i in items">
              <v-list-group :append-icon="test(item.icon)" v-if="item" :key="i">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title @click="item.show = !item.show">{{item.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="v, k in item.sub" :key="k" @click="to(v)">
                  <v-list-item-content>
                    <v-list-item-title v-text="k"></v-list-item-title>
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
      <v-container id="Contentarea">
        <v-row>
          <v-col>
            <v-sheet min-height="89vh" max-width="90%" rounded="lg">
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

#Contentarea {
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

#test {
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