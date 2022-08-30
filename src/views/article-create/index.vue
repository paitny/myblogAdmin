<template>
  <div class="">
    <el-card class="table">
      <el-form :model="queryParams" :rules="rules" ref="formRef">
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="queryParams.title"
            clearable
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章描述" prop="description">
          <el-input
            v-model="queryParams.description"
            clearable
            placeholder="请输入文章描述"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-tabs v-model="activeName">
        <el-tab-pane name="markdown" label="markdown">
          <Markdown
            @success="successFn"
            :isClear="isClear"
            @resetIsClear="resetIsClear"
          ></Markdown>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import Markdown from "./components/Markdown.vue";
import { createArticle } from "../../api/article";

const queryParams = ref({
  title: "",
  description: "",
  content: "",
});
const formRef = ref(null);
const rules = ref({
  title: [{ trigger: "blur", message: "标题是必填项", required: true }],
  description: [{ trigger: "blur", message: "描述是必填项", required: true }],
});

const activeName = ref("markdown");
const isClear = ref(false);

const successFn = (content) => {
  queryParams.value.content = content;
  formRef.value.validate(async (value) => {
    if (value) {
      // 提交到后端新建文章
      const { data } = await createArticle(queryParams.value);
      // console.log(data);
      formRef.value.resetFields();
      isClear.value = true;
      ElMessage.success("提交文章成功");
    } else {
      ElMessage.warning("缺少必填项");
    }
  });
};

const resetIsClear = () => {
  isClear.value = false;
};
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 50% !important;
}
</style>
