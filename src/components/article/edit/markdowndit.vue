<template>
  <div class="test">
    <!-- <div class="markdown">
      <MarkdownPro />
    </div>-->
    <MarkdownPro theme="oneDark" />
  </div>
</template>

<script>
import { MarkdownPro } from "vue-meditor";

export default {
  name: "markdown",
  components: {
    MarkdownPro,
  },
};
</script>

<style>
.test {
  width: 90%;
  height: auto;
  position: absolute;
  left: 50%;
  margin-top: 30%;
  transform: translate(-50%, -50%);
}
</style>