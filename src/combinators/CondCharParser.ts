import { Parser } from "../Parser.ts";
import {
  CondFailure,
  EndOfFileFailure,
  ParserResult,
  Success,
} from "../ParserResult.ts";

export class CondCharParser extends Parser<string> {
  private constructor(readonly cond: (input: string) => boolean) {
    super();
  }

  static new(cond: (input: string) => boolean): CondCharParser {
    return new CondCharParser(cond);
  }

  parse(input: string): ParserResult<string> {
    const firstChar = input.slice(0, 1);

    if (input.length <= 0) {
      return new EndOfFileFailure();
    } else if (this.cond(firstChar)) {
      return new Success(firstChar, 1);
    } else return new CondFailure(this.cond.toString(), firstChar, 1);
  }
}
