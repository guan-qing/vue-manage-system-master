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
    <el-upload action=""
               class="upload-demo"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
               :before-upload="onBeforeUpload"
               :http-request="uploadFile"
               multiple
               :limit="limit"
               :on-exceed="handleExceed"
               :file-list="fileList">
        <div style="display: flex;">
            <el-button slot="trigger" type="primary" icon="el-icon-upload">选取文件</el-button>
            <span class="el-upload__tip">支持扩展名：{{fileFormat.join(" .")}}</span>
        </div>
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
            fileFormat: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            fileList: {
                type: Array,
                default: () => {
                    return [];
                }
            }

        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['getToken'])
        },
        methods: {
            uploadFile(param, fileList) {//上传方法
                // let fileName = param.file.name.split('.');
                // if (fileName[1] === 'xls' || fileName[1] === 'slsx' || fileName[1] === 'xlsx') {
                // } else {
                //     this.$message.warning('只能上传.xls .slsx .xlsx格式文件!');
                //     return;
                // }
                this.$emit('uploadCallback', param, fileList);
            },
            //上传文件效验
            onBeforeUpload(file) {
                if (!this.fileFormatFun(file)) {
                    this.$message.warning(`只能上传${this.fileFormat.join(' ')}格式文件!`);
                    return false;
                }
            },
            //在选择文件时候会执行,效验他能选择多少个文件
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            //删除文件后的回调
            handleRemove(file, fileList) {
                this.$emit('removeFile', file, fileList);
            },
            //点击文件名
            handlePreview(file) {
                //console.log(file)
            },
            //删除文件
            beforeRemove(file, fileList) {
                if (this.fileFormatFun(file)) {
                    return this.$confirm(`确定移除 ${file.name}？`);
                }
            },
            //用于效验文件格式是否正确
            fileFormatFun(file) {
                let fileName = file.name.split('.');
                for (let i = 0; i < this.fileFormat.length; i++) {
                    if (fileName[1] === this.fileFormat[i]) {
                        return true;
                    }
                }
            }
        },
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

    .el-upload__tip {
        height: 20px;
        line-height: 50px;
        margin-left: 11px;
        margin-top: 0px;
    }

    .el-upload-list__item:first-child {
        margin-top: 0px;
    }
</style>
