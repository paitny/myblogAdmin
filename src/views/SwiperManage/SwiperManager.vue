<template>
  <el-card>

    <div class="swiperExhibition">
      <Swiper :MangerSwiper="MangerSwiper"></Swiper>
    </div>
    <el-table
        :data="MangerSwiper"
        border
    >
      <el-table-column
          prop="date"
          label="发布日期"
          :key="MangerSwiper.date"
          :formatter="dateFormat"
          align="center"
      >

      </el-table-column>
      <el-table-column label="重新上传轮播图"
                       min-width="300"
                       align="center"
      >
        <template #default="scope">
          <div class="swiper">
            <el-image
                style="width: 450px; height: 250px"
                :src="`${baseURL}${scope.row.swiper}`"
                :preview-src-list="[`${baseURL}${scope.row.swiper}`]"
                preview-teleported="true"
                previewTeleported
            >
            </el-image>
            <el-upload
                class="upload-demo"
                drag
                :action="`${baseURL}/adminServer/swiper/swiperAdd`"
                :on-change="swiper_before_upload"
                :limit="1"
                ref="swiperForm"
                :on-success="function(res){swiper_upload_success(res,scope.row._id,scope.row.swiper)}"
                :with-credentials="true"
            >
              <i class="el-icon-upload">
                <el-icon class="el-icon--upload">
                  <upload-filled/>
                </el-icon>
              </i>
              <div class="el-upload__text">将.jpj或者png文件拖到此处，或<em>点击上传</em></div>

            </el-upload>
          </div>

        </template>
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          align="center"
      >
        <template #default="scope">
          <el-button
              style="width: 50px;height: 50px"
              type="danger"
              @click="deleteSwiper(scope.row._id,scope.row.swiper)"
              size="large"
              circle
          >
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script>
import moment from "moment";
import Swiper from "../../components/Swiper/index.vue";


export default {
  name: "SwiperManger",
  data() {
    return {
      MangerSwiper: []
    }
  },
  components: {
    Swiper
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
    //获取轮播图数据
    async getMangerSwiper() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/swiper"
      })
      this.MangerSwiper = data.data
    },
    async swiperUpdate(id, doc,swUrl) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/swiper/update",
        data: {id, doc,swUrl}
      })
      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.$message.success("更新成功")
      await this.getMangerSwiper()
    }
    ,
    //上传之前钩子
    swiper_before_upload(file, fileList) {
      if (/^(\s|\S)+(jpg|png|JPG|PNG)+$/.test(file.name)) {
      } else {
        this.$message.error("只能上传.png 或. jpj文件")
        fileList.pop()
      }
    },
    //轮播图上传成功钩子
    swiper_upload_success(res, id,swUrl) {
      if (res.code) {
        return this.$message.error(res.msg)
      }
      this.swiperUpdate(id, {swiper: res.url},swUrl)
    }
    ,
    //删除轮播图
    async deleteSwiper(id,swUrl) {
      let {data} = await this.$axios({
        method: "POST",
        url: "/adminServer/swiper/delete",
        data: {id,swUrl}
      })
      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.$message.success("删除成功")
      await this.getMangerSwiper()
    }
  },

  created() {
    this.getMangerSwiper()
  }
}
</script>

<style lang="scss" scoped>
.swiperExhibition {
  width: 60%;
  margin: 0 auto;
}

.swiper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  :deep(.el-upload-dragger) {
    width: 360px;

  }
}
</style>
