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
      {{ $t("views.design.rdStepISFS") }}
    </h2>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-6">
          <label
            ><strong>{{ $t("views.design.rdStepLabelFS1") }}</strong></label
          >
          <fasta-uploader v-model="flankingSequence1"></fasta-uploader>
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
          <label
            ><strong>{{ $t("views.design.rdStepLabelFS2") }}</strong></label
          >
          <fasta-uploader v-model="flankingSequence2"></fasta-uploader>
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
        <div class="form-group col-6">
          <label><strong>Email</strong></label>
          <input class="form-control" placeholder="Email" ref="email" name="email" v-model="email" v-on:keypress="onEnterKeypress" type="email" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-5">
          <label
            ><strong>{{ $t("views.design.rdStepLabelIS") }}</strong></label
          >
          <fasta-uploader v-model="initialSequence"> </fasta-uploader>
        </div>
        <div class="form-group col-7">
          <label>&nbsp;</label>
          <fasta-validator
            :fasta-file="initialSequence"
            :fasta-content="initialSequenceContent"
            id="initialSequence"
            :characters-in-line="60"
            @newFastaValidation="updateFormValidation"
            name="initialSequence"
            :error="errors.first('initialSequence')"
            v-validate="'required'"
          ></fasta-validator>
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

export default {
  name: "DesignFormStep7",
  components: {
    FastaUploader,
    FastaValidator
  },
  watch: {
    email: function(newVal) {
      if (newVal) {
        sessionStorage.setItem("step7.email", newVal);
      }
    },
    initialSequence: async function(newVal) {
      if (newVal) {
        const initialSequenceContent = await FastaService.getFastaFileContent(this.initialSequence);
        sessionStorage.setItem("step7.initialSequence.name", FastaService.getSequenceName(initialSequenceContent));
        sessionStorage.setItem("step7.initialSequence.value", FastaService.getFirstSequence(initialSequenceContent));
      }
    },
    flankingSequence1: async function(newVal) {
      if (newVal) {
        const flankingSequence1Content = await FastaService.getFastaFileContent(this.flankingSequence1);
        sessionStorage.setItem("step7.flankingSequence1.name", FastaService.getSequenceName(flankingSequence1Content));
        sessionStorage.setItem("step7.flankingSequence1.value", FastaService.getFirstSequence(flankingSequence1Content));
      }
    },
    flankingSequence2: async function(newVal) {
      if (newVal) {
        const flankingSequence2Content = await FastaService.getFastaFileContent(this.flankingSequence2);
        sessionStorage.setItem("step7.flankingSequence2.name", FastaService.getSequenceName(flankingSequence2Content));
        sessionStorage.setItem("step7.flankingSequence2.value", FastaService.getFirstSequence(flankingSequence2Content));
      }
    }
  },
  mounted() {
    const self = this;
    window.addEventListener("keyup", function(event) {
      if (event.key === "Enter" && self.nextStep) {
        self.next();
      }
      if (event.key === "Backspace" && event.target.tagName !== "INPUT") {
        self.getStepBack();
      }
    });
    this.email = sessionStorage.getItem("step7.email") ? sessionStorage.getItem("step7.email") : this.email;
    if (sessionStorage.getItem("step7.initialSequence.name") && sessionStorage.getItem("step7.initialSequence.value")) {
      this.initialSequenceContent = {
        name: sessionStorage.getItem("step7.initialSequence.name"),
        value: sessionStorage.getItem("step7.initialSequence.value")
      };
    }
    if (sessionStorage.getItem("step7.flankingSequence1.name") && sessionStorage.getItem("step7.flankingSequence1.value")) {
      this.flankingSequence1Content = {
        name: sessionStorage.getItem("step7.flankingSequence1.name"),
        value: sessionStorage.getItem("step7.flankingSequence1.value")
      };
    }
    if (sessionStorage.getItem("step7.flankingSequence2.name") && sessionStorage.getItem("step7.flankingSequence2.value")) {
      this.flankingSequence2Content = {
        name: sessionStorage.getItem("step7.flankingSequence2.name"),
        value: sessionStorage.getItem("step7.flankingSequence2.value")
      };
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
    onSubmit: function() {
      this.next();
    },
    onEnterKeypress: function(event) {
      if (event.key === "Enter") {
        this.next();
      }
    },
    next: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        const initialSequenceContent = await FastaService.getFastaFileContent(this.initialSequence);
        const flankingSequence1Content = await FastaService.getFastaFileContent(this.flankingSequence1);
        const flankingSequence2Content = await FastaService.getFastaFileContent(this.flankingSequence2);
        this.$emit("goToNextStep", {
          nextStep: "Final",
          formData: {
            stepFrom: 7,
            email: this.email,
            initialSequence: {
              name: FastaService.getSequenceName(initialSequenceContent),
              value: FastaService.getFirstSequence(initialSequenceContent)
            },
            flankingSequence1: {
              name: FastaService.getSequenceName(flankingSequence1Content),
              value: FastaService.getFirstSequence(flankingSequence1Content)
            },
            flankingSequence2: {
              name: FastaService.getSequenceName(flankingSequence2Content),
              value: FastaService.getFirstSequence(flankingSequence2Content)
            }
          }
        });
      }
    }
  },
  data: function() {
    return {
      initialSequence: null,
      flankingSequence1: null,
      flankingSequence2: null,
      initialSequenceContent: null,
      flankingSequence1Content: null,
      flankingSequence2Content: null,
      email: null
    };
  }
};
</script>

<style scoped></style>
