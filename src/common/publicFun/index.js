/*封装公共方法*/

//将数据保存到localStorage缓存中
export function br_set_data(name, value) {
    const oldVal = window.localStorage.getItem(name);
    window.localStorage.setItem(name, value);
    return oldVal;
};

//根据name从localStorage缓存中取数据
export function br_get_data(name, value) {
    return JSON.parse(window.localStorage.getItem(name)) || value;
};
