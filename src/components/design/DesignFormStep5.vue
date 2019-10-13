<template>
    <div class="mt-4">
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            {{$t("views.design.rdStepIS")}}
        </h2>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

            <div class="form-row">
                <div class="form-group col">
                    <fasta-uploader name="initialSequence"
                                    v-validate="'required'"
                                    v-model="initialSequence"
                                    :error="errors.first('initialSequence')"
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
    name: "DesignFormStep5",
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
              stepFrom: 5,
              email: this.email,
              initialSequence: this.initialSequence
            }
          });
        }
      }
    },
    data: function () {
      return {
        initialSequence: null,
        email: null
      }
    }
  }
</script>

<style scoped>

</style>
