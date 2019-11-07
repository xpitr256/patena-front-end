<template>
  <div class="mt-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="getStepBack">{{
            $t("views.design.breadcrumb.step1")
          }}</a>
        </li>
        <li class="breadcrumb-item active">
          {{ $t("views.design.breadcrumb.step2InitialData") }}
        </li>
      </ol>
    </nav>

    <h2 class="h-light mt-5">
      <span class="badge badge-secondary">2</span>
      {{ $t("views.design.ndStepSequence") }}
    </h2>

    <div class="button-wrap mt-4 ml-5 mb-4">
      <input
        class="hidden radio-label"
        v-model="nextStep"
        v-bind:value="4"
        type="radio"
        id="nothing-button"
      />
      <label class="button-label" for="nothing-button">
        <span>{{ $t("views.design.ndStepSequenceNothing") }}</span>
      </label>
      <br />
      <input
        class="hidden radio-label"
        v-model="nextStep"
        v-bind:value="5"
        type="radio"
        id="sequence-button"
      />
      <label class="button-label" for="sequence-button">
        <span>{{ $t("views.design.ndStepSequenceIS") }}</span>
      </label>

      <br />
      <input
        class="hidden radio-label"
        v-model="nextStep"
        v-bind:value="6"
        type="radio"
        id="flanking-button"
      />
      <label class="button-label" for="flanking-button">
        <span>{{ $t("views.design.ndStepSequenceFS") }}</span>
      </label>

      <br />
      <input
        class="hidden radio-label"
        v-model="nextStep"
        v-bind:value="7"
        type="radio"
        id="sequence-flanking-button"
      />
      <label class="button-label" for="sequence-flanking-button">
        <span>{{ $t("views.design.ndStepSequenceISFS") }}</span>
      </label>
    </div>

    <div class="d-flex">
      <div>
        <a href="#" class="btn btn-light" v-on:click="getStepBack">
          <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }}
        </a>
      </div>
      <div class="ml-auto">
        <button
          class="btn btn-primary"
          @click="next"
          :disabled="nextStep === null"
        >
          {{ $t("views.design.next") }} <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DesignFormStep3",
  mounted() {
    const self = this;
    window.addEventListener("keyup", function(event) {
      if (event.key === "Enter" && self.nextStep) {
        self.next();
      }
      if (event.key === "Backspace") {
        self.getStepBack();
      }
    });
  },
  methods: {
    getStepBack() {
      this.$emit("goToNextStep", {
        nextStep: 1
      });
    },
    next: function() {
      this.$emit("goToNextStep", {
        nextStep: this.nextStep
      });
    }
  },
  data: function() {
    return {
      nextStep: null
    };
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300, 400, 900);
.button-wrap {
  position: relative;
  top: 50%;
}
@media (max-width: 40em) {
  .button-wrap {
    margin-top: -1.5em;
  }
}

.button-label {
  min-width: 100%;
  display: inline-block;
  padding: 1em 2em;
  margin: 0.5em;
  cursor: pointer;
  color: #292929;
  border-radius: 0.25em;
  background: #efefef;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.22);
  transition: 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.button-label span {
  font-size: 1.1em;
  font-family: "Lato", sans-serif;
}
.button-label:hover {
  background: #d6d6d6;
  color: #101010;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.32);
}
.button-label:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
    inset 0px -1px 0 rgba(0, 0, 0, 0.22);
}
@media (max-width: 40em) {
  .button-label {
    padding: 0em 1em 3px;
    margin: 0.25em;
  }
}

.radio-label:checked + .button-label {
  background: #2ecc71;
  color: #efefef;
}
.radio-label:checked + .button-label:hover {
  background: #29b765;
  color: #e2e2e2;
}

.hidden {
  display: none;
}
</style>
