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
      {{ $t("views.design.rdStepFS") }}
    </h2>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-6">
          <label>{{ $t("views.design.rdStepLabelFS1") }}</label>
          <fasta-uploader v-model="flankingSequence1"> </fasta-uploader>
          <fasta-validator
            :fasta-file="flankingSequence1"
            :fasta-content="flankingSequence1Content"
            id="flankingSequence1"
            name="flankingSequence1"
            :characters-in-line="50"
            :highlight-at-the-end="true"
            :highlighted-characters-amount="100"
            @newFastaValidation="updateFormValidation"
            :error="errors.first('flankingSequence1')"
            v-validate="'required'"
          ></fasta-validator>
        </div>
        <div class="form-group col-6">
          <label>{{ $t("views.design.rdStepLabelFS2") }}</label>
          <fasta-uploader v-model="flankingSequence2"> </fasta-uploader>
          <fasta-validator
            :fasta-file="flankingSequence2"
            :fasta-content="flankingSequence2Content"
            id="flankingSequence2"
            name="flankingSequence2"
            :characters-in-line="50"
            :highlight-at-the-end="true"
            :highlighted-characters-amount="100"
            @newFastaValidation="updateFormValidation"
            :error="errors.first('flankingSequence2')"
            v-validate="'required'"
          ></fasta-validator>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-3">
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
        <div class="form-group col-2">
          <label>{{ $t("views.design.rdStepCalculatedLength") }}</label>
          <input class="form-control" name="length" ref="length" v-model="length" type="text" readonly />
        </div>

        <div class="form-group col-6">
          <label>Email</label>
          <input class="form-control" placeholder="Email" ref="email" v-on:keypress="onEnterKeypress" name="email" v-model="email" type="email" />
        </div>
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
import FastaUploader from "../../components/FastaUploader";
import FastaValidator from "../FastaValidator";
import FastaService from "../../services/FastaService";
import BackendService from "../../services/BackendService";

export default {
  name: "DesignFormStep6",
  components: {
    FastaValidator,
    FastaUploader
  },
  watch: {
    email: function(newVal) {
      if (newVal) {
        sessionStorage.setItem("step6.email", newVal);
      }
    },
    distance: function(newVal) {
      if (newVal) {
        sessionStorage.setItem("step6.distance", newVal);
      }
    },
    flankingSequence1: async function(newVal) {
      if (newVal) {
        const flankingSequence1Content = await FastaService.getFastaFileContent(this.flankingSequence1);
        sessionStorage.setItem("step6.flankingSequence1.name", FastaService.getSequenceName(flankingSequence1Content));
        sessionStorage.setItem("step6.flankingSequence1.value", FastaService.getFirstSequence(flankingSequence1Content));
        this.flankingSequence1Content = {
          name: sessionStorage.getItem("step6.flankingSequence1.name"),
          value: sessionStorage.getItem("step6.flankingSequence1.value")
        };
      }
    },
    flankingSequence2: async function(newVal) {
      if (newVal) {
        const flankingSequence2Content = await FastaService.getFastaFileContent(this.flankingSequence2);
        sessionStorage.setItem("step6.flankingSequence2.name", FastaService.getSequenceName(flankingSequence2Content));
        sessionStorage.setItem("step6.flankingSequence2.value", FastaService.getFirstSequence(flankingSequence2Content));
        this.flankingSequence2Content = {
          name: sessionStorage.getItem("step6.flankingSequence2.name"),
          value: sessionStorage.getItem("step6.flankingSequence2.value")
        };
      }
    }
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
    this.email = sessionStorage.getItem("step6.email") ? sessionStorage.getItem("step6.email") : this.email;
    if (sessionStorage.getItem("step6.flankingSequence1.name") && sessionStorage.getItem("step6.flankingSequence1.value")) {
      this.flankingSequence1Content = {
        name: sessionStorage.getItem("step6.flankingSequence1.name"),
        value: sessionStorage.getItem("step6.flankingSequence1.value")
      };
    }
    if (sessionStorage.getItem("step6.flankingSequence2.name") && sessionStorage.getItem("step6.flankingSequence2.value")) {
      this.flankingSequence2Content = {
        name: sessionStorage.getItem("step6.flankingSequence2.name"),
        value: sessionStorage.getItem("step6.flankingSequence2.value")
      };
    }
    if (sessionStorage.getItem("step6.distance")) {
      this.distance = sessionStorage.getItem("step6.distance");
      this.distanceChanged({
        data: this.distance
      });
    }
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
    updateFormValidation: function(id, isValid, hasNewValue) {
      this.$validator.errors.clear();
      if (!isValid && hasNewValue) {
        this.errors.add({
          field: id,
          msg: "Please provide a fasta file according to the following suggestions"
        });
      }
    },
    next: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        this.$emit("goToNextStep", {
          nextStep: "Final",
          formData: {
            stepFrom: 6,
            email: this.email,
            distance: this.distance,
            initialSequence: {
              name: this.$t("views.design.noInitialSequence")
            },
            flankingSequence1: this.flankingSequence1Content,
            flankingSequence2: this.flankingSequence2Content
          }
        });
      }
    },
    onSubmit: function() {
      this.next();
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
      //await this.$validator.validate();
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
    onEnterKeypress: function(event) {
      if (event.key === "Enter") {
        this.next();
      }
    }
  },
  data: function() {
    return {
      flankingSequence1: null,
      flankingSequence1Content: null,
      flankingSequence2: null,
      flankingSequence2Content: null,
      email: null,
      distance: null,
      length: null
    };
  }
};
</script>

<style scoped></style>
