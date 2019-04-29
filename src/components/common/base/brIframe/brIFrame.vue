<!--封装frame-->
<template>
    <iframe :src="formSrc(src)" id="iframe" ref="iframe" frameborder="0" :scrolling="scrolling" :width="width"
            :height="height"></iframe>
</template>

<script>
    export default {
        name: "elFrame",
        props: {
            src: {//src嵌入的url地址
                type: String,
                default: ''
            },
            scrolling: {//设置是否有滚动条
                type: String,
                default: ''
            },
            width: {//宽
                type: String,
                default: '100%'
            },
            height: {//高
                type: String,
                default: '100%'
            }
        },
        mounted() {
            this.changeIframe();
            // window.onresize = function () {
            //     this.changeIframe()
            // }
        },
        methods: {
            formSrc(src) {
                //判断进来的src是不是完整url
                if (src.indexOf("http://") == 0 || src.indexOf("https://") == 0) {
                    return src;
                }
                //如果不是完整url则拼接上当前服务器地址
                return `${this.$br_config.baseUrl + src}`
            },
            changeIframe() {
                if (!this.width && !this.height) {
                    //iframe的宽高随父级的宽高大小
                    this.$refs.iframe.width = `${this.$refs.iframe.parentNode.clientWidth}px`;
                    this.$refs.iframe.height = `${this.$refs.iframe.parentNode.clientHeight}px`;
                }
                /*const iframe = document.getElementById('iframe');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                iframe.style.width = (Number(deviceWidth) - 320) + 'px'; //数字是页面布局宽度差值
                iframe.style.height = (Number(deviceHeight) - 80) + 'px'; //数字是页面布局高度差
                */
            }
        }
    }
</script>

<style scoped>

</style>
