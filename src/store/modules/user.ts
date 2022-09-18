import {checkAdmin, checkLogin, login, logout} from "../../api/login";
import {ElMessage} from "element-plus";
import {getLocal, removeAllItem, setLocal} from "../../utils/storage";
import router from "../../router";
export default {
    //命名控件
    namespaced: true,
    state: () => {
        return {
            userInfo: getLocal('userInfo', {})
        }
    },

    actions: {
        loginFn(context:any, userInfo:any) {
            login(userInfo)
                .then(({data}) => {
                    if (!data.code) {
                        ElMessage({
                            showClose: true,
                            message: data.msg,
                            type: 'success',
                            grouping: true,
                        })
                        //修改stateUserInfo

                        context.commit('storeUserInfo',data.data)
                        setLocal('userInfo', data.data)

                        context.dispatch('route/getMenuRoute', null, {root: true})
                        //路由跳转
                        router.replace("/profile")
                        window.location.reload();
                    } else {
                        ElMessage({
                            showClose: true,
                            message: data.msg,
                            type: 'error',
                            grouping: true,
                        })
                    }
                })
        },
        logoutFn(context:any) {
            logout().then(({data}) => {
                if (!data.code) {
                    context.commit("storeUserInfo", {})
                    removeAllItem()
                    router.replace("/login")
                    ElMessage({
                        showClose: true,
                        message: data.msg,
                        type: 'success',
                        grouping: true,
                    })

                } else {
                    ElMessage({
                        showClose: true,
                        message: data.msg,
                        type: 'success',
                        grouping: true,
                    })
                }
            }).catch(err => {
                ElMessage({
                    showClose: true,
                    message: err,
                    type: 'error',
                    grouping: true,
                })
            })
        },
        checkLoginFn(context:any) {
            return new Promise((res, rej) => {
                checkLogin().then(({data}) => {
                    if (!data.code) {
                       // 已登录
                        context.commit('storeUserInfo', data.data)
                        setLocal('userInfo', data.data)
                    }
                    res(data.code)
                }).catch(err => {
                    rej(err)
                })
            })
        }
    },
    mutations: {
        storeUserInfo(state:any, userInfo:any) {
            state.userInfo = userInfo
        }
    },
}
