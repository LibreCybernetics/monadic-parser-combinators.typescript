import { ParserResult } from "./ParserResult.ts";

export abstract class Parser0<t> {
  abstract parse(input: string): ParserResult<t>;
}
