<template>
  <div id="audioPlayer">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="player"></div>
  </div>
</template>

<script itemscope>
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
export default {
  name: "App",
  data() {
    return {
      music: [ // 歌曲列表
        {
          artist: "",
          cover: "",
          lrc: "",
          name: "",
          theme: "",
          url: "",

        },
      ],
    }
  },
  methods: {

    initAudio(e) {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        fixed: true,
        container: document.getElementById('player'),
        listFolded: false,
        listMaxHeight: 90,
        lrcType: 3,
        audio: this.music,
        volume:0.4
      });
    },

    async getMic(){

      let{data}=await  this.$axios({
        method:"GET",
        url:"/get/music"
      })
      if(data.code)return
      this.music=data.data
    }
  },
  async created() {
    await this.getMic()
    this.initAudio();
  },
  mounted() {
    // 初始化播放器


  }

}
</script>

<style lang="scss" scoped>
#audioPlayer {
position: absolute;
  z-index: 9999;
  #player {
    width: 310px;
    // 定个宽度
  }
}
</style>
