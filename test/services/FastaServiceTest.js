let assert = require("assert");
import fastaService from "../../src/services/FastaService.js";

const fs = require("fs");

describe("FastaService Test ", function() {
  describe("Validate fasta file ", function() {
    it("should return true for valid file", function() {
      try {
        const data = fs.readFileSync(
          "./test/services/validFasta.fasta",
          "utf8"
        );
        assert(fastaService.isValidFasta(data));
      } catch (err) {
        throw err;
      }
    });

    it("should return false for wrong amino acid", function() {
      try {
        const data = fs.readFileSync(
          "./test/services/invalidAminoAcidCharacter.fasta",
          "utf8"
        );
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for empty files", function() {
      try {
        const data = fs.readFileSync("./test/services/emptyFile.fasta", "utf8");
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for files with no amino acid but comments", function() {
      try {
        const data = fs.readFileSync(
          "./test/services/noAminoAcid.fasta",
          "utf8"
        );
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for files with spaces between amino acids", function() {
      try {
        const data = fs.readFileSync(
          "./test/services/spacesBetweenAminoAcid.fasta",
          "utf8"
        );
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });
  });
});
