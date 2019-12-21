<template>
  <div
    class="form-group row"
    v-if="value"
    v-bind:class="{ highlight: highlight }"
  >
    <label for="operation" class="col-sm-3 col-form-label">{{ label }}</label>
    <div class="col-sm-9">
      <input
        type="text"
        readonly
        class="form-control-plaintext bold"
        id="operation"
        v-model="showValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "readOnlyField",
  props: ["label", "value", "highlight"],
  computed: {
    showValue: function () {
      if (this.value.length > 70){
        return this.value.substring(0,70) + "...";
      }
      return this.value;
    }
  }
};
</script>

<style scoped>
.col-form-label {
  font-size: 0.9em;
}
.bold {
  font-weight: bold;
  width: 100%;
  margin-top: -0.2em;
}
.highlight {
  background-color: #d8f3c9;
  border: 1px solid green;
}
</style>
