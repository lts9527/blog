<template>
  <v-card style="margin: auto;" elevation="1" width="100%" height="64">
    <v-btn id="bar" top plain icon style="left: 70px;">
      <v-icon large>mdi-arch</v-icon>
      <v-list-item-action-text v-html="test"></v-list-item-action-text>
    </v-btn>

    <v-text-field
      class="field"
      append-icon="mdi-magnify"
      placeholder="搜索"
      filled
      rounded
      clearable
      dense
    ></v-text-field>

    <v-row justify="space-around">
      <v-menu v-for="([text, rounded]) in btns" :key="text" :rounded="rounded" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on" id="category-list" top fixed plain style="right: 200px;">
            分类
            <v-icon small dense>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </template>
        <v-list width="250" height="auto">
          <template v-for="item in items">
            <v-subheader v-if="item.title" v-text="item.title" :key="item.title"></v-subheader>
            <v-divider v-if="item.divider" :key="item.title"></v-divider>
            <v-list-item v-for="subtitle in item.subtitle" :key="subtitle" link>
              <v-list-item-title v-text="subtitle"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-row>

    <v-btn top fixed plain icon style="right: 150px;">
      <v-icon>mdi-translate</v-icon>
    </v-btn>
    <v-btn top fixed plain icon style="right: 110px;">
      <v-icon>mdi-brightness-7</v-icon>
    </v-btn>
    <v-btn top fixed plain icon style="right: 70px">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      test: "The Algorithms",
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
    };
  },
  methods: {
    ss() {
      alert("test");
    },
  },
};
</script>

<style scoped>
#category-list:hover {
}

.field {
  max-height: 41px;
  max-width: 300px;
  margin: 0 auto;
  bottom: 25px;
}

#bar {
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 !important;
  justify-content: space-between;
  top: 25%;
}
</style>
