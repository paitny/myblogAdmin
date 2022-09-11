<template>
  <div id="audioPlayer">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="player"></div>
  </div>
</template>

<script itemscope>
import {getMusic} from "../../api/getData";
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
export default {
  name: "App",
  data() {
    return {
      music: [ // 歌曲列表

      ],
    }
  },
  methods: {

    initAudio(e) {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById('player'),
        fixed:true,
        listFolded: false,
        listMaxHeight: 3,
        lrcType: 3,
        audio: this.music,
        volume:0.4,
        mutex: true,
      });
    },
    async getMic(){
     await getMusic().then(({data})=>{
       const baseURL = process.env.NODE_ENV === "development" ? '/api' : ''
       data.data.forEach((item) => {
         item.cover = baseURL + item.cover
         item.lrc=baseURL + item.lrc
         item.url=baseURL+ item.url
         this.music.push(item);
       });
      })

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
  :deep(.aplayer.aplayer-fixed .aplayer-lrc){
    display: block;
    position: fixed;
    /* bottom: 10px; */
    top: 25px;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 98;
    pointer-events: none;
    text-shadow: -1px -1px 0 #fff;
  }
  :deep(.aplayer .aplayer-lrc p.aplayer-lrc-current ){
      /* 大小 */
      font-size: 16px;
      /* 颜色 */
      color:  #8967FC;
      opacity: 1;
      overflow: visible;
      height: auto !important;
      min-height: 16px;
  }
  :deep(.aplayer .aplayer-lrc p) {
    font-weight: 700;
    font-size:13px;
    color:#1b82f1;
    line-height:16px!important;
    height:16px!important;
    padding:0!important;
    margin:0 !important;
    transition:all .5s ease-out;
    opacity:.4;
    overflow:hidden
  }

  #player {
    width: 310px;
    // 定个宽度

  }
}


</style>
