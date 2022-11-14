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
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- <v-dialog v-model="dialogadd" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mr-8" dark v-bind="attrs" v-on="on">添加分类</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">添加分类</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col md="7">
                    <v-text-field
                      :rules="rules"
                      :error-messages="errormsg"
                      v-model="addItem.name"
                      label="分类名称"
                    ></v-text-field>
                  </v-col>
                  <v-col md="7">
                    <v-text-field
                      :rules="rules"
                      :error-messages="errormsgchildren"
                      v-model="addItem.children"
                      label="子类名"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-6">
                    <v-icon @click="addChildren(addItem.children)">mdi-plus</v-icon>
                  </v-col>
                  <v-col md="7">
                    <span>子类列表</span>
                  </v-col>
                </v-row>
                <v-list v-for="v in tempchildren">
                  <v-list-item-title>
                    {{ v }}
                    <v-icon class="ms-6" @click="delChildren(addItem.children)">mdi-minus</v-icon>
                  </v-list-item-title>
                </v-list>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              </v-spacer>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>-->

        <v-dialog v-model="dialogedit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">修改分类</span>
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
                    <v-icon @click="addChildren()">mdi-plus</v-icon>
                  </v-col>
                  <v-col md="7">
                    <span>子类列表</span>
                  </v-col>
                </v-row>
                <v-list v-for="v in editedItem.children">
                  <v-list-item-title>
                    {{ v.name }}
                    <v-icon class="ms-6" @click="delChildren()">mdi-minus</v-icon>
                  </v-list-item-title>
                </v-list>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              </v-spacer>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- 
        <v-dialog v-model="dialogsubadd" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">test</span>
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
              <v-btn color="blue darken-1" text @click="saveSub()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>-->

        <!-- <v-dialog overlay-opacity="0.2" v-model="dialogdelete" max-width="290">
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
        </v-dialog>-->
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td style="padding: 0;font-size: 0.375rem" :colspan="headers.length">
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
      rules: [(value) => (value || "").length <= 10 || "Max 10 characters"],
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
      disabled: true,
      editedIndex: -1,
      editedIndexSub: -1,
      editedItem: {
        name: "",
        artNums: 0,
        sonNums: 0,
        carbs: 0,
        protein: 0,
        tempchildren: "",
        children: [
          {
            name: "",
          },
        ],
      },
      // addItem: {
      //   name: "",
      //   children: "",
      // },
      editedItemSub: [],
      input: [],
      dialogdelete: false,
      dialogadd: false,
      dialogsubadd: false,
      dialogedit: false,
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
    // mapActions("categoryModule", {
    //   categoryList: "list",
    // });
    // 请求api
    this.categoryList()
      .then((list) => {
        console.log("list", list);
        this.desserts = list;
      })
      .catch((err) => {
        console.log("get article list err:", err.response.data.message);
      });
  },
  methods: {
    ...mapActions("categoryModule", {
      // categoryCreate: "create",
      categoryList: "list",
    }),
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogedit = true;
    },
    deleteItem(item) {
      console.log("item", item);
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    deletBatchItem(item) {
      for (let i in item) {
        const index = this.desserts.indexOf(item[i]);
        this.desserts.splice(index, 1);
        this.input = [];
      }
    },

    editSubItem(item, subitem) {
      console.log("item", item);
      console.log("subitem", subitem);
      return;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedIndexSub =
        this.desserts[this.editedIndex].children.indexOf(subitem);
      this.editedItem.tempchildren =
        this.desserts[this.editedIndex].children[this.editedIndexSub].name;
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialogsubadd = true;
    },

    deleteSubItem(item, subitem) {
      const index = this.desserts.indexOf(item);
      const indexSub = this.desserts[index].children.indexOf(subitem);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts[index].children.splice(indexSub, 1);
    },

    close() {
      this.dialogedit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      console.log("desserts", this.desserts);
      console.log("editedItem", this.editedItem);
      return;
      if (this.editedItem.name.length === 0) {
        this.errormsg = "不能为空";
        return;
      }
      if (this.editedItem.name.length > 10) {
        return;
      }
      const item = {
        name: this.editedItem.name,
        artNums: 0,
        sonNums: 0,
        children: [],
      };
      this.editedItem.tempchildren.forEach((v) => {
        item.children.push({
          name: v,
        });
      });
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        // this.desserts.push(this.editedItem);
        this.desserts.push(item);
      }
      this.close();
    },

    closeSub() {
      this.dialogsubadd = false;
    },

    saveSub() {
      // if (this.editedIndexSub > -1) {
      //   this.editedItem.children[this.editedIndexSub].name =
      //     this.editedItem.tempchildren;
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } else {
      //   this.desserts.push(this.editedItem);
      // }
      // this.closeSub();
    },
    inputsub() {
      return this.inputsubs;
    },
    alt() {
      alert(1);
    },
    addChildren() {
      if (this.editedItem.tempchildren.length === 0) {
        return;
      }
      if (this.editedItem.tempchildren.length > 10) {
        return;
      }
      for (let i = 0, len = this.editedItem.children.length; i < len; i++) {
        if (this.editedItem.tempchildren === this.editedItem.children[i].name) {
          this.errormsgchildren = "名称已存在";
          return;
        }
      }
      this.editedItem.children.push({
        name: this.editedItem.tempchildren,
      });
      console.log("   this.editedItem", this.editedItem);
      console.log("   this.desserts.children", this.desserts);
      this.errormsgchildren = "";
      this.editedItem.tempchildren = "";
    },
    delChildren() {
      this.editedItem.tempchildren.splice(this.editedItem.tempchildren, 1);
    },
    // blur() {
    //   this.errormsgchildren = "";
    //   this.addItem.name = "";
    // },
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