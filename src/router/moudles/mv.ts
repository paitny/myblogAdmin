export default
{
    path: '/mv',
    component: () => import('@/layout/index.vue'),
    redirect: '/mv/mvManage',
    name: 'course',
    meta: {
        title: '视频',
        icon: 'role'
    },
    children: [
        {
            path: 'mvAdd',
            component: () => import('@/views/VideoManage/VideoAdd.vue'),
            meta: {
                title: '添加视频',
                icon: 'personnel-info'
            },
        },
        {
            path: 'mvManage',
            component: () => import('@/views/VideoManage/VideoManager.vue'),
            meta: {
                title: '管理视频',
                icon: 'link'
            },
        }
    ]
}
