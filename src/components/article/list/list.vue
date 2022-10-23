<template>
  <div class="test1">
    <!-- <v-md-editor style="width: 90%;margin-left: 5%;" v-model="article.content" height="450px" /> -->
    <v-md-editor v-model="article.content" mode="preview" default-show-toc height="auto"></v-md-editor>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: {
        content: "",
      },
    };
  },
  methods: {
    set(content) {
      this.text = content;
    },
  },
};
</script>
  
<style>
.test1 p {
  position: absolute;
  left: 50%;
  margin-top: 0;
  transform: translate(-50%, -50%);
}

.test1 img {
  width: auto;
  height: auto;
}

.test1 h1 {
  margin: 0 0;
  position: relative;
  white-space: nowrap;
  border-bottom: 1px solid #eaecef;
  line-height: 50px;
  color: #2e3e4f;
}

.test1 {
  top: 15%;
  width: 900px;
  position: absolute;
  left: 50%;
  margin-top: 50%;
  transform: translate(-50%, -50%);
}

.test {
  position: absolute;
  left: 50%;
  margin-top: 50%;
  transform: translate(-50%, -50%);
}

[data-v-f36f14d2] .markdown-preview h1 {
  top: 15px;
}

/* .test {
  position: absolute;
  left: 50%;
  margin-top: 50%;
  transform: translate(-50%, -50%);
} */

[data-v-f36f14d2] .markdown-preview h1 {
  top: 15px;
}
</style>