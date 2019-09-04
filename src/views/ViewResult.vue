<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.result.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputOrderNumber">{{ $t("views.result.label") }}</label>
                    <input type="text" class="form-control" id="inputOrderNumber" ref="inputOrderNumber"
                           v-bind:class="{'is-invalid': errors.has('inputOrderNumber')}"
                           v-validate="'required|min:36'"
                           name="inputOrderNumber"
                           :placeholder="$t('views.result.placeholder')">
                    <div class="invalid-feedback">
                        {{ errors.first('inputOrderNumber') }}
                    </div>
                    <small id="orderNumberHelp" class="form-text text-muted">{{ $t("views.result.help") }}</small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <button type="button"
                            v-on:click="sendForm"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-lg btn-primary">
                        <i class="fas fa-search"></i>
                        {{ $t("views.result.btnSearch") }}
                    </button>
                    <button type="button"
                            v-on:click="sendFailedForm"
                            :disabled="submitInProgress"
                            class="btn btn-lg btn-outline-danger ml-2">
                        <i class="fas fa-search"></i>
                        {{ $t("views.result.btnFailed") }}
                    </button>
                    <button type="button"
                            v-on:click="sendNumberOrderUnknown"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-lg btn-warning ml-2">
                        <i class="fas fa-search"></i>
                        {{ $t("views.result.btnUnknown") }}
                    </button>
                </div>
            </div>
        </form>

        <div class="alert alert-danger" role="alert" v-if="showErrorMessage">
            <i class="fas fa-exclamation-circle"></i>   {{ $t("views.result.unknownOrderNumber") }}
        </div>

    </div>
</template>

<script>
    import BackendService from '../services/BackendService'

    export default {
        data () {
            return {
                submitInProgress: false,
                showErrorMessage: false,
                orderNumber: ''
                }
        },
        methods: {
            clearNotifications : function() {
                this.$notify({
                    group: 'notifications',
                    clean: true
                });
                this.showErrorMessage = false;
            },
            sendForm: async function() {
                let formIsValid = await this.$validator.validate();
                if (formIsValid) {
                    this.$Progress.start();
                    this.submitInProgress = true;
                    this.clearNotifications();
                    await BackendService.sendOrderNumber();
                    this.$Progress.finish();
                    this.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Success',
                        text: 'Order Number is correct!'
                    });
                    this.$router.push('/results/download');
                    this.$route.params.id=this.$refs.inputOrderNumber.value;
                    console.log(this.orderNumber);
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
            sendNumberOrderUnknown: async function() {
                let formIsValid = await this.$validator.validate();
                if (formIsValid) {
                    this.$Progress.start();
                    this.submitInProgress = true;
                    this.clearNotifications();
                    let response = await BackendService.sendOrderNumberUnknown();
                    this.$Progress.fail();
                    this.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Error',
                        text: response.errors[0].message
                    });
                }
                this.submitInProgress = false;
                this.showErrorMessage = true;
            },
        }
    }
</script>

<style scoped>

</style>
