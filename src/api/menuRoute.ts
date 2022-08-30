import request from "../utils/request";

export const getRoute=()=>{
    return request({
        url:'/route'
    })
}
