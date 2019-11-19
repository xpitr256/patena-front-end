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
      {{ $t("views.design.rdStepIS") }}
    </h2>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col">
          <fasta-uploader
            name="initialSequence"
            v-validate="'required'"
            v-model="initialSequence"
            :error="errors.first('initialSequence')"
          >
          </fasta-uploader>
          <fasta-validator
            :fasta-file="initialSequence"
            id="initialSequence"
            :characters-in-line="70"
            @newFastaValidation="updateFormValidation"
          ></fasta-validator>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-6">
          <label>Email</label>
          <input
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.has('email') }"
            v-validate="'required|email'"
            placeholder="Email"
            ref="email"
            name="email"
            v-on:keypress="onEnterKeypress"
            v-model="email"
            type="email"
          />
          <div class="invalid-feedback">
            {{ errors.first("email") }}
          </div>
        </div>
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
    updateFormValidation: function(id, isValid) {
      if (!isValid) {
        this.errors.add({
          field: id,
          msg:
            "Please provide a fasta file according to the following suggestions"
        });
      }
    },
    next: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        const initialSequenceContent = await FastaService.getFastaFileContent(
          this.initialSequence
        );
        this.$emit("goToNextStep", {
          nextStep: "Final",
          formData: {
            stepFrom: 5,
            email: this.email,
            initialSequence: {
              name: this.initialSequence.name,
              value: FastaService.getFirstSequence(initialSequenceContent)
            }
          }
        });
      }
    }
  },
  data: function() {
    return {
      initialSequence: null,
      email: null
    };
  }
};
</script>

<style scoped></style>
