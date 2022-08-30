<template>
  <el-sub-menu v-if="route.children.length" :index="route.path">
    <template #title>
      <svg-icon :icon="route.icon" class="el-icon"></svg-icon>
      <span> {{ route.title }}</span>
    </template>
    <el-menu-item
        v-for="child in route.children"
        :key="child.path"
        :index="child.path"
    >
      <svg-icon :icon="child.icon" class="el-icon"></svg-icon>
      {{ child.title }}
    </el-menu-item>
  </el-sub-menu>

<!--  菜单项-->
  <el-menu-item v-else :index="route.path">
    <svg-icon :icon="route.icon" class="el-icon"></svg-icon>
    <span>{{ route.title }}</span>
  </el-menu-item>
</template>

<script setup>
const props = defineProps(['route'])
</script>

<style lang="scss" scoped>
span {
  margin-left: 10px;
}
</style>
