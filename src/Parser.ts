import { Parser0 } from "./Parser0";
import { MatchParser } from "./combinators/MatchParser";

export abstract class Parser<t> extends Parser0<t> {}

export namespace Parser {
  export function string(string: string): Parser<void> {
    return MatchParser.new(string);
  }
}
