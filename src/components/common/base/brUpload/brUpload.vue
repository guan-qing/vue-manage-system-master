<template>
    <!--封装上传组件-->
    <!--handlePreview()方法是当显示文件列表时,点击文件名触发-->
    <!--beforeRemove()方法是当显示文件列表时,点击x删除文件触发-->
    <!--handleRemove()方法是点击删除文件后的回调-->
    <!--uploadFile() 调用方法上传文件到服务器-->
    <!--onBeforeUpload() 调用方法对文件效验-->
    <!--show-file-list:设置是否显示上传文件列表-->
    <!--file-list:上传的文件list-->
    <!--limit:最多一次可以选择多少个文件上传-->
    <el-upload style="display: flex;align-items: end"
               action=""
               class="upload-demo"
               :accept="accept"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
               :before-upload="onBeforeUpload"
               :http-request="uploadFile"
               multiple
               :limit="limit"
               :show-file-list="false"
               :on-exceed="handleExceed"
               :file-list="fileList">
        <el-button type="primary" icon="el-icon-upload">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名：.xls .slsx .xlsx</div>
    </el-upload>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "brUpload",
        props: {
            limit: {
                type: Number,
                default: 3
            },
            accept: {
                type: String,
                default: 'xls,slsx,xlsx'
            }

        },
        data() {
            return {
                fileList: []
            }
        },
        computed: {
            ...mapGetters(['getToken'])
        },
        methods: {
            uploadFile(param) {//上传方法
                let fileName = param.file.name.split('.');
                if (fileName[1] === 'xls' || fileName[1] === 'slsx' || fileName[1] === 'xlsx') {
                    let formData = new FormData();
                    formData.append('access_token', this.getToken);//随文件上传的其他参数
                    formData.append('save_path', 'tmpfile');
                    formData.append('rename', 'yes');
                    formData.append('file', param.file);
                    this.$br_axios.br_axios_load('fserver/upload.do', formData).then(data => {
                        if (data.success) {
                            this.$emit('uploadCallback', data);
                        }
                    }).catch(e => {
                        this.$emit('uploadCallback', e);
                        this.$message.error(`上传 ${param.file.name} 失败!`);
                        return;
                    })
                } else {
                    this.$message.warning('只能上传.xls .slsx .xlsx格式文件!');
                    return;
                }
            },
            onBeforeUpload(file) {//上传文件效验
                let fileName = file.name.split('.');
                if (fileName[1] !== 'xls' && fileName[1] !== 'slsx' && fileName[1] !== 'xlsx') {
                    this.$message.warning('只能上传.xls .slsx格式文件!');
                    return false;
                }
                return;
            },
            handleExceed(files, fileList) {//在选择文件时候会执行,效验他能选择多少个文件
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {//删除文件后的回调
                console.log(file, fileList);
            },
            handlePreview(file) {//点击文件名
                console.log(file)
            },
            beforeRemove(file, fileList) {//删除文件
                return this.$confirm(`确定移除 ${file.name}？`);
            }
        }
    }
</script>

<style>
    .upload-demo > .el-upload--text {
        width: auto;
        height: auto;
        border: none;
    }

    .upload-demo .el-button--small {
        padding: 9px 15px;
    }

    .upload-demo .el-icon-upload {
        margin: 0;
        font-size: 12px;
        line-height: 1;
        color: #fff;
    }
</style>
