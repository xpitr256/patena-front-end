<template>
    <div class="container wrapper">
        <component :is="stepComponent" @radioChanged="manageStep"/>
        <button @click="next" class="btn btn-lg btn-primary">Next</button>
    </div>
</template>

<script>
  export default {
    data: () => ({
      step: 1,
      stepNumber: 1,
    }),
    computed: {
      stepComponent() {
        this.step; // Just call it
        return () => import(`./Wizard-step-${this.step}.vue`);
      }
    },
    methods: {
      manageStep(nextStep) {
        this.stepNumber = nextStep;
      },
      next() {
        this.step = this.stepNumber;
      }
    }
  };
</script>
