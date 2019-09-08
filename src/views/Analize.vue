<template>
    <div class="container wrapper">

        <h1 class="display-4">{{ $t("views.analyze.title") }}</h1>

        <form class="mt-4" v-on:submit.prevent="onSubmit">

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
                    <button type="button"
                            v-on:click="sendForm"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-lg btn-primary">
                        <i class="fas fa-paper-plane mr-1"></i>
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
    created: function() {
      setTimeout(() => {
        this.$nextTick(() => this.setFocus());
      }, 100);
    },
    methods: {
      clearNotifications : function() {
        this.$notify({
          group: 'notifications',
          clean: true
        });
      },
      onSubmit: function() {
        this.sendForm();
      },
      setFocus: function() {
        this.$refs.email.focus();
      },
      sendForm: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$Progress.start();
          this.submitInProgress = true;
          this.clearNotifications();
          let response = await BackendService.analyzeLinker();
          this.$Progress.finish();
          this.$notify({
            group: 'notifications',
            type: 'success',
            title: 'Success',
            text: 'Data is correct!'
          });
          this.$router.push('/analyze/success');
          this.$route.params.orderNumber = response.orderNumber;
          this.$route.params.email = this.email;
          this.$route.params.fastaName = this.fastaFile.name;
          this.submitInProgress = false;
        }
      },
    },
    data: function () {
      return {
        fastaFile: null,
        email: null,
        submitInProgress: false
      }
    }
  }
</script>
<style scoped>
</style>
