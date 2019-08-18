<template>
    <div class="container wrapper">
        <h1 class="display-4">{{ $t("views.result.title") }}</h1>
        <form class="mt-4">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputOrderNumber">{{ $t("views.result.label") }}</label>
                    <input type="text" class="form-control" id="inputOrderNumber"
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
                        {{ $t("views.result.btSearch") }}
                    </button>
                    <button type="button"
                            v-on:click="sendFailedForm"
                            :disabled="submitInProgress"
                            class="btn btn-lg btn-outline-danger ml-2">
                        {{ $t("views.contact.sendFailed") }}
                    </button>
                    <button type="button"
                            v-on:click="sendNumberOrderUnknown"
                            :disabled="submitInProgress || errors.items.length > 0"
                            class="btn btn-lg btn-warning ml-2">
                        {{ "Send Unknown" }}
                    </button>
                </div>
            </div>
        </form>
        <div class="alert alert-danger" role="alert" v-bind:style="{ width: '50%', color: activeColor, fontSize:'20px', visibility:showAlert}" >
            Order number not found :(
        </div>
    </div>
</template>

<script>
    import BackendService from '../services/BackendService'

    export default {
        data () {
            return {
                submitInProgress: false,
                activeColor: 'red',
                showAlert: 'hidden'
                }
        },
        methods: {
            clearNotifications : function() {
                this.$notify({
                    group: 'notifications',
                    clean: true
                });
                this.showAlert='hidden';
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
                this.showAlert=''
            },
        }
    }
</script>

<style scoped>

</style>
