/*封装公共方法*/

//用于判断字符串是否是json字符串
function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) {
    }
    return false;
}

//获取cookie、
function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//设置cookie,增加到vue实例方便全局调用
function setCookie(name, value) {
    let exdate = new Date();
    const Days = 30;
    exdate.setTime(exdate.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
};

//删除cookie
function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

//将数据保存到localStorage缓存中
export function br_set_data(name, value) {
    try {
        const oldVal = window.localStorage.getItem(name);
        window.localStorage.setItem(name, value);
        return oldVal;
    } catch (e) {
        const oldVal = getCookie(name);
        setCookie(name, value);
        return oldVal;
    }
};

//根据name从localStorage缓存中取数据
export function br_get_data(name, value) {
    try {
        const val = window.localStorage.getItem(name) || value;
        if (isJsonString(val)) {
            return JSON.parse(val) || value;
        } else {
            return val || value;
        }
    } catch (e) {
        return getCookie(name) || value;
    }

};


