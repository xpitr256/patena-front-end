<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.contact.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputName">{{ $t("views.contact.name") }}</label>
                    <input type="text" class="form-control" id="inputName"
                           :placeholder="$t('views.contact.name')">
                </div>
                <div class="form-group col-md-6" :class="{error: errors.has('email')}">
                    <label>Email</label>
                    <input type="email" class="form-control" name="email" placeholder="Email" v-validate="'required|email'" v-model="email">
                    <span class="error" v-if="errors.has('email')">{{errors.first('email')}}</span>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label for="message">{{ $t("views.contact.message") }}</label>
                    <textarea class="form-control" rows="5" id="message"></textarea>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <button type="button"
                            v-on:click="sendForm"
                            :disabled="submitInProgress"
                            class="btn btn-lg btn-primary">
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
        submitInProgress: false,
        emailValue: '',
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
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

<style>
    span.error {
        color: #9F3A38;
    }
</style>
