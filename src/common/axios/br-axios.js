import $axios from './index';
import qs from 'qs';//该插件是为了用来格式数据
import configData from '@/assets/config.json';
import {Message} from 'element-ui';

const BASE_URL = configData.baseUrl;

//封装axios的get请求
export default {
    br_axios_get: (url, params) => {//get请求
        return $axios.get(`${BASE_URL + url}`, {params: params}).then(data => {
            return Promise.resolve(data);
        }).catch(e => {
            return Promise.reject(e)
        })
    },
    br_axios_post: (url, params) => {//post请求
        return $axios.post(`${BASE_URL + url}`, qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(data => {
            if (!data.data.success) {
                Message({
                    message: data.data.message,
                    type: 'error',
                    showClose: true,
                });
                return Promise.reject(data);
            }
            return Promise.resolve(data.data);
        }).catch(e => {
            return Promise.reject(e)
        })
    },
    br_axios_load: (url, params) => {//上传
        return $axios.post(`${BASE_URL + url}`, {params: params}).then(data => {
            return Promise.resolve(data);
        }).catch(e => {
            return Promise.reject(e)
        })
    },
    br_axios_url: (url, params) => {//获取服务器地址
        return $axios.post(`${BASE_URL + url}`, {params: params}).then(data => {
            return Promise.resolve(data);
        }).catch(e => {
            return Promise.reject(e)
        })
    },
}

