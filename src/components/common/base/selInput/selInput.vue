<!--封装弹出查询组件-->
<template>
    <el-input :placeholder=placeholder v-model="vModel"
              class="input-with-select"
              :disabled="true">
        <el-button class="el-button-more" :disabled="selDisabled" size="small" slot="append" plain type="primary"
                   icon="el-icon-more"
                   @click="selEject()"></el-button>
        <el-button :disabled="delDisabled" size="small" slot="append" type="danger" plain icon="el-icon-close"
                   @click="delEject()"></el-button>
    </el-input>
</template>

<script>
    export default {
        name: "sel-input",
        props: {
            placeholder: {
                type: String,
                default: '请选择...'
            },
            vModel: {},
            selDisabled: {
                type: Boolean,
                default: false
            },
            delDisabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            selEject() {
                this.$emit('selEject');
            },
            delEject() {
                this.$emit('update:vModel', '');
                this.$emit('delEject');
            }
        }
    }
</script>

<style scoped>
    .input-with-select .el-button-more {
        margin-right: -10px;
    }
</style>