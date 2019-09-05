<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.design.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputDistance">{{ $t("views.design.label") }}</label>
                    <input type="text" class="form-control" id="inputDistance" ref="inputDistance"
                           v-bind:class="{'is-invalid': errors.has('inputDistance')}"
                           v-validate="'required|numeric|min:1|max:3|'"
                           name="inputDistance"
                           v-model="inputDistance"
                           :placeholder="$t('views.design.placeholder')">
                    <div class="invalid-feedback">
                        {{ errors.first('inputDistance') }}
                    </div>
                    <small id="distanceHelp" class="form-text text-muted">{{ $t("views.design.help") }}</small>
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
            sendForm: async function() {
                let formIsValid = await this.$validator.validate();
                if (formIsValid) {
                    this.$Progress.start();
                    this.submitInProgress = true;
                    this.clearNotifications();
                    let response = await BackendService.designLinker();
                    this.$Progress.finish();
                    this.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Success',
                        text: 'Data is correct!'
                    });
                    this.$router.push('/design/success');
                    this.$route.params.calculateDistance = response.calculateDistance;
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
