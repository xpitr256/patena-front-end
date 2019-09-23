<template>
    <div class="mt-4">
        <confirmation-modal ref="modal"
                            operation="Design linker"
                            :email=email
                            :initialSequence="fastaFileName"
                            :flankingSequence1=flankingFastaFile1Name
                            :flankingSequence2=flankingFastaFile2Name
                            @modalConfirmation="sendForm"></confirmation-modal>
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            Which are your flanking & initial sequences?
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="form-row">
                <div class="form-group col-6">
                    <label>Flanking sequence 1</label>
                    <fasta-uploader name="flankingFastaFile1"
                                    v-validate="'required'"
                                    v-model="flankingFastaFile1"
                                    @input="updateFlankingFastaFile1Name"
                                    :error="errors.first('flankingFastaFile1')"
                    >
                    </fasta-uploader>
                </div>
                <div class="form-group col-6">
                    <label>Flanking sequence 2</label>
                    <fasta-uploader name="flankingFastaFile2"
                                    v-validate="'required'"
                                    v-model="flankingFastaFile2"
                                    @input="updateFlankingFastaFile2Name"
                                    :error="errors.first('flankingFastaFile2')"
                    >
                    </fasta-uploader>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-6">
                    <label>Email</label>
                    <input class="form-control"
                           v-bind:class="{'is-invalid': errors.has('email')}"
                           v-validate="'required|email'"
                           placeholder="Email"
                           ref="email"
                           name="email"
                           v-model="email"
                           type="email">
                    <div class="invalid-feedback">
                        {{ errors.first('email') }}
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label><strong>Initial</strong> sequence</label>
                    <fasta-uploader name="fastaFile"
                                    v-validate="'required'"
                                    v-model="fastaFile"
                                    :error="errors.first('fastaFile')"
                                    @input="updateFastaFileName"
                    >
                    </fasta-uploader>
                </div>
            </div>

            <div class="d-flex">
                <div>
                    <a href="#" class="btn btn-light" v-on:click="getStepBack">
                        <i class="fas fa-chevron-left"></i> {{$t('views.getBack')}}
                    </a>
                </div>
                <div class="ml-auto">
                    <button type="button"
                            v-on:click="launchConfirmationModal"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-primary">
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
  import ConfirmationModal from "../ConfirmationModal";

  export default {
    name: "DesignFormStep7",
    components: {
      FastaUploader,
      ConfirmationModal
    },
    methods: {
      getStepBack() {
        this.$emit('goToNextStep',3);
      },
      updateFlankingFastaFile1Name: function() {
        this.flankingFastaFile1Name = this.flankingFastaFile1.name;
      },
      updateFlankingFastaFile2Name: function() {
        this.flankingFastaFile2Name = this.flankingFastaFile2.name;
      },
      updateFastaFileName: function() {
        this.fastaFileName = this.fastaFile.name;
      },

      clearNotifications : function() {
        this.$notify({
          group: 'notifications',
          clean: true
        });
      },
      onSubmit: function() {
        this.launchConfirmationModal();
      },
      onEnterKeypress: function(event) {
        if(event.key === "Enter") {
          this.launchConfirmationModal();
        }
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
          this.$Progress.finish();
          this.$notify({
            group: 'notifications',
            type: 'success',
            title: 'Success'
          });
          this.submitInProgress = false;
        }
    },
    data: function () {
      return {
        fastaFile: null,
        fastaFileName: null,
        flankingFastaFile1: null,
        flankingFastaFile1Name: null,
        flankingFastaFile2: null,
        flankingFastaFile2Name: null,
        email: null,
        submitInProgress: false
      }
    }
  }
</script>

<style scoped>

</style>
