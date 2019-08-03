<template>
    <div class="jumbotron mt-5">
        <div class="container wrapper">
            <h1 class="display-4">{{ $t("views.about.title") }}</h1>
            <p class="lead">{{ $t("views.about.description") }}</p>
            <hr class="my-4">
        </div>
    </div>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style scoped>
    h3 {
        font-variant: small-caps;
        background-color: lightgrey;
        width: 800px;
        border: 5px solid green;
        padding: 30px;
        margin: 20px;
    }


</style>
