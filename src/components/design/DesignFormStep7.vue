<template>
    <div class="mt-4">
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
                                    :error="errors.first('flankingFastaFile1')"
                    >
                    </fasta-uploader>
                </div>
                <div class="form-group col-6">
                    <label>Flanking sequence 2</label>
                    <fasta-uploader name="flankingFastaFile2"
                                    v-validate="'required'"
                                    v-model="flankingFastaFile2"
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
                    >
                    </fasta-uploader>
                </div>
            </div>

            <div class="d-flex">
                <div>
                    <a href="#" class="btn btn-light" v-on:click="getStepBack()">
                        <i class="fas fa-chevron-left"></i> {{$t('views.getBack')}}
                    </a>
                </div>
                <div class="ml-auto">
                    <button type="button"
                            v-on:click="sendForm"
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

  export default {
    name: "DesignFormStep7",
    components: {
      FastaUploader
    },
    methods: {
      getStepBack() {
        this.$emit('goToNextStep',3);
      },
      clearNotifications : function() {
        this.$notify({
          group: 'notifications',
          clean: true
        });
      },
      onSubmit: function() {
        this.sendForm();
      },
      onEnterKeypress: function(event) {
        if(event.key === "Enter") {
          this.sendForm();
        }
      },
      sendForm: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$Progress.start();
          this.submitInProgress = true;
          this.clearNotifications();
          //TODO call the confirmation modal windows.
          this.$Progress.finish();
          this.$notify({
            group: 'notifications',
            type: 'success',
            title: 'Success'
          });
          this.submitInProgress = false;
        }
      }
    },
    data: function () {
      return {
        fastaFile: null,
        flankingFastaFile1: null,
        flankingFastaFile2: null,
        email: null,
        submitInProgress: false
      }
    }
  }
</script>

<style scoped>

</style>
