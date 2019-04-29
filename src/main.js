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
import './assets/css/el-icon/el-icon.css';//图标
import 'nprogress/nprogress.css';//进度条样式
//自定义样式
import './assets/br-css/br-button.styl';

import "./assets/css/main.css";
import "./assets/css/color-dark.css"; /*深色主题*/
/*import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/

import selInput from './components/common/base/selInput/selInput';//弹出查询组件
import brIFrame from './components/common/base/brIframe/brIFrame';//iframe组件
import brUpload from './components/common/base/brUpload/brUpload';//上传组件
import brPagination from './components/common/base/brPagination/brPagination';//分页组件
import brTable from './components/common/base/brTable/brTable';//表格和分页配套

Vue.component('sel-input', selInput);
Vue.component('br-iframe', brIFrame);
Vue.component('br-upload', brUpload);
Vue.component('br-pagination', brPagination);
Vue.component('br-table', brTable);

import br_axios from "./common/axios/br-axios.js";
import * as br_fun from "./common/publicFun/br_function.js";
//指令封装
import './common/directive/br-has';
import './common/directive/br-drag';

Vue.prototype.$Vue = Vue;//全局vue
Vue.prototype.$axios = axios;
Vue.prototype.$br_fun = br_fun;//公共方法
Vue.prototype.$br_axios = br_axios;//请求方法

//设置为 false 以阻止 vue 在启动时生成生产提示。
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