<template>
  <div class="test1">
    <div style="height:300px;font-size: 100px;">{{ article.title }}</div>
    <v-md-preview height="auto" :text="article.content"></v-md-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: this.$route.params.article.title,
        content: this.$route.params.article.content,
      },
    };
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

[data-v-f36f14d2] .markdown-preview h1 {
  top: 15px;
}
</style>