import { ParserResult } from "./ParserResult";

export abstract class Parser0<t> {
  abstract parse(input: String): ParserResult<t>;
}
