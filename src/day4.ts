import { printMatrix, readCharMatrix } from "./utils";

// Intuition:
// ----
// - I wonder if the 2nd day is going to ask me to run it again after the first has been moved, so lets make a function that
//   represents a 'step' of a simulation of removing the paper towels.

function getValue(matrix: string[][], xpos: number, ypos: number) {
  const n = matrix.length;
  const m = matrix[0].length;

  if (xpos >= 0 && xpos < m && ypos >= 0 && ypos < n) {
    return matrix[ypos][xpos];
  }

  return "";
}

// Return the number of neighbors
function getNeighborCount(matrix: string[][], xpos: number, ypos: number) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // Above-Row Neighbors
    [0, -1],
    [0, 1], // Same-Row Neighbors
    [1, -1],
    [1, 0],
    [1, 1], // Bottom-Row Neighbors
  ];

  let total = 0;
  for (const direction of directions) {
    const point = [ypos + direction[0], xpos + direction[1]];
    if (getValue(matrix, point[1], point[0]) == "@") {
      total += 1;
    }
  }

  return total;
}

function removePaperTowels(matrix: string[][]): {
  newMatrix: string[][];
  total: number;
} {
  const n = matrix.length;
  const m = matrix[0].length;

  let total = 0;
  let newMatrix: string[][] = new Array(n);
  for (let i = 0; i < n; i++) {
    newMatrix[i] = new Array(m).fill(".");
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      const value = getValue(matrix, x, y);

      if (value == "@" && getNeighborCount(matrix, x, y) < 4) {
        total += 1;
        newMatrix[y][x] = "x";
      } else {
        newMatrix[y][x] = value;
      }
    }
  }

  return {
    newMatrix,
    total,
  };
}

function part1(matrix: string[][]): number {
  const { total } = removePaperTowels(matrix);
  return total;
}

function part2(matrix: string[][]): number {
  let result = 0;
  let finished = false;
  let currentMatrix = matrix;

  while (!finished) {
    const { total, newMatrix } = removePaperTowels(currentMatrix);

    if (total == 0) {
      finished = true;
      break;
    }

    result += total;
    currentMatrix = newMatrix;
  }

  return result;
}

const inputMatrix = readCharMatrix(4);
printMatrix(inputMatrix);

console.log("Part 1:", part1(inputMatrix));
console.log("Part 2:", part2(inputMatrix));
