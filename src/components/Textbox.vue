<template>
    <div class="hello">
        <h3>{{ $t("views.home.welcomeDescription") }}</h3>
    </div>
</template>

<script>
    export default {
        name: "Textbox"
    }
</script>

<style scoped>
    h3 {
        font-variant: small-caps;
        background-color: lightgrey;
        width: 800px;
        border: 5px solid green;
        padding: 50px;
        margin: 20px;
    }

</style>
