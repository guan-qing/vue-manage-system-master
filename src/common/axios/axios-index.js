//该js是由用于对axios封装
import axios from 'axios';
import router from '@/router/index';
import {br_get_data} from "../publicFun/br_function";
import {Message} from 'element-ui';  //element库的消息提示，可以不用

// 请求拦截器

axios.interceptors.request.use(
    config => {
        //从缓存中取出token拼接到参数中
        const token = br_get_data("__token__", "");
        //token && (config.headers.Authorization = token);
        //token && (config.headers.common['token'] = token);
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                token: token,
            }
        } else if (config.method == 'get') {
            config.params = {
                token: token,
                ...config.params
            }
        }
        return config
    },
    error => {
        return Promise.error(error);
    });

//

axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 900: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 900:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Message({
                        message: '登录过期，请重新登录',
                        type: 'error',
                        showClose: true,
                    });
                    // 清除token
                    //localStorage.removeItem('token');
                    //请空localStorage里的数据
                    window.localStorage.clear();
                    //store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        type: 'error',
                        showClose: true,
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.response.data.message,
                        duration: 1500,
                        type: 'error',
                        showClose: true
                    });
            }
            return Promise.reject(error.response);
        }
    });

export default axios;
