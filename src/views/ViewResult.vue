<template>
  <div class="container wrapper">
    <h1 class="display-4 h-page-header">{{ $t("views.result.title") }}</h1>
    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="orderNumber">{{ $t("views.result.label") }}</label>
          <input
            type="text"
            class="form-control"
            id="orderNumber"
            ref="orderNumber"
            v-bind:class="{ 'is-invalid': errors.has('orderNumber') }"
            v-validate="'required|min:36'"
            name="orderNumber"
            v-model="orderNumber"
            :placeholder="$t('views.result.placeholder')"
          />
          <div class="invalid-feedback">
            {{ errors.first("orderNumber") }}
          </div>
          <small id="orderNumberHelp" class="form-text text-muted">{{
            $t("views.result.help")
          }}</small>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <button
            type="button"
            v-on:click="sendForm"
            :disabled="submitInProgress || errors.items.length > 0"
            class="btn btn-lg btn-primary"
          >
            <i class="fas fa-search"></i>
            {{ $t("views.result.btnSearch") }}
          </button>
        </div>
      </div>
    </form>

    <div class="alert alert-warning" role="alert" v-if="showUnknownMessage">
      <i class="fas fa-exclamation-circle"></i>
      {{ $t("views.result.unknownOrderNumber") }}
    </div>
    <div class="alert alert-secondary" role="alert" v-if="showInActionMessage">
      <i class="fa fa-cogs"></i>
      {{ $t("views.result.inActionOrderNumber") }}
    </div>
    <div class="alert alert-warning" role="alert" v-if="showPendingMessage">
      <i class="fa fa-hourglass"></i>
      {{ $t("views.result.pendingOrderNumber") }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="showCancelledMessage">
      <i class="fa fa-ban"></i>
      {{ $t("views.result.cancelledOrderNumber") }}
    </div>
  </div>
</template>

<script>
import BackendService from "../services/BackendService";

export default {
  data() {
    return {
      submitInProgress: false,
      showCancelledMessage: false,
      showPendingMessage: false,
      showInActionMessage: false,
      showUnknownMessage: false,
      orderNumber: null
    };
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  methods: {
    setFocus: function() {
      this.$refs.orderNumber.focus();
    },
    clearNotifications: function() {
      this.$notify({
        group: "notifications",
        clean: true
      });
      this.showCancelledMessage = false;
      this.showPendingMessage = false;
      this.showInActionMessage = false;
      this.showUnknownMessage = false;
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
        const response = await BackendService.getResults(this.orderNumber);
        this.$Progress.finish();
        if (!response.error && response.stateId==3) {
          this.$notify({
            group: "notifications",
            type: "success",
            title: this.$t("views.sendSuccess")
          });
          this.$router.push("/results/download");
          this.$route.params.results = response;
        } else if (response.stateId!=3){
          this.showUnknownMessage= response.stateId==0;
          this.showPendingMessage= response.stateId==1;
          this.showInActionMessage= response.stateId==2;
          this.showCancelledMessage= response.stateId==4;
        }
         else{
          this.$notify({
            group: "notifications",
            type: "error",
            title: response.error
          });
        }
        this.submitInProgress = false;
      }
    }
  }
};
</script>

<style scoped></style>
