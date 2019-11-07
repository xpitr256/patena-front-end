<template>
  <div class="container wrapper">
    <h1 class="display-4">{{ $t("views.download.title") }}</h1>
    <div class="card" style="width: 18rem;">
      <img src="./../assets/amino.png" alt="Amino" class="card-img-top" />
      <div class="card-body">
        <h6 class="card-title">{{ $t("views.download.report") }}</h6>
        <p class="card-text">
          <small>{{ orderNumber }}</small>
        </p>
        <a href="#" class="btn btn-lg btn-primary">
          <i class="fas fa-download"></i>
          {{ $t("views.download.btnDownload") }}</a
        >
      </div>
    </div>
    <a href="#" class="btn btn-lg btn-light mt-4" v-on:click="navigate()">
      <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }}
    </a>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Download",
  data() {
    return {
      orderNumber: 0
    };
  },
  created() {
    this.orderNumber = this.$route.params.orderNumber;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
