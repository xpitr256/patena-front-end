<template>
  <div class="container wrapper">
    <div>
      <DesignResult></DesignResult>
    </div>
    <br>
    <div>
      <DesignResultSummary
              :initial-sequence="initialSequence"
              :initial-score="initialScore"
              :final-sequence="finalSequence"
              :final-score="finalScore"
      ></DesignResultSummary>
    </div>
    <br>
      <div>
      <DesignResultHistory v-bind:mutations-history="mutationsHistory"></DesignResultHistory>
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
  components: {DesignResultSummary, DesignResult, DesignResultHistory},
  data() {
    return {
      orderNumber: '',
      initialSequence: '',
      finalSequence: '',
      mutationsHistory: [],
      initialScore:'',
      finalScore:''
    };
  },
  created() {
    this.orderNumber = this.$route.params.results.orderNumber;
    this.initialSequence = this.$route.params.results.initialSequence;
    this.finalSequence = this.$route.params.results.finalSequence;
    this.mutationsHistory = this.$route.params.results.mutationsHistory;
    this.initialScore = this.$route.params.results.initialScore;
    this.finalScore = this.$route.params.results.finalScore;
    this.mutationsHistory.unshift({mutated_sequence:this.initialSequence,score_after_mutation: this.initialScore})
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
