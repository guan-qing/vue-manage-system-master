import * as type from './mutation-types';
import {br_set_data} from "./../common/publicFun/br_function";


const matutaions = {
    //保存用户信息
    [type.SET_USERINFO](state, userInfo) {
        state.userInfo = userInfo;
        //将用户信息保存到localStorage中
        br_set_data('__userInfo__', JSON.stringify(userInfo));
    },
    //保存token
    [type.SET_TOKEN](state, token) {
        state.token = token;
        //将token保存到localStorage中
        br_set_data('__token__', token);
    },
    //保存顶部一级菜单最后点击的菜单是那个,用于做浏览器刷新回显
    [type.SET_MENU](state, menu) {
        state.menu = menu;
        //将菜单信息保存到localStorage中
        br_set_data('__menu__', JSON.stringify(menu));
    },
    //保存所有的菜单
    [type.SET_ALLMENU](state, allMenu) {
        state.allMenu = allMenu;
    }
}
export default matutaions;
