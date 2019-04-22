import * as type from './mutation-types';
import {br_set_data} from "@/common/publicFun";


const matutaions = {
    //保存用户信息
    [type.SET_USERINFO](state, userInfo) {
        console.log('.....')
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
    [type.SET_MENU](state, menu) {
        state.menu = menu;
    }
}
export default matutaions;
