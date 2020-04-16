<template>
  <div class="container wrapper">
    <div>
      <DesignResult></DesignResult>
    </div>
    <br>
    <div>
      <DesignResultSummary></DesignResultSummary>
    </div>
    <br>
    <div>
      <DesignResultHistory></DesignResultHistory>
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
      orderNumber: 0
    };
  },
  created() {
    this.orderNumber = this.$route.params.orderNumber;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
};
</script>
