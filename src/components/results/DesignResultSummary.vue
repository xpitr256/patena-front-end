<template>
  <table class="table ">
    <thead class="background-th">
      <tr>
        <th class="a" scope="col" v-if="this.showDualSummary">
          {{
            $t("views.components.results.DesignResultSummary.headers.Initial")
          }}
          (Score: {{ initialScore }})
        </th>
        <th class="a" scope="col">
          {{
            $t("views.components.results.DesignResultSummary.headers.Final")
          }}
          (Score: {{ finalScore }})
        </th>
        <th class="a" scope="col">
          {{ $t("views.components.results.DesignResultSummary.headers.Copy") }}
        </th>
        <th class="a" scope="col">
          {{
            $t("views.components.results.DesignResultSummary.headers.Length")
          }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="a" v-if="this.showDualSummary">
          <Sequence
            :sequence="initialSequence"
            :show-big="false"
            :show-as-initial="true"
            :show-truncated="false"
          ></Sequence>
        </td>
        <td class="a">
          <Sequence
            :sequence="finalSequence"
            :show-big="false"
            :show-as-final="true"
            :show-truncated="false"
          ></Sequence>
        </td>
        <td class="a">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            v-on:click="getSequenceCopy"
          >
            <i class="fas fa-copy"></i>
          </button>
          <transition name="fade" v-on:enter="enter">
            <p v-if="show">
              {{
                $t(
                  "views.components.results.DesignResultSummary.headers.Copied"
                )
              }}
            </p>
            <p v-if="messageShowError">
              {{
                $t(
                  "views.components.results.DesignResultSummary.headers.ErrorMessage"
                )
              }}
            </p>
          </transition>
        </td>
        <td class="a align-vertical" style="font-size:18px;">
          {{ length }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Aminoacid from "./Aminoacid";
import Sequence from "./Sequence";
import FastaService from "../../services/FastaService";

export default {
  name: "DesignResultSummary",
  props: ["initialSequence", "finalSequence", "initialScore", "finalScore"],
  components: {
    Sequence,
    Aminoacid
  },
  data: function() {
    return {
      show: false,
      messageShowError: false,
      sizeDualSummary: 12
    };
  },
  methods: {
    getSequenceCopy: function() {
      let sequencesCopied = this.getSequencesCopied();
      navigator.clipboard
        .writeText(sequencesCopied)
        .then(() => {
          console.log("Text is on the clipboard.");
          this.show = !this.show;
        })
        .catch(e => {
          console.error(e);
          this.messageShowError = !this.messageShowError;
        });
    },
    getSequencesCopied: function() {
      return this.finalSequence;
    },
    enter: function(el, done) {
      let that = this;

      setTimeout(function() {
        that.show = false;
      }, 2000);
    }
  },
  computed: {
    length: function() {
      return FastaService.getSequenceLengthFrom(this.finalSequence);
    },
    showDualSummary: function() {
      return this.length <= this.sizeDualSummary;
    }
  }
};
</script>

<style scoped>
.a {
  text-align: center;
}
.clip-demo {
  font-size: 95%;
  padding: 0.5em;
  display: flex;
  line-height: normal;
  width: auto;
  margin: auto;
  margin-bottom: 2em;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.button-demo {
  float: right;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
    .fade-leave-to
        /* .fade-leave-active in <2.1.8 */

 {
  opacity: 0;
}
.background-th {
  background-color: #e2e2e2;
  vertical-align: baseline;
}
.align-vertical {
  vertical-align: baseline;
}
</style>
