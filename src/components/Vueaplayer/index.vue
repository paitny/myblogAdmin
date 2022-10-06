<template>
  <div id="audioPlayer">
    <div id="aplayer" ref="playerRef"></div>
  </div>

</template>

<script lang="ts" setup>
// @ts-ignore
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import type {PropType} from '@vue/runtime-core';
import {nextTick, onBeforeUnmount, onMounted, ref} from 'vue'
import {getMusic} from "../../api/getData";

const playerRef = ref()
let instance: APlayer;

// APlayer歌曲信息
class Audio {
  // 音频艺术家
  artist: String;
  // 音频名称
  name: String;
  // 音频链接
  url: String;
  // 音频封面
  cover: String;
  // 歌词
  lrc: String;
   //主题颜色
  theme: String

  constructor(artist: String, name: String, url: String, cover: String, lrc: String, theme: String) {
    this.artist = artist;
    this.name = name;
    this.url = url;
    this.cover = cover;
    this.lrc = lrc;
    this.theme = theme
  }
}

const props = defineProps({
  // 开启吸底模式
  fixed: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 开启迷你模式
  mini: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 音频自动播放
  autoplay: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 主题色
  theme: {
    type: String as PropType<string>,
    default: 'rgba(255,255,255,0.2)'
  },
  // 音频循环播放
  loop: {
    type: String as PropType<'all' | 'one' | 'none'>,
    default: 'all'
  },
  // 音频循环顺序
  order: {
    type: String as PropType<'list' | 'random'>,
    default: 'random'
  },
  // 预加载
  preload: {
    type: String as PropType<'auto' | 'metadata' | 'none'>,
    default: 'auto'
  },
  // 默认音量
  volume: {
    type: Number as PropType<number>,
    default: 0.7,
    validator: (value: Number) => {
      return value >= 0 && value <= 1;
    }
  },
  // 歌曲服务器(netease-网易云, tencent-qq音乐, kugou-酷狗, xiami-小米音乐, baidu-百度音乐)
  songServer: {
    type: String as PropType<'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu'>,
    default: 'netease'
  },
  // 播放类型(song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家)
  songType: {
    type: String as PropType<string>,
    default: 'playlist'
  },
  // 歌的id
  songId: {
    type: String as PropType<string>,
    default: '19723756'
  },
  // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  mutex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 传递歌词方式
  lrcType: {
    type: Number as PropType<number>,
    default: 3
  },
  // 列表是否默认折叠
  listFolded: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 列表最大高度
  listMaxHeight: {
    type: String as PropType<string>,
    default: '160px'
  },
  // 存储播放器设置的 localStorage key
  storageName: {
    type: String as PropType<string>,
    default: 'aplayer-setting'
  }
})

// 初始化
onMounted(() => {
  nextTick(() => {
    getMusic()
        .then((res) => {
          let baseURL = process.env.NODE_ENV === "development" ? '/api' : ''
          let audioList = res.data.data.map((value: { artist: String; name: String; url: String; cover: String, lrc: String; theme: String; }) => new Audio(value.artist, value.name, baseURL + value.url, baseURL + value.cover, baseURL + value.lrc, value.theme));
          instance = new APlayer({
            container: playerRef.value,
            fixed: props.fixed,
            mini: props.mini,
            autoplay: props.autoplay,
            theme: props.theme,
            loop: props.loop,
            order: props.order,
            preload: props.preload,
            volume: props.volume,
            mutex: props.mutex,
            lrcType: props.lrcType,
            listFolded: props.listFolded,
            listMaxHeight: props.listMaxHeight,
            storageName: props.storageName,
            audio: audioList
          })
        })
  })
})
// 销毁
onBeforeUnmount(() => {
  instance.destroy()
})
</script>
<style lang="scss" scoped>
#audioPlayer {
  :deep(.aplayer.aplayer-fixed .aplayer-lrc) {
    display: block;
    position: fixed;
    /* bottom: 10px; */
    top: 25px;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 999;
    pointer-events: none;
    text-shadow: -1px -1px 0 #fff;
  }

  :deep(.aplayer .aplayer-lrc p.aplayer-lrc-current ) {
    /* 大小 */
    font-size: 16px;
    /* 颜色 */
    color: #8967FC;
    opacity: 1;
    overflow: visible;
    height: auto !important;
    min-height: 16px;
  }

  :deep(.aplayer .aplayer-lrc p) {
    font-weight: 700;
    font-size: 13px;
    color: #1b82f1;
    line-height: 16px !important;
    height: 16px !important;
    padding: 0 !important;
    margin: 0 !important;
    transition: all .5s ease-out;
    opacity: .4;
    overflow: hidden
  }


  #player {
    width: 310px;
    // 定个宽度
    z-index: 9999 !important;
  }
}

</style>
