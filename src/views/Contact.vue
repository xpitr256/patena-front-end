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
                <div class="form-group col-md-6">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Email">
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
  export default {
    data () {
      return {
        submitInProgress: false
      }
    },
    methods: {
      sendForm: function() {
        this.$Progress.start();
        this.submitInProgress = true;
        this.$notify({
          group: 'notifications',
          clean: true
        });
        setTimeout(() => {
          this.$Progress.finish();
          this.$notify({
            group: 'notifications',
            type: 'success',
            title: 'Success',
            text: 'Data is correct!'
          });
          this.submitInProgress = false;
        }, 1000);
      },
      sendFailedForm: function() {
        this.$Progress.start();
        this.submitInProgress = true;
        this.$notify({
          group: 'notifications',
          clean: true
        });
        setTimeout(() => {
          this.$Progress.fail();
          this.$notify({
            group: 'notifications',
            type: 'error',
            title: 'Error',
            text: 'There was an error. Please try again later.'
          });
          this.submitInProgress = false;
        }, 1000);
      }
    }
  }
</script>
