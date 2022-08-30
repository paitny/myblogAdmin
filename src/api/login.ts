import request from "../utils/request";
export const login=(data:any)=>{
return request({
    url:"/login",
    method:"POST",
    data
})

}
// 登出接口
export const logout = () => {
    return request({
        url: '/login/out',
        method:"POST"
    })
}
// 验证登录接口
export const checkLogin = () => {
    return request({
        url: '/login/check',
        method:"POST"
    })
}
//验证是否是管理员
export const checkAdmin = () => {
    return request({
        url: '/adminServer/check',
        method:"POST"
    })
}
