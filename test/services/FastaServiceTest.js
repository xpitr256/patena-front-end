let assert = require("assert");
import fastaService from "../../src/services/FastaService.js";

describe("FastaService Test ", function() {
  describe("Validate fasta file ", function() {
    it("should return true for valid file", function() {
      //TODO
      assert(fastaService.isValidFastaFile());
    });
  });
});
