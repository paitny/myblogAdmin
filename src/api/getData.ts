import request from '../utils/request'

export const getFeature = () => {
  return request({
    url: '/get/feature'
  })
}
//获取音乐

export const getMusic = () => {
  return request({
    url: '/get/music'
  })
}
