<template>
  <div class="container wrapper mb-4">
    <div class="jumbotron mt-4">
      <h1 class="display-4">{{ $t("views.about.title") }}</h1>
      <p class="lead">{{ $t("views.about.description") }}</p>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card">
          <img
            src="../assets/img/person.jpg"
            class="card-img-top"
            alt="Lucio Aliperti"
          />
          <div class="card-body">
            <h5 class="card-title">Lucio Aliperti</h5>
            <p class="card-text">
              Some quick background about Lucio, his studies, current work,
              hobbies, etc.
            </p>
            <a href="#" class="btn btn-primary">Contact me</a>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <img
            src="../assets/img/person.jpg"
            class="card-img-top"
            alt="Lucio Aliperti"
          />
          <div class="card-body">
            <h5 class="card-title">Lucio Aliperti</h5>
            <p class="card-text">
              Some quick background about Lucio, his studies, current work,
              hobbies, etc.
            </p>
            <a href="#" class="btn btn-primary">Contact me</a>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <img
            src="../assets/img/person.jpg"
            class="card-img-top"
            alt="Lucio Aliperti"
          />
          <div class="card-body">
            <h5 class="card-title">Lucio Aliperti</h5>
            <p class="card-text">
              Some quick background about Lucio, his studies, current work,
              hobbies, etc.
            </p>
            <a href="#" class="btn btn-primary">Contact me</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>
