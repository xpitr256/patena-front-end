<template>
  <div class="container wrapper">
    <div class="jumbotron mt-5">
      <h1 class="display-4">{{ $t("views.about.title") }}</h1>
      <p class="lead">{{ $t("views.about.description") }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about"
  };
</script>
