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
        <div class="form-group col">
          <fasta-uploader
            name="fasta"
            v-validate="'required'"
            v-model="fastaFile"
            @input="updateFastaFileName"
            :error="errors.first('fasta')"
          >
          </fasta-uploader>
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
            v-model="email"
            type="email"
          />
          <div class="invalid-feedback">
            {{ errors.first("email") }}
          </div>
        </div>
      </div>

      <div class="form-row">
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
import { ValidationProvider } from "vee-validate";
import ConfirmationModal from "../components/ConfirmationModal";

export default {
  name: "analyze",
  components: {
    FastaUploader,
    ValidationProvider,
    ConfirmationModal
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  methods: {
    updateFastaFileName: function() {
      this.fastaFileName = this.fastaFile.name;
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
      let response = await BackendService.analyzeLinker();
      this.$Progress.finish();
      this.$notify({
        group: "notifications",
        type: "success",
        title: "Success",
        text: "Data is correct!"
      });
      this.$router.push("/analyze/success");
      this.$route.params.orderNumber = response.orderNumber;
      this.$route.params.email = this.email;
      this.$route.params.fastaName = this.fastaFile.name;
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
