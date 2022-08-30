export default
{
    path: '/swiperMg',
    component: () => import('../../layout/index.vue'),
    redirect: '/swiperMg/swiperManage',
    name: 'swiper',
    meta: {
        title: '文章',
        icon: 'article'
    },
    children: [
        {
            path: 'swiperAdd',
            component: () => import('../../views/SwiperManage/SwiperAdd.vue'),
            meta: {
                title: '添加轮播图',
                icon: 'article-ranking'
            },
        },
        {
            path: 'swiperManage',
            component: () => import('../../views/SwiperManage/SwiperManager.vue'),
            meta: {
                title: '管理轮播图',
                icon: 'article-create'
            },
        }
    ]
}
