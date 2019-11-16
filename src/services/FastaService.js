const aminoAcids = [
  "A",
  "R",
  "N",
  "D",
  "B",
  "C",
  "E",
  "Q",
  "Z",
  "G",
  "H",
  "I",
  "L",
  "K",
  "M",
  "F",
  "P",
  "S",
  "T",
  "W",
  "Y",
  "V"
];

/**
 * Returns true | false according to fasta validations
 */
export function isValidFasta(fastaContent) {
  const lines = fastaContent.split("\n");
  const linesWithoutComments = lines.filter(line => !line.startsWith(">"));
  const allContent = linesWithoutComments.join("").trim();
  if (!allContent) {
    return false;
  }
  for (const aminoAcid of allContent) {
    if (!aminoAcids.includes(aminoAcid)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns the first (or only) amino acid sequence without comments
 */
export function getFirstSequence(fastaContent) {
  const lines = fastaContent.split("\n");

  if (lines.length === 0) {
    return "";
  }

  const firstNoCommentLineIndex = lines.findIndex(
    line => !line.startsWith(">")
  );
  let otherLines = lines.slice(firstNoCommentLineIndex, lines.length);
  const otherCommentIndex = otherLines.findIndex(line => line.startsWith(">"));

  if (otherCommentIndex > 0) {
    otherLines = otherLines.slice(0, otherCommentIndex);
  }

  return otherLines.join("").trim();
}

/**
 * It tries to open the fasta file and return the whole content as a string.
 */
export async function getFastaFileContent(fastaFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(fastaFile, "UTF-8");
    reader.onload = function(evt) {
      resolve(evt.target.result);
    };
    reader.onerror = function(evt) {
      reject(new Error("Error reading file"));
    };
  });
}

export async function getSequenceLengthFrom(fastaContent) {}

export default {
  isValidFasta,
  getFastaFileContent,
  getFirstSequence,
  getSequenceLengthFrom
};
