<template>
  <div>
    <div>
      <h2>{{ $t("views.components.results.DesignResultHistory.title") }}</h2>
    </div>
    <div>
      <table class="table text-center">
        <thead>
          <tr>
            <th>
              {{ $t("views.components.results.DesignResultHistory.headers.Pos") }}
            </th>
            <th>
              {{ $t("views.components.results.DesignResultHistory.headers.Before") }}
            </th>
            <th></th>
            <th>
              {{ $t("views.components.results.DesignResultHistory.headers.After") }}
            </th>
            <th>
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
      this.rows = this.mutationsHistory
        .map(mutation => {
          if (mutation.previous_residue) {
            const index = mutation.mutated_position;
            const beforeSequence = mutation.mutated_sequence.substring(0, index) + mutation.previous_residue + mutation.mutated_sequence.substring(index + 1);
            return {
              Pos: mutation.mutated_position,
              Before: beforeSequence,
              After: mutation.mutated_sequence,
              Score: mutation.score_after_mutation
            };
          }
        })
        .filter(row => row !== undefined);
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
