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
      {{ $t("views.design.rdStepIS") }}
    </h2>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-5">
          <fasta-uploader v-model="initialSequence"> </fasta-uploader>
          <label class="mt-4">Email</label>
          <input class="form-control" placeholder="Email" ref="email" name="email" v-on:keypress="onEnterKeypress" v-model="email" type="email" />
        </div>
        <div class="form-group col-7">
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
import FastaValidator from "../FastaValidator";
import FastaUploader from "../../components/FastaUploader";
import FastaService from "../../services/FastaService";

export default {
  name: "DesignFormStep5",
  components: {
    FastaValidator,
    FastaUploader
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
    onEnterKeypress: function(event) {
      if (event.key === "Enter") {
        this.next();
      }
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
            stepFrom: 5,
            email: this.email,
            initialSequence: this.initialSequenceContent
          }
        });
      }
    }
  },
  watch: {
    email: function(newVal) {
      if (newVal) {
        sessionStorage.setItem("step5.email", newVal);
      }
    },
    initialSequence: async function(newVal) {
      if (newVal) {
        const initialSequenceContent = await FastaService.getFastaFileContent(this.initialSequence);
        sessionStorage.setItem("step5.initialSequence.name", FastaService.getSequenceName(initialSequenceContent));
        sessionStorage.setItem("step5.initialSequence.value", FastaService.getFirstSequence(initialSequenceContent));
        this.initialSequenceContent = {
          name: sessionStorage.getItem("step5.initialSequence.name"),
          value: sessionStorage.getItem("step5.initialSequence.value")
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
    this.email = sessionStorage.getItem("step5.email") ? sessionStorage.getItem("step5.email") : this.email;
    if (sessionStorage.getItem("step5.initialSequence.name") && sessionStorage.getItem("step5.initialSequence.value")) {
      this.initialSequenceContent = {
        name: sessionStorage.getItem("step5.initialSequence.name"),
        value: sessionStorage.getItem("step5.initialSequence.value")
      };
    }
  },
  data: function() {
    return {
      initialSequence: null,
      initialSequenceContent: null,
      email: null
    };
  }
};
</script>

<style scoped></style>
