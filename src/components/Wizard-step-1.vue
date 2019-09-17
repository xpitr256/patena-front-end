<template>
    <div>
        <input type="radio" v-model="nextStep" v-bind:value="2" v-on:change="foo">go to 2
        <input type="radio" v-model="nextStep" v-bind:value="3" v-on:change="foo">go to 3
        <br />
        <span>value: {{nextStep}}</span>
    </div>
</template>

<script>
  export default {
    methods: {
      foo: function() {
        this.$emit('radioChanged',this.nextStep);
      }
    },
    data: function () {
      return {
        nextStep: null
      }
    }
  };
</script>
