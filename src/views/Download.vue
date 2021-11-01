<template>
  <div class="container wrapper">
    <div>
      <DesignResult></DesignResult>
    </div>
    <br />
    <div align="center">
      <DesignResultSummary
        :initial-sequence="initialSequence"
        :initial-score="initialScore"
        :final-sequence="finalSequence"
        :final-score="finalScore"
      ></DesignResultSummary>
    </div>
    <br />
    <div>
      <DesignResultHistory
        :mutations-history="mutationsPerPage"
        v-bind:total-page-count="totalPageCount"
        @pageChanged="updateMutationsForPage"
      ></DesignResultHistory>
    </div>
    <a href="#" class="btn btn-lg btn-light mt-4" v-on:click="navigate()"><i class="fas fa-chevron-left"></i> {{ $t("views.getBack") }} </a>
  </div>
</template>

<script>
import router from "../router";
import DesignResult from "../components/results/DesignResult";
import DesignResultSummary from "../components/results/DesignResultSummary";
import DesignResultHistory from "../components/results/DesignResultHistory";

export default {
  name: "Download",
  components: { DesignResultSummary, DesignResult, DesignResultHistory },
  data() {
    return {
      orderNumber: "",
      initialSequence: "",
      finalSequence: "",
      mutationsHistory: [],
      mutationsPerPage: [],
      initialScore: "",
      finalScore: "",
      maxItemsPerPage: 10,
      totalPageCount: 0
    };
  },
  created() {
    if (this.$route.params.results) {
      console.log("resquest / con order number", this.$route.fullPath);
      this.orderNumber = this.$route.params.results.results.orderNumber;
      this.initialSequence = this.$route.params.results.results.initialSequence;
      this.finalSequence = this.$route.params.results.results.finalSequence;
      this.mutationsHistory = this.$route.params.results.results.mutationsHistory;
      this.updateMutationsForPage(1);
      this.totalPageCount = this.calculateTotalPageCount();
      this.initialScore = this.$route.params.results.results.initialScore;
      this.finalScore = this.$route.params.results.results.finalScore;
      this.mutationsHistory.unshift({
        mutated_sequence: this.initialSequence,
        score_after_mutation: this.initialScore
      });
    } else {
      this.checkDirectLink();
    }
  },
  methods: {
    navigate() {
      router.push("/results");
    },
    updateMutationsForPage(page) {
      const startIndex = (page - 1) * this.maxItemsPerPage;
      const endIndex = startIndex + this.maxItemsPerPage;
      this.mutationsPerPage = this.mutationsHistory.slice(startIndex, endIndex);
    },
    calculateTotalPageCount() {
      return Math.ceil(this.mutationsHistory.length / this.maxItemsPerPage);
    },
    checkDirectLink() {
      console.log("Redirecting search Results...");
      const parseRes = this.$route.fullPath.split("/");
      let orderNumber = parseRes[2];
      if (orderNumber != null) {
        this.$router.push("/results?orderNumber=" + orderNumber);
      }
    }
  }
};
</script>
