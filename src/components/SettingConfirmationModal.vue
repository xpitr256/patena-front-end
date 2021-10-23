<template>
  <div class="modal fade" id="settingConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t("views.confirmationModal.title") }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ $t("views.settingConfirmationModal.text") }}</p>
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

export default {
  name: "SettingConfirmationModal",
  methods: {
    confirm: function() {
      this.$emit("settingConfirmationModal");
      $$("#settingConfirmationModal").modal("hide");
    },
    show: function() {
      $$("#settingConfirmationModal").modal("show");
    }
  }
};
</script>

<style scoped></style>
