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
//自定义样式
import './assets/br-css/br-button.styl';

import selInput from './components/common/base/selInput/selInput';//弹出查询组件
import elIframe from './components/common/base/elIframe/elIFrame';//iframe组件
import brUpload from './components/common/base/brUpload/brUpload';//上传组件
import brPagination from './components/common/base/brPagination/brPagination';//分页组件
import brTable from './components/common/base/brTable/brTable';//表格和分页配套

Vue.component('sel-input', selInput);
Vue.component('el-iframe', elIframe);
Vue.component('br-upload', brUpload);
Vue.component('br-pagination', brPagination);
Vue.component('br-table', brTable);

import br_axios from "./common/axios/br-axios.js";
import * as br_fun from "./common/publicFun/br_function.js";

import './common/directive/br-directive';

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

new Vue({
    router,//路由
    store,//vuex状态管理
    render: h => h(App)
}).$mount('#app');