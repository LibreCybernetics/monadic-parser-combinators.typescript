import { Parser } from "./Parser.ts";
import {
  EndOfFileFailure,
  MatchFailure,
  ParserResult,
  Success,
} from "./ParserResult.ts";

export class MatchParser extends Parser<void> {
  private constructor(readonly string: string) {
    super();
    if (string.length <= 0) {
      throw new Error("String length must be greater than 0");
    }
  }

  static new(string: string): MatchParser {
    return new MatchParser(string);
  }

  parse(input: string): ParserResult<void> {
    if (input.slice(0, this.string.length) === this.string) {
      return new Success(undefined, this.string.length);
    } else if (input.length <= 0) {
      return new EndOfFileFailure();
    } else {
      // Grab at list 3 chars from the input for diagnostics
      const sliced = input.slice(0, Math.max(this.string.length, 3));
      return new MatchFailure(this.string, sliced, 0);
    }
  }
}
