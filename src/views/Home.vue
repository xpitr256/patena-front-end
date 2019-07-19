<template>
  <div class="home">
    <img alt="Patena logo" src="../assets/logo.png" />
    <HomeBody />
  </div>
</template>

<script>
import HomeBody from "@/components/HomeBody.vue";

export default {
  name: "home",
  components: {
    HomeBody
  }
};
</script>
