import request from '../utils/request'
// 新增文章
export const createArticle = (data:any) => {
    return request({
        url: '/adminServer/articleAdmin/createArticle',
        data,
        method: 'POST'
    })
}
// 获取文章列表
export const getArticleList = (params:any) => {
    return request({
        url: '/adminServer/articleAdmin/articleList',
        params,
    })
}

//修改排名
export const reviseRank = (data:any) => {
    return request({
        url: '/adminServer/articleAdmin/reviseRank',
        data,
        method: 'POST'
    })
}
// 删除文章
export const deleteArticle = (data:any) => {
    return request({
        url: '/adminServer/articleAdmin/delete',
        data,
        method: 'POST'
    })
}
