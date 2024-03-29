<template>
  <div class="mt-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="goToStep(1)">{{ $t("views.design.breadcrumb.step1") }}</a>
        </li>
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="getStepBack">{{ $t("views.design.breadcrumb.step2InitialData") }}</a>
        </li>
        <li class="breadcrumb-item active">
          {{ $t("views.design.breadcrumb.step3") }}
        </li>
      </ol>
    </nav>

    <h2 class="h-light mt-5">
      <span class="badge badge-secondary">3</span>
      {{ $t("views.design.rdStepNothing") }}
    </h2>
    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-md-3">
          <label>{{ $t("views.design.rdStepDistanceFS") }}</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="distance"
              ref="distance"
              v-bind:class="{ 'is-invalid': errors.has('distance') }"
              v-validate="'required|decimal:1|max_value:100|min_value:0.1'"
              name="distance"
              v-on:keyup="onDistanceKeypress"
              v-model="distance"
              @input="distanceChanged"
              :placeholder="$t('views.design.placeholder')"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">&#8491;</span>
            </div>
            <div class="invalid-feedback">
              {{ errors.first("distance") }}
            </div>
          </div>
        </div>

        <div class="form-group col-md-2">
          <label>{{ $t("views.design.rdStepCalculatedLength") }}</label>
          <input class="form-control" name="length" ref="length" v-model="length" type="text" readonly />
        </div>

        <div class="form-group col-md-1"></div>

        <div class="form-group col-md-6">
          <label>Email</label>
          <input class="form-control" placeholder="Email" name="email" v-on:keypress="onEnterKeypress" ref="email" v-model="email" type="email" />
        </div>
      </div>

      <div class="alert alert-warning mb-4" role="alert">
        <i class="fas fa-exclamation-triangle"></i>
        {{ $t("views.design.rdStepAlertNothing") }}
      </div>

      <div class="d-flex">
        <div>
          <a href="#" class="btn btn-light" v-on:click="getStepBack"> <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }} </a>
        </div>
        <div class="ml-auto">
          <button type="button" v-on:click="next" :disabled="errors.items.length > 0" class="btn btn-primary">
            {{ $t("views.design.next") }}
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BackendService from "../../services/BackendService";

export default {
  name: "DesignFormStep4",
  methods: {
    getStepBack() {
      this.goToStep(3);
    },
    goToStep(step) {
      this.$emit("goToNextStep", {
        nextStep: step
      });
    },
    onSubmit: function() {
      this.next();
    },
    next: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        this.$emit("goToNextStep", {
          nextStep: "Final",
          formData: {
            stepFrom: 4,
            distance: this.distance,
            email: this.email,
            initialSequence: {
              name: this.$t("views.design.noInitialSequence")
            }
          }
        });
      }
    },
    onEnterKeypress: function(event) {
      if (event.key === "Enter") {
        this.next();
      }
    },
    onDistanceKeypress: function(event) {
      if (event.key === "Enter") {
        this.next();
      } else {
        this.distanceChanged({
          data: this.distance
        });
      }
    },
    distanceChanged: async function(event) {
      this.length = null;
      await this.$validator.validate();
      if (!this.errors.has("distance") && event.data !== null) {
        try {
          this.$Progress.start();
          const response = await BackendService.calculateLength(this.distance);
          this.length = response.length;
          this.$Progress.finish();
        } catch (e) {
          // canceled requests got here.
        }
      }
    },

    setFocus: function() {
      this.$refs.distance.focus();
    }
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  mounted() {
    const self = this;
    window.addEventListener("keyup", function(event) {
      if (event.key === "Enter" && self.nextStep) {
        self.next();
      }
      if (event.key === "Backspace" && event.target.localName !== "input") {
        self.getStepBack();
      }
    });
    this.email = sessionStorage.getItem("step4.email") ? sessionStorage.getItem("step4.email") : this.email;
    if (sessionStorage.getItem("step4.distance")) {
      this.distance = sessionStorage.getItem("step4.distance");
      this.distanceChanged({
        data: this.distance
      });
    }
  },
  watch: {
    distance: function(newVal) {
      if (newVal) {
        sessionStorage.setItem("step4.distance", newVal);
      }
    },
    email: function(newVal) {
      if (newVal) {
        sessionStorage.setItem("step4.email", newVal);
      }
    }
  },
  data: function() {
    return {
      distance: null,
      length: null,
      email: null
    };
  }
};
</script>

<style scoped></style>
