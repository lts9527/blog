<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-data-table
    :headers="tableHeaders"
    :items="desserts"
    item-key="name"
    show-select
    show-expand
    class="elevation-1"
    v-model="input"
    :item-selected="check"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title @click="testmessage">分类管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogeditem" max-width="500px" v-on:click:outside="close">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mr-8" dark v-bind="attrs" v-on="on">添加分类</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col md="7">
                    <v-text-field
                      :rules="rules"
                      :error-messages="errormsg"
                      v-model="editedItem.name"
                      label="分类名称"
                    ></v-text-field>
                  </v-col>
                  <v-col md="7">
                    <v-text-field
                      :rules="rules"
                      :error-messages="errormsgchildren"
                      v-model="editedItem.tempchildren"
                      label="子类名"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-6">
                    <v-icon @click="addChildren(editedItem.children)">mdi-plus</v-icon>
                  </v-col>
                  <v-col md="7">
                    <span>子类列表</span>
                  </v-col>
                </v-row>
                <v-list v-for="v in editedItem.children">
                  <v-list-item-title>
                    {{ v.name }}
                    <v-icon
                      class="ms-16"
                      style="position: absolute;left: 150px"
                      @click="delChildren(v)"
                    >mdi-minus</v-icon>
                  </v-list-item-title>
                </v-list>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              </v-spacer>
              <v-btn color="blue darken-1" :loading="loading" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogchildrenedited" max-width="500px" v-on:click:outside="close">
          <v-card>
            <v-card-title>
              <span class="headline">修改子类名称</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tempchildren" label="子分类名称"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSub">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveSub">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog overlay-opacity="0.2" v-model="dialogdelete" max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="error" v-bind="attrs" v-on="on" :disabled="disabled">删除分类</v-btn>
          </template>
          <v-card>
            <v-card-text class="dialog-text pt-7 pl-14">你确定要批量删除{{input.length}}个分类吗</v-card-text>
            <v-card-actions>
              <v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="deletBatchItem(input);dialogdelete = false"
                >确定</v-btn>
              </v-spacer>
              <v-btn text @click="dialogdelete = false">取消</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td style="padding: 0;" :colspan="headers.length">
        <v-data-table
          :headers="tableHeadersSub"
          :items="item.children"
          item-key="name"
          class="elevation-0"
          hide-default-footer
        >
          <template v-slot:item.actions="{ item: subitem}">
            <div>
              <v-icon small class="mr-2" @click="editSubItem(item, subitem)">mdi-pencil</v-icon>
              <v-icon small @click="deleteSubItem(item, subitem)">mdi-delete</v-icon>
            </div>
          </template>
        </v-data-table>
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errormsg: "",
      errormsgchildren: "",
      disabled: true,
      editedIndex: -1,
      editedIndexSub: -1,
      input: [],
      dialogeditem: false,
      dialogdelete: false,
      dialogchildrenedited: false,
      loading: false,
      rules: [(value) => (value || "").length <= 20 || "Max 20 characters"],
      tableHeadersSub: [
        {
          text: "子类名称",
          align: "start",
          sortable: false,
          value: "name",
        },
        { sortable: false },
        { sortable: false },
        { sortable: false },
        { text: "", sortable: false, align: "end", value: "actions" },
      ],
      editedItem: {
        name: "",
        artNums: 0,
        sonNums: 0,
        tempchildren: "",
        children: [],
      },
      defaultItem: {
        name: "",
        artNums: 0,
        sonNums: 0,
        tempchildren: "",
        children: [],
      },
      tableHeaders: [
        {
          text: "分类名称",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "文章数", value: "artNums" },
        { text: "子分类", value: "sonNums" },
        { text: "Actions", sortable: false, value: "actions" },
        { text: "", value: "data-table-expand" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          children: [{ name: "1-1" }, { name: "1-2" }, { name: "1-3" }],
          artNums: 159,
          sonNums: 6.0,
        },
        {
          name: "Ice cream sandwich",
          children: [{ name: "2-1" }, { name: "2-2" }],
          artNums: 237,
          sonNums: 9.0,
        },
        {
          name: "Eclair",
          children: [{ name: "3-1" }, { name: "3-2" }, { name: "3-3" }],
          artNums: 262,
          sonNums: 16.0,
        },
        {
          name: "Cupcake",
          children: [{ name: "4-1" }],
          artNums: 305,
          sonNums: 3.7,
        },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "添加分类" : "修改分类";
    },
    check() {
      if (this.input.length > 0) {
        this.disabled = false;
        return;
      }
      this.disabled = true;
    },
  },
  created() {
    mapActions("categoryModule", {
      categoryList: "list",
    });
    // 请求api
    this.categoryList()
      .then((list) => {
        this.desserts = list;
      })
      .catch((err) => {
        console.log("get article list err:", err.response.data.message);
      });
  },
  methods: {
    ...mapActions("categoryModule", {
      categoryCreate: "create",
      categoryList: "list",
      categoryDelete: "del",
    }),

    async testmessage() {
      // this.$notify({
      //   content: "Hello World", // 消息内容
      //   btn: "关闭", // 关闭按钮内容
      // });
    },

    create(list) {
      this.categoryCreate(list)
        .then((res) => {
          if (res.code === 1) {
            this.close();
            this.desserts.push(this.editedItem);
            this.$dialog.message.success(res.message, {
              position: "top-right",
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          this.close();
          this.$dialog.message.error(err.response.data.message, {
            position: "top-right",
            timeout: 2000,
          });
        });
    },

    delete(ID, type, index, indexSub) {
      const id = [];
      id.push(ID);
      this.categoryDelete({ id, type })
        .then((res) => {
          if (res.code === 1) {
            if (type === 1) {
              this.desserts.splice(index, 1);
            } else {
              this.desserts[index].children.splice(indexSub, 1);
            }
            this.$dialog.message.success(res.message, {
              position: "top-right",
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          this.$dialog.message.error(err.response.data.message, {
            position: "top-right",
            timeout: 2000,
          });
        });
    },

    editItem(item) {
      // this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = JSON.parse(
        JSON.stringify(this.desserts[this.editedIndex])
      );
      this.dialogeditem = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      // confirm("Are you sure you want to delete this item?") &&
      //   this.desserts.splice(index, 1);
      confirm("Are you sure you want to delete this item?") &&
        this.delete(item.id, 1, index);
    },

    deletBatchItem(item) {
      for (let i in item) {
        const index = this.desserts.indexOf(item[i]);
        this.desserts.splice(index, 1);
        this.input = [];
      }
    },

    editSubItem(item, subitem) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedIndexSub =
        this.desserts[this.editedIndex].children.indexOf(subitem);
      // this.editedItem.tempchildren =
      //   this.desserts[this.editedIndex].children[this.editedIndexSub].name;
      this.editedItem = Object.assign({}, item);
      this.editedItem.tempchildren = subitem.name;
      this.dialogchildrenedited = true;
    },

    deleteSubItem(item, subitem) {
      const index = this.desserts.indexOf(item);
      const indexSub = this.desserts[index].children.indexOf(subitem);
      const id = this.desserts[index].children[indexSub].id;
      // confirm("Are you sure you want to delete this item?") &&
      //   this.desserts[index].children.splice(indexSub, 1);
      confirm("Are you sure you want to delete this item?") &&
        this.delete(id, 2, index, indexSub);
    },

    close() {
      this.dialogeditem = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.loading = false;
      });
    },

    // async remove() {
    //   this.loading = true;
    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    //   this.loading = false;
    // },

    save() {
      // this.loading = true;
      if (this.editedItem.name.length === 0) {
        this.errormsg = "不能为空";
        return;
      }
      if (this.editedItem.name.length > 20) {
        return;
      }
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        const list = {
          list: [
            {
              name: this.editedItem.name,
              children: [],
            },
          ],
        };
        this.editedItem.children.forEach(function (item, index, self) {
          list.list[0].children.push(item.name);
        });
        console.log(JSON.stringify(list));
        this.create(list);
        // this.desserts.push(this.editedItem);
      }
      // if (!this.loading) {
      //   this.close();
      // }
      this.close();

      // await new Promise((resolve) => setTimeout(resolve, 3000));
    },

    closeSub() {
      this.dialogchildrenedited = false;
    },

    saveSub() {
      if (this.editedIndexSub > -1) {
        this.editedItem.children[this.editedIndexSub].name =
          this.editedItem.tempchildren;
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.closeSub();
    },

    addChildren(subitem) {
      if (this.editedItem.tempchildren.length === 0) {
        console.log(1);
        return;
      }
      if (this.editedItem.tempchildren.length > 20) {
        console.log(2);
        return;
      }
      if (this.editedItem.children != undefined) {
        for (let i = 0, len = this.editedItem.children.length; i < len; i++) {
          if (
            this.editedItem.tempchildren === this.editedItem.children[i].name
          ) {
            this.errormsgchildren = "名称已存在";
            return;
          }
        }
        this.editedItem.children = this.editedItem.children.concat({
          name: this.editedItem.tempchildren,
        });
        // this.editedItem.children.push({
        //   name: this.editedItem.tempchildren,
        // });
      } else {
        this.editedItem.children = [];
        this.editedItem.children.push({
          name: this.editedItem.tempchildren,
        });
      }
      this.errormsgchildren = "";
      this.editedItem.tempchildren = "";
    },

    delChildren(v) {
      this.editedItem.children.splice(this.editedItem.children.indexOf(v), 1);
    },
  },
};
</script>

<style>
.v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none;
}
</style>