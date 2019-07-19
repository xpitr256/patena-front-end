<template>
  <div class="hello">
    <h1>{{ $t("views.home.welcomeMessage") }}</h1>
  </div>
</template>

<script>
export default {
  name: "HomeBody"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-variant: small-caps;
}
</style>
