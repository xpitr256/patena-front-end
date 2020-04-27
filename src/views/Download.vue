<template>
  <div class="container wrapper">
    <div>
      <DesignResult></DesignResult>
    </div>
    <br>
    <div>
      <DesignResultSummary v-bind:initial-sequence="initialSequence" v-bind:final-sequence="finalSequence"></DesignResultSummary>
    </div>
    <br>
    <div>
      <DesignResultHistory  v-bind:mutations-history="mutationsHistory"></DesignResultHistory>
    </div>


    <a href="#" class="btn btn-lg btn-light mt-4" v-on:click="navigate()">
      <i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }}
    </a>
  </div>
</template>

<script>
import router from "../router";
import DesignResult from "../components/results/DesignResult";
import DesignResultSummary from "../components/results/DesignResultSummary";
import DesignResultHistory from "../components/results/DesignResultHistory";

export default {
  name: "Download",
  components: {DesignResultHistory, DesignResultSummary, DesignResult},
  data() {
    return {
      orderNumber: '',
      initialSequence: '',
      finalSequence: '',
      mutationsHistory: [],
      initialScore:'',
      //columns: "Pos,Before, ,After,Score"
      //rows:[{Pos:'2', Before:'ABCDSPKWTG', After:'AKCDSPKWTG', Score:'135.6'},{Pos:'4', Before:'AKCDSPKWTG', After:'AKCKSPKWTG', Score:'15.6'}]
    };
  },
  created() {
    this.orderNumber = this.$route.params.results.orderNumber;
    this.initialSequence = this.$route.params.results.initialSequence;
    this.finalSequence = this.$route.params.results.finalSequence;
    this.mutationsHistory = this.$route.params.results.mutationsHistory;
    this.initialScore = this.$route.params.results.initialScore;
    this.mutationsHistory.unshift({mutated_sequence:this.initialSequence,score_after_mutation: this.initialScore})
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
