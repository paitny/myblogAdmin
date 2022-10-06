<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">动态排名</span>
        <el-checkbox-group v-model="selectDynamicColumn">
          <el-checkbox
            v-for="item in dynamicData"
            :label="item.label"
            :key="item.label"
            :disabled="item.prop === 'title'"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="table">
      <el-table
        :data="articleList"
        :max-height="tableHeight"
        border
        v-loading="loading"
        ref="tableRef"
      >
        <el-table-column
          v-for="item in tableColumns"
          :label="item.label"
          :prop="item.prop"
          :key="item.label"
        >
          <template v-if="item.prop === 'date'" #default="{ row }">
            {{ formatTime(row.date) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button size="large" title="文章详情" color="#626aef" type="primary" @click="openDetail(row)"
              >

                <el-icon><Document /></el-icon>

            </el-button
            >
            <el-button size="large" circle title="删除文章" type="danger" @click="deleteArticleFn(row)"
              >
              <el-icon>
                <delete/>
              </el-icon>
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 15, 30, 50, 80, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
        @size-change="getArticleListFn"
        @current-change="getArticleListFn"
      />
    </el-card>
    <ArticleDetail ref="articleRef" :content="content"></ArticleDetail>
  </div>
</template>

<script setup>
import { onMounted, ref, onActivated } from "vue";
import { getArticleList, deleteArticle } from "../../api/article";
import { dynamicData, selectDynamicColumn, tableColumns } from "./dynamic/index";
import { getAutoHeight } from "../../hooks/getAutoHeight";
import { tableRef, initSortable } from "./sortable/index";
import ArticleDetail from "./components/ArticleDetail.vue";
import { formatTime } from "../../utils/formatTime";
import { ElMessage } from "element-plus";


const queryParams = ref({
  pageSize: 10,
  currentPage: 1,
});
const articleList = ref([]);
const loading = ref(true);
const total = ref(0);
const content = ref("");
const articleRef = ref(null);

const getArticleListFn = async () => {
  loading.value = true;
  const { data } = await getArticleList(queryParams.value);

  setTimeout(() => {
    loading.value = false;
    total.value = data.total;
    articleList.value = data.data;
  }, 500);
};

getArticleListFn();
const { tableHeight } = getAutoHeight(320);
const openDetail = (row) => {
  articleRef.value.open();
  content.value = row.content;
};
const deleteArticleFn = async (row) => {
  const { data } = await deleteArticle({
    _id: row._id,
  });

  if (!data.code) {
    ElMessage.success("文章删除成功");
    await getArticleListFn();
  }
};
onMounted(() => {
  initSortable(articleList, getArticleListFn);
});
onActivated(() => {
  getArticleListFn();
});
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  overflow: hidden;
}
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
    height: 75px !important;
  }

  :deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }
}
</style>
