import { readLines } from "./utils";

function part1(lines: string[]): number {
  let result = 0;

  for (const line of lines) {
    // Iterate through all characters of a line, and find the two largest numbers.
    // Sliding-window-ish technique. Pretty greedy, but will probably work?
    let maxLeft = 0;
    let maxRight = 0;
    for (let i = 0; i < line.length - 1; i++) {
      const numLeft = parseInt(line[i]);
      if (numLeft > maxLeft) {
        maxLeft = numLeft;
        maxRight = 0;

        for (let j = i + 1; j < line.length; j++) {
          const numRight = parseInt(line[j]);
          if (numRight > maxRight) {
            maxRight = numRight;
          }
        }
      }
    }

    const value = `${maxLeft}${maxRight}`;
    result += parseInt(value);
  }

  return result;
}

function part2(lines: string[]): number {
  const capacity = 12;
  let result = 0;

  for (const line of lines) {
    let selected: number[] = [];
    let startIndex = 0;

    for (let i = 0; i < capacity; i++) {
      const remaining = capacity - i - 1;

      // Find the highest digit in the range that leaves enough digits after it.
      const searchEnd = line.length - remaining;
      let maxDigit = 0;
      let maxIndex = -1;

      for (let i = startIndex; i < searchEnd; i++) {
        const digit = parseInt(line[i]);
        if (digit > maxDigit) {
          maxDigit = digit;
          maxIndex = i;
        }
      }

      selected.push(maxDigit);
      startIndex = maxIndex + 1;
    }

    result += parseInt(selected.join(""));
  }

  return result;
}

const input = readLines(3); // Replace number with appropriate day.
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
