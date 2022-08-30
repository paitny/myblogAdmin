// 动态复选框功能
import {ref, watch} from 'vue'

const dynamicRaw = [
  { label: '排名', prop: 'rank' },
  { label: '标题', prop: 'title' },
  { label: '作者', prop: 'author' },
  { label: '日期', prop: 'date' },
  { label: '描述', prop: 'description' },
]
// 复选框选项
export const dynamicData:any = ref(dynamicRaw)

// 已选选项 (勾选上的往这里来放)
export const selectDynamicColumn = ref([])

const initSelectDynamicColumn = () => {
  // 默认全选
  selectDynamicColumn.value = dynamicData.value.map((item:any) => item.label)
}

initSelectDynamicColumn()

// 处理表格列数据

export const tableColumns = ref([])

watch(selectDynamicColumn, (val) => {
  tableColumns.value = []
  // 已选的选项的数据 放 tableColumns
  const selectdata:any = dynamicData.value.filter((item:any) => {
    const {label} = item;
    // @ts-ignore
    return val.includes(label);
  })
  // @ts-ignore
  tableColumns.value.push(...selectdata)
}, {
  immediate: true
})




