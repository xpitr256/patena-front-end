<template>
  <div class="home">
    <img alt="Patena logo" src="../assets/logo.png" />
    <HomeBody />
    <Textbox />
  </div>
</template>

<script>
import HomeBody from "@/components/HomeBody.vue";
import Textbox from "@/components/Textbox.vue";

export default {
  name: "home",
  components: {
    HomeBody,
    // eslint-disable-next-line vue/no-unused-components
    Textbox
  }
};
</script>
