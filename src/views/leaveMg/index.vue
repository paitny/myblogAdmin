<template>

  <el-card>
    <h3 style="text-align: center">留言板</h3>
    <el-timeline >
      <el-timeline-item v-for="item in MsgData" :timestamp="fmtDate(item.date)" placement="top">
        <el-card>
          <h3>{{item.author.user}}{{!item.children?"@"+item.author.user:""}}</h3>
          <h4 style="color: #1b82f1">{{ item.text }}</h4>
        </el-card>
      </el-timeline-item>
      <el-timeline-item v-for="item in MsgDataChildren" :timestamp="fmtDate(item.date)" placement="top">
        <el-card>
          <h3>{{item.author.user}}@{{item.replyUser.user}}</h3>
          <h4 style="color: #1b82f1">{{ item.text }}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
export default {
  name: "LatelyVisitor",
  data() {
    return {
      MsgData: [],
      MsgDataChildren:[]
    }
  },
  methods: {
    //转换日期显示
    //ui中自带的方法
    fmtDate(obj) {
      obj = (typeof (obj) == "number") ? obj : Number(obj);
      var date = new Date(obj);
      var y = 1900 + date.getYear();
      var m = "0" + (date.getMonth() + 1);
      var d = "0" + date.getDate();
      return y + "/" + m.substring(m.length - 2, m.length) + "/" + d.substring(d.length - 2, d.length);
    },
    async getMsg() {
      let {data} = await this.$axios({
        method: "GET",
        url: "/get/msg"
      })
      if (data.code) return
      this.MsgData = data.data
     this.MsgData.forEach(({...item})=>{
       this.MsgDataChildren.push(...item.children)
     })
      console.log(this.MsgDataChildren)
    },

  },
  //请求留言

  async created() {
    await this.getMsg()
  }
}
</script>

<style scoped>

</style>















