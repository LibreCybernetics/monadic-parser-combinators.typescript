import { Parser0 } from "./Parser0.ts";
import { MatchParser } from "./combinators/MatchParser.ts";

export abstract class Parser<t> extends Parser0<t> {}

export function stringParser(string: string): Parser<void> {
  return MatchParser.new(string);
}
