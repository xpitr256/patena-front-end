<template>
    <div class="mt-4">
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            {{$t("views.design.rdStepISFS")}}
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="form-row">
                <div class="form-group col-6">
                    <label><strong>{{$t("views.design.rdStepLabelFS1")}}</strong></label>
                    <fasta-uploader name="flankingSequence1"
                                    v-validate="'required'"
                                    v-model="flankingSequence1"
                                    :error="errors.first('flankingSequence1')"
                    >
                    </fasta-uploader>
                </div>
                <div class="form-group col-6">
                    <label><strong>{{$t("views.design.rdStepLabelFS2")}}</strong></label>
                    <fasta-uploader name="flankingSequence2"
                                    v-validate="'required'"
                                    v-model="flankingSequence2"
                                    :error="errors.first('flankingSequence2')"
                    >
                    </fasta-uploader>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-6">
                    <label><strong>Email</strong></label>
                    <input class="form-control"
                           v-bind:class="{'is-invalid': errors.has('email')}"
                           v-validate="'required|email'"
                           placeholder="Email"
                           ref="email"
                           name="email"
                           v-model="email"
                           v-on:keypress="onEnterKeypress"
                           type="email">
                    <div class="invalid-feedback">
                        {{ errors.first('email') }}
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label><strong>{{$t("views.design.rdStepLabelIS")}}</strong></label>
                    <fasta-uploader name="initialSequence"
                                    v-validate="'required'"
                                    v-model="initialSequence"
                                    :error="errors.first('initialSequence')">
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
                            v-on:click="next"
                            :disabled="errors.items.length > 0"
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
        this.$emit('goToNextStep', {
          nextStep: 3
        });
      },

      onSubmit: function() {
        this.next();
      },
      onEnterKeypress: function(event) {
        if(event.key === "Enter") {
          this.next();
        }
      },
      next: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$emit('goToNextStep', {
            nextStep: 'Final',
            formData: {
              stepFrom: 7,
              email: this.email,
              initialSequence: this.initialSequence,
              flankingSequence1: this.flankingSequence1,
              flankingSequence2: this.flankingSequence2
            }
          });
        }
      },
    },
    data: function () {
      return {
        initialSequence: null,
        flankingSequence1: null,
        flankingSequence2: null,
        email: null
      }
    }
  }
</script>

<style scoped>

</style>
