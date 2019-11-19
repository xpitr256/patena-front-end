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

          <div class="row">
            <div class="col-md-3 grey-border">
              <h5 class="mt-3 mb-2 font-weight-bold">
                {{ $t("views.patenaSettings.references") }}:
              </h5>
              <div class="row align-items-center">
                <div class="col col-md-auto">
                  <div class="uvReference"></div>
                </div>
                <div class="col">
                  {{ $t("views.patenaSettings.uvAminoAcidLabel") }}
                </div>
              </div>

              <h5 class="mt-5 mb-2 font-weight-bold">
                {{ $t("views.patenaSettings.actions") }}:
              </h5>

              <a
                href="#/"
                class="btn btn-link mb-2"
                v-on:click="restoreFrequencies"
              >
                <i class="fas fa-undo"></i>
                {{ $t("views.patenaSettings.restoreFrequencies") }}
              </a>
              <toggle-button
                :value="avoidUVSilent"
                id="uvSilent"
                class="mt-1"
                v-model="avoidUVSilent"
                @change="checkUVSilent($event)"
                :color="toogleColor"
                :switch-color="switchColor"
                :sync="true"
                :labels="true"
              />
              <label class="form-check-label ml-2" for="uvSilent">
                {{ $t("views.patenaSettings.avoidAminoAcid") }}
              </label>
            </div>
            <div class="col-md-9">
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
                      <span
                        class="aminoAcid"
                        v-bind:class="uvLabelClass(frequency)"
                      >
                        {{ frequency.name }}:</span
                      >
                    </div>
                    <div class="form-group col-md-9">
                      <number-input
                        v-model="frequencies[index][internalIndex].value"
                        v-bind:class="uvInputClass(frequency)"
                        :disabled="frequency.uvSilent && avoidUVSilent"
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
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <span class="badge float-right" v-bind:class="totalFrequencyClass"
                >{{ $t("views.patenaSettings.totalFrequency") }}:
                {{ totalFrequency }}</span
              >
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div class="alert alert-warning alert-dismissible fade show mt-4">
            <strong>{{ $t("views.patenaSettings.important") }}</strong>
            {{ $t("views.patenaSettings.netChargeWarning") }}
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>

          <div class="form-group col-md-6">
            <label>{{ $t("views.patenaSettings.netCharge") }}</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="netCharge"
                ref="netCharge"
                v-bind:class="{ 'is-invalid': errors.has('netCharge') }"
                v-validate="
                  `numeric|min:1|min_value:1|max_value:${maxNetChargeValue}`
                "
                name="netCharge"
                v-on:keypress="onEnterKeypress"
                v-model="netCharge"
                :placeholder="$t('views.patenaSettings.netChargePlaceholder')"
              />
              <div class="invalid-feedback">
                {{ errors.first("netCharge") }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div class="alert alert-warning alert-dismissible fade show mt-4">
            <strong>{{ $t("views.patenaSettings.important") }}</strong>
            {{ $t("views.patenaSettings.algorithmWarning") }}
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>

          <div
            class="form-row"
            v-for="(row, index) in algorithms"
            v-bind:class="{ 'mt-4': index === 0 }"
          >
            <div
              class="form-group col-md-4"
              v-for="(algorithm, internalIndex) in row"
            >
                <div class="card">
                  <h5 class="card-header font-weight-bold ">
                    <div class="d-flex justify-content-between">
                      <div>
                        {{ algorithm.name }}
                      </div>
                      <div>
                        <toggle-button
                                :value="algorithm.active"
                                :color="toogleColor"
                                :switch-color="switchColor"
                                :width="56"
                                :height="25"
                                :font-size="14"
                                :sync="false"
                                :labels="true"
                        />
                      </div>
                    </div>
                  </h5>

                  <div class="card-body">
                    <p class="card-text">
                      This is a description for this algorithm Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.
                    </p>
                  </div>
                </div>


            </div>
          </div>
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
import FastaService from "../../services/FastaService";
import BackendService from "../../services/BackendService";

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
      maxNetChargeValue: null,
      submitInProgress: false,
      useDefaultSettings: null,
      totalFrequency: 0,
      avoidUVSilent: false,
      toogleColor: {
        checked: "#2ecc71",
        unchecked: "#bfbfbf",
        disabled: "#CCCCCC"
      },
      switchColor: { checked: "#28a745", unchecked: "#e2e2e2" },
      algorithms: [
        [
          { name: "BLAST", active: true },
          { name: "TANGO", active: true },
          { name: "ELM", active: true }
        ],
        [
          { name: "IUPred", active: true },
          { name: "ANCHOR", active: true },
          { name: "Prosite", active: true }
        ],
        [
          { name: "Limbo", active: true },
          { name: "TMHMM", active: true },
          { name: "PASTA", active: true }
        ],
        [
          { name: "Waltz", active: true },
          { name: "Amyloid pattern", active: true }
        ]
      ],
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
          { name: "F", value: 0.386, uvSilent: true },
          { name: "P", value: 0.47 },
          { name: "S", value: 0.656 }
        ],

        [
          { name: "T", value: 0.534 },
          { name: "W", value: 0.108, uvSilent: true },
          { name: "Y", value: 0.292, uvSilent: true },
          { name: "V", value: 0.734 } //TODO validate with patena 0.687 value
        ]
      ],
      netCharge: null
    };
  },
  async created() {
    this.restoreFrequencies();
    if (this.formData.initialSequence.value) {
      this.maxNetChargeValue = FastaService.getSequenceLengthFrom(
        this.formData.initialSequence.value
      );
    } else {
      try {
        const response = await BackendService.calculateLength(
          this.formData.distance
        );
        this.maxNetChargeValue = Math.round(response.length);
      } catch (e) {
        console.error("Cannot get sequence length from distance");
      }
    }
  },
  methods: {
    uvInputClass: function(frequency) {
      if (frequency.uvSilent && !this.avoidUVSilent) {
        return "uvInput";
      }

      if (frequency.uvSilent && this.avoidUVSilent) {
        return "uvInput uvInputDisabled";
      }

      return "";
    },
    uvLabelClass: function(frequency) {
      if (frequency.uvSilent && !this.avoidUVSilent) {
        return "uvLabel";
      }

      if (frequency.uvSilent && this.avoidUVSilent) {
        return "uvLabel uvLabelDisabled";
      }

      return "";
    },
    getStepBack() {
      this.goToStep(this.formData.stepFrom);
    },
    restoreFrequencies() {
      this.avoidUVSilent = false;
      this.frequencies = JSON.parse(JSON.stringify(this.defaultFrequencies));
    },
    disableAllUVFrequencies() {
      this.frequencies = this.frequencies.map(row => {
        return row.map(frequency => {
          if (frequency.uvSilent) {
            frequency.value = 0;
          }
          return frequency;
        });
      });
    },
    checkUVSilent() {
      if (this.avoidUVSilent) {
        this.disableAllUVFrequencies();
      }
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
.uvLabel {
  color: violet;
  font-weight: bold;
}
.uvLabelDisabled {
  color: #eebdee !important;
}
.uvInputDisabled {
  border: 2px solid #eebdee !important;
}
.uvInput {
  border: 2px solid violet;
  border-radius: 6px;
}
.grey-border {
  border-right: 1px solid #dee2e6;
}
.uvReference {
  margin-left: 10px;
  margin-right: -20px;
  width: 18px;
  height: 18px;
  background-color: violet;
  border-radius: 3px;
}
</style>
