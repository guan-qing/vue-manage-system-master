import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store';
import router from './router';
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
//这下面三个引入的位置不能在element-ui之前,不然图标会有影响
import "babel-polyfill";
import './assets/css/icon.css';
import './components/common/directives';
import './assets/css/el-icon/el-icon.css';//图标
import NProgress from 'nprogress';//进度条
import 'nprogress/nprogress.css';//进度条样式

import selInput from './components/common/base/selInput/selInput';//弹出查询组件
import elIframe from './components/common/base/elIframe/elIFrame';//iframe组件
import brUpload from './components/common/base/brUpload/brUpload';//上传组件

Vue.component('sel-input', selInput);
Vue.component('el-iframe', elIframe);
Vue.component('br-upload', brUpload);

import br_axios from "./common/axios/br-axios.js";
import * as br_fun from "./common/publicFun/br_function.js";

Vue.prototype.$Vue = Vue;//全局vue
Vue.prototype.$axios = axios;
Vue.prototype.$br_fun = br_fun;//公共方法
Vue.prototype.$br_axios = br_axios;//请求方法

Vue.config.productionTip = false;
//设置element-ui的所有组件大小尺寸
Vue.use(ElementUI, {
    size: 'small'
});

//通过发包获取系统配置
axios.get('./br_config.json').then(data => {
    Vue.prototype.$br_config = data.data;//系统参数
}).catch(e => {
    Message.error('获取系统配置失败!');
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    NProgress.start()
    const role = localStorage.getItem('ms_username');
    const token = localStorage.getItem('__token__');
    if (!role && to.path !== '/login') {
        //切换到登录页时,要么是过期,要么是退出,清空缓存
        window.localStorage.clear();
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
            NProgress.done()
        }
    }
});


new Vue({
    router,//路由
    store,//vuex状态管理
    render: h => h(App)
}).$mount('#app');