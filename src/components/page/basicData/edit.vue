<template>
    <basic-public @saveSubmit="saveSubmit" :paramId="paramId" :is_edit="true"></basic-public>
</template>

<script>
    import basicPublic from './basicPublic'

    export default {
        name: "edit",
        components: {basicPublic},
        data() {
            return {paramId: ''}
        },
        created() {
            //获取参数
            this.paramId = this.$route.params.id;
        },
        methods: {
            saveSubmit() {

            }
        }
    }
</script>

<style scoped>

</style>