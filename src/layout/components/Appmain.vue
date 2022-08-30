<!-- 主内容区域  -->
<template>

  <div class="app-main">
      <router-view class="wrapper"/>
  </div>

</template>
<script setup>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {watch,onBeforeMount} from "vue";
const store=useStore()
const route=useRoute()
watch(route,(to,from)=>{
  const tag=to.matched[to.matched.length-1]
  store.dispatch("app/addTagsViewList",tag)
},
    {
      immediate:true
    }
)
</script>
<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
  background: #EFF1F4;
  .wrapper {
    position: relative;
    margin: 105px 20px 0px;
    box-sizing: border-box;
  }
}
</style>
