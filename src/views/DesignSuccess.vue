<template>
  <div class="container wrapper">
    <h1 class="display-4">{{ $t("views.designSuccess.title") }}</h1>
    <div class="alert alert-success mt-4" role="alert">
      <h4 class="alert-heading">{{ $t("views.designSuccess.alertTitle") }}</h4>
      <p>
        {{ $t("views.designSuccess.dataReceived") }}.
        {{ $t("views.designSuccess.emailSent") }}
        <span class="font-italic">{{ email }}</span>
        {{ $t("views.designSuccess.orderNumber") }}
        <span class="font-weight-bold">{{ orderNumber }}</span>
        {{ $t("views.designSuccess.notify") }}
      </p>
      <hr />
      <p class="mb-0">{{ $t("views.designSuccess.suggestion") }}</p>
    </div>

    <a href="#" class="btn btn-lg btn-light mt-4" v-on:click="navigate()">
      <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }}
    </a>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "DesignSuccess",
  data() {
    return {
      orderNumber: 0
    };
  },
  created() {
    this.orderNumber = this.$route.params.orderNumber;
    this.email = this.$route.params.email;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style scoped></style>
