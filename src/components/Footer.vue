<template>
  <div class="footer">
    <p>Footer</p>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: 1em;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
  background: linear-gradient(to bottom, #f0f0f0, white);
  color: gray;
  text-align: center;
}
</style>
