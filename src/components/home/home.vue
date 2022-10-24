<template>
  <div id="home">
    <div id="home-head">
      <h1>{{ title }}</h1>
      <a href="#" title="9527的个人中心">
        <v-avatar id="home-head-portrait" size="100" class="home">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </a>
    </div>
    <div id="content">
      <v-card elevation="0">
        <v-tabs light fixed-tabs centered v-model="tab" background-color>
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-card-text>排序</v-card-text>
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card flat>
              <v-list-item three-line>
                <v-list-item-content>
                  <!-- <div class="text-overline mb-4">OVERLINE</div> -->
                  <v-list-item-title class="text-h5">kubernetes 高可用部署工具:sealos</v-list-item-title>
                  <v-list-item-subtitle id="list-item-subtitle">
                    Greyhound divisely hello coldly fonwderfullydgjbhdgbhkjdgbjkdgjkbjdgbkdg
                    sfbjkfsjdkbjfksbnjkfnsbnfsbjknsfjkbjksfb
                  </v-list-item-subtitle>
                  <!-- <v-btn plain icon max-width="0" style="top: 20px;left: -85%">
                    <v-icon small>mdi-thumb-up-outline</v-icon>
                    <v-list-item-action-text v-html="0"></v-list-item-action-text>
                  </v-btn>
                  <v-btn plain icon max-width="0">
                    <v-icon small>mdi-thumb-down-outline</v-icon>
                  </v-btn>-->
                  <!-- <v-tab
                    style="color: rgba(0, 0, 0, 0.6);min-width: 0;right: -22%;font-size: 12px;max-height: 0px;bottom: 22px;"
                  >回复</v-tab>-->
                </v-list-item-content>
                <v-list-item-avatar height="88" width="117" tile size="80" color="grey"></v-list-item-avatar>
              </v-list-item>
              <div style="margin-top: -30px;">
                <v-list-item-avatar>
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-action-text class="mb-12">分类</v-list-item-action-text>
              </div>

              <v-card-actions>
                <v-btn outlined rounded text>Button</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <!-- <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">OVERLINE</div>
            <v-list-item-title class="text-h5 mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text>Button</v-btn>
        </v-card-actions>
      </v-card>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "9527",
      tab: null,
      items: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" },
        { tab: "Three", content: "Tab 3 Content" },
        { tab: "Four", content: "Tab 4 Content" },
        { tab: "Five", content: "Tab 5 Content" },
      ],
    };
  },
  methods: {},
};
</script>

<style>
#list-item-subtitle {
  margin-top: -30px;
  max-width: 500px;
  -webkit-line-clamp: 1;
}

#content {
  width: 680px;
  margin: 0 auto;
  margin-top: 100px;
}

#home-head-portrait {
  top: 10px;
}
#home-head {
  padding: 20px;
  text-align: center;
}
#home {
  margin: 0 auto;
}
</style>