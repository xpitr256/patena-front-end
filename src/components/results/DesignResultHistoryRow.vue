<template>
  <tbody>
    <tr v-for="row in rows" :key="row.Before">
      <td>{{ row.Pos }}</td>
      <td>
        <Sequence v-bind:sequence="row.Before" :warning-positions="[row.Pos]" :show-truncated="true"></Sequence>
      </td>
      <td>
        <span style="font-size:20pt;"><i class="fas fa-long-arrow-alt-right"></i></span>
      </td>
      <td>
        <Sequence v-bind:sequence="row.After" :success-positions="[row.Pos]" :show-truncated="true"></Sequence>
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
