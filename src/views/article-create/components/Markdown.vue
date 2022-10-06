<template>
  <div class="markdown-container">
    <div id="markdown-box" ref="boxRef"></div>
    <div class="bottom">
      <el-button type="primary" @click="submitFn">提交</el-button>
    </div>
  </div>
</template>
<script setup>
// npm i @toast-ui/editor

import MKEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";

import { nextTick, onMounted, ref, watch,defineProps } from "vue";
import { ElMessage } from "element-plus";
const emit = defineEmits(["success", "resetIsClear"]);
const props = defineProps(["isClear"]);
const boxRef = ref(null);
let mkEditor;
const initEditor = () => {
  mkEditor = new MKEditor({
    el: boxRef.value,
    height: "500px",
    previewStyle: "vertical",
    language: "zh-CN",
  });

  mkEditor.getMarkdown();
};

onMounted(async () => {
  await nextTick();
  initEditor();
});

const submitFn = () => {
  const htmlStr = mkEditor.getHTML();
  if (htmlStr === "<p><br></p>") {
    ElMessage.warning("content内容不能为空");
  } else {
    // 有值
    emit("success", htmlStr);
  }
};

watch(
  () => props.isClear,
  (newIsClear) => {
    if (newIsClear) {
      mkEditor.reset();
      emit("resetIsClear");
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
