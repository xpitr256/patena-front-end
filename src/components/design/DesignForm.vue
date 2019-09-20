<template>
    <div>
        <component :is="stepComponent" @goToNextStep="manageStep" />
        <hr />
    </div>
</template>

<script>
  export default {
    name: "DesignForm",
    data: () => ({
      currentStep: 1
    }),
    computed: {
      stepComponent() {
        this.currentStep;
        return () => import(`./DesignFormStep${this.currentStep}.vue`);
      }
    },
    methods: {
      manageStep(nextStep) {
        this.currentStep = nextStep;
      }
    }
  };
</script>

<style scoped>

</style>
