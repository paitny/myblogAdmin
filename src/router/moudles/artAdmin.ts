export default
{
    path: '/artMg',
    component: () => import('../../layout/index.vue'),
    redirect: '/artMg/artEdit',
    name: 'art',
    meta: {
        title: '文章',
        icon: 'article'
    },
    children: [
        {
            path: 'artEdit',
            component: () => import('../../views/article-create/index.vue'),
            meta: {
                title: '编辑文章',
                icon: 'article-create'
            },
        },
        {
            path: 'ranMg',
            component: () => import('../../views/article-ranking/index.vue'),
            meta: {
                title: '文章排名',
                icon: 'article-ranking'
            },
        }
    ]
}
