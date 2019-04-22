import {br_get_data} from '@/common/publicFun/index.js';

//从缓存中获取用户信息
const userInfo = br_get_data("__userInfo__", "");
const token = br_get_data("__token__", "");
const menu = br_get_data("__menu__", "");

const state = {
    userInfo: userInfo,//用户信息
    token: token,//token
    menu: menu,//用标记上下菜单的时候一级菜单点击的是那个菜单
}
export default state;
