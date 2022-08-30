import request from '../utils/request'

export const getFeature = () => {
  return request({
    url: '/get/feature'
  })
}
