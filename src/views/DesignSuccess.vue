<template>
  <div class="container wrapper">
    <h1 class="display-4">{{ $t("views.designSuccess.title") }}</h1>
    <div class="alert alert-success mt-4" role="alert">
      <p>
        {{ $t("views.designSuccess.length") }}
        <span class="font-weight-bold">{{ length }}</span>
        {{ $t("views.designSuccess.lengthUnit") }}
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
      length: 0
    };
  },
  created() {
    this.length = this.$route.params.length;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style scoped></style>
