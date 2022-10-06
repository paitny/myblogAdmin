import {createRouter,createWebHashHistory} from "vue-router";
import linkMg from './moudles/link'
import mv from './moudles/mv'
import articleManage from './moudles/article'
import swiper from "./moudles/swiper";
import artAdmin from "./moudles/artAdmin";
import music from "./moudles/music";
const routes = [

    {
        path: "/",
        component: () => import("../layout/index.vue"),
        redirect: '/profile',
        children: [
            {
                path: "/profile",
                component: () => import("../views/profile/index.vue"),

                meta: {
                    title: '个人中心',
                    icon: "user"
                }
            }
        ]
    },
    {
        path: "/",
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: "/data",
                component: () => import("../views/Data/index.vue"),
                meta: {
                    title: '数据分析',
                    icon: "data"
                }
            }
        ]
    },
    {
        path: "/login",
        component: () => import("../views/login/index.vue")
    },
    {
        path: '/401',
        component: () => import('../views/error-page/401.vue'),
    },
    {
        path: '/404',
        component: () => import('../views/error-page/404.vue'),
    },
    {
        path: "/",
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: "/feedback",
                component: () => import("../views/ContactMessage/index.vue"),

                meta: {
                    title: '反馈中心',
                    icon: "user"
                }
            }
        ]
    },
    {
        path: "/",
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: "/userManage",
                component: () => import("../views/User/UserManager.vue"),

                meta: {
                    title: '用户管理',
                    icon: "user"
                }
            }
        ]
    },
    {
        path: "/",
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: "/visitor",
                component: () => import("../views/User/LatelyVisitor.vue"),
                meta: {
                    title: '管理访客',
                    icon: "user"
                }
            }
        ]
    },
    {
        path: "/",
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: "/LeaveMg",
                component: () => import("../views/leaveMg/index.vue"),
                meta: {
                    title: '留言管理',
                    icon: "LeaveMg"
                }
            }
        ]
    },
    articleManage,
    linkMg,
    swiper,
    mv,
    artAdmin,
    music


]


const router = createRouter({
    history: createWebHashHistory(),
    routes:routes,

})
export default router
