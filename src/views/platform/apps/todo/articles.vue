<template>
  <div>
    <div>
      <v-text-field
        class="shadow text-center"
        height="80"
        hide-details
        clearable
        solo
        flat
        dense
        placeholder="搜索"
      >
        <template v-slot:prepend-inner>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </div>
    <div style="padding-top: 1px;">
      <v-list class="pa-0">
        <v-list-item-group>
          <v-card flat v-for="item in templist" :key="item.name">
            <div>
              <v-list-item>
                <v-list-item-avatar height="80" width="110" tile color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title id="article-title" v-html="item.title" class="text-h5 pl-7"></v-list-item-title>
                  <v-list-item-subtitle class="time-bar">2022-11-06 19:33:13</v-list-item-subtitle>
                  <v-row no-gutters class="info-bar">
                    <v-col v-for="item, i in details" :key="i">
                      <v-btn disabled icon>
                        <v-icon small>{{item.icon}}</v-icon>
                        {{item.name}}
                        <v-list-item-action-text class="ml-1" v-html="0"></v-list-item-action-text>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </div>
            <v-divider></v-divider>
          </v-card>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "articles",
  data() {
    return {
      details: [
        {
          name: "浏览",
          icon: "mdi-eye",
          num: 0,
        },
        {
          name: "评论",
          icon: "mdi-message-processing",
          num: 0,
        },
        {
          name: "点赞",
          icon: "mdi-thumb-up-outline",
          num: 0,
        },
      ],
      templist: [],
    };
  },
  created() {
    console.log(2);
    this.templist = this.$store.state.detaultlist;
  },
  computed: {},
  methods: {
    settemplist(value) {
      this.templist = value;
    },
  },
};
</script>

<style scoped>
.time-bar {
  position: relative;
  left: 28px;
  top: 15px;
}

.info-bar {
  left: 40px;
  top: 20px;
  margin-bottom: 10px;
  max-width: 300px;
  position: relative;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}
</style>
