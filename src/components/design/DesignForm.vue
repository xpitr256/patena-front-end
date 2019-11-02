<template>
    <div>
        <component :is="stepComponent" @goToNextStep="manageStep" :formData="formData"  />
        <hr />
    </div>
</template>

<script>
    var $ = require('jquery');
    window.jQuery = $;
  export default {
    name: "DesignForm",
    data: () => ({
      currentStep: 1,
      formData: null
    }),
    computed: {
      stepComponent() {
        this.currentStep;
        return () => import(`./DesignFormStep${this.currentStep}.vue`);
      }
    },
    methods: {
      manageStep(data) {
        this.currentStep = data.nextStep;
        this.formData = data.formData;
      }
    }
  };
</script>

<style scoped>

</style>
