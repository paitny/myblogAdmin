<template>
  <el-card>
    <div id="lateUser">
      <h2>父留言</h2>
      <el-table
          :data="MsgData"
          border
          style="width: 100%"

      >
        <el-table-column
            prop="date"
            label="留言时间"
            :key="MsgData.date"
            :formatter="dateFormat"
            width="200px"
            align="center"
        >

        </el-table-column>
        <el-table-column
            prop="author.photo"
            label="头像"
            align="center"
        >
          <template #default="scope">
            <div class="demo-image__preview" >
              <el-image
                  style="width: 150px; height:100px"
                  :src="`${baseURL}${scope.row.author.photo}`"
                  :preview-src-list="[`${baseURL}${scope.row.author.photo}`]"
                  :initial-index="4"
                  fit="cover"
                  preview-teleported="true"
                  previewTeleported
              >
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="author.user"
            label="留言用户"
            align="center"
        >

        </el-table-column>

        <el-table-column
            prop="text"
            label="留言内容"
            align="center"
        >

        </el-table-column>

        <el-table-column
            prop="likes.length"
            label="点赞个数"
            align="center"
        >

        </el-table-column>


        <el-table-column
            label="是否管理员登录"
            align="center"
            prop="author.admin"
        >
        </el-table-column>


      </el-table>

    </div>

      <div class="leaveChild">
        <h2>子留言</h2>
        <el-table
            :data="MsgDataChildren"
            border
            style="width: 100%"

        >
          <el-table-column
              prop="date"
              label="留言时间"
              :key="MsgDataChildren.date"
              :formatter="dateFormat"
              width="200px"
              align="center"
          >

          </el-table-column>
          <el-table-column
              prop="author.photo"
              label="头像"
              align="center"
          >
            <template #default="scope">
              <div class="demo-image__preview" >
                <el-image
                    style="width: 150px; height:100px"
                    :src="`${baseURL}${scope.row.author.photo}`"
                    :preview-src-list="[`${baseURL}${scope.row.author.photo}`]"
                    :initial-index="4"
                    fit="cover"
                    preview-teleported="true"
                    previewTeleported
                >
                </el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="author.user"
              label="留言用户"
              align="center"
          >

          </el-table-column>
          <el-table-column
              prop="replyUser.user"
              label="回复用户"
              align="center"
          >

          </el-table-column>
          <el-table-column
              prop="text"
              label="留言内容"
              align="center"
          >

          </el-table-column>

          <el-table-column
              prop="likes.length"
              label="点赞个数"
              align="center"
          >

          </el-table-column>


          <el-table-column
              label="是否管理员登录"
              align="center"
              prop="author.admin"
          >
          </el-table-column>


        </el-table>

      </div>
  </el-card>

</template>

<script>
import moment from 'moment'

export default {
  name: "LatelyVisitor",
  data() {
    return {
      MsgData : [],
      MsgDataChildren:[]
    }
  },
  methods: {
    //转换日期显示
    //ui中自带的方法
    dateFormat: function (row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    async getMsg(){
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/msg"
      })
      if (data.code)return
      this.MsgData=data.data
      this.MsgData.forEach(({...item})=>{
        this.MsgDataChildren.push(...item.children)
      })

    }
  },
  //请求留言

  async created() {
   await this.getMsg()
   }
}
</script>

<style scoped>
#lateUser{
  text-align: center;
}
.leaveChild{
  text-align: center;
  margin-top:20px ;
}
</style>















