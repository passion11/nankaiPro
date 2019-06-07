//import request from '@/utils/request'
import axios from 'axios'

axios.defaults.withCredentials = true

export function login(data) {
  return axios({
    url: 'http://172.10.200.216:8088/kjsso/login',
    method: 'post',
    params: data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
