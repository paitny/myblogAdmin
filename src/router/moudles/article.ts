export default
{
    path: '/articleMg',
    component: () => import('../../layout/index.vue'),
    redirect: '/articleMg/articleManage',
    name: 'article',
    meta: {
        title: '文章',
        icon: 'article'
    },
    children: [
        {
            path: 'articleAdd',
            component: () => import('../../views/ArticleManage/ArticleAdd.vue'),
            meta: {
                title: '添加文章',
                icon: 'article-ranking'
            },
        },
        {
            path: 'articleManage',
            component: () => import('../../views/ArticleManage/ArticleManager.vue'),
            meta: {
                title: '管理文章',
                icon: 'article-create'
            },
        }
    ]
}
