<template>
  <div class="container wrapper">
    <h1 class="display-4 h-page-header">{{ $t("views.design.title") }}</h1>
    <design-form></design-form>
  </div>
</template>

<script>
import DesignForm from "../components/design/DesignForm";

export default {
  name: "design",
  components: {
    DesignForm
  }
};
</script>
