import Vue from 'vue';
import {br_get_data} from "../publicFun/br_function";
//封装权限指令(使用v-has='sys_user_save')
Vue.directive('has', {
    inserted: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});
//权限检查方法
Vue.prototype.$_has = function (value) {
    console.log(value);

    let isExist = false;
    //后台返回一个权限按钮数据
    let buttonpermsStr = br_get_data("__buttenpremissions__", []);
    if (buttonpermsStr == undefined || buttonpermsStr == null) {
        return false;
    }
    //let buttonperms = JSON.parse(buttonpermsStr);
    let buttonperms = buttonpermsStr;
    for (let i = 0; i < buttonperms.length; i++) {
        if (buttonperms[i].perms.indexOf(value) > -1) {
            isExist = true;
            break;
        }
    }
    return isExist;
};