import { readInput } from "./utils";

// Scratch Pad:
// Will need to do my own parsing since inputs are separated by comma rather than newlines.
// Process:
// - Break up ranges.
// - Treat each ID in the range as a string, and check if it's invalid.
//   - IDs are invalid if they have repeat the same character twice, so just finding the middle character and checking for equality should be enough.

// Action Items:
// [x] - Process inputs into a list of ranges.

type Range = [number, number];

function processInput(input: string): Range[] {
  let result = [];

  const splitByComma = input.split(",");
  for (const stringRange of splitByComma) {
    const splitByHyphen = stringRange.split("-");

    result.push([
      parseInt(splitByHyphen[0]),
      parseInt(splitByHyphen[1]),
    ] as Range);
  }

  return result;
}

function part1(ranges: Range[]): number {
  let result = 0;

  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      const numString = `${i}`;

      // Check if it's even length.
      if (numString.length % 2 == 0) {
        const middleIndex = numString.length / 2;

        const leftHalf = numString.slice(0, middleIndex);
        const rightHalf = numString.slice(middleIndex);

        if (leftHalf === rightHalf) {
          result += i; // Add the value of the ID.
        }
      }
    }
  }

  return result;
}

function hasRepeatingCharacters(numString: string) {
  const len = numString.length;

  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    if (len % patternLen === 0) {
      const pattern = numString.slice(0, patternLen);
      let matches = true;

      for (let j = patternLen; j < len; j += patternLen) {
        if (numString.slice(j, j + patternLen) !== pattern) {
          matches = false;
          break;
        }
      }

      if (matches) {
        return true;
      }
    }
  }
}

function part2(ranges: Range[]): number {
  let result = 0;

  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      const numString = `${i}`;

      if (hasRepeatingCharacters(numString)) {
        result += i;
      }
    }
  }

  return result;
}

const input = readInput(2); // Replace number with appropriate day.
const ranges = processInput(input);

console.log("Part 1:", part1(ranges));
console.log("Part 2:", part2(ranges));
