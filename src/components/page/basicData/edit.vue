<template>
    <basic-public @saveSubmit="saveSubmit" :paramId="paramId" :is_edit="true" :key="paramId"></basic-public>
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
            this.paramId = this.$route.query.id;
        },
        methods: {
            saveSubmit() {

            }
        },
        watch: {
            $route(to, from) {
                if (to.path === '/editBasicData') {
                    this.paramId = this.$route.query.id;
                }
            }
        }
    }
</script>

<style scoped>

</style>