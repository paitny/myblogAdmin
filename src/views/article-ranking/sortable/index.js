// npm i sortablejs 

import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { ref } from 'vue'
import { reviseRank } from '@/api/article'

export const tableRef = ref(null)
export const initSortable = (articleList, cb) => {
  // 配置拖拽的table tbody元素 
  let el = tableRef.value.$el.querySelector('.el-table__body tbody')
  // 初始化sortable

  Sortable.create(el, {
    // 配置拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束后的回调

    async onEnd(event) {
      // 拖拽元素新排名 和 旧排名 
      const { newIndex, oldIndex } = event
      // console.log("新:", newIndex, '旧', oldIndex);
      // 发送数据到后端进行真实的 排名交换 
      // 被替换
      const second = articleList.value[newIndex]
      // 被拖拽
      const first = articleList.value[oldIndex]

      await reviseRank({
        second,
        first
      })

      ElMessage.success('排序成功')
      articleList.value = []
      cb()

    }
  })


}