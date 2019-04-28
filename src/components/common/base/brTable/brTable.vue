<!--封装table跟分页组件-->
<template>
    <div>
        <el-table v-loading="!tabData.length" :data="tabData" border class="table" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <!--插槽-->
            <slot></slot>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tabData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "brTable",
        props: {
            pageSizes: {
                type: Array,
                default: () => {
                    return [10, 50, 100, 200]
                }
            },
            searchUrl: {//查询的接口
                type: String,
                default: ''
            },
            searchParams: {//查询的参数
                type: Object,
                default: () => {
                    return {};
                }
            },
            selectionArray: {//勾选的数组
                type: Array,
                default: []
            },
            is_search: {//是否自动查询
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                tabData: [],
                currentPage: 1,
                pageSize: this.pageSizes[0],
            }
        },
        created() {
            //初始化
            if (this.is_search) this.getTableData(true);
        },
        methods: {
            //获取数据
            getTableData(searchFlag) {
                //判断是外部调用还是内部调用,外部调用时重新设置页数
                if (!searchFlag) {
                    this.currentPage = 1;
                    this.pageSize = this.pageSizes[0];
                }
                //拼接对象
                this.$Vue.set(this.searchParams, 'size', this.pageSize);
                this.$Vue.set(this.searchParams, 'page', this.currentPage);

                this.$br_axios.br_axios_get(this.searchUrl, this.searchParams).then(data => {
                    this.tabData = data.data.list;
                }).catch(e => {

                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData(true);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData(true);
            },
            handleSelectionChange(val) {
                this.$emit('update:selectionArray', val);
            },

        }
    }
</script>

<style scoped>

</style>