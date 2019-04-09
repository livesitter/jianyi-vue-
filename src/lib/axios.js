import axios from 'axios'
import {baseUrl} from '@/config'


class HttpRequest {

    constructor(){
        this.baseURL = baseUrl
        // 队列
        this.queue = {}
    }


    getInsideConfig(){
        const config = {
            baseURL: this.baseURL,
        }
        return config
    }


    interceptors(instance){

        // 发送请求前拦截
        instance.interceptors.request.use(config=>{
            // this.$Spin.show();
            return config
        },error=>{
            return Promise.reject(error)

        })

        // 发送请求后拦截
        instance.interceptors.response.use(res=>{
            return res
        },error=>{
            return Promise.reject(error)
        })
    }

    request(options){

        // config，可覆盖
        options = Object.assign(this.getInsideConfig(), options)

        // 创建实例
        const instance = axios.create()

        // 绑定拦截器
        this.interceptors(instance)

        // 返回实例
        return instance(options)
    }
}

export default HttpRequest
