import { readLines } from "./utils";

// Preliminary Thoughts:
// - Having some class that represents the dial and can be 'turned' will make things easy here.

interface DialResponse {
  newValue: number;
  zeroEncounters: number;
}

class Dial {
  private currValue: number;
  private dialMax: number;

  constructor(startingValue: number = 50, maxValue: number = 100) {
    this.currValue = startingValue;
    this.dialMax = maxValue;
  }

  rotate(direction: "L" | "R", distance: number): DialResponse {
    let zeroEncounters = 0;

    // Increment in direction.
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "L":
          if (this.currValue == 0) {
            this.currValue += this.dialMax;
          }

          this.currValue--;
          break;
        case "R":
          this.currValue++;
          if (this.currValue == this.dialMax) {
            this.currValue -= this.dialMax;
          }
          break;
      }

      // Catch Zero Occurrences
      if (this.currValue == 0) {
        zeroEncounters++;
      }
    }

    return {
      newValue: this.currValue,
      zeroEncounters,
    };
  }

  getValue() {
    return this.currValue;
  }
}

function part1(lines: string[]): number {
  let result = 0;
  const dial = new Dial();

  for (const instruction of lines) {
    // Extract information.
    const direction = instruction[0] as "L" | "R";
    const distance = parseInt(instruction.slice(1));

    // Use our dial.
    const { newValue } = dial.rotate(direction, distance);

    // Check value and increment result.
    if (newValue == 0) {
      result += 1;
    }
  }

  return result;
}

function part2(lines: string[]): number {
  let result = 0;
  const dial = new Dial();

  for (const instruction of lines) {
    // Extract information.
    const direction = instruction[0] as "L" | "R";
    const distance = parseInt(instruction.slice(1));

    // Use our dial.
    const { newValue, zeroEncounters } = dial.rotate(direction, distance);

    // Increment Result
    result += zeroEncounters;
  }

  return result;
}

const input = readLines(1); // Replace number with appropriate day.
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
