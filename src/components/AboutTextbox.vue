<template>
    <div class="about">
        <h3>{{ $t("views.about.description") }}</h3>
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
