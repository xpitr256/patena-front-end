let assert = require("assert");
import fastaService from "../../src/services/FastaService.js";

const fs = require("fs");

const basePath = "./test/services/";

describe("FastaService Test ", function() {
  describe("Validate fasta file ", function() {
    it("should return true for valid file", function() {
      try {
        const data = fs.readFileSync(basePath + "validFasta.fasta", "utf8");
        assert(fastaService.isValidFasta(data));
      } catch (err) {
        throw err;
      }
    });

    it("should return true for valid file with no comments", function() {
      try {
        const data = fs.readFileSync(
          basePath + "validWithNoComment.fasta",
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
          basePath + "invalidAminoAcidCharacter.fasta",
          "utf8"
        );
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for empty files", function() {
      try {
        const data = fs.readFileSync(basePath + "emptyFile.fasta", "utf8");
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for files with no amino acid but comments", function() {
      try {
        const data = fs.readFileSync(basePath + "noAminoAcid.fasta", "utf8");
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for files with spaces between amino acids", function() {
      try {
        const data = fs.readFileSync(
          basePath + "spacesBetweenAminoAcid.fasta",
          "utf8"
        );
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get fasta sequence ", function() {
    it("should return only the first sequence and not others", function() {
      try {
        const data = fs.readFileSync(basePath + "validFasta.fasta", "utf8");
        assert.strictEqual(
          fastaService.getFirstSequence(data),
          "GGCAGATTCCCCCTAGACCCGCCCGCACCATGGTCAGGCATGCCCCTCCTCATCGCTGGGCACAGCCCAGAGGGTATCCCAGCTGCTCCCAAATAAACTCCAGAAG"
        );
      } catch (err) {
        throw err;
      }
    });

    it("should return only the onley sequencewith no comments", function() {
      try {
        const data = fs.readFileSync(
          basePath + "validWithNoComment.fasta",
          "utf8"
        );
        assert.strictEqual(
          fastaService.getFirstSequence(data),
          "AAAAABBBBBBCCCCCCCCCCCCCZZZZIIIIDDDDDDQQQQQQQ"
        );
      } catch (err) {
        throw err;
      }
    });
  });
});
