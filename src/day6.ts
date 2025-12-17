import { readLines } from "./utils";

// Intuition
// - Start with the last line, take the operand, and then use the rest of the lines as a queue.
// - For the operand line:
//   - Treat every character as white-space

class ProblemSolver {
  private operand: '+' | '*';
  private currValue: number = 0;

  constructor(operand: '+' | '*') {
    this.operand = operand;
  }

  pushValue(value: number) {
    switch (this.operand) {
      case "+":
        this.currValue += value;
        break;
      case "*":
        if (this.currValue != 0) {
          this.currValue *= value;
        }
        else {
          this.currValue = value;
        }
        break;
    }
  }

  getValue() {
    return this.currValue;
  }
}

function splitByWhitespace(input: string): string[] {
  return input.trim().split(/\s+/);
}

function part1(lines: string[]): number {
  // Get Operands
  const linesCopy = [...lines];
  const operandLine = linesCopy.pop()!;
  const operands = splitByWhitespace(operandLine);

  // Create Solver Objects
  const solvers: ProblemSolver[] = [];
  for (const op of operands) {
    solvers.push(new ProblemSolver(op as '+' | '*'));
  }
  
  // Iterate through each line, pushing values to solvers.
  while (linesCopy.length > 0) {
    const top = splitByWhitespace(linesCopy.shift()!);
    for (let i = 0; i < top.length; i++) {
      solvers[i].pushValue(parseInt(top[i]));
    }
  }

  // Get final total.
  let sum = 0;
  for (const s of solvers) {
    sum += s.getValue();
  }

  return sum;
}

function part2(lines: string[]): number {
  // Solve part 2
  return 2;
}

const input = readLines(6); // Replace number with appropriate day.
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
