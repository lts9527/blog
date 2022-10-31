<template>
  <div id="home">
    <topBar @search="search"></topBar>
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
        <v-tabs centered style="padding: 0 0;">
          <v-container v-for="item in items" :key="item.title" class="pa-2" outlined tile>
            <!-- <div class="text-center"> -->
            <v-menu transition="fade-transition" open-on-hover top offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn :color="item.color" elevation="0" v-bind="attrs" v-on="on">{{item.title}}</v-btn>
              </template>
              <v-list>
                <!-- <v-list-item-group> -->
                  <v-list-item @click="setlist(item.title, subtitle)" dense  :key="i" v-for="subtitle,i in item.subtitle">
                    <v-list-item-content>
                    <v-list-item-title v-text="subtitle"></v-list-item-title>
                  </v-list-item-content>
                  </v-list-item>
              <!-- </v-list-item-group> -->
              </v-list>
            </v-menu>
            <!-- </div> -->
          </v-container>
        </v-tabs>
        <!-- <v-card-text>排序</v-card-text> -->

        <v-menu
      open-on-hover
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color=""
          v-bind="attrs"
          v-on="on"
          icon
        >
        排序<v-icon small dense>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


        <!-- <v-container v-for="items in article" :key="items.category"> -->
        <!-- <template v-if="comparison(items.category)"> -->

        <v-card flat v-if="templist == false">
          <div class="card box-shadow">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title style="text-align: center;" class="text-h5">分类列表为空</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>

        <v-card flat v-for="item in templist" :key="item.name">
          <a id="article" @click="sed(templist)">
            <div class="card box-shadow">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    v-if="templist === false"
                    id="article-title"
                    v-html="title"
                    class="text-h5"
                  ></v-list-item-title>
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
                <v-list-item-action-text style="color: rgba(0, 0, 0, 0.6);" class="mb-12 ms-5">分类</v-list-item-action-text>
              </div>
              <v-divider class="mt-3"></v-divider>
            </div>
          </a>
        </v-card>
        <!-- </template> -->
        <!-- </v-container> -->
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
      arr: "",
      btns: [["Large", "lg"]],
      show: true,
      color: "success",
      items: [
        {
          title: "分类1",
          color: "",
          subtitle: ["分类1-1", "分类1-2"],
        },
        {
          title: "分类2",
          color: "",
          subtitle: ["分类2-1", "分类2-2"],
        },
        {
          title: "分类3",
          color: "",
          subtitle: ["分类3-1", "分类3-2", "分类3-3", "分类3-4"],
        },
        {
          title: "分类4",
          color: "",
          subtitle: ["分类4-1", "分类4-2", "分类4-3"],
        },
        {
          title: "分类5",
          color: "",
          subtitle: ["分类5-1", "分类5-2", "分类5-3", "分类5-4"],
        },
        {
          title: "分类6",
          color: "",
          subtitle: ["分类6-1", "分类6-2", "分类6-3", "分类6-4"],
        },
        {
          title: "分类7",
          color: "",
          subtitle: ["分类6-1", "分类6-2", "分类6-3", "分类6-4"],
        },
      ],
      title: "9527",
      article: [
        {
          category: "分类1-1",
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
          category: "分类1-2",
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
      ],
      templist: [
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
          name: "1",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          stars: 0,
          title: "1",
          name: "mari",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
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
    comparison(key) {
      // let num = 0;
      // let tt = false;
      // for (let title in this.items) {
      //   for (let j in this.items[title].subtitle) {
      //     if (key === this.items[title].subtitle[j]) {
      //       tt = true;
      //       console.log(key);
      //       console.log("subtitle", this.items[title].subtitle[j]);
      //     }
      //     num++;
      //   }
      // }
      // console.log(num);
      // return tt;
    },
    setlist(title, key) {
      this.templist = [];
      for (let i in this.article) {
        if (key === this.article[i].category) {
          let temparr = this.article[i].list;
          this.templist = temparr;
        }
      }
      for (let i in this.items) {
        this.items[i].color = ""
      }
      for (let i in this.items) {
        if (title === this.items[i].title) {
          this.items[i].color = "success"
          break;
        }
      }
    },
    sed(arr) {
      // console.log(this.templist);
      console.log(arr);
    },
    check() {
      templist.length === 0;
    },
    search(value) {
      console.log(this.templist);
      for (let i in this.templist) {
        if (this.templist[i].title.indexOf(value) != -1) {
          let templist = this.templist[i];
          this.templist = [];
          this.templist.push(templist);
          return;
        }
      }
    },
  },
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
  /* text-align: center; */
  /* margin-left: 40px; */
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