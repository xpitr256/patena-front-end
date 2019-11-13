export async function isValidFastaFile(fastaFile) {
  return true; // TODO do it
}

export async function getSequenceLengthFrom(fastaFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(fastaFile, "UTF-8");
    reader.onload = function(evt) {
      const lines = evt.target.result.split("\n");
      resolve(lines);
    };
    reader.onerror = function(evt) {
      reject(new Error("Error reading file"));
    };
  });
}

export default { isValidFastaFile, getSequenceLengthFrom };
