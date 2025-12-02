import { readFileSync } from "fs";
import { join } from "path";

export function readInput(day: number): string {
  return readFileSync(join(__dirname, `../inputs/day${day}.txt`), "utf-8");
}

export function readLines(day: number): string[] {
  return readInput(day).trim().split("\n");
}

export function readNumbers(day: number): number[] {
  return readLines(day).map(Number);
}
