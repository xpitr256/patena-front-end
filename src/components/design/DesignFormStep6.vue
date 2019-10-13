<template>
    <div class="mt-4">
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            {{$t("views.design.rdStepFS")}}
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="form-row">
                <div class="form-group col-6">
                    <label>{{$t("views.design.rdStepLabelFS1")}}</label>
                    <fasta-uploader name="flankingSequence1"
                                    v-validate="'required'"
                                    v-model="flankingSequence1"
                                    :error="errors.first('flankingSequence1')"
                    >
                    </fasta-uploader>
                </div>
                <div class="form-group col-6">
                    <label>{{$t("views.design.rdStepLabelFS2")}}</label>
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
                    <label>{{$t("views.design.rdStepDistanceFS")}}</label>
                    <div class="input-group mb-3">
                        <input type="text"
                               class="form-control"
                               id="distance"
                               ref="distance"
                               v-bind:class="{'is-invalid': errors.has('distance')}"
                               v-validate="'required|numeric|min:1|max:3|min_value:1'"
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
    name: "DesignFormStep6",
    components: {
      FastaUploader
    },
    methods: {
      getStepBack() {
        this.$emit('goToNextStep', {
          nextStep: 3
        });
      },
      next: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$emit('goToNextStep', {
            nextStep: 'Final',
            formData: {
              stepFrom: 6,
              email: this.email,
              initialSequence: {
                name: this.$t('views.design.noInitialSequence')
              },
              flankingSequence1: this.flankingSequence1,
              flankingSequence2: this.flankingSequence1
            }
          });
        }
      },
      onSubmit: function() {
        this.next();
      },
      onEnterKeypress: function(event) {
        if(event.key === "Enter") {
          this.next();
        }
      }
    },
    data: function () {
      return {
        flankingSequence1: null,
        flankingSequence2: null,
        email: null,
        distance: null
      }
    }
  }
</script>

<style scoped>

</style>
