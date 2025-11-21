import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
})
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    let accessToken= localStorage.getItem('token')
    if(accessToken && config){
        config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);
export default axiosInstance

