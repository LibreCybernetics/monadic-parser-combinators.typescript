import { describe, it, expect } from "@jest/globals";
import { assert, property, string } from "fast-check";

import { CondCharParser } from "../../src/parsers/CondCharParser.ts";
import {
  Success,
  EndOfFileFailure,
  CondFailure,
} from "../../src/parsers/ParserResult.ts";

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

describe("CondCharParser Property", () => {
  it("should always succeed for matching condition", () => {
    const parser = CondCharParser.new((input) => input === "a");
    assert(
      property(string(), (input) => {
        const result = parser.parse(input);
        if (input.startsWith("a")) {
          expect(result).toBeInstanceOf(Success);
        } else {
          expect(result).not.toBeInstanceOf(Success);
        }
      }),
    );
  });

  it("should always fail with EndOfFileFailure on empty input", () => {
    const parser = CondCharParser.new((input) => input === "a");
    assert(
      property(string(), (input) => {
        const result = parser.parse("");
        expect(result).toBeInstanceOf(EndOfFileFailure);
      }),
    );
  });

  it("should always fail with CondFailure on non-matching input", () => {
    const parser = CondCharParser.new((input) => input === "a");
    assert(
      property(string(), (input) => {
        const result = parser.parse(input);
        if (!input.startsWith("a") && input.length > 0) {
          expect(result).toBeInstanceOf(CondFailure);
        } else {
          expect(result).not.toBeInstanceOf(CondFailure);
        }
      }),
    );
  });
});
