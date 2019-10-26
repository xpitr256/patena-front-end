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


        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a class="black-text" href="#" v-on:click="goToStep(1)">{{$t("views.design.breadcrumb.step1")}}</a></li>
                <li class="breadcrumb-item"><a class="black-text" href="#" v-on:click="goToStep(3)">{{$t("views.design.breadcrumb.step2InitialData")}}</a></li>
                <li class="breadcrumb-item"><a class="black-text" href="#" v-on:click="getStepBack">{{$t("views.design.breadcrumb.step3")}}</a></li>
                <li class="breadcrumb-item active">{{$t("views.design.breadcrumb.step4")}}</li>
            </ol>
        </nav>


        <h2 class="h-light mt-5">
            <span class="badge badge-secondary">4</span>
            {{$t("views.patenaSettings.title")}}
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="button-wrap mt-4">
                <input class="hidden radio-label" v-model="useDefaultSettings" v-bind:value="true" type="radio" id="length-button"/>
                <label class="button-label" for="length-button">
                    <span>{{$t("views.patenaSettings.useDefaultSettings")}}</span>
                </label>
                <input class="hidden radio-label" v-model="useDefaultSettings" v-bind:value="false" type="radio" id="sequence-button"/>
                <label class="button-label" for="sequence-button">
                    <span>{{$t("views.patenaSettings.useCustomSettings")}}</span>
                </label>
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
                            :disabled="submitInProgress || errors.items.length > 0 || useDefaultSettings === null"
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
        submitInProgress: false,
        useDefaultSettings: null
      }
    },
    methods:{

        getStepBack() {
            this.goToStep(this.formData.stepFrom)
        },
        goToStep(step) {
            this.$emit('goToNextStep', {
                nextStep: step
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
    @import url(https://fonts.googleapis.com/css?family=Lato:300,400,900);
    .button-wrap {
        position: relative;
        text-align: center;
        top: 50%;
    }
    @media (max-width: 40em) {
        .button-wrap {
            margin-top: -1.5em;
        }
    }

    .button-label {
        display: inline-block;
        padding: 1em 2em;
        margin: 0.5em;
        cursor: pointer;
        color: #292929;
        border-radius: 0.25em;
        background: #efefef;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.22);
        transition: 0.3s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .button-label span {
        font-size: 1.1em;
        font-family: "Lato", sans-serif;
    }
    .button-label:hover {
        background: #d6d6d6;
        color: #101010;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.32);
    }
    .button-label:active {
        -webkit-transform: translateY(2px);
        transform: translateY(2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0px -1px 0 rgba(0, 0, 0, 0.22);
    }
    @media (max-width: 40em) {
        .button-label {
            padding: 0em 1em 3px;
            margin: 0.25em;
        }
    }

    .radio-label:checked + .button-label {
        background: #2ECC71;
        color: #efefef ;
    }
    .radio-label:checked + .button-label:hover {
        background: #29b765;
        color: #e2e2e2 ;
    }

    .hidden {
        display: none;
    }

</style>
