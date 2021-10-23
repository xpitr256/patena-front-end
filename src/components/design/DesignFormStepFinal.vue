<template>
  <div class="mt-4">
    <confirmation-modal
      ref="modal"
      :operation="$t('views.design.title')"
      :distance="formData.distance"
      :email="formData.email"
      :initialSequence="formData.initialSequence.name"
      :flankingSequence1="formData.flankingSequence1 ? formData.flankingSequence1.name : null"
      :flankingSequence2="formData.flankingSequence2 ? formData.flankingSequence2.name : null"
      @modalConfirmation="sendForm"
    ></confirmation-modal>

    <setting-confirmation-modal ref="settingModal" @settingConfirmationModal="changeToDefaultSettings"></setting-confirmation-modal>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="goToStep(1)">{{ $t("views.design.breadcrumb.step1") }}</a>
        </li>
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="goToStep(3)">{{ $t("views.design.breadcrumb.step2InitialData") }}</a>
        </li>
        <li class="breadcrumb-item">
          <a class="black-text" href="#" v-on:click="getStepBack">{{ $t("views.design.breadcrumb.step3") }}</a>
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
        <input class="hidden radio-label" v-model="useDefaultSettings" v-bind:value="true" @click="settingsChoiceClick" type="radio" id="length-button" />
        <label class="button-label" for="length-button">
          <span>{{ $t("views.patenaSettings.useDefaultSettings") }}</span>
        </label>
        <input class="hidden radio-label" v-model="useDefaultSettings" v-bind:value="false" type="radio" id="sequence-button" @click="settingsChoiceClick" />
        <label class="button-label" for="sequence-button">
          <span>{{ $t("views.patenaSettings.useCustomSettings") }}</span>
        </label>
      </div>

      <nav v-show="useDefaultSettings !== null">
        <div class="nav nav-tabs mt-5" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"
            >1. {{ $t("views.patenaSettings.aminoAcidFrequencies") }}</a
          >
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"
            >2. {{ $t("views.patenaSettings.netCharge") }}</a
          >
          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"
            >3. {{ $t("views.patenaSettings.algorithms") }}</a
          >
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent" v-show="useDefaultSettings !== null">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div class="alert alert-warning alert-dismissible fade show mt-4" v-show="!useDefaultSettings">
            <strong>{{ $t("views.patenaSettings.important") }}</strong>
            {{ $t("views.patenaSettings.aminoAcidWarning") }}
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>

          <div class="row">
            <div class="col-md-3 grey-border">
              <h5 class="mt-3 mb-2 font-weight-bold" :class="{ labelDisabled: useDefaultSettings }">{{ $t("views.patenaSettings.references") }}:</h5>
              <div class="row align-items-center">
                <div class="col col-md-auto">
                  <div class="reference uvReference" :class="{ uvReferenceDisabled: useDefaultSettings }"></div>
                </div>
                <div class="col" :class="{ labelDisabled: useDefaultSettings }">
                  {{ $t("views.patenaSettings.uvAminoAcidLabel") }}
                </div>
              </div>

              <div class="row align-items-center">
                <div class="col col-md-auto">
                  <div class="reference cReference" :class="{ cReferenceDisabled: useDefaultSettings }"></div>
                </div>
                <div class="col" :class="{ labelDisabled: useDefaultSettings }">
                  {{ $t("views.patenaSettings.CLabel") }}
                </div>
              </div>

              <h5 class="mt-5 mb-2 font-weight-bold" :class="{ labelDisabled: useDefaultSettings }">{{ $t("views.patenaSettings.actions") }}:</h5>

              <a href="#/" class="btn btn-link mb-2" v-on:click="restoreFrequencies" :class="{ disabled: useDefaultSettings }">
                <i class="fas fa-undo"></i>
                {{ $t("views.patenaSettings.restoreFrequencies") }}
              </a>
              <br />
              <toggle-button
                :value="avoidUVSilent"
                id="uvSilent"
                class="mt-1"
                v-model="avoidUVSilent"
                @change="checkUVSilent($event)"
                :class="{ disabled: useDefaultSettings }"
                :color="toogleColor"
                :switch-color="switchColor"
                :sync="true"
                :labels="true"
              />
              <a href="#/" class="btn btn-link mb-2" v-on:click="changeUVSilent" :class="{ disabled: useDefaultSettings }">
                {{ $t("views.patenaSettings.avoidAminoAcid") }}
              </a>
              <br />
              <toggle-button
                :value="avoidCysteine"
                id="cysteine"
                class="mt-1"
                v-model="avoidCysteine"
                @change="checkCysteine($event)"
                :class="{ disabled: useDefaultSettings }"
                :color="toogleColor"
                :switch-color="switchColor"
                :sync="true"
                :labels="true"
              />
              <a href="#/" class="btn btn-link mb-2" v-on:click="changeCysteine" :class="{ disabled: useDefaultSettings }">
                {{ $t("views.patenaSettings.avoidCysteine") }}
              </a>
            </div>
            <div class="col-md-9">
              <div class="form-row" v-for="(row, index) in frequencies" v-bind:class="{ 'mt-4': index === 0 }" :key="index">
                <div class="form-group col-md-3" v-for="(frequency, internalIndex) in row" :key="frequency.name">
                  <div class="form-row">
                    <div class="form-group col-md-3 text-right">
                      <span class="aminoAcid" v-bind:class="getLabelFrequencyClass(frequency)"> {{ frequency.name }}:</span>
                    </div>
                    <div class="form-group col-md-9">
                      <number-input
                        v-model="frequencies[index][internalIndex].value"
                        v-bind:class="getInputFrequencyClass(frequency)"
                        :disabled="(frequency.uvSilent && avoidUVSilent) || useDefaultSettings || (frequency.cysteine && avoidCysteine)"
                        @change="checkFrequencies"
                        :min="0"
                        :max="100"
                        :step="0.1"
                        inline
                        controls
                        center
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <span class="badge float-right" v-bind:class="totalFrequencyClass">{{ $t("views.patenaSettings.totalFrequency") }}: {{ totalFrequency }}%</span>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div class="form-check" v-if="!useDefaultSettings">
            <div class="label-check">
              <div class="custom-control custom-checkbox checkbox-lg">
                <input type="checkbox" class="custom-control-input" id="checkbox-2" v-on:click="changeEnabledNetCharge" />
                <label class="custom-control-label" for="checkbox-2"> {{ $t("views.patenaSettings.labelCheckNetCharge") }}</label>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="useDefaultSettings || checkDisabledNetCharge == false">
            <div class="alert alert-warning alert-dismissible fade show mt-4" v-show="!useDefaultSettings">
              <strong>{{ $t("views.patenaSettings.important") }}</strong>
              {{ $t("views.patenaSettings.netChargeWarning") }}
              <button type="button" class="close" data-dismiss="alert">
                &times;
              </button>
            </div>

            <div class="form-row mt-4">
              <div class="form-group">
                <label>{{ $t("views.patenaSettings.selectNetCharge") }}: </label>
              </div>
            </div>

            <div class="form-row mt-4">
              <div class="col-2"></div>
              <div class="form-group col-8">
                <vue-slider
                  v-model="netCharge"
                  :min="-maxNetChargeValue"
                  :max="maxNetChargeValue"
                  tooltip="always"
                  :marks="[-maxNetChargeValue, maxNetChargeValue]"
                  :dotSize="16"
                  :disabled="useDefaultSettings || checkDisabledNetCharge === true"
                ></vue-slider>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <div class="alert alert-warning alert-dismissible fade show mt-4" v-show="!useDefaultSettings">
            <strong>{{ $t("views.patenaSettings.important") }}</strong>
            {{ $t("views.patenaSettings.algorithmWarning") }}
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>

          <div class="form-row" v-bind:key="index" v-for="(row, index) in algorithms" v-bind:class="{ 'mt-4': index === 0 }">
            <div class="form-group col-md-4" v-for="(algorithm, internalIndex) in row" :key="algorithm.name">
              <div class="card">
                <h5 class="card-header font-weight-bold ">
                  <div class="d-flex justify-content-between">
                    <div :class="{ labelDisabled: useDefaultSettings }">
                      {{ algorithm.name }}
                    </div>
                    <div>
                      <toggle-button
                        :value="algorithm.active"
                        v-model="algorithms[index][internalIndex].active"
                        :color="toogleColor"
                        :class="{ disabled: useDefaultSettings }"
                        :switch-color="switchColor"
                        :width="56"
                        :height="25"
                        :font-size="14"
                        :sync="true"
                        :labels="true"
                      />
                    </div>
                  </div>
                </h5>

                <div class="card-body">
                  <p class="card-text" :class="{ labelDisabled: useDefaultSettings }">
                    {{ $t("views.patenaSettings.description" + algorithm.description) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex mt-4">
        <div>
          <a href="#" class="btn btn-light" v-on:click="getStepBack"> <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }} </a>
        </div>
        <div class="ml-auto">
          <button type="button" v-on:click="launchConfirmationModal" :disabled="isSendDisabled" class="btn btn-primary">
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
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import SettingConfirmationModal from "@/components/SettingConfirmationModal";

export default {
  name: "DesignFormStepFinal",
  components: {
    SettingConfirmationModal,
    ConfirmationModal,
    VueSlider
  },
  props: ["formData"],
  computed: {
    isSendDisabled: function() {
      return (
        this.submitInProgress ||
        this.errors.items.length > 0 ||
        this.useDefaultSettings === null ||
        !this.isValidTotalFrequency() ||
        !this.isAtLeastOneActiveAlgorithm()
      );
    },
    totalFrequencyClass: function() {
      if (this.useDefaultSettings) {
        return "badge-success badge-success-disabled";
      }
      return this.isValidTotalFrequency() ? "badge-success" : "badge-danger";
    }
  },
  watch: {
    useDefaultSettings: function(newVal) {
      sessionStorage.setItem("stepFinal.useDefaultSettings", newVal);
    }
  },
  data: function() {
    return {
      designTypeMap: new Map(),
      inputClassMap: new Map(),
      labelClassMap: new Map(),
      maxNetChargeValue: null,
      submitInProgress: false,
      useDefaultSettings: null,
      totalFrequency: 0,
      avoidUVSilent: false,
      avoidCysteine: false,
      checkDisabledNetCharge: true,
      toogleColor: {
        checked: "#2ecc71",
        unchecked: "#bfbfbf",
        disabled: "#CCCCCC"
      },
      switchColor: { checked: "#28a745", unchecked: "#e2e2e2" },
      algorithms: [],
      defaultAlgorithms: [
        [
          { name: "BLAST", active: true, description: "Blast" },
          { name: "TANGO", active: true, description: "Tango" },
          { name: "ELM", active: true, description: "ELM" }
        ],
        [
          { name: "IUPred", active: true, description: "IUPred" },
          { name: "ANCHOR", active: true, description: "ANCHOR" },
          { name: "Prosite", active: true, description: "Prosite" }
        ],
        [
          { name: "Limbo", active: true, description: "Limbo" },
          { name: "TMHMM", active: true, description: "TMHMM" },
          { name: "PASTA", active: true, description: "PASTA" }
        ],
        [{ name: "Waltz", active: true, description: "Waltz" }, { name: "Amyloid pattern", active: true, description: "AmyloidPattern" }]
      ],
      frequencies: [],
      defaultFrequencies: [
        [
          { name: "A", value: 8.2, getCSSClass: "R" },
          { name: "R", value: 5.5, getCSSClass: "R" },
          { name: "N", value: 4.0, getCSSClass: "R" },
          { name: "D", value: 5.4, getCSSClass: "R" }
        ],
        [
          { name: "C", value: 1.4, getCSSClass: "C", cysteine: true },
          { name: "Q", value: 3.9, getCSSClass: "R" },
          { name: "E", value: 6.8, getCSSClass: "R" },
          { name: "G", value: 7.1, getCSSClass: "R" }
        ],
        [
          { name: "H", value: 2.3, getCSSClass: "R" },
          { name: "I", value: 6.0, getCSSClass: "R" },
          { name: "L", value: 9.7, getCSSClass: "R" },
          { name: "K", value: 5.8, getCSSClass: "R" }
        ],
        [
          { name: "M", value: 2.4, getCSSClass: "R" },
          { name: "F", value: 3.9, uvSilent: true, getCSSClass: "UV" },
          { name: "P", value: 4.7, getCSSClass: "R" },
          { name: "S", value: 6.7, getCSSClass: "R" }
        ],
        [
          { name: "T", value: 5.3, getCSSClass: "R" },
          { name: "W", value: 1.1, uvSilent: true, getCSSClass: "UV" },
          { name: "Y", value: 2.9, uvSilent: true, getCSSClass: "UV" },
          { name: "V", value: 6.9, getCSSClass: "R" }
        ]
      ],
      netCharge: null
    };
  },
  async created() {
    this.setDefaultSettings();
    this.buildDesignTypeMap();
    this.buildCSSsMap();
    if (this.formData.initialSequence.value) {
      this.maxNetChargeValue = FastaService.getSequenceLengthFrom(this.formData.initialSequence.value);
    } else {
      try {
        const response = await BackendService.calculateLength(this.formData.distance);
        this.maxNetChargeValue = Math.round(response.length);
      } catch (e) {
        console.error("Cannot get sequence length from distance");
      }
    }
  },
  mounted() {
    const self = this;
    window.addEventListener("keyup", function(event) {
      if (event.key === "Backspace") {
        self.getStepBack();
      }
    });

    if (sessionStorage.getItem("stepFinal.useDefaultSettings")) {
      this.useDefaultSettings = sessionStorage.getItem("stepFinal.useDefaultSettings") === "true";
    }
  },
  methods: {
    settingsChoiceClick: function(event) {
      if (this.useDefaultSettings !== null && this.useDefaultSettings === false) {
        //TODO check if at least one change was made before showing the confirmation modal windows.
        event.preventDefault();
        this.$refs.settingModal.show();
      }
    },
    changeToDefaultSettings: function(event) {
      this.useDefaultSettings = true;
      this.setDefaultSettings();
    },
    isValidTotalFrequency: function() {
      return Number(this.totalFrequency) === Number(100);
    },
    getAlgorithmsDataForBackend() {
      let flatArray = [];
      this.algorithms.forEach(group => {
        group.forEach(algorithm => {
          flatArray.push(algorithm);
        });
      });
      return flatArray;
    },
    isAtLeastOneActiveAlgorithm: function() {
      let algorithmsActiveData = [];
      this.algorithms.forEach(group => {
        group.forEach(algorithm => {
          algorithmsActiveData.push(algorithm.active);
        });
      });
      const active = element => element;
      return algorithmsActiveData.some(active);
    },
    getInputUvClass: function(frequency) {
      if (frequency.uvSilent && !this.avoidUVSilent && !this.useDefaultSettings) {
        return "uvInput";
      }

      if ((frequency.uvSilent && this.avoidUVSilent) || (this.useDefaultSettings && frequency.uvSilent)) {
        return "uvInput uvInputDisabled";
      }

      return "";
    },
    getRegularInputClass: function() {
      return "";
    },
    getRegularLabelClass: function() {
      if (this.useDefaultSettings) {
        return "labelDisabled";
      }
    },
    getInputCysteineClass: function(frequency) {
      const isCysteine = frequency.cysteine;
      if (isCysteine && !this.avoidCysteine && !this.useDefaultSettings) {
        return "cInput";
      }

      if ((isCysteine && this.avoidCysteine) || (this.useDefaultSettings && isCysteine)) {
        return "cInput cInputDisabled";
      }

      return "";
    },
    getInputFrequencyClass: function(frequency) {
      return this.inputClassMap.get(frequency.getCSSClass);
    },
    getLabelFrequencyClass: function(frequency) {
      return this.labelClassMap.get(frequency.getCSSClass);
    },
    getLabelCysteineClass: function(frequency) {
      const isCysteine = frequency.name === "C";
      if (isCysteine && !this.avoidCysteine && !this.useDefaultSettings) {
        return "cLabel";
      }

      if ((isCysteine && this.avoidCysteine) || (this.useDefaultSettings && isCysteine)) {
        return "cLabel cLabelDisabled";
      }

      return "";
    },
    getLabelUvClass: function(frequency) {
      if (frequency.uvSilent && !this.avoidUVSilent && !this.useDefaultSettings) {
        return "uvLabel";
      }

      if ((frequency.uvSilent && this.avoidUVSilent) || (this.useDefaultSettings && frequency.uvSilent)) {
        return "uvLabel uvLabelDisabled";
      }

      return "";
    },
    getStepBack() {
      this.goToStep(this.formData.stepFrom);
    },
    buildCSSsMap() {
      // key = aminoacid type, value = css class function
      this.inputClassMap.set("R", this.getRegularInputClass);
      this.inputClassMap.set("C", this.getInputCysteineClass);
      this.inputClassMap.set("UV", this.getInputUvClass);
      this.labelClassMap.set("R", this.getRegularLabelClass);
      this.labelClassMap.set("C", this.getLabelCysteineClass);
      this.labelClassMap.set("UV", this.getLabelUvClass);
    },
    buildDesignTypeMap() {
      // key = stepFrom, value = serverDesignType
      this.designTypeMap.set(7, 4);
      this.designTypeMap.set(6, 3);
      this.designTypeMap.set(5, 2);
      this.designTypeMap.set(4, 1);
    },
    setDefaultSettings() {
      this.restoreFrequencies();
      this.restoreNetCharge();
      this.restoreAlgorithms();
    },
    restoreAlgorithms() {
      this.algorithms = JSON.parse(JSON.stringify(this.defaultAlgorithms));
    },
    restoreNetCharge() {
      this.netCharge = 0;
      this.checkDisabledNetCharge = true;
    },
    restoreFrequencies() {
      this.avoidUVSilent = false;
      this.avoidCysteine = false;
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
    changeUVSilent() {
      this.avoidUVSilent = !this.avoidUVSilent;
      this.checkUVSilent();
    },
    checkUVSilent() {
      if (this.avoidUVSilent) {
        this.disableAllUVFrequencies();
      }
      this.scaleFrequencies();
    },
    changeCysteine() {
      this.avoidCysteine = !this.avoidCysteine;
      this.checkCysteine();
    },
    checkCysteine() {
      if (this.avoidCysteine) {
        this.frequencies = this.frequencies.map(row => {
          return row.map(frequency => {
            if (frequency.name === "C") {
              frequency.value = 0;
            }
            return frequency;
          });
        });
      }
      this.scaleFrequencies();
    },
    scaleFrequencies() {
      const frequenciesSum = this.getTotalFrequencies();
      this.frequencies = this.frequencies.map(row => {
        return row.map(frequency => {
          frequency.value = Number(((frequency.value / frequenciesSum) * 100).toFixed(1));
          return frequency;
        });
      });

      //ROUND FIX
      const newSum = this.getTotalFrequencies();
      if (newSum !== 100.0) {
        const dif = Number((newSum - 100.0).toFixed(1));
        this.frequencies = this.frequencies.map(row => {
          return row.map(frequency => {
            if (frequency.name === "N") {
              frequency.value = Number((frequency.value - dif).toFixed(1));
            }
            return frequency;
          });
        });
      }
    },
    getFrequenciesDataForBackend() {
      let flatArray = [];
      this.frequencies.forEach(group => {
        group.forEach(frequency => {
          delete frequency.uvSilent;
          delete frequency.getCSSClass;
          flatArray.push(frequency);
        });
      });
      return flatArray;
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
    getTotalFrequencies() {
      const values = this.getFrequenciesValues();
      return Number(
        values
          .reduce((sum, value) => {
            return sum + value;
          }, 0)
          .toFixed(1)
      );
    },
    checkFrequencies() {
      const sum = this.getTotalFrequencies();
      this.totalFrequency = sum === 100.0 ? 100 : sum;
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
    getDesignData: function() {
      let data = JSON.parse(JSON.stringify(this.formData));
      delete data.stepFrom;
      data.designType = this.designTypeMap.get(this.formData.stepFrom);

      // remove non initial sequences cases
      if (!data.initialSequence.value) {
        delete data.initialSequence;
      }

      if (!this.useDefaultSettings) {
        data.config = {
          frequencies: this.getFrequenciesDataForBackend(),
          algorithms: this.getAlgorithmsDataForBackend()
        };

        if (this.isEnabledNetCharge()) {
          data.config.netCharge = this.netCharge;
        }
      }

      data.language = this["$i18n"].locale;

      return data;
    },
    sendForm: async function() {
      this.$Progress.start();
      this.submitInProgress = true;
      this.clearNotifications();

      const designData = this.getDesignData();
      const response = await BackendService.designLinker(designData);

      this.$Progress.finish();
      if (!response.error) {
        sessionStorage.clear();
        this.$notify({
          group: "notifications",
          type: "success",
          title: this.$t("views.sendSuccess")
        });
        this.$router.push("/design/success");
        this.$route.params.orderNumber = response.orderNumber;
        this.$route.params.email = response.email;
      } else {
        this.$notify({
          group: "notifications",
          type: "error",
          title: response.error
        });
      }
      this.submitInProgress = false;
    },
    changeEnabledNetCharge: function() {
      console.log(this.checkDisabledNetCharge);
      this.netCharge = 0;
      this.checkDisabledNetCharge = !this.checkDisabledNetCharge;
    },
    isEnabledNetCharge: function() {
      return !this.checkDisabledNetCharge;
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
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), inset 0px -1px 0 rgba(0, 0, 0, 0.22);
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

.cLabel {
  color: rgb(243, 112, 33);
  font-weight: bold;
}
.cLabelDisabled {
  color: rgb(255, 196, 160) !important;
}
.cInputDisabled {
  border: 2px solid rgb(255, 196, 160) !important;
}
.cInput {
  border: 2px solid rgb(243, 112, 33);
  border-radius: 6px;
}

.labelDisabled {
  color: #6c757d;
}
.grey-border {
  border-right: 1px solid #dee2e6;
}
.uvReference {
  background-color: violet;
}

.reference {
  margin-left: 10px;
  margin-right: -20px;
  width: 18px;
  height: 18px;
  border-radius: 3px;
}

.cReference {
  background-color: rgb(243, 112, 33);
}

.cReferenceDisabled {
  background-color: rgb(255, 196, 160);
}

.uvReferenceDisabled {
  background-color: #eebdee !important;
}

.badge-success-disabled {
  background-color: #9ed3a4;
}

.label-check {
  position: relative;
  border-radius: 10px;
  padding: 30px 30px 30px 30px;
  font: 24px Arial;
  text-align: center;
}
.big-checkbox {
  width: 18px;
  height: 18px;
  padding: 30px;
  border: 2px solid;
  border-radius: 5px;
  border: solid white;
  border-width: 0 3px 3px 0;
}
.checkbox-lg .custom-control-label::before,
.checkbox-lg .custom-control-label::after {
  top: 0.8rem;
  width: 1.55rem;
  height: 1.55rem;
}

.checkbox-lg .custom-control-label {
  padding-top: 13px;
  padding-left: 6px;
}

.checkbox-xl .custom-control-label::before,
.checkbox-xl .custom-control-label::after {
  top: 1.2rem;
  width: 1.85rem;
  height: 1.85rem;
}

.checkbox-xl .custom-control-label {
  padding-top: 23px;
  padding-left: 10px;
}
</style>
