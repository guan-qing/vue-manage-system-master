import state from './state';

//获取用户信息
export const getUserInfo = state => state.userInfo;
//获取token
export const getToken = state => state.token;
//获取菜单
export const getMenu = state => state.menu;
//获取所有菜单
export const getAllMenu = state => state.allMenu;

