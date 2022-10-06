<template>
  <el-card>

    <div id="ArticleManger">
      <el-table
          :data="musicData"
          border
          style="width: 100%"
      >
        <el-table-column
            prop="date"
            label="发布日期"
            :key="musicData.date"
            :formatter="dateFormat"
            align="center"
        >
        </el-table-column>
        <el-table-column label="歌名" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="演唱者" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.artist"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="主题颜色" align="center">
          <template #default="scope">
            <el-progress
                :percentage="100"
                :indeterminate="true"
                :duration="2"
                :color="scope.row.theme"
            />
            <el-input v-model="scope.row.theme"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="更新音乐" align="center">
          <template #default="scope">
            <el-upload
                class="upload-demo"
                :action="`${baseURL}/adminServer/music/musicAdd`"
                :on-success="function(res){music_upload_success(res,scope.row._id,scope.row.url)}"
                :before-upload="music_before_upload"
                :limit="1"
                :with-credentials="true"
                :show-file-list="false"
            >
              <el-button size="large"  color="#626aef">更新音乐</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="重新上传封面图" align="center" width="350px">
          <template #default="scope">
            <div class="cover">
              <el-image
                  style="width: 200px; height: 150px;"
                  :src="`${baseURL}${scope.row.cover}`"
                  :preview-src-list="[`${baseURL}${scope.row.cover}`]"
                  preview-teleported="true"
                  previewTeleported
              >
              </el-image>
              <el-upload
                  class="upload-demo"
                  :action="`${baseURL}/adminServer/music/cover`"
                  :on-success="function(res){cover_upload_success(res,scope.row._id,scope.row.cover)}"
                  :before-upload="cover_before_upload"
                  :limit="1"
                  :with-credentials="true"
                  :show-file-list="false"

              >
                <el-button size="large" type="warning" style="margin: auto 0">重传封面</el-button>
              </el-upload>
            </div>

          </template>
        </el-table-column>
        <el-table-column label="更新歌词" align="center">
          <template #default="scope">
            <el-upload
                class="upload-demo"
                :action="`${baseURL}/adminServer/music/lrc`"
                :on-success="function(res){lrc_upload_success(res,scope.row._id,scope.row.lrc)}"
                :before-upload="lrc_before_upload"
                :limit="1"
                :with-credentials="true"
                :show-file-list="false"
            >
              <el-button size="large" color="#EC7BB0" circle><svg-icon icon="lrc" style="width: 50px;height: 50px"></svg-icon></el-button>
            </el-upload>
          </template>
        </el-table-column>


        <el-table-column
            label="操作"
            align="center"
        >
          <template #default="scope">
            <div class="buttonSubmit">
              <el-button
                  type="primary"
                  @click="update(scope.row._id,{name:scope.row.name,artist:scope.row.artist,theme:scope.row.theme})"
              >
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button
                  type="danger"
                  @click="deleteMusic(scope.row._id,scope.row.url,scope.row.cover,scope.row.lrc)"
                  circle
              > <el-icon>
                <Delete />
              </el-icon></el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
        background
        layout="sizes,prev,pager,next,jumper,->,slot, total"
        :total="total"
        v-model:page-size="query.perPage"
        v-model:current-page="query.page"
        @current-change="getMusic"
        @size-change="getMusic"
        :page-sizes="[2,4,5,10,20,30]"

    />
  </el-card>

</template>

<script>
import moment from "moment";

export default {
  name: "ArticleManger",
  data() {
    return {
      musicData: [],
      total: 0,
      display: true,
      query:
          {
            page: 1,
            perPage: 4
          }
    }
  },
  methods: {

//上传时间
    dateFormat: function (row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }

      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },

    //请求所有音乐数据
    async getMusic() {
      let {data} = await this.$axios({
        method: "get",
        url: "/get/music",
        params: this.query
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.musicData = data.data
      this.total = data.total
      if (this.total == 0) {
        this.display = false
      }

    },
    //md上传之前的回调
    lrc_before_upload(file) {
      let ifMic = /\.lrc$/.test(file.name)
      if (!ifMic) {
        this.$message.error("只能上传.lrc文件")
      }
      return ifMic
    },
    //md上传成功后的回调
    lrc_upload_success(res, id,musicUrl) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }

      //成功
      this.update(id, {lrc: res.url},musicUrl)
    },


    //更新文章
    async update(id, doc,musicUrl) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/music/update",
        data: {id, doc,musicUrl}
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.$message.success("更新成功")
      await this.getMusic()
    },

    //md上传之前的回调
    music_before_upload(file) {
      let ifMic = /\.(mp3|m4a)$/.test(file.name)
      if (!ifMic) {
        this.$message.error("请上传音乐文件")
      }
      return ifMic
    },
    //md上传成功后的回调
    music_upload_success(res, id,musicUrl) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }

      //成功
      this.update(id, {url: res.url},musicUrl)
    },

    //封面图上传之前的回调
    cover_before_upload(file) {
      const isJPG = /^image\/(jpeg|png)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M
    },
    //封面图上传成功后的回调
    cover_upload_success(res, id,musicUrl) {
      //失败
      if (res.code) {
        return this.$message.error(res.msg)
      }

      //成功
      this.update(id, {cover: res.url},musicUrl)
    },

    //删除音乐
    async deleteMusic(id,mcUrl,mcCover,mcLrc) {
      let {data} = await this.$axios({
        method: "DELETE",
        url: "/adminServer/music/delete",
        data: {id,mcUrl,mcCover,mcLrc}
      })

      if (data.code) {
        return this.$message.error(data.msg)
      }

      this.$message.success("删除完成")
      await this.getMusic()
    }
  },

  created() {
   this.getMusic()
  }
}
</script>

<style lang="scss" scoped>
#ArticleManger {
  .cover {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search {
    margin-bottom: 10px;
  }

  .buttonSubmit {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
}
</style>














