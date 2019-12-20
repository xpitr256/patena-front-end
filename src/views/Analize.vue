<template>
  <div class="container wrapper">
    <Confirmation-modal
      ref="modal"
      :operation="$t('views.analyze.title')"
      :email="email"
      :sequence="fastaFileName"
      @modalConfirmation="sendForm"
    ></Confirmation-modal>

    <h1 class="display-4 h-page-header">{{ $t("views.analyze.title") }}</h1>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-5">
          <fasta-uploader
            name="fastaFile"
            v-validate="'required'"
            v-model="fastaFile"
            @input="updateFastaFileName"
            :error="errors.first('fastaFile')"
          >
          </fasta-uploader>
          <label class="mt-4">Email</label>
          <input
                  class="form-control"
                  v-bind:class="{ 'is-invalid': errors.has('email') }"
                  v-validate="'required|email'"
                  placeholder="Email"
                  ref="email"
                  name="email"
                  v-model="email"
                  type="email"
          />
          <div class="invalid-feedback">
            {{ errors.first("email") }}
          </div>
        </div>
        <div class="form-group col-7">
          <fasta-validator
                  :fasta-file="fastaFile"
                  id="fastaFile"
                  :characters-in-line="60"
                  @newFastaValidation="updateFormValidation"
          ></fasta-validator>
        </div>
      </div>

      <div class="form-row text-center mt-4">
        <div class="form-group col">
          <button
            type="button"
            v-on:click="launchConfirmationModal"
            :disabled="submitInProgress || errors.items.length > 0"
            class="btn btn-lg btn-primary"
          >
            <i class="fas fa-paper-plane mr-1"></i>
            {{ $t("views.contact.send") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import FastaUploader from "../components/FastaUploader";
import BackendService from "../services/BackendService";
import FastaValidator from "../components/FastaValidator";
import { ValidationProvider } from "vee-validate";
import ConfirmationModal from "../components/ConfirmationModal";
import FastaService from "../services/FastaService";

export default {
  name: "analyze",
  components: {
    FastaUploader,
    ValidationProvider,
    ConfirmationModal,
    FastaValidator
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  methods: {
    updateFastaFileName: function() {
      this.fastaFileName = this.fastaFile ? this.fastaFile.name : null;
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
    clearNotifications: function() {
      this.$notify({
        group: "notifications",
        clean: true
      });
    },
    onSubmit: function() {
      this.launchConfirmationModal();
    },
    setFocus: function() {
      this.$refs.email.focus();
    },
    launchConfirmationModal: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        this.$refs.modal.show();
      }
    },
    sendForm: async function() {
      this.$Progress.start();
      this.submitInProgress = true;
      this.clearNotifications();

      const fastaFileContent = await FastaService.getFastaFileContent(
        this.fastaFile
      );
      const sequence = {
        name: this.fastaFileName,
        value: FastaService.getFirstSequence(fastaFileContent)
      };

      const response = await BackendService.analyzeLinker(this.email, sequence);
      this.$Progress.finish();
      if (!response.error) {
        this.$notify({
          group: "notifications",
          type: "success",
          title: this.$t("views.sendSuccess")
        });
        this.$router.push("/analyze/success");
        this.$route.params.orderNumber = response.orderNumber;
        this.$route.params.email = this.email;
        this.$route.params.fastaName = this.fastaFile.name;
      } else {
        this.$notify({
          group: "notifications",
          type: "error",
          title: response.error
        });
      }
      this.submitInProgress = false;
    }
  },
  data: function() {
    return {
      fastaFile: null,
      email: null,
      submitInProgress: false,
      fastaFileName: null
    };
  }
};
</script>
<style scoped></style>
