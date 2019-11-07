<template>
  <div
    class="modal fade"
    id="confirmationModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t("views.confirmationModal.title") }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <read-only-field
              :label="$t('views.confirmationModal.operation')"
              :value="operation"
            ></read-only-field>
            <read-only-field
              :label="$t('views.confirmationModal.initialSequence')"
              :value="initialSequence"
              highlight="true"
            ></read-only-field>
            <read-only-field
              :label="$t('views.confirmationModal.flankingSequence1')"
              :value="flankingSequence1"
            ></read-only-field>
            <read-only-field
              :label="$t('views.confirmationModal.flankingSequence2')"
              :value="flankingSequence2"
            ></read-only-field>
            <read-only-field
              :label="$t('views.confirmationModal.sequence')"
              :value="sequence"
              highlight="true"
            ></read-only-field>
            <read-only-field
              :label="$t('views.confirmationModal.distance')"
              :value="distance"
            ></read-only-field>
            <read-only-field
              :label="$t('views.confirmationModal.email')"
              :value="email"
            ></read-only-field>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">
            {{ $t("views.confirmationModal.btnCancel") }}
          </button>
          <button type="button" class="btn btn-primary" v-on:click="confirm">
            {{ $t("views.confirmationModal.btnConfirm") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $$ from "jquery";
import ReadOnlyField from "./ReadOnlyField";

export default {
  name: "confirmationModal",
  components: { ReadOnlyField },
  props: [
    "operation",
    "email",
    "distance",
    "initialSequence",
    "flankingSequence1",
    "flankingSequence2",
    "sequence"
  ],
  methods: {
    confirm: function() {
      this.$emit("modalConfirmation");
      $$("#confirmationModal").modal("hide");
    },
    show: function() {
      $$("#confirmationModal").modal("show");
    }
  }
};
</script>

<style scoped></style>
