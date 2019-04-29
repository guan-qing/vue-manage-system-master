<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <!--<router-link :key="threeItem.index" v-for="(threeItem,i) in subItem.subs"-->
                                <!--:to="'/'+threeItem.index">-->
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                                <!--</router-link>-->
                            </el-submenu>
                            <!--<router-link :key="subItem.index" v-else :to="'/'+subItem.index">-->
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                            <!--</router-link>-->
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <!--<router-link :to="'/'+item.index" :key="item.index">-->
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                    <!--</router-link>-->
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                collapse: false,
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
                    },
                ]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            },
            ...mapGetters(['getMenu'])
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            //通过菜单配置显示方式获取不同的菜单数据
            if (this.$br_config.menuTheme == 0) {
                //全部显示在左侧菜单栏,一次查询返回全部数据
            }
            if (this.$br_config.menuTheme == 1) {
                //二级菜单显示在左侧菜单栏,将根据父级id查询出对应的数据
                this.getMenu//一级菜单的数据
            }
            if (this.getMenu) {
                console.log(this.getMenu);
            }
        },
        methods: {
            getAllMenuData() {
                this.$br_axios.br_axios_post('', {}).then(data => {

                }).catch(e => {
                    this.$message.error('获取菜单列表失败!');
                })
            }
        },
        watch: {
            getMenu() {//获取一级菜单的改变,切换对应的二级菜单内容
                if (this.$br_config.menuTheme === 1) {
                    console.log(this.getMenu);
                    this.items = this.items.slice(0, this.getMenu.index * 2);
                }
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
