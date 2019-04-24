import qs from 'qs';//该插件是为了用来格式数据
import $axios from './axios-index';
import {Message} from 'element-ui';

var BASE_URL = '';
//通过发包获取系统配置
$axios.get('./br_config.json').then(data => {
    BASE_URL = data.data.baseUrl;
}).catch(e => {
    Message.error('获取系统配置失败!');
});

//用来处理请求是不是完整的
function formUrl(url) {
    //判断传进来的url是不是完整url
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    }
    //如果不是完整url则拼接上当前服务器地址
    return `${BASE_URL + url}`
};

//封装axios的get请求
export default {
    br_axios_get: (url, params) => {//get请求
        return $axios.get(`${formUrl(url)}`, {params: params}).then(data => {
            return Promise.resolve(data);
        }).catch(e => {
            return Promise.reject(e)
        })
    },
    br_axios_post: (url, params) => {//post请求
        return $axios.post(`${formUrl(url)}`, qs.stringify(params), {
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
        return $axios.post(`${formUrl(url)}`, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((e) => {
            return Promise.reject(e);
        });
    },
    br_axios_url: (url, params) => {//获取服务器地址
        return $axios.post(`${formUrl(url)}`, {params: params}).then(data => {
            return Promise.resolve(data);
        }).catch(e => {
            return Promise.reject(e)
        })
    },
}

