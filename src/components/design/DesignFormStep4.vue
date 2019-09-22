<template>
    <div class="mt-4">
        <div class="alert alert-warning mb-4" role="alert">
            <i class="fas fa-exclamation-triangle"></i> By not having an initial sequence the system will assign a random sequence
        </div>
        <h2 class="h-light mt-4">
            <span class="badge badge-secondary">3</span>
            Which is the distance between the amino acid do you want to link ?
        </h2>
        <form class="mt-4" v-on:submit.prevent="onSubmit">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Distance</label>
                    <div class="input-group mb-3">
                        <input type="text"
                               class="form-control"
                               id="distance"
                               ref="distance"
                               v-bind:class="{'is-invalid': errors.has('distance')}"
                               v-validate="'required|numeric|min:1|max:3|'"
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

                <div class="form-group col-md-6">
                    <label>Email</label>
                    <input class="form-control"
                           v-bind:class="{'is-invalid': errors.has('email')}"
                           v-validate="'required|email'"
                           placeholder="Email"
                           name="email"
                           v-on:keypress="onEnterKeypress"
                           ref="email"
                           v-model="email"
                           type="email">
                    <div class="invalid-feedback">
                        {{ errors.first('email') }}
                    </div>
                </div>
            </div>

            <div class="d-flex">
                <div>
                    <a href="#" class="btn btn-light" v-on:click="getStepBack()">
                        <i class="fas fa-chevron-left"></i> {{$t('views.getBack')}}
                    </a>
                </div>
                <div class="ml-auto">
                    <button type="button"
                            v-on:click="sendForm"
                            :disabled="submitInProgress || errors.items.length > 0"
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
  import { ValidationProvider } from 'vee-validate';

  export default {
    name: "DesignFormStep4",
    components: {
      ValidationProvider
    },
    methods: {
      getStepBack() {
        this.$emit('goToNextStep',3);
      },
      clearNotifications : function() {
        this.$notify({
          group: 'notifications',
          clean: true
        });
      },
      onSubmit: function() {
        this.sendForm();
      },
      onEnterKeypress: function(event) {
        if(event.key === "Enter") {
          this.sendForm();
        }
      },
      sendForm: async function() {
        let formIsValid = await this.$validator.validate();
        if (formIsValid) {
          this.$Progress.start();
          this.submitInProgress = true;
          this.clearNotifications();
          //TODO call the confirmation modal windows.
          this.$Progress.finish();
          this.$notify({
            group: 'notifications',
            type: 'success',
            title: 'Success'
          });
          this.submitInProgress = false;
        }
      },
      setFocus: function() {
        this.$refs.distance.focus();
      }
    },
    created: function() {
      setTimeout(x => {
        this.$nextTick(() => this.setFocus());
      }, 100);
    },
    data: function () {
      return {
        distance: null,
        email: null,
        submitInProgress: false
      }
    }
  }
</script>

<style scoped>

</style>
