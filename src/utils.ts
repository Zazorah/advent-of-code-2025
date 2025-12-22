import { readFileSync } from "fs";
import { join } from "path";

export function readInput(day: number): string {
  return readFileSync(join(__dirname, `../inputs/day${day}.txt`), "utf-8");
}

export function readLines(day: number): string[] {
  let result = [];
  const rawLines = readInput(day).trim().split("\n");
  for (const line of rawLines) {
    result.push(line.trim());
  }

  return result;
}

export function readNumbers(day: number): number[] {
  return readLines(day).map(Number);
}

export function readCharMatrix(day: number): string[][] {
  const raw = readInput(day).replace(/\r/g, "").split("\n");
  return raw.map((line) => line.split(""));
}

export function printMatrix(
  matrix: (string | number)[][],
  sep = " "
): void {
  if (sep === "") {
    for (const row of matrix) {
      console.log(row.map(String).join(""));
    }
    return;
  }

  const cols = Math.max(...matrix.map((r) => r.length), 0);
  const widths: number[] = Array(cols).fill(0);
  for (const row of matrix) {
    for (let c = 0; c < row.length; c++) {
      widths[c] = Math.max(widths[c], String(row[c]).length);
    }
  }

  for (const row of matrix) {
    const cells: string[] = [];
    for (let c = 0; c < row.length; c++) {
      const s = String(row[c]);
      cells.push(s + " ".repeat(Math.max(0, widths[c] - s.length)));
    }
    console.log(cells.join(sep));
  }
}
