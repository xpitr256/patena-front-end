<template>
    <div class="mt-4">
        <confirmation-modal ref="modal"
                            :operation="$t('views.design.title')"
                            :distance=formData.distance
                            :email=formData.email
                            :initialSequence=formData.initialSequence.name
                            :flankingSequence1="formData.flankingSequence1 ? formData.flankingSequence1.name : null"
                            :flankingSequence2="formData.flankingSequence2 ? formData.flankingSequence2.name : null"
                            @modalConfirmation="sendForm"></confirmation-modal>
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">4</span>
            {{$t("views.patenaSettings.title")}}
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

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
                        <i class="fas fa-paper-plane mr-1"></i>
                        {{ $t("views.contact.send") }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import ConfirmationModal from "../ConfirmationModal";
  export default {
    name: "DesignFormStepFinal",
    components: {
      ConfirmationModal
    },
    props:[
      'formData'
    ],
    data: function () {
      return {
        submitInProgress: false
      }
    },
    methods:{
      getStepBack() {
        this.$emit('goToNextStep', {
          nextStep: this.formData.stepFrom
        });
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
      },
    }
  }
</script>

<style scoped>

</style>
