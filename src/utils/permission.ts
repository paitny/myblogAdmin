import router from "../router";
import store from '../store'
import {ElMessage} from "element-plus";
//白名单
const whiteList = ["/login","/profile", "/404", "/401", '/']
router.beforeEach(async (to, from, next) => {
    const isLoginCode =await store.dispatch("user/checkLoginFn")
    if (whiteList.includes(to.path)) {
        //在白名单中
        if (!isLoginCode && to.path === '/login') {
            //已登录
            ElMessage({
                showClose: true,
                message: "目前您是已登录状态，无需再次登录",
                type: 'error',
                grouping: true,
            })
            return next('/')
        }
        next()//其他情况白名随便访问
    } else {
        //不在白名单里
        const allRoute = router.getRoutes()
        const routeIndex = allRoute.findIndex(item => item.path === to.path)
        // 在路由表中 且登录
        if (routeIndex >= 0 && !isLoginCode) {
            // 通行
            next()
        }
        if (routeIndex >= 0 && isLoginCode) {
            //未登录在路由表中get401
            next('/401')
        }
        if (routeIndex < 0) {
            next('/404')
        }
    }
})
