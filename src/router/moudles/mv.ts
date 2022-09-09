export default
{
    path: '/mv',
    component: () => import('@/layout/index.vue'),
    redirect: '/mv/mvManage',
    name: 'video',
    meta: {
        title: '视频',
        icon: 'video'
    },
    children: [
        {
            path: 'mvAdd',
            component: () => import('../../views/VideoManage/VideoAdd.vue'),
            meta: {
                title: '添加视频',
                icon: 'video-add'
            },
        },
        {
            path: 'mvManage',
            component: () => import('../../views/VideoManage/VideoManager.vue'),
            meta: {
                title: '管理视频',
                icon: 'video-manage'
            },
        }
    ]
}
