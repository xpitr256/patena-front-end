<template>
  <div>
    <div>
      <h2>{{ $t("views.components.results.DesignResultHistory.title") }}</h2>
    </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th style="text-align: center;">
              {{ $t("views.components.results.DesignResultHistory.headers.Pos") }}
            </th>
            <th style="text-align: center;">
              {{ $t("views.components.results.DesignResultHistory.headers.Before") }}
            </th>
            <th style="text-align: center;"></th>
            <th style="text-align: center;">
              {{ $t("views.components.results.DesignResultHistory.headers.After") }}
            </th>
            <th style="text-align: center;">
              {{ $t("views.components.results.DesignResultHistory.headers.Score") }}
            </th>
          </tr>
        </thead>
        <design-result-history-row v-bind:rows="rows"></design-result-history-row>
      </table>
      <nav class="mb-4">
        <v-pagination v-model="currentPage" :page-count="totalPageCount" :classes="bootstrapPaginationClasses"></v-pagination>
      </nav>
    </div>
  </div>
</template>

<script>
import DesignResultHistoryRow from "./DesignResultHistoryRow";
import vPagination from "vue-plain-pagination";

export default {
  name: "DesignResultHistory",
  components: { DesignResultHistoryRow, vPagination },
  props: {
    mutationsHistory: Array,
    totalPageCount: Number
  },
  data() {
    return {
      currentPage: 1,
      bootstrapPaginationClasses: {
        //http://getbootstrap.com/docs/4.1/components/pagination/
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link"
      },
      rows: []
    };
  },
  watch: {
    currentPage: async function(newVal) {
      if (newVal) {
        this.$Progress.start();
        this.$emit("pageChanged", newVal);
      }
    },
    mutationsHistory: function() {
      this.fillMutationRows();
    }
  },
  methods: {
    fillMutationRows() {
      this.rows = [];
      let i;
      for (i = 0; i < this.mutationsHistory.length - 1; i++) {
        this.rows.push({
          Pos: this.mutationsHistory[i + 1].mutated_position,
          Before: this.mutationsHistory[i].mutated_sequence,
          After: this.mutationsHistory[i + 1].mutated_sequence,
          Score: this.mutationsHistory[i + 1].score_after_mutation
        });
      }
      this.$Progress.finish();
    }
  },
  created() {
    this.$Progress.start();
    this.fillMutationRows();
  }
};
</script>

<style scoped></style>
