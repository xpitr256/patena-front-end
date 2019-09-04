<template>
    <div class="container wrapper">

        <h1 class="display-4">{{ $t("views.analyze.title") }}</h1>

        <form class="mt-4">

            <div class="form-row">
                <div class="form-group col">
                    <fasta-uploader name="fasta"
                                    v-validate="'required'"
                                    v-model="fastaFile"
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
                           name="email"
                           type="email">
                    <div class="invalid-feedback">
                        {{ errors.first('email') }}
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <button type="button"
                            v-on:click="sendForm"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-lg btn-primary">
                        {{ $t("views.contact.send") }}
                    </button>
                </div>

            </div>
        </form>


    </div>
</template>

<script>

  import FastaUploader from "../components/FastaUploader";
  import BackendService from '../services/BackendService'
  import { ValidationProvider } from 'vee-validate';

  export default {
    name: "analyze",
    components: {
      FastaUploader,
      ValidationProvider
    },
    methods: {
      clearNotifications : function() {
        this.$notify({
          group: 'notifications',
          clean: true
        });
      },
      sendForm: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$Progress.start();
          this.submitInProgress = true;
          this.clearNotifications();
          await BackendService.sendContactInformation();
          this.$Progress.finish();
          this.$notify({
            group: 'notifications',
            type: 'success',
            title: 'Success',
            text: 'Data is correct!'
          });
          this.submitInProgress = false;
        }
      },
    },
    data: function () {
      return {
        fastaFile: null,
        submitInProgress: false
      }
    }
  }
</script>
<style scoped>
</style>
