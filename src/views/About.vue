<template>
  <div class="about">
    <AboutBody/>
    <AboutTextbox/>
  </div>
</template>

<script>

  import AboutTextbox from "@/components/AboutTextbox.vue";
  import AboutBody from "@/components/AboutBody";

  export default {
    name: "about",
    components: {
      AboutBody,
      AboutTextbox
    }
  };
</script>
