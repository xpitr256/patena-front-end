<template>
  <div class="mt-4">
    <confirmation-modal
      ref="modal"
      :operation="$t('views.design.title')"
      :distance="formData.distance"
      :email="formData.email"
      :initialSequence="formData.initialSequence.name"
      :flankingSequence1="
        formData.flankingSequence1 ? formData.flankingSequence1.name : null
      "
      :flankingSequence2="
        formData.flankingSequence2 ? formData.flankingSequence2.name : null
      "
      @modalConfirmation="sendForm"
    ></confirmation-modal>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="goToStep(1)">{{
            $t("views.design.breadcrumb.step1")
          }}</a>
        </li>
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="goToStep(3)">{{
            $t("views.design.breadcrumb.step2InitialData")
          }}</a>
        </li>
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="getStepBack">{{
            $t("views.design.breadcrumb.step3")
          }}</a>
        </li>
        <li class="breadcrumb-item active">
          {{ $t("views.design.breadcrumb.step4") }}
        </li>
      </ol>
    </nav>

    <h2 class="h-light mt-5">
      <span class="badge badge-secondary">4</span>
      {{ $t("views.patenaSettings.title") }}
    </h2>

    <form class="mt-4" v-on:submit.prevent="onSubmit">
      <div class="button-wrap mt-4">
        <input
          class="hidden radio-label"
          v-model="useDefaultSettings"
          v-bind:value="true"
          type="radio"
          id="length-button"
        />
        <label class="button-label" for="length-button">
          <span>{{ $t("views.patenaSettings.useDefaultSettings") }}</span>
        </label>
        <input
          class="hidden radio-label"
          v-model="useDefaultSettings"
          v-bind:value="false"
          type="radio"
          id="sequence-button"
        />
        <label class="button-label" for="sequence-button">
          <span>{{ $t("views.patenaSettings.useCustomSettings") }}</span>
        </label>
      </div>

      <nav v-show="useDefaultSettings === false">
        <div class="nav nav-tabs mt-5" id="nav-tab" role="tablist">
          <a
            class="nav-item nav-link active"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            >1. {{ $t("views.patenaSettings.aminoAcidFrequencies") }}</a
          >
          <a
            class="nav-item nav-link"
            id="nav-profile-tab"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            >2. {{ $t("views.patenaSettings.netCharge") }}</a
          >
          <a
            class="nav-item nav-link"
            id="nav-contact-tab"
            data-toggle="tab"
            href="#nav-contact"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
            >3. {{ $t("views.patenaSettings.algorithms") }}</a
          >
        </div>
      </nav>
      <div
        class="tab-content"
        id="nav-tabContent"
        v-show="useDefaultSettings === false"
      >
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div class="alert alert-warning alert-dismissible fade show mt-4">
            <strong>{{ $t("views.patenaSettings.important") }}</strong>
            {{ $t("views.patenaSettings.aminoAcidWarning") }}
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>

          <div
            class="form-row"
            v-for="(row, index) in frequencies"
            v-bind:class="{ 'mt-4': index === 0 }"
          >
            <div
              class="form-group col-md-3"
              v-for="(frequency, internalIndex) in row"
            >
              <div class="form-row">
                <div class="form-group col-md-3 text-right">
                  <span class="aminoAcid">{{ frequency.name }}:</span>
                </div>
                <div class="form-group col-md-9">
                  <number-input
                    v-model="frequencies[index][internalIndex].value"
                    @change="checkFrequencies"
                    :min="0"
                    :max="1"
                    :step="0.001"
                    inline
                    controls
                    center
                    size="small"
                  ></number-input>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row align-items-center ml-1">
            <div class="col col-md-auto">
              <span class="badge" v-bind:class="totalFrequencyClass"
                >{{ $t("views.patenaSettings.totalFrequency") }}:
                {{ totalFrequency }}</span
              >
            </div>
            <div class="col">
              <a href="#/" class="btn btn-link" v-on:click="restoreFrequencies">
                <i class="fas fa-undo"></i>
                {{ $t("views.patenaSettings.restoreFrequencies") }}
              </a>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          ...
        </div>
        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          ...
        </div>
      </div>

      <div class="d-flex mt-4">
        <div>
          <a href="#" class="btn btn-light" v-on:click="getStepBack">
            <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }}
          </a>
        </div>
        <div class="ml-auto">
          <button
            type="button"
            v-on:click="launchConfirmationModal"
            :disabled="
              submitInProgress ||
                errors.items.length > 0 ||
                useDefaultSettings === null
            "
            class="btn btn-primary"
          >
            <i class="fas fa-paper-plane mr-1"></i>
            {{ $t("views.contact.send") }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ConfirmationModal from "../ConfirmationModal";

export default {
  name: "DesignFormStepFinal",
  components: {
    ConfirmationModal
  },
  props: ["formData"],
  computed: {
    totalFrequencyClass: function() {
      return Number(this.totalFrequency) === Number(10.0)
        ? "badge-success"
        : "badge-danger";
    }
  },
  data: function() {
    return {
      submitInProgress: false,
      useDefaultSettings: null,
      totalFrequency: 0,
      frequencies: [],
      defaultFrequencies: [
        [
          { name: "A", value: 0.825 },
          { name: "R", value: 0.553 },
          { name: "N", value: 0.406 },
          { name: "D", value: 0.545 }
        ],
        [
          { name: "C", value: 0.137 },
          { name: "E", value: 0.393 },
          { name: "Q", value: 0.675 },
          { name: "G", value: 0.707 }
        ],
        [
          { name: "H", value: 0.227 },
          { name: "I", value: 0.596 },
          { name: "L", value: 0.966 },
          { name: "K", value: 0.548 }
        ],
        [
          { name: "M", value: 0.242 },
          { name: "F", value: 0.386 },
          { name: "P", value: 0.47 },
          { name: "S", value: 0.656 }
        ],

        [
          { name: "T", value: 0.534 },
          { name: "W", value: 0.108 },
          { name: "Y", value: 0.292 },
          { name: "V", value: 0.734 } //TODO validate with patena 0.687 value
        ]
      ]
    };
  },
  created() {
    this.restoreFrequencies();
  },
  methods: {
    getStepBack() {
      this.goToStep(this.formData.stepFrom);
    },
    restoreFrequencies() {
      this.frequencies = JSON.parse(JSON.stringify(this.defaultFrequencies));
    },
    getFrequenciesValues() {
      let flatArray = [];
      this.frequencies.forEach(group => {
        group.forEach(frequency => {
          flatArray.push(frequency.value);
        });
      });
      return flatArray;
    },
    checkFrequencies() {
      const values = this.getFrequenciesValues();
      this.totalFrequency = values
        .reduce((sum, value) => {
          return sum + value;
        }, 0)
        .toFixed(3);
    },
    goToStep(step) {
      this.$emit("goToNextStep", {
        nextStep: step
      });
    },

    clearNotifications: function() {
      this.$notify({
        group: "notifications",
        clean: true
      });
    },
    onSubmit: function() {
      this.launchConfirmationModal();
    },
    onEnterKeypress: function(event) {
      if (event.key === "Enter") {
        this.launchConfirmationModal();
      }
    },
    launchConfirmationModal: async function() {
      let formIsValid = await this.$validator.validate();
      if (formIsValid) {
        this.$refs.modal.show();
      }
    },
    sendForm: async function() {
      this.$Progress.start();
      this.submitInProgress = true;
      this.clearNotifications();
      this.$Progress.finish();
      this.$notify({
        group: "notifications",
        type: "success",
        title: "Success"
      });
      this.submitInProgress = false;
    }
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300, 400, 900);
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background: #efefef;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}
.button-wrap {
  position: relative;
  text-align: center;
  top: 50%;
}

@media (max-width: 40em) {
  .button-wrap {
    margin-top: -1.5em;
  }
}

.button-label {
  display: inline-block;
  padding: 1em 2em;
  margin: 0.5em;
  cursor: pointer;
  color: #292929;
  border-radius: 0.25em;
  background: #efefef;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.22);
  transition: 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button-label span {
  font-size: 1.1em;
  font-family: "Lato", sans-serif;
}

.button-label:hover {
  background: #d6d6d6;
  color: #101010;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 -3px 0 rgba(0, 0, 0, 0.32);
}

.button-label:active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
    inset 0px -1px 0 rgba(0, 0, 0, 0.22);
}

@media (max-width: 40em) {
  .button-label {
    padding: 0em 1em 3px;
    margin: 0.25em;
  }
}

.radio-label:checked + .button-label {
  background: #2ecc71;
  color: #efefef;
}

.radio-label:checked + .button-label:hover {
  background: #29b765;
  color: #e2e2e2;
}

.hidden {
  display: none;
}

.aminoAcid {
  font-variant: small-caps;
  font-size: 1.3em;
}
</style>
