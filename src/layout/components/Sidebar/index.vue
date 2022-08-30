<template>
  <div id="guide-sidebar">
    <!-- 头像区域 -->
    <div class="logo-container">
      <el-avatar :size="44" :src="avatarSrc" shape="square" />
      <h1 class="logo-title" v-show="$store.getters.sidebarOpened">{{$store.getters.userInfo.user}}</h1>
    </div>
    <SidebarMenu></SidebarMenu>
  </div>
</template>
<script setup>
import SidebarMenu from "./SidebarMenu.vue";
import {getAvatar} from "../../../hooks/getAvatar";
const  {avatarSrc} = getAvatar()
</script>
<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + "px";
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
