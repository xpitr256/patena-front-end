<template>
  <div class="container wrapper mb-4">
    <div class="jumbotron mt-4">
      <h1 class="display-4">{{ $t("views.about.title") }}</h1>
      <p class="lead">{{ $t("views.about.description") }}</p>
    </div>
    <div class="row">
      <div class="col-4">
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary"><h5>{{ $t("views.about.personOneName") }}</h5></li>
          <li class="list-group-item list-group-item-light size-text">{{ $t("views.about.personOneDescription") }}
          </li>
        </ul>
      </div>
        <div class="col-4">
            <ul class="list-group">
          <li class="list-group-item list-group-item-secondary"><h5>{{ $t("views.about.personTwoName") }}</h5></li>
          <li class="list-group-item list-group-item-light size-text"> {{ $t("views.about.personTwoDescription") }}</li>
            </ul>
        </div>
        <div class="col-4">
            <ul class="list-group">
          <li class="list-group-item list-group-item-secondary"><h5>{{ $t("views.about.personThreeName") }}</h5></li>
          <li class="list-group-item list-group-item-light size-text">{{ $t("views.about.personThreeDescription") }}
          </li>
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

<style scoped>
    size-text{
        font-size:1.25vw
    }
</style>

