<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.design.title") }}</h1>
        <form class="mt-4" v-on:submit.prevent="onSubmit">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="distance">{{ $t("views.design.label") }}</label>
                    <div class="input-group mb-3">
                        <input type="text"
                               class="form-control"
                               id="distance"
                               ref="distance"
                               v-bind:class="{'is-invalid': errors.has('distance')}"
                               v-validate="'required|numeric|min:1|max:3|'"
                               name="distance"
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
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <button type="button"
                            v-on:click="sendForm"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-lg btn-primary">
                        {{ $t("views.design.next") }}
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

            </div>
        </form>
    </div>
</template>

<script>

    import BackendService from '../services/BackendService'
    import { ValidationProvider } from 'vee-validate';

    export default {
        name: "design",
        components: {
            ValidationProvider
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
            sendForm: async function() {
                let formIsValid = await this.$validator.validate();
                if (formIsValid) {
                    this.$Progress.start();
                    this.submitInProgress = true;
                    this.clearNotifications();
                    try {
                      let response = await BackendService.calculateLength(this.distance);
                      this.$Progress.finish();
                      this.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Success'
                      });
                      this.$router.push('/design/success');
                      this.$route.params.length = response.length;
                    } catch (error) {
                      this.$Progress.fail();
                      this.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Error getting linker length'
                      });
                    }
                    this.submitInProgress = false;
                }
            },
            setFocus: function() {
                this.$refs.distance.focus();
            },
        },
        created: function() {
          setTimeout(x => {
            this.$nextTick(() => this.setFocus());
          }, 100);
        },
        data: function () {
            return {
              distance: null,
              submitInProgress: false
            }
        }
    }
</script>
