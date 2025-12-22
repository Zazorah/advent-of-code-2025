import { readLines } from "./utils";

// Intuition:
// ----
// - Similar enough to Day 2 that I can probably use similar logic.
// - This might be like the only useful place for a linked list.

class Range {
  leftBound;
  rightBound;

  constructor(leftBound: number, rightBound: number) {
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  contains(value: number) {
    return this.leftBound <= value && this.rightBound >= value;
  }

  toString() {
    return `${this.leftBound} - ${this.rightBound}`;
  }
}

function processData(lines: string[]) {
  const rangeLines: string[] = [];
  const idLines: string[] = [];

  // Split input into appropriate arrays.
  let targetList = rangeLines;
  for (const line of lines) {
    if (line === "") {
      targetList = idLines;
      continue;
    }

    targetList.push(line);
  }

  const ranges: Range[] = processRanges(rangeLines);
  const ids: number[] = idLines.map((value) => parseInt(value));

  return { ranges, ids };
}

function processRanges(lines: string[]) {
  const result: Range[] = [];

  for (const line of lines) {
    const splitByComma = line.split("-");
    addAndCollapse(
      result,
      new Range(parseInt(splitByComma[0]!), parseInt(splitByComma[1]!))
    );
  }

  return result;
}

function addAndCollapse(target: Range[], newRange: Range) {
  for (let i = 0; i < target.length; i++) {
    const existingRange = target[i];
    if (
      existingRange.leftBound <= newRange.rightBound &&
      newRange.leftBound <= existingRange.rightBound
    ) {
      // Broaden the existing range with new values.
      const newLeft = Math.min(existingRange.leftBound, newRange.leftBound);
      const newRight = Math.max(existingRange.rightBound, newRange.rightBound);

      // Remove the existing array and pass a copy down the row.
      target.splice(i, 1);
      addAndCollapse(target, new Range(newLeft, newRight));
      return;
    }
  }

  target.push(newRange);
}

function part1(ranges: Range[], ids: number[]): number {
  let total: number = 0;

  for (const id of ids) {
    let wasFound: boolean = false;
    for (const range of ranges) {
      if (range.contains(id)) {
        wasFound = true;
        break;
      }
    }

    if (wasFound) {
      total += 1;
    }
  }

  return total;
}

function part2(ranges: Range[]): number {
  let total = 0;

  for (const range of ranges) {
    total += range.rightBound - range.leftBound + 1;
  }

  return total;
}

const input = readLines(5);
const { ranges, ids } = processData(input);

console.log("Part 1:", part1(ranges, ids));
console.log("Part 2:", part2(ranges));
