<template>
  <div class="container wrapper">
    <h1 class="display-4">{{ $t("views.designLengthSuccess.title") }}</h1>
    <div class="alert alert-success mt-4" role="alert">
      <p>
        {{ $t("views.designLengthSuccess.length") }}
        <span class="font-weight-bold">{{ length }}</span>
        {{ $t("views.designLengthSuccess.lengthUnit") }}
      </p>
      <hr />
      <p class="mb-0">{{ $t("views.designLengthSuccess.suggestion") }}</p>
    </div>

    <a href="#" class="btn btn-lg btn-light mt-4" v-on:click="navigate()"> <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }} </a>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "DesignLengthSuccess",
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
