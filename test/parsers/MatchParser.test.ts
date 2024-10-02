import { describe, it, expect } from "@jest/globals";
import { Arbitrary, assert, pre, property, string } from "fast-check";

import { MatchParser } from "../../src/parsers/MatchParser.ts";
import {
  Success,
  EndOfFileFailure,
  MatchFailure,
} from "../../src/parsers/ParserResult.ts";

describe("MatchParser Unit", () => {
  it("should successfully parse matching input", () => {
    const parser = MatchParser.new("test");
    const result = parser.parse("test input");
    expect(result).toBeInstanceOf(Success);
    if (result instanceof Success) {
      expect(result.value).toBeUndefined();
      expect(result.pos).toBe(4);
    }
  });

  it("should fail with EndOfFileFailure on empty input", () => {
    const parser = MatchParser.new("test");
    const result = parser.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });

  it("should fail with MatchFailure on non-matching input", () => {
    const parser = MatchParser.new("test");
    const result = parser.parse("fail input");
    expect(result).toBeInstanceOf(MatchFailure);
    if (result instanceof MatchFailure) {
      expect(result.expected).toBe("test");
      expect(result.actual).toBe("fail");
      expect(result.pos).toBe(0);
    }
  });

  it("should fail to construct with empty string", () => {
    expect(() => MatchParser.new("")).toThrowError(
      "String length must be greater than 0",
    );
  });
});

describe("MatchParser Property", () => {
  it("should always succeed for matching prefixes", () => {
    assert(
      property(string(), string(), (prefix, suffix) => {
        pre(prefix.length > 0);
        const parser = MatchParser.new(prefix);
        const result = parser.parse(prefix + suffix);
        expect(result).toBeInstanceOf(Success);
        if (result instanceof Success) {
          expect(result.value).toBeUndefined();
          expect(result.pos).toBe(prefix.length);
        }
      }),
    );
  });

  it("should always fail with EndOfFileFailure on empty input", () => {
    assert(
      property(string(), (prefix) => {
        pre(prefix.length > 0);
        const parser = MatchParser.new(prefix);
        const result = parser.parse("");
        expect(result).toBeInstanceOf(EndOfFileFailure);
      }),
    );
  });

  it("should always fail with MatchFailure on non-matching input", () => {
    assert(
      property(string(), string(), (prefix, input) => {
        pre(prefix.length > 0 && input.length > 0 && !input.startsWith(prefix));
        const parser = MatchParser.new(prefix);
        const result = parser.parse(input);
        expect(result).toBeInstanceOf(MatchFailure);
        if (result instanceof MatchFailure) {
          expect(result.expected).toBe(prefix);
          expect(result.actual).toBe(
            input.slice(0, Math.max(prefix.length, 3)),
          );
          expect(result.pos).toBe(0);
        }
      }),
    );
  });
});
