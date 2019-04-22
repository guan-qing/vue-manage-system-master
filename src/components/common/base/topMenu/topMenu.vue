<template>
    <div class="top-menu">
        <el-menu class="sidebar-el-menu" :collapse="collapse" :default-openeds="openeds"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="(item,index) in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index"
                                        @click="onClickMenu(subItem)">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index"
                                              @click="onClickMenu(item)">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index" @click="onClickMenu(item)">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :key="item.index" @click="onClickMenu(item)"
                                  :class="{'is-active':activeIndex==item.index}">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "topMenu",
        data() {
            return {
                collapse: false,
                activeIndex: -1,
                openeds: [],
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '0',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-rank',
                        index: '1',
                        title: '基础数据',
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
                        icon: 'el-icon-lx-cascades',
                        index: '2',
                        title: '基础表格',
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
                        icon: 'el-icon-lx-copy',
                        index: '3',
                        title: 'tab选项卡'
                    }
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
            if (this.getMenu) {//用于做一级菜单在头部做刷新回现选中菜单
                this.activeIndex = this.getMenu.index;
            }
            //根据菜单配置显示方式查询菜单
            if (this.$br_config.menuTheme === 1) {
                //查询一级菜单的数据
            }
            if (this.$br_config.menuTheme === 2) {
                //查询全部菜单数据
            }
        },
        methods: {
            onClickMenu(item) {
                this.openeds = [];//点击二级菜单的时将展开菜单回收
                this.activeIndex = item.index;
                this.set_menu(item);
            },
            ...mapMutations({'set_menu': 'SET_MENU'})
        }
    }
</script>

<style scoped>
    .top-menu ul {
        width: 70%;
        display: flex;
        float: left;
        border: none;
        z-index: 2;
    }

    .top-menu ul li {
    }

    .top-menu >>> .el-menu-item {
        width: 200px;
        height: 70px;
        line-height: 70px;

    }


    >>> .el-submenu__title {
        height: 70px;
        line-height: 70px;
        width: 200px;
    }

    >>> .el-menu {
        background-color: #242f42;
    }

    .sidebar-el-menu {
        background: transparent;
    }

    .top-menu ul li.is-active {
        background-color: #2196f3;
        color: #fff !important;
    }


    >>> .el-submenu.is-active .el-submenu__title,
    >>> .el-submenu.is-active .el-submenu__title i {
        color: #fff !important;
    }

    >>> .el-submenu__title:hover,
    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        background-color: #2196f3;
        color: #fff !important;
    }

    >>> .el-submenu__title:hover i,
    .el-menu-item:focus i, .el-menu-item:hover i {
        color: #fff !important;
    }
</style>