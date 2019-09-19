<template>
    <div>
        <component :is="stepComponent" @radioChanged="manageStep"/>
        <hr />
    </div>
</template>

<script>
  export default {
    name: "DesignForm",
    data: () => ({
      currentStep: 1,
      nextStepNumber: 1,
    }),
    computed: {
      stepComponent() {
        this.currentStep;
        return () => import(`./DesignFormStep${this.currentStep}.vue`);
      }
    },
    methods: {
      manageStep(nextStep) {
        this.nextStepNumber = nextStep;
      },
      next() {
        this.currentStep = this.nextStepNumber;
      }
    }
  };
</script>

<style scoped>

</style>
