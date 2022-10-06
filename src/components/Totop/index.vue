<template>
  <!-- 右侧上滑小图片 -->
  <div  v-if="gotoTop" :class="gotoTop?'toTop hidden':'toTop goTop hidden'" @click="toTopfun">
    <img src="'static/img/scroll.png'" alt="">
  </div>
  <div v-else :class="gotoTop?'toTophui hidden':'toTophui goTophui hidden'" @click="toTopfun">
    <img src='static/img/scroll.png' alt="">
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      gotoTop:false,//返回顶部
      going:false,//是否正在执行上滑动作
    }
  },
  methods:{
    toTopfun(){
      this.gotoTop = false;
      this.going = true;
      var timer = setInterval(function(){
        //获取滚动条距离顶部高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 7);
        document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          that.going = false;
          clearInterval(timer);
          timer = null;
        };
      },30);
    },
  },
  created() {

  }
}
</script>

<style scoped>

</style>
