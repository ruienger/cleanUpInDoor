import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

axios.defaults.baseURL = 'http://106.15.194.96:5588/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
  return config
})
axios.interceptors.response.use((response) => {
  if (response.data.status === 200) {
    return response.data
  } else {
    Message({
      message: response.data.message,
      type: 'error'
    })
  }
})
export default axios
