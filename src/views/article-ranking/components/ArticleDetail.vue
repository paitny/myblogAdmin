<template>
  <div class="article-detail">
    <el-dialog v-model="isShow">
      <template #header> 文章详情 </template>
      <div class="content">
        <el-scrollbar height="400px">
          <p v-html="content"></p>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref,defineProps } from "vue";

defineProps(["content"]);

const isShow = ref(false);

const open = () => {
  isShow.value = true;
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/vue.scss";
</style>
