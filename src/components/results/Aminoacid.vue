<template>
  <span v-bind:class="getAminoAcidClass()">
    {{ getName }}
  </span>
</template>

<script>
export default {
  name: "Aminoacid",
  props: {
    name: String,
    showBig: Boolean,
    showAsFinal: Boolean,
    showAsSuccess: Boolean,
    showAsWarning: Boolean,
    hideAmino: Boolean
  },
  methods: {
    getAminoAcidClass: function() {
      let aminoAcidClass = "";
      let circleClass = "";
      let colorClass = "";
      if (this.showBig) {
        aminoAcidClass = "btn";
        circleClass = "btn-circle-xl";
      }
      if (this.showAsFinal) {
        colorClass = "";
      }
      if (this.showAsSuccess) {
        aminoAcidClass = "btn";
        circleClass = "btn-sm";
        colorClass = "btn-success";
      }
      if (this.showAsWarning) {
        aminoAcidClass = "btn";
        circleClass = "btn-sm";
        colorClass = "btn-warning";
      }
      if (this.hideAmino) {
        return "display: none;";
      }
      return aminoAcidClass + " " + colorClass + " " + circleClass;
    }
  },
  async created() {
    this.getAminoAcidClass();
  },
  computed: {
    getName: function() {
      return this.hideAmino ? "" : this.name;
    }
  }
};
</script>

<style scoped>
.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
  cursor: default;
}
.btn-initial {
  background-color: #efefef;
  border-style: solid;
  border-color: #bbbbbb;
}

.btn-initial:hover {
  background-color: #e2e2e2;
}

.btn-final {
  background-color: #d3d3d3;
  border-style: solid;
  border-color: #bbbbbb;
}

.btn-final:hover {
  background-color: #c0c0c0;
}
.btn-circle-xl {
  width: 20px;
  height: 30px;
  padding: 3px 0px;
  border-radius: 1px;
  text-align: center;
  font-size: 24px;
  line-height: 1.33;
  cursor: default;
  font-weight: bold;
}
.a {
  text-align: center;
}
</style>
