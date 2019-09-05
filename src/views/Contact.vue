<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.contact.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="fullName">{{ $t("views.contact.name") }}</label>
                    <input type="text" class="form-control" id="fullName"
                           v-validate="'required|alpha_spaces'" name="fullName"
                           v-bind:class="{'is-invalid': errors.has('fullName')}"
                           :placeholder="$t('views.contact.name')">
                    <div class="invalid-feedback">
                        {{ errors.first('fullName') }}
                    </div>
                </div>
                <div class="form-group col-md-6">
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
                    <label for="message">{{ $t("views.contact.message") }}</label>
                    <textarea class="form-control"
                              rows="5"
                              id="message"
                              v-bind:class="{'is-invalid': errors.has('message')}"
                              v-validate="'required|min:10'"
                              name="message"
                    ></textarea>
                    <div class="invalid-feedback">
                        {{ errors.first('message') }}
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
                    <button type="button"
                            v-on:click="sendFailedForm"
                            :disabled="submitInProgress"
                            class="btn btn-lg btn-outline-danger ml-2">
                        {{ $t("views.contact.sendFailed") }}
                    </button>
                </div>

            </div>
        </form>
    </div>
</template>

<script>

  import BackendService from '../services/BackendService'

  export default {
    data () {
      return {
        submitInProgress: false
      }
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
      sendFailedForm: async function() {
        this.$Progress.start();
        this.submitInProgress = true;
        this.clearNotifications();
        let response = await BackendService.failedSendContactInformation();
        this.$Progress.fail();
        this.$notify({
          group: 'notifications',
          type: 'error',
          title: 'Error',
          text: response.errors[0].message
        });
        this.submitInProgress = false;
      },
    }
  }
</script>

