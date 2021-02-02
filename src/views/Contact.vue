<template>
  <div class="container wrapper">
    <h1 class="display-4 h-page-header">{{ $t("views.contact.title") }}</h1>
    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="fullName">{{ $t("views.contact.name") }}</label>
          <input
            type="text"
            class="form-control"
            v-on:keypress="onEnterKeypress"
            id="fullName"
            name="fullName"
            ref="fullName"
            v-model="fullName"
            v-validate="'required|alpha_spaces'"
            v-bind:class="{ 'is-invalid': errors.has('fullName') }"
            :placeholder="$t('views.contact.name')"
          />
          <div class="invalid-feedback">
            {{ errors.first("fullName") }}
          </div>
        </div>
        <div class="form-group col-md-6">
          <label>Email</label>
          <input
            class="form-control"
            v-bind:class="{ 'is-invalid': errors.has('email') }"
            v-validate="'required|email'"
            placeholder="Email"
            name="email"
            v-on:keypress="onEnterKeypress"
            ref="email"
            v-model="email"
            type="email"
          />
          <div class="invalid-feedback">
            {{ errors.first("email") }}
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="message">{{ $t("views.contact.message") }}</label>
          <textarea
            class="form-control"
            rows="5"
            id="message"
            v-bind:class="{ 'is-invalid': errors.has('message') }"
            v-validate="'required|min:50'"
            name="message"
            v-model="message"
            ref="message"
          ></textarea>
          <div class="invalid-feedback">
            {{ errors.first("message") }}
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <button type="button" v-on:click="sendForm" :disabled="submitInProgress || errors.items.length > 0" class="btn btn-lg btn-primary">
            <i class="fas fa-paper-plane mr-1"></i>
            {{ $t("views.contact.send") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BackendService from "../services/BackendService";

export default {
  name: "Contact",
  data() {
    return {
      fullName: null,
      email: null,
      message: null,
      submitInProgress: false
    };
  },
  created: function() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 100);
  },
  methods: {
    onEnterKeypress: function(event) {
      if (event.key === "Enter") {
        this.sendForm();
      }
    },
    onSubmit: function() {},
    setFocus: function() {
      this.$refs.fullName.focus();
    },
    clearNotifications: function() {
      this.$notify({
        group: "notifications",
        clean: true
      });
    },
    sendForm: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        this.$Progress.start();
        this.submitInProgress = true;
        this.clearNotifications();
        const sendOk = await BackendService.sendContactInformation(this.email, this.fullName, this.message);
        this.$Progress.finish();
        if (sendOk) {
          this.$notify({
            group: "notifications",
            type: "success",
            title: this.$t("views.sendSuccess")
          });
        } else {
          this.$notify({
            group: "notifications",
            type: "error",
            title: this.$t("views.sendError")
          });
        }
        this.submitInProgress = false;
      }
    }
  }
};
</script>
