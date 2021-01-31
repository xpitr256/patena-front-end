import { getSequenceLengthFrom } from "../../src/services/FastaService";

let assert = require("assert");
import fastaService from "../../src/services/FastaService.js";

const fs = require("fs");

const basePath = "./test/services/fasta/";

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
        const data = fs.readFileSync(basePath + "validWithNoComment.fasta", "utf8");
        assert(fastaService.isValidFasta(data));
      } catch (err) {
        throw err;
      }
    });

    it("should return false for wrong amino acid", function() {
      try {
        const data = fs.readFileSync(basePath + "invalidAminoAcidCharacter.fasta", "utf8");
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
        const data = fs.readFileSync(basePath + "spacesBetweenAminoAcid.fasta", "utf8");
        assert.strictEqual(fastaService.isValidFasta(data), false);
      } catch (err) {
        throw err;
      }
    });

    it("should return false for undefined data", function() {
      assert.strictEqual(fastaService.isValidFasta(), false);
    });

    it("should return false for null data", function() {
      assert.strictEqual(fastaService.isValidFasta(null), false);
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

    it("should return only the sequence with no comments", function() {
      try {
        const data = fs.readFileSync(basePath + "validWithNoComment.fasta", "utf8");
        assert.strictEqual(fastaService.getFirstSequence(data), "AAARRRRRNNNNDDDDDDCCCCEEQQQ");
      } catch (err) {
        throw err;
      }
    });

    it("should return the sequence in a fasta with 2 comments before the sequence", function() {
      try {
        const data = fs.readFileSync(basePath + "twoLinesComment.fasta", "utf8");
        assert.strictEqual(fastaService.getFirstSequence(data), "ABC");
      } catch (err) {
        throw err;
      }
    });

    it("should return the sequence in a fasta with no comment at the begin then comment and finally a second sequence", function() {
      try {
        const data = fs.readFileSync(basePath + "sequenceCommentOtherSequence.fasta", "utf8");
        assert.strictEqual(fastaService.getFirstSequence(data), "DDDDDEEEE");
      } catch (err) {
        throw err;
      }
    });

    it("should return the sequence in a fasta with 1 line comment and 1 line sequence after it", function() {
      try {
        const data = fs.readFileSync(basePath + "commentSequence.fasta", "utf8");
        assert.strictEqual(fastaService.getFirstSequence(data), "ZGHWABC");
      } catch (err) {
        throw err;
      }
    });

    it("should return the sequence in a fasta with only 1 line sequence", function() {
      try {
        const data = fs.readFileSync(basePath + "oneLineSequence.fasta", "utf8");
        assert.strictEqual(fastaService.getFirstSequence(data), "AAABBBCCC");
      } catch (err) {
        throw err;
      }
    });

    it("should return empty string for an empty fasta", function() {
      try {
        const data = fs.readFileSync(basePath + "emptyFile.fasta", "utf8");
        assert.strictEqual(fastaService.getFirstSequence(data), "");
      } catch (err) {
        throw err;
      }
    });

    it("should return empty string for undefined data", function() {
      assert.strictEqual(fastaService.getFirstSequence(), "");
    });

    it("should return empty string for null data", function() {
      assert.strictEqual(fastaService.getFirstSequence(null), "");
    });
  });

  describe("get sequence length", function() {
    it("should be 0  for undefined data", function() {
      assert.strictEqual(fastaService.getSequenceLengthFrom(), 0);
    });

    it("should be 0  for null data", function() {
      assert.strictEqual(fastaService.getSequenceLengthFrom(null), 0);
    });

    it("should be 0 for an empty fasta", function() {
      try {
        const data = fs.readFileSync(basePath + "emptyFile.fasta", "utf8");
        assert.strictEqual(fastaService.getSequenceLengthFrom(data), 0);
      } catch (err) {
        throw err;
      }
    });

    it("should be 3 for 'ABC' sequence", function() {
      assert.strictEqual(fastaService.getSequenceLengthFrom("ABC"), 3);
    });

    it("should still be 3 for '    ABC     ' sequence", function() {
      assert.strictEqual(fastaService.getSequenceLengthFrom("    ABC     "), 3);
    });
  });

  describe("get sequence name", function() {
    it("should be empty for empty fasta", function() {
      try {
        const data = fs.readFileSync(basePath + "emptyFile.fasta", "utf8");
        assert.strictEqual(fastaService.getSequenceName(data), "");
      } catch (err) {
        throw err;
      }
    });

    it("should be empty for no comment fasta", function() {
      try {
        const data = fs.readFileSync(basePath + "validWithNoComment.fasta", "utf8");
        assert.strictEqual(fastaService.getSequenceName(data), "");
      } catch (err) {
        throw err;
      }
    });

    it("should not be empty for valid fasta with comment in the first line", function() {
      try {
        const data = fs.readFileSync(basePath + "validFasta.fasta", "utf8");
        assert.strictEqual(fastaService.getSequenceName(data), "Comment comment first sequence");
      } catch (err) {
        throw err;
      }
    });

    it("should get the first of two lines comments", function() {
      try {
        const data = fs.readFileSync(basePath + "twoLinesComment.fasta", "utf8");
        assert.strictEqual(fastaService.getSequenceName(data), "comment 1");
      } catch (err) {
        throw err;
      }
    });
  });
});
