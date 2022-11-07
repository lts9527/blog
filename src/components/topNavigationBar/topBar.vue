<template>
  <!-- <div>
    <button type="button" v-on:click="click">点击一下</button>
    {{ value }}
  </div>-->
  <v-card style="margin: auto;" elevation="1" width="100%" height="64">
    <v-btn class="bar" top plain>
      <v-icon @click="next" large>mdi-arch</v-icon>
      <v-list-item-action-text v-html="title"></v-list-item-action-text>
    </v-btn>

    <v-text-field
      class="field"
      append-icon="mdi-magnify"
      placeholder="搜索"
      v-model="inputvalue"
      @keydown.enter="search(inputvalue)"
      filled
      rounded
      clearable
      dense
    ></v-text-field>

    <!-- <v-row justify="space-around"> -->
    <v-menu
      open-on-hover
      @mouseenter="show =!show"
      @mouseleave="show =!show"
      v-for="([text, rounded]) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          top
          @mouseenter="show =!show"
          v-bind="attrs"
          v-on="on"
          @click="ss(on)"
          v-on:on:@mouseenter="ss(on)"
          class="category-list"
          plain
        >
          分类
          <v-icon small dense>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </template>
      <v-list width="250" height="auto">
        <template v-for="item in items">
          <v-subheader v-if="item.title" v-text="item.title" :key="item.title"></v-subheader>
          <v-divider v-if="item.divider" :key="item.title"></v-divider>
          <v-list-item
            style="font-size: 0.8125rem;font-weight: 500;line-height: 1rem;"
            v-for="subtitle in item.subtitle"
            :key="subtitle"
            link
          >
            <v-list-item-title v-text="subtitle"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
    <!-- </v-row> -->

    <v-btn class="lang-btn" top plain icon>
      <v-icon>mdi-translate</v-icon>
    </v-btn>
    <v-btn class="theme-btn" top plain icon>
      <v-icon>mdi-brightness-7</v-icon>
    </v-btn>
    <v-btn class="github-btn" top plain icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  // props: ["value"],
  data() {
    return {
      value: "",
      title: "The Algorithms",
      show: false,
      btns: [["Large", "lg"]],
      colors: ["deep-purple accent-4"],
      // items: [...Array(4)].map((_, i) => `Item ${i}`),
      items: [
        {
          title: "分类1",
          subtitle: ["分类1-1", "分类1-2"],
        },
        { divider: true, inset: true },
        {
          title: "分类2",
          subtitle: ["分类2-1", "分类2-2"],
        },
        { divider: true, inset: true },
        {
          title: "分类3",
          subtitle: ["分类3-1", "分类3-2", "分类3-3", "分类3-4"],
        },
      ],
      inputvalue: "",
    };
  },
  methods: {
    ss(on) {
      console.log(on);
      on.mouseenter();
    },
    search(value) {
      this.$emit("search", value);
    },
    next() {
      alert("test");
    },
  },
};
</script>

<style scoped>
.github-btn {
  display: flex;
  position: relative;
  bottom: 170px;
  right: -91%;
  /* float: right; */
  /* padding: 0 !important; */
}

.theme-btn {
  display: flex;
  position: relative;
  bottom: 133px;
  right: -88%;
  /* float: right; */
  /* padding: 0 !important; */
}

.lang-btn {
  display: flex;
  position: relative;
  bottom: 97px;
  right: -85%;
  /* float: right; */
  /* padding: 0 !important; */
}

.category-list {
  display: flex;
  position: relative;
  bottom: 62px;
  right: -80%;
  /* float: right; */
  padding: 0 !important;
}

.field {
  max-height: 41px;
  max-width: 300px;
  margin: 0 auto;
  bottom: 25px;
}

.bar {
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 !important;
  justify-content: space-between;
  top: 25%;
  left: 70px;
}
</style>
