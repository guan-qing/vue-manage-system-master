<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> {{title}}数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <!--第一行-->
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="活动名称" prop="name">
                                <el-input v-model="form.name" placeholder="文本框" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动区域" prop="region">
                                <el-select v-model="form.region" placeholder="单选框" style="width: 100%" clearable>
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动区域">
                                <el-select v-model="form.selects" multiple placeholder="多选框" style="width: 100%">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动时间">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                                style="width: 100%;"></el-date-picker>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--第二行-->
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="城市级联">
                                <el-cascader filterable :options="options" v-model="form.options" placeholder="城市级联"
                                             clearable style="width: 100%"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="弹出查询">
                                <sel-input :v-model.sync="form.factor" placeholder="弹出选择..."
                                           @selEject="selEject"></sel-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--第三行-->
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="选择文件">
                                <br-upload @uploadCallback="uploadCallback"></br-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="即时配送">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <sel-dialog :visible.sync="visible" title="这是标题" :v-model="form"
                    @confirmDialog="confirmDialog"></sel-dialog>

    </div>
</template>

<script>
    import selDialog from './selDialog';

    export default {
        name: "basicPublic",
        props: {
            is_edit: {
                type: Boolean,
                default: false
            },
            paramId: {
                type: String,
                default: ''
            }
        },
        components: {'sel-dialog': selDialog},
        data() {
            return {
                visible: false,
                form: {
                    factor: '',
                    name: '',
                    type: []
                },
                options: [
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            if (this.is_edit) {
                //根据id获取当前数据回显
                console.log(this.paramId);
            }
        },
        computed: {
            title() {
                return this.is_edit ? '编辑' : '新增';
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('saveSubmit', this.form);
                        //alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            selEject() {//弹出查询
                this.visible = true;
                this.form.name = '弹出框的输入框';
            },
            delEject() {
                console.log(this.form.name)
                console.log(this.form.factor)
            },
            confirmDialog(data) {//弹出框确认
                this.$message(`弹出框的内容:${data.name}`);
                this.visible = false;
            },
            uploadCallback() {//上传成功的回调

            }
        }
    }
</script>

<style scoped>

</style>