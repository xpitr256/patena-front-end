<template>
  <div class="mt-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="goToStep(1)">{{
            $t("views.design.breadcrumb.step1")
          }}</a>
        </li>
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="getStepBack">{{
            $t("views.design.breadcrumb.step2InitialData")
          }}</a>
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
        <div class="form-group col-md-6">
          <label>{{ $t("views.design.rdStepDistanceFS") }}</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="distance"
              ref="distance"
              v-bind:class="{ 'is-invalid': errors.has('distance') }"
              v-validate="'required|numeric|min:1|max:3|min_value:1'"
              name="distance"
              v-on:keypress="onEnterKeypress"
              v-model="distance"
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

        <div class="form-group col-md-6">
          <label>Email</label>
          <input
            class="form-control"
            placeholder="Email"
            name="email"
            v-on:keypress="onEnterKeypress"
            ref="email"
            v-model="email"
            type="email"
          />
        </div>
      </div>

      <div class="alert alert-warning mb-4" role="alert">
        <i class="fas fa-exclamation-triangle"></i>
        {{ $t("views.design.rdStepAlertNothing") }}
      </div>

      <div class="d-flex">
        <div>
          <a href="#" class="btn btn-light" v-on:click="getStepBack">
            <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }}
          </a>
        </div>
        <div class="ml-auto">
          <button
            type="button"
            v-on:click="next"
            :disabled="errors.items.length > 0"
            class="btn btn-primary"
          >
            {{ $t("views.design.next") }}
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "DesignFormStep4",
  components: {
    ValidationProvider
  },
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

    setFocus: function() {
      this.$refs.distance.focus();
    }
  },
  created: function() {
    setTimeout(x => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  data: function() {
    return {
      distance: null,
      email: null
    };
  }
};
</script>

<style scoped></style>
