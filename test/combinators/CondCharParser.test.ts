import { describe, it, expect } from "@jest/globals";

import { CondCharParser } from "../../src/combinators/CondCharParser.ts";
import {
  Success,
  EndOfFileFailure,
  CondFailure,
} from "../../src/ParserResult.ts";

describe("CondCharParser Unit", () => {
  it("should successfully parse matching input", () => {
    const parser = CondCharParser.new((input) => input === "a");
    const result = parser.parse("a");
    expect(result).toBeInstanceOf(Success);
    if (result instanceof Success) {
      expect(result.value).toBe("a");
      expect(result.pos).toBe(1);
    }
  });

  it("should fail with EndOfFileFailure on empty input", () => {
    const parser = CondCharParser.new((input) => input === "a");
    const result = parser.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });
  it("should fail with CondFailure on non-matching input", () => {
    const parser = CondCharParser.new((input) => input === "a");
    const result = parser.parse("b");
    expect(result).toBeInstanceOf(CondFailure);
    if (result instanceof CondFailure) {
      expect(result.cond).toBe('(input) => input === "a"');
      expect(result.actual).toBe("b");
      expect(result.pos).toBe(1);
    }
  });
});
