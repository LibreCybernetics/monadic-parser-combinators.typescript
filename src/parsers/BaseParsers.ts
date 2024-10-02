import { CondCharParser } from "./CondCharParser.ts";

export const space = CondCharParser.new((input) => input === " ");
export const tab = CondCharParser.new((input) => input === "\t");
export const newline = CondCharParser.new((input) => input === "\n");
export const digit = CondCharParser.new(
  (input) => input >= "0" && input <= "9",
);
export const letter = CondCharParser.new(
  (input) => (input >= "a" && input <= "z") || (input >= "A" && input <= "Z"),
);
