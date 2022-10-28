<template>
  <div id="home">
    <topBar></topBar>
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
          <v-tab v-for="item in article" :key="item.category">{{ item.category }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-card-text>排序</v-card-text>
          <v-tab-item transition="true" class="item-1" v-for="item in article" :key="item.category">
            <v-card flat v-for="item in item.list" :key="item.name">
              <a id="article" href>
                <div class="card box-shadow">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title id="article-title" v-html="item.title" class="text-h5"></v-list-item-title>
                      <v-list-item-subtitle id="list-item-subtitle">{{item.content}}</v-list-item-subtitle>
                      <v-btn disabled icon max-width="0" style="top: 25px;left: -70%">
                        <v-icon small>mdi-eye</v-icon>
                        <v-list-item-action-text v-html="0"></v-list-item-action-text>
                      </v-btn>
                      <v-btn disabled icon max-width="0" style="top: 24px;left: -60%">
                        <v-icon small>mdi-thumb-up-outline</v-icon>
                        <v-list-item-action-text v-html="0"></v-list-item-action-text>
                      </v-btn>
                      <v-btn disabled icon max-width="0" style="top:24px;left: -50%">
                        <v-icon small>mdi-message-processing</v-icon>
                        <v-list-item-action-text v-html="0"></v-list-item-action-text>
                      </v-btn>
                    </v-list-item-content>
                    <v-list-item-avatar height="88" width="117" tile color="grey"></v-list-item-avatar>
                  </v-list-item>
                  <div style="margin-top: -40px;height:50px;">
                    <v-list-item-avatar>
                      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-action-text
                      style="color: rgba(0, 0, 0, 0.6);"
                      class="mb-12 ms-5"
                    >分类</v-list-item-action-text>
                  </div>
                  <v-divider class="mt-3"></v-divider>
                </div>
              </a>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import topBar from "@/components/topNavigationBar/topBar.vue";
export default {
  // name: "home",
  data() {
    return {
      title: "9527",
      tab: null,
      article: [
        {
          category: "分类1",
          list: [
            {
              stars: 0,
              title: "test",
              name: "tom",
              avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
              content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
            {
              stars: 0,
              title: "kubernetes 高可用部署工具:sealos",
              name: "jack",
              avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
              content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
          ],
        },
        {
          category: "分类2",
          list: [
            {
              stars: 0,
              title: "s",
              name: "jack",
              avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
              content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            },
          ],
        },
        {
          category: "分类3",
        },
        {
          category: "分类4",
        },
      ],
    };
  },
  methods: {},
  components: { topBar },
};
</script>

<style>
.item-1 {
  animation-play-state: paused;
}

#article:hover #article-title {
  color: #2778ce;
}

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
#home-head h1 {
  font-weight: bold;
}

#home-head {
  padding: 20px;
  text-align: center;
}
#home {
  margin: 0 auto;
}

/* 文章卡片悬浮 */
/* .card {
  background-color: #fff;
  -webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
}

.card:hover {
  transform: translate(0, -1px);
}

.box-shadow {
  -webkit-box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, 0.15);
  box-shadow: 0 4px 16px rgba(48, 55, 66, 0.15);
} */
</style>