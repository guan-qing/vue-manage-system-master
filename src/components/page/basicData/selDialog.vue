<template>
    <!--弹出查询框-->
    <el-dialog :title="title" :visible="visible" :v-model="vModel" :width="width" :height="height"
               :before-close="closeDialog">
        <el-input prefix-icon="el-icon-search" v-model="vModel.name" placeholder="这是弹出框的输入框...."></el-input>
        <el-iframe src="http://www.w3school.com.cn/tags/tag_frame.asp" height="500px"></el-iframe>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="confirmDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "selDialog",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '属性'
            },
            vModel: {
                type: Object
            },
            width: {
                type: String,
                default: '60%'
            },
            height: {
                type: String,
                default: '500px'
            }
        },
        methods: {
            closeDialog() {
                this.$emit('update:visible', false);
            },
            confirmDialog() {
                this.$emit('confirmDialog', this.vModel);
            }
        }
    }
</script>

<style scoped>

</style>