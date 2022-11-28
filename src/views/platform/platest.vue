<template>
  <v-app id="inspire">
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
      <v-container id="contentarea" class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-sheet style="background-color: red;" color="#f6f7f9" rounded="lg">
              ss
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
export default {
  data: () => ({
    cards: ["Today"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
};
</script>

<style>
#contentarea {
  top: 30px;
  width: 85%;
  min-width: 680px;
  margin-left: 220px;
  /* margin-right: 200px; */
  /* min-width: 980px;
  max-width: 85%; */
  /* position: absolute; */
}

#col {
  position: fixed;
  left: 0;
  height: 100%;
  padding: 0px;
  width: 200px;
}
</style>