<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar v-if="menuTheme!==2"></v-sidebar>
        <div ref="contentBox" class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';

    export default {
        data() {
            return {
                tagsList: [],
                collapse: false
            }
        },
        components: {
            vHead, vSidebar, vTags
        },
        computed: {
            menuTheme() {//菜单栏主题
                return this.$br_config.menuTheme;
            }
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
            //判断菜单主题是那种样式,然后设置内容区域是不是占满
            this.$nextTick(() => {
                if (this.$br_config.menuTheme === 2) {
                    this.$refs.contentBox.style.left = 0;
                }
            })
        }
    }
</script>
