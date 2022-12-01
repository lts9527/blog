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
        <v-card flat v-for="item in list" :key="item.name">
          <v-list-item style="height: 120px;" @click="opEdit">
            <!-- 复选框 -->
            <!-- <v-list-item-action>
              <v-checkbox :input-value="active" color="primary" @click.stop></v-checkbox>
            </v-list-item-action>-->
            <v-list-item-avatar height="80" width="110" tile color="grey"></v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title id="article-title" v-html="item.title" class="text-h5 pl-7"></v-list-item-title>

              <div style="position: absolute;">
                <div class="create-time">
                  <span class="mr-2">
                    <slot name="create-name">创建于</slot>
                  </span>
                  <span>
                    <slot name="create-time"></slot>
                  </span>
                </div>
                <div class="edit-time">
                  <span class="mr-2">修改于</span>
                  <span>
                    <slot name="edit-time"></slot>
                  </span>
                </div>
              </div>

              <v-row no-gutter class="info-bar">
                <slot name="info-bar"></slot>
              </v-row>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.stop="deletesArticle">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </v-card>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: ["list"],
  data() {
    return {};
  },
  created() {
    // this.templist = this.$store.state.detaultlist;
  },
  computed: {},
  methods: {
    settemplist(value) {
      this.templist = value;
    },

    opEdit() {
      this.$emit("opEdit");
    },

    deletesArticle() {
      alert("delete article");
    },
  },
};
</script>

<style scoped>
#article-title {
  position: absolute;
  top: 15px;
}
.create-time {
  position: relative;
  left: 28px;
  top: 10px;
}

.edit-time {
  position: relative;
  left: 200px;
  top: -3px;
}

.info-bar {
  margin-top: 50px;
  left: 40px;
  max-width: 300px;
  position: relative;
}

.shadow {
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.09);
}
</style>
