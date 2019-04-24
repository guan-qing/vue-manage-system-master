<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<!--<script>-->
<!--export default {-->
<!--mounted() {-->
<!--//关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据(但是在刷新浏览器的时候也会执行)-->
<!--// window.onbeforeunload = function (e) {-->
<!--//     let storage = window.localStorage;-->
<!--//     storage.clear()-->
<!--// }-->
<!--}-->
<!--}-->
<!--</script>-->
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css"; /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
</style>