import axios from 'axios'
import {  SERVER_URL } from '../../constants/application'

export default () => {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 100000,
  })

  // axiosInstance.interceptors.request.use(
  //   config => {
  //     console.log('signature -', signature)

  //     if (signature && config.headers) {
  //       config.headers['x-vrs-signature'] = signature
  //     }

  //     return config
  //   },
  //   error => Promise.reject(error),
  // )

  return axiosInstance
}
