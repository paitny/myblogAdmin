<template>
  <div id="data">
    <div>
      <el-row :gutter="12">
        <el-col :span="16">
          <el-card shadow="hover">
            <div style="display: flex" class="data-welcom">
              <div class="data-welcom-left">
                <svg-icon icon="work" class="work-icon"></svg-icon>
              </div>
              <div class="data-welcom-right">
                <p>{{ name.user }}!欢迎回来工程师!</p>
                <span>开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！</span>
              </div>
            </div>

          </el-card>


        </el-col>

        <el-col :span="8" style="text-align: center">
          <Timer></Timer>
        </el-col>
      </el-row>

    </div>
    <div class="data-data">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="hover"> 本站注册数量
            <div class="data-number">
              <svg-icon icon="user" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="user" :time="30"></NumberAdd>
              </div>
            </div>

          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">

            文章数量
            <div class="data-number">
              <svg-icon icon="article" class="data-icon" ></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Article"></NumberAdd>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="data-data">
      <el-row :gutter="12">
        <el-col :span="8">

          <el-card shadow="hover">反馈条数
            <div class="data-number">
              <svg-icon icon="feedback" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Contact" :time="30"></NumberAdd>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover"  style="margin-top: 43px">管理员文章数量
            <div class="data-number" >
              <svg-icon icon="articleAll" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="AdminArticle"></NumberAdd>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" style="margin-top: 43px"> 留言数量
            <div class="data-number">
              <svg-icon icon="LeaveMg" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Msg" :time="30"></NumberAdd>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover"  style="margin-top: 43px">友链条数
            <div class="data-number">
              <svg-icon icon="link" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Link" :time="30"></NumberAdd>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">访问数量
            <div class="data-number">
              <svg-icon icon="visitor" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Visitor" :time="30"></NumberAdd>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" style="margin-top: 43px">视频数量
            <div class="data-number">
              <svg-icon icon="video" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Video" :time="30"></NumberAdd>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" style="margin-top: 43px">音乐数量
            <div class="data-number">
              <svg-icon icon="music-manage" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Music" :time="30"></NumberAdd>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" style="margin-top: 43px">轮播图数量
            <div class="data-number">
              <svg-icon icon="swiper" class="data-icon"></svg-icon>
              <div class="number-max">
                <NumberAdd :value="Swiper" :time="30">{{ Swiper }}</NumberAdd>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover">
            <Calendar></Calendar>

          </el-card>
        </el-col>

      </el-row>
    </div>

  </div>

</template>

<script>
import {getLocal} from "../../utils/storage";
import Timer from "../../components/Timer/index.vue";
import NumberAdd from "../../components/Number/index.vue";
import Calendar from "../../components/Calendar/index.vue"
export default {
  data() {
    return {
      name: getLocal("userInfo"),
      user: 200,
      Msg: 100,
      Music: 100,
      Swiper: 100,
      Article: 100,
      Contact: 100,
      Visitor: 100,
      Video: 100,
      Link: 100,
      AdminArticle:100
    }
  },
  components: {
    Timer, NumberAdd,Calendar

  },
  methods: {
    async getDataNumber() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/data"
      })
      if (data.code) return
          this.user=data.data.userTotal
          this.Msg=data.data.MsgTotal
          this.Music=data.data.MusicTotal
          this.Swiper=data.data.SwiperTotal
          this.Article=data.data.ArticleTotal
          this.Contact=data.data.ContactTotal
          this.Visitor=data.data.VisitorTotal
          this.Video=data.data.VideoTotal
          this.Link=data.data.LinkTotal
          this.AdminArticle=data.data.AdminArticleTotal
    },
  },

  mounted() {

    this.getDataNumber()
  }

}

</script>

<style lang="scss" scoped>
#data {
  .data-welcom {
    display: flex;
    align-items: center;

    p {
      font-size: 1.5rem;
      color: #7d50f4;
      margin-bottom: 10px;
    }

    .work-icon {
      width: 160px;
      height: 100px;
    }

    .data-welcom-right {
      margin-left: 30px;
    }
  }

  .data-data {
    margin-top: 20px;
  }

  .data-number {
    margin-top: 20px;
    display: flex;
    align-items: center;

    .number-max {
      margin-left: 100px;
      font-size: 50px;
    }

    .data-icon {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
