<template>
  <div class="container wrapper mb-4">
    <div class="jumbotron mt-4">
      <h1 class="display-4">{{ $t("views.about.title") }}</h1>
      <p class="lead">{{ $t("views.about.description") }}</p>
    </div>
    <div class="row">
      <div class="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 mb-5">
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary">{{ $t("views.about.personOneName") }}</li>
          <li class="list-group-item list-group-item-light">{{ $t("views.about.personOneDescription") }}</li>
        </ul>
      </div>
      <div class="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 mb-5">
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary">{{ $t("views.about.personTwoName") }}</li>
          <li class="list-group-item list-group-item-light">{{ $t("views.about.personTwoDescription") }}</li>
        </ul>
      </div>
      <div class="col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 mb-5">
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary">{{ $t("views.about.personThreeName") }}</li>
          <li class="list-group-item list-group-item-light">{{ $t("views.about.personThreeDescription") }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>

<style scoped></style>
