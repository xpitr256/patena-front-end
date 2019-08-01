<template>

  <div class="jumbotron mt-5">
    <h1 class="display-4">{{ $t("views.home.welcomeMessage") }}</h1>
    <p class="lead">{{ $t("views.home.welcomeDescription") }}</p>
    <hr class="my-4">
    <p>{{ $t("views.home.moreMessage") }}</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">{{ $t("views.home.seeMore") }}</a>
  </div>

</template>

<script>
export default {
  name: "HomeBody"
};
</script>

<style scoped>
</style>
