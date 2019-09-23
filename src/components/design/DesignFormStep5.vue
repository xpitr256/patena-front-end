<template>
    <div class="mt-4">
        <confirmation-modal ref="modal"
                            operation="Design linker"
                            :email=email
                            :initialSequence=fastaFileName
                            @modalConfirmation="sendForm"></confirmation-modal>
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            Which is your initial sequence ?
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="form-row">
                <div class="form-group col">
                    <fasta-uploader name="fasta"
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
                    <input class="form-control"
                           v-bind:class="{'is-invalid': errors.has('email')}"
                           v-validate="'required|email'"
                           placeholder="Email"
                           ref="email"
                           name="email"
                           v-on:keypress="onEnterKeypress"
                           v-model="email"
                           type="email">
                    <div class="invalid-feedback">
                        {{ errors.first('email') }}
                    </div>
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
    name: "DesignFormStep5",
    components: {
      FastaUploader,
      ConfirmationModal
    },
    methods: {
      getStepBack() {
        this.$emit('goToNextStep',3);
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
        email: null,
        submitInProgress: false
      }
    }
  }
</script>

<style scoped>

</style>
