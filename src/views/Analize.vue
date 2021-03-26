<template>
  <div class="container wrapper">
    <Confirmation-modal
      ref="modal"
      :operation="$t('views.analyze.title')"
      :email="email"
      :sequence="sequenceName"
      @modalConfirmation="sendForm"
    ></Confirmation-modal>

    <h1 class="display-4 h-page-header">{{ $t("views.analyze.title") }}</h1>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-5">
          <fasta-uploader name="fastaFile" v-validate="'required'" v-model="fastaFile" :error="errors.first('fastaFile')"> </fasta-uploader>
          <label class="mt-4">Email</label>
          <input class="form-control" placeholder="Email" ref="email" name="email" v-model="email" type="email" />
        </div>
        <div class="form-group col-7">
          <fasta-validator :fasta-file="fastaFile" id="fastaFile" :characters-in-line="60" @newFastaValidation="updateFormValidation"></fasta-validator>
        </div>
      </div>

      <div class="form-row text-center mt-4">
        <div class="form-group col">
          <button type="button" v-on:click="launchConfirmationModal" :disabled="submitInProgress || errors.items.length > 0" class="btn btn-lg btn-primary">
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
import ConfirmationModal from "../components/ConfirmationModal";
import FastaService from "../services/FastaService";

export default {
  name: "analyze",
  components: {
    FastaUploader,
    ConfirmationModal,
    FastaValidator
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  methods: {
    updateFormValidation: function(id, isValid, sequenceName) {
      if (!isValid) {
        this.errors.add({
          field: id,
          msg: "Please provide a fasta file according to the following suggestions"
        });
      }

      if (sequenceName) {
        this.sequenceName = sequenceName;
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

      const fastaFileContent = await FastaService.getFastaFileContent(this.fastaFile);
      const sequence = {
        name: this.sequenceName,
        value: FastaService.getFirstSequence(fastaFileContent)
      };
      const postData = {
        email: this.email,
        sequence: sequence,
        language: this["$i18n"].locale
      };
      const response = await BackendService.analyzeLinker(postData);
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
      sequenceName: null
    };
  },
  getDesignData: function() {
    let data = JSON.parse(JSON.stringify(this.formData));
    delete data.stepFrom;
    data.designType = this.designTypeMap.get(this.formData.stepFrom);

    // remove non initial sequences cases
    if (!data.initialSequence.value) {
      delete data.initialSequence;
    }

    if (!this.useDefaultSettings) {
      data.config = {
        frequencies: this.getFrequenciesDataForBackend(),
        algorithms: this.getAlgorithmsDataForBackend()
      };

      if (this.isEnabledNetCharge()) {
        data.config.netCharge = this.netCharge;
      }
    }

    data.language = this["$i18n"].locale;

    return data;
  }
};
</script>
<style scoped></style>
