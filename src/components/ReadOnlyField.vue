<template>
  <div
    class="form-group row"
    v-if="value"
    v-bind:class="{ highlight: highlight }"
  >
    <label for="operation" class="col-sm-4 col-form-label">{{ label }}</label>
    <div class="col-sm-8">
      <input
        type="text"
        readonly
        class="form-control-plaintext bold"
        id="operation"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "readOnlyField",
  props: ["label", "value", "highlight"]
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
