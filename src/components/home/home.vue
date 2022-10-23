<template>
  <div id="top">
    <h1>{{ title }}</h1>
    <!-- <div class="head-img"> -->

    <a class="home" href="#" title="9527的个人中心">
      <!-- <v-avatar width="width" :size="size" class="home">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>-->
      <v-container fluid style="height: 100px">
        <v-row justify="center">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on">
                <!-- <v-avatar color="brown" size="48">
                  <span class="white--text text-h5">{{ user.initials }}</span>
                </v-avatar>-->
                <v-avatar width="width" :size="size" class="home">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <!-- <span class="white--text text-h5">
                      {{ user.initials }}
                    </span>-->
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                  </v-avatar>
                  <h3>{{ user.fullName }}</h3>
                  <p class="text-caption mt-1">{{ user.email }}</p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>Edit Account</v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>Disconnect</v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>

      <template v-for="(item, index) in articlelist">
        <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>
        <v-list-item v-else :key="item.name">
          <div class="music-hot">
            <router-link :to="{name:'test'}">
              <a class="url" href>
                <div class="item">
                  <div class="item-img">
                    <img src="@/assets/private/wallhaven-72d52e.jpeg" alt />
                  </div>
                  <div class="item-text">
                    <h4>{{item.content}}</h4>
                    <p>这款安装神器会让你集群高可用变得非常简单，原理简单排错也会非常简单，而且因为是本地内核负载，所以可用性极高。</p>
                    <a href>图标 RenShiWei 2022/1/21 个人博客关于本站</a>
                  </div>
                </div>
              </a>
            </router-link>
          </div>
          <!-- <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle style="-webkit-box-orient:horizontal;" v-html="item.content"></v-list-item-subtitle>
            <v-list-item-action-text style v-text="item.createtime"></v-list-item-action-text>
            <v-btn plain icon max-width="0" style="left: -85%;bottom: 1px;">
              <v-icon small>mdi-thumb-up-outline</v-icon>
              <v-list-item-action-text v-html="item.stars"></v-list-item-action-text>
            </v-btn>
            <v-btn plain icon max-width="0" style="left: -80%;bottom: 1px;">
              <v-icon small>mdi-thumb-down-outline</v-icon>
            </v-btn>
            <v-tab
              @click="item.reply=!item.reply"
              style="color: rgba(0, 0, 0, 0.6);min-width: 0;right: -22%;font-size: 12px;max-height: 0px;bottom: 22px;"
            >回复</v-tab>
          </v-list-item-content>-->
        </v-list-item>
      </template>
    </a>
  </div>
</template>

<script>
import Cards from "@/components/card/card.vue";
import Theme from "@/components/Theme/Theme.vue";
export default {
  name: "home",
  data() {
    return {
      articlelist: [
        // { header: "按热度排行" },
        {
          createtime: "2022-08-26 20:05",
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "tom",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          usercontent: [],
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "jack",
          usercontent: [],
          content: ` Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "test",
          usercontent: [],
          content: " Do you have Paris recommendations? Have you ever been?",
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          name: "ss",
          usercontent: [],
          content:
            "Have any ideas about what we should get Heidi for her birthday?",
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          name: "77",
          usercontent: [],
          content:
            " We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
      title: "9527",
      width: 200,
      size: 100,
      user: {
        initials: "JD",
        fullName: "John Doe",
        email: "john.doe@doe.com",
      },
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
    };
  },
  methods: {
    test() {
      this.$dialog.notify.success("Test notification", {
        position: "top-right",
        timeout: 3000,
      });
    },
    byScrollTop() {
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0; // 兼容ios
      document.body.scrollTop = 0; // 兼容低版本ie
    },
  },
  components: { Cards, Theme },
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  /* position: absolute; */
  position: fixed;
  /* top: 10%; */
  /* transform: translate(-50%, -50%); */
}

#create .v-btn--floating {
  position: relative;
}

.divider {
  margin-top: 12px;
  opacity: 0.6;
  border-bottom: 1px solid;
  border-image-source: radial-gradient(circle at 50% 0, #abb4be, #fff 100%);
  border-image-slice: 1;
}

.music-hot .item .item-text p {
  margin: 5px;
}

.music-hot .item .item-text p {
  /* border: 1px solid red; */
  font-size: 14px;
  line-height: 25px;
}

.music-hot .item .item-text h4 {
  /* border: 1px solid red; */
  font-size: 18px;
  padding: 8px 0px;
}

.music-hot .item .item-text {
  width: 550px;
  height: 120px;
  /* background-color: #262d38; */
  background-color: #fff;
  color: #242e42;
  float: right;
}

.music-hot .item .item-img img {
  width: 100%;
  height: 100%;
}

.music-hot .item .item-img {
  height: 100px;
  width: 150px;
  float: left;
}

.music-hot .item:hover {
  box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
  transform: translate(0, -5px);
  transition-delay: 0s !important;
}

.music-hot .item a {
  display: block;
  width: 100%;
  height: auto;
  color: #242e42;
}

.music-hot .item {
  height: 120px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.07);
  box-sizing: border-box;
  -webkit-transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
  transition: all 250ms cubic-bezier(0.02, 0.01, 0.47, 1);
}

.music-hot {
  width: 727px;
  position: relative;
  left: 50%;
  margin-top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

h1 {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -50%);
  color: #eceeed;
}
.home {
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, -50%);
}
</style>