<!--封装分页组件-->
<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
</template>

<script>
    export default {
        name: "brPagination",
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizes: {
                type: Array,
                default: () => {
                    return [10, 50, 100, 200]
                }
            },
            total: {
                type: Number,
                default: 0
            }
        },
        methods: {
            handleSizeChange(val) {
                //每页多少
                this.$emit("pageChange", val, this.currentPage);
            },
            handleCurrentChange(val) {
                //第几页
                this.$emit("pageChange", this.pageSize, val);
            },

        }
    }
</script>

<style scoped>

</style>