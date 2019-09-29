<template>
    <div class="mt-4">
        <confirmation-modal ref="modal"
                            operation="Design linker"
                            :email=email
                            :distance=distance
                            :initialSequence="'-none-'"
                            :flankingSequence1=flankingFastaFile1Name
                            :flankingSequence2=flankingFastaFile2Name
                            @modalConfirmation="sendForm"></confirmation-modal>
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            {{$t("views.design.rdStepFS")}}
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="form-row">
                <div class="form-group col-6">
                    <label>{{$t("views.design.rdStepLabelFS1")}}</label>
                    <fasta-uploader name="flankingFastaFile1"
                                    v-validate="'required'"
                                    v-model="flankingFastaFile1"
                                    @input="updateFlankingFastaFile1Name"
                                    :error="errors.first('flankingFastaFile1')"
                    >
                    </fasta-uploader>
                </div>
                <div class="form-group col-6">
                    <label>{{$t("views.design.rdStepLabelFS2")}}</label>
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
                    <label>{{$t("views.design.rdStepDistanceFS")}}</label>
                    <div class="input-group mb-3">
                        <input type="text"
                               class="form-control"
                               id="distance"
                               ref="distance"
                               v-bind:class="{'is-invalid': errors.has('distance')}"
                               v-validate="'required|numeric|min:1|max:3|'"
                               name="distance"
                               v-on:keypress="onEnterKeypress"
                               v-model="distance"
                               :placeholder="$t('views.design.placeholder')">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">&#8491;</span>
                        </div>
                        <div class="invalid-feedback">
                            {{ errors.first('distance') }}
                        </div>
                    </div>
                </div>
                <div class="form-group col-6">
                    <label>Email</label>
                    <input class="form-control"
                           v-bind:class="{'is-invalid': errors.has('email')}"
                           v-validate="'required|email'"
                           placeholder="Email"
                           ref="email"
                           v-on:keypress="onEnterKeypress"
                           name="email"
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
    name: "DesignFormStep6",
    components: {
      FastaUploader,
      ConfirmationModal
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
      launchConfirmationModal: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$refs.modal.show();
        }
      },
      onSubmit: function() {
        this.launchConfirmationModal();
      },
      onEnterKeypress: function(event) {
        if(event.key === "Enter") {
          this.launchConfirmationModal();
        }
      },
      updateFlankingFastaFile1Name: function() {
        this.flankingFastaFile1Name = this.flankingFastaFile1.name;
      },
      updateFlankingFastaFile2Name: function() {
        this.flankingFastaFile2Name = this.flankingFastaFile2.name;
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
        flankingFastaFile1: null,
        flankingFastaFile1Name: null,
        flankingFastaFile2: null,
        flankingFastaFile2Name: null,
        email: null,
        distance: null,
        submitInProgress: false
      }
    }
  }
</script>

<style scoped>

</style>
