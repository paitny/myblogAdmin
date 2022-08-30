export default
{
    path: '/linkMg',
    component: () => import('@/layout/index.vue'),
    redirect: '/linkMg/linkManage',
    name: 'student',
    meta: {
        title: '学员',
        icon: 'personnel'
    },
    children: [
        {
            path: 'linkAdd',
            component: () => import('@/views/LinkManage/LinkAdd.vue'),
            meta: {
                title: '添加友链',
                icon: 'personnel-manage'
            },
        },
        {
            path: 'linkManage',
            component: () => import('@/views/LinkManage/LinkManager.vue'),
            meta: {
                title: '管理友链',
                icon: 'introduce'
            },
        }
    ]
}
