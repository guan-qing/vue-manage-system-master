<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box search-box">
                <el-form ref="form" :model="searchForm" label-width="0">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input prefix-icon="el-icon-search" v-model="searchForm.basicName" clearable
                                      placeholder="根据基础数据名称搜索..."></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-input prefix-icon="el-icon-search" v-model="searchForm.basicName" clearable
                                      placeholder="根据基础数据名称搜索..."></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-input prefix-icon="el-icon-search" v-model="searchForm.basicName" clearable
                                      placeholder="根据基础数据名称搜索..."></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-input prefix-icon="el-icon-search" v-model="searchForm.basicCode" clearable
                                      placeholder="根据基础数据编码搜索..."></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="searchForm.value" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input prefix-icon="el-icon-search" v-model="searchForm.select_word"
                                      placeholder="全局搜索..."
                                      clearable></el-input>
                        </el-col>

                    </el-row>
                </el-form>
                <el-row :gutter="20">
                    <el-col :span="2">
                        <el-button class="br-main-button" type="primary" icon="search" @click="search">查询</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button disabled class="br-main-button" type="primary" icon="search" @click="search">查询
                        </el-button>
                    </el-col>

                    <el-col :span="2">
                        <el-button class="br-second-button" type="primary" icon="search" @click="search">查询</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button disabled class="br-second-button" type="primary" icon="search" @click="search">查询
                        </el-button>
                    </el-col>

                    <el-col :span="2">
                        <el-button class="br-mix-button" type="primary" icon="search" @click="search">查询</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button disabled class="br-mix-button" type="primary" icon="search" @click="search">查询
                        </el-button>
                    </el-col>

                    <el-col :span="2">
                        <el-button type="primary" icon="search" plain @click="reset">重置</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" icon="search" @click="addBasicData">新增</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" icon="search" @click="deleteBatch">批量删除</el-button>
                    </el-col>
                </el-row>

            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <br-pagination :total="tableData.length" @pageChange="pageChange"></br-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="0.5rem">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="3rem" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                searchForm: {},
                basicName: '',
                basicCode: '',
                value: '',
                typeOptions: [{
                    label: '类型1',
                    value: 1
                }, {
                    label: '类型2',
                    value: 2
                }],
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            total() {
                return this.tableData.length;
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.tableData.splice(val, 10)
                console.log('多少条' + val);
            },
            //每页多少条
            handleSizeChange(val) {
                console.log('每页多少条' + val);

            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                this.$br_axios.br_axios_get("https://easy-mock.com/mock/5c876a08802e0b363b0ae11f/vue-admin/getList", {}).then(data => {
                    this.tableData = data.data.list;
                })
                // this.$axios.post(this.url, {
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.data.list;
                // })
            },
            //查询
            search() {
                this.getData();
            },
            //重置
            reset() {
                this.searchForm = {};
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                /*this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;*/
                //this.$router.push({path: `/editBasicData/${row.id}`});
                this.$router.push({path: '/editBasicData', query: {id: `${row.id}`}});
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            //批量删除
            deleteBatch() {
                if (this.multipleSelection.length === 0) {
                    this.$message.warning(`请先选择要删除的数据`);
                }
            },
            //新增
            addBasicData() {
                this.$router.push({path: '/addBasicData'})
            },
            //分页(size:每页总数,page:第几页)
            pageChange(size, page) {
                console.log(`${size}---${page}`);
            }
        }
    }
</script>

<style scoped>
    .container .handle-box .search-form .el-row .el-col >>> .el-button {
        width: 100%;
    }
</style>