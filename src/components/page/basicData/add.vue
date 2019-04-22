<template>
    <basic-public @saveSubmit="saveSubmit" :is_edit="false"></basic-public>
</template>

<script>
    import basicPublic from './basicPublic'

    export default {
        name: "add",
        components: {basicPublic},
        methods: {
            saveSubmit(param) {
                console.log(param);
            }
        }

    }
</script>

<style scoped>

</style>