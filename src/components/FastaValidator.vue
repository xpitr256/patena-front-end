<template>
  <div class="mt-1">


    <div class="alert alert-secondary" role="alert" v-show="isValid === null">
      <h4 class="alert-heading">Fasta file visualization</h4>
      Once you choose a fasta file you will see in this box the selected sequence, it's name and also it's length.
    </div>

    <div class="alert alert-success" role="alert" v-show="isValid">
      <h4 class="alert-heading">Well done! This is a valid fasta file</h4>
      <p class="mb-1 mt-3">
        <strong>File: </strong><em>{{ fileName }}</em>
        <span class="ml-3"><strong> Length: </strong>{{ sequenceLength }}</span>
      </p>
      <p class="mb-0 mt-0"><strong>Sequence: </strong></p>
      <p class="mb-0 mt-0 fasta-text" v-html="sequence"></p>
    </div>
    <div class="alert alert-danger" role="alert" v-show="isInvalid">
      <h4 class="alert-heading">Oops! This is not a valid fasta file</h4>
      <p class="mb-0 mt-0">
        <strong>Please check out the following suggestions: </strong>
      </p>
      <ul>
        <li>Only <em>.fasta</em> and <em>.txt</em> files are allowed.</li>
        <li>The file should not be empty.</li>
        <li>All comments should start with ">" character.</li>
        <li>
          Outside a comment, the only allowed characters are: {{ aminoAcids }}
        </li>
        <li>Your file contains forbidden characters.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import FastaService from "../services/FastaService";
export default {
  name: "FastaValidator",
  props: {
    fastaFile: File,
    id: String,
    charactersInLine: Number
  },
  watch: {
    fastaFile: async function(newVal, oldVal) {
      this.reset();
      try {
        const content = await FastaService.getFastaFileContent(newVal);
        this.isValid = FastaService.isValidFasta(content);
        if (this.isValid) {
          this.fileName = newVal.name;
          const sequence = FastaService.getFirstSequence(content);
          this.sequence = FastaService.splitSequenceInLinesOf(
            sequence,
            this.charactersInLine
          );
          this.sequenceLength = FastaService.getSequenceLengthFrom(sequence);
          this.$emit("newFastaValidation", this.id, true);
        } else {
          if (newVal) {
            this.$emit("newFastaValidation", this.id, false);
            this.isInvalid = true;
          } else {
            this.reset();
          }
        }
      } catch (e) {
        this.$emit("newFastaValidation", this.id, false);
        this.isValid = false;
        this.isInvalid = true;
      }
    }
  },
  methods: {
    reset: function() {
      this.fileName = "";
      this.sequenceLength = 0;
      this.sequence = "";
      this.isValid = null;
      this.isInvalid = null;
    }
  },
  data: function() {
    return {
      isValid: null,
      isInvalid: null,
      fileName: "",
      sequenceLength: 0,
      sequence: "",
      aminoAcids: FastaService.getAminoAcids().join(" ")
    };
  }
};
</script>

<style scoped>
.alert-heading {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
  .fasta-text {
    font-family: monospace, monospace;
  }
</style>
