<template>
  <tbody>
    <tr v-for="(row, index) in rows" :key="index">
      <td style="text-align: center;">{{ row.Pos }}</td>
      <td style="text-align: center;">
        <Sequence
          v-bind:sequence="row.Before"
          :warning-positions="[row.Pos]"
          :show-truncated="true"
        ></Sequence>
      </td>
      <td style="text-align: center;">
        <span style="font-size:20pt;"
          ><i class="fas fa-long-arrow-alt-right"></i
        ></span>
      </td>
      <td style="text-align: center;">
        <Sequence
          v-bind:sequence="row.After"
          :success-positions="[row.Pos]"
          :show-truncated="true"
        ></Sequence>
      </td>
      <td>{{ row.Score }}</td>
    </tr>
  </tbody>
</template>

<script>
import Sequence from "./Sequence";
export default {
  name: "DesignResultHistoryRow",
  components: { Sequence },
  columns: "Pos,Before, ,After,Score",
  props: ["rows"],
  data: function() {
    return {
      mutationsHistory: []
    };
  }
};
</script>

<style scoped></style>
