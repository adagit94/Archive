/**
 * @description Function compares character sequences - both, from the beginning and end - returning tuple with matched quantities in form [count from the beginning, count from the end].
 * @param a First string used during sequence comparison.
 * @param b Second string used during sequence comparison.
 * @returns Tuple with matched quantities in form [count from the beginning, count from the end].
 */
export const findCommonCharsFromEdges = (a: string, b: string): [number, number] => {
  const commonChars: [number, number] = [0, 0]; // Quantities of common characters for string values - from the begining and end.

  for (let i = 0; i < a.length && i < b.length && a[i] === b[i]; i++) {
    commonChars[0]++;
  }

  for (let i = a.length - 1, j = b.length - 1; i >= commonChars[0] && j >= commonChars[0] && a[i] === b[j]; i--, j--) {
    commonChars[1]++;
  }

  return commonChars;
};
