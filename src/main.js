import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import store from './store';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
//这下面三个引入的位置不能在element-ui之前,不然图标会有影响
import "babel-polyfill";
import './assets/css/icon.css';
import './components/common/directives';
import selInput from './components/common/base/selInput/selInput';//弹出查询组件
import elIframe from './components/common/base/elIframe/elIFrame';//iframe组件
import brUpload from './components/common/base/brUpload/brUpload';//上传组件

Vue.component('sel-input', selInput);
Vue.component('el-iframe', elIframe);
Vue.component('br-upload', brUpload);

import brConfig from './assets/config.json';
import br_axios from "./common/axios/br-axios.js";
import br_fun from "./common/publicFun/index.js";

Vue.prototype.$br_axios = br_axios;//请求
Vue.prototype.$br_fun = br_fun;//公共方法
Vue.prototype.$br_config = brConfig;//系统参数

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    const token = localStorage.getItem('__token__');
    if (!role && to.path !== '/login') {
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
        }
    }
})


new Vue({
    router,//路由
    store,//vuex状态管理
    render: h => h(App)
}).$mount('#app')