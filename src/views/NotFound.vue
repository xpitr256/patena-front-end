<template>
    <div class="container wrapper mb-4">
        <div class="jumbotron mt-4">
            <h1 class="display-4">{{ $t("views.notFound.title") }}</h1>
            <p class="lead">{{ $t("views.notFound.description") }}</p>
            <ul class="options">
                <li><router-link to="/results"><i class="fas fa-download"></i> {{ $t("views.notFound.getResult") }}</router-link></li>
                <li><router-link to="/design"><i class="fas fa-project-diagram"></i> {{ $t("views.notFound.design") }}</router-link></li>
                <li><router-link to="/analyze"><i class="fas fa-search"></i> {{ $t("views.notFound.analyze") }}</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>
    .options{
        font-size: 1.5em;
        list-style-type: none;
    }
    li {
        margin-bottom: 40px;
    }

    li:first-child {
        margin-top: 40px;
    }

    li:last-child {
        margin-bottom: -20px;
    }
</style>