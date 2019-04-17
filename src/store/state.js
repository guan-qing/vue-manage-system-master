import {br_get_data} from '@/common/publicFun/index.js';

//从缓存中获取用户信息
const userInfo = br_get_data("__userInfo__", "");
const token = br_get_data("__token__", "");


const state = {
    userInfo: userInfo,//用户信息
    token: token,//token
}
export default state;
