<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="功能介绍" name="first">
        <el-collapse v-model="activeCollapse" accordion>
          <el-collapse-item
            :title="item.title"
            v-for="item in featureData"
            :key="item.id"
            :name="item.id"
          >
            <div v-html="item.content"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="作者" name="second">
        <div class="author-container">
          <div class="header">
            <img
              :src="
                `${baseURL}${$store.getters.userInfo.photo}` || getImg('default.jpg')
              "
              class="avatar"
            />
            <div class="header-desc">
              <h3>王亚鹏</h3>
              <span>一名00后程序猿</span>
            </div>
          </div>
          <div class="info">
            三年前进入程序猿领域,钻研技术,现已精通 :
            高级计算机的开机与关机,传统办公软件excel甚至word等高端软件的安装与卸载,在各大主流后端语言如python,java中输出hello
            world,意外发现前端,从此爱上了,并学废了前端至高要义,ctrl-a ctrl-v
            编程手法, 未来还将研究更多与前端有关的高端技术! 活到老 学到老!
          </div>
        </div></el-tab-pane
      >
    </el-tabs>
  </el-card>
</template>
<script setup>
import { ref,defineProps} from "vue";
import {getImg} from "../../../utils/pub-use";

defineProps({
  featureData: {
    type: Array,
  },
});
const activeName = ref("first");
const activeCollapse = ref(0);
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}
.el-collapse-item {
  :deep(a) {
    color: #409eff;
    margin: 0 4px;
  }
}
.author-container {
  .header {
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
