<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in currentMenu" :key="item.index">
                <span v-if="item.redirect==='noredirect'||index==currentMenu.length-1" class="no-redirect">{{ item.title }}</span>
                <span v-else @click.prevent="handleLink(item)">{{ item.title }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>

    import pathToRegexp from 'path-to-regexp'

    export default {
        data() {
            return {
                levelList: null,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-rank',
                        index: 'basicData',
                        title: '基础数据',
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '自定义图标'
                    },
                    {
                        icon: 'el-icon-lx-favor',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '6',
                        title: '拖拽组件',
                        subs: [
                            {
                                index: 'drag',
                                title: '拖拽列表',
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }
                ],
                currentMenu: [],
                parentMenu: [],
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            //递归解析菜单
            recursionItems(items, parent, title) {
                if (parent) {
                    this.parentMenu.push(parent);
                }
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    if (item.subs) {
                        this.recursionItems(item.subs, item, title);
                    } else {
                        if (title === item.title) {
                            this.currentMenu.push(item);
                            this.currentMenu = this.parentMenu.concat(this.currentMenu);
                            return;
                        }
                        if (i === items.length - 1 && !item.subs) {
                            this.parentMenu = [];
                        }
                    }
                }
            },
            getBreadcrumb() {
                //let matched = this.$route.matched.filter(item => item.meta.title);
                this.currentMenu = [];
                this.recursionItems(this.items, null, this.$route.meta.title);
            },
            pathCompile(path) {
                const {params} = this.$route
                var toPath = pathToRegexp.compile(path)
                return toPath(params)
            },
            handleLink(item) {

            }
        }
    }
</script>

<style scoped>
    /*fade*/
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.28s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    /*fade-transform*/
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .5s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    /*fade*/
    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
        transition: all .5s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
        opacity: 0;
        transform: translateX(20px);
    }

    .breadcrumb-move {
        transition: all .5s;
    }

    .breadcrumb-leave-active {
        position: absolute;
    }

    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 70px;

    }

    .no-redirect {
        color: #409eff;
        cursor: text;
    }

    >>> .el-breadcrumb__inner {
        color: #fff;
    }

</style>
