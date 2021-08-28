<template>
  <div class="welcome">
  <div class="jumbotron mb-4 " >
    <h1 class="display-4">{{ $t("views.home.welcomeMessage") }}</h1>
    <p class="lead">{{ $t("views.home.welcomeDescription") }}</p>
    <hr class="my-4" />
    <p>{{ $t("views.home.moreMessage") }}</p>
    <router-link to="/about">
      <a class="btn btn-primary btn-lg" href="#" role="button">{{ $t("views.home.seeMore") }} <i class="fas fa-chevron-right"></i></a>
    </router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: "HomeBody"
};
</script>

<style scoped>
  .welcome{
    padding: 120px 0px 0px 0px;
  }
</style>
