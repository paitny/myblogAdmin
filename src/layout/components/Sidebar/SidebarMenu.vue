<template>
  <el-menu
      :unique-opened=true
      router
      text-color="#ffff"
      background-color="#001529"
      active-text-color="#ffd04b"
      :default-active="activeMenu"
      :collapse="isCollapse"
  >
    <SidebarItem
        v-for="route in menuRoute"
        :route="route"
        :key="route.path"></SidebarItem>
  </el-menu>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import SidebarItem from "./SidebarItem.vue";
import {useRoute} from "vue-router"

const store = useStore()
const menuRoute = computed(() => store.getters.menuRoute)
const route=useRoute()
const activeMenu=computed(()=>route.path)
const isCollapse=computed(()=>!store.getters.sidebarOpened)
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0 !important;
}

</style>
