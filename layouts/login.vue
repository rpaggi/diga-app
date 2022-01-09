<template>
    <v-app dark>
        <Nuxt />
    </v-app>
</template>
<script>
export default {
    middleware: 'logged'
}
</script>
<style>
    .card-wrapper{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card-login{
        min-height: 40vh;
        padding: 15px 40px;
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
</style>