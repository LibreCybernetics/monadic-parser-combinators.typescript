import { describe, it, expect } from "@jest/globals";
import { assert, property, string } from "fast-check";

import { CondCharParser } from "../../src/parsers/CondCharParser.ts";
import {
  Success,
  EndOfFileFailure,
  CondFailure,
} from "../../src/parsers/ParserResult.ts";

import { testParserSuccess, testParserFailure } from "./TestHelpers.ts";

describe("CondCharParser Unit", () => {
  testParserSuccess(
    CondCharParser.new((input) => input === "a"),
    "a",
    "a",
    1,
  );

  testParserFailure(
    CondCharParser.new((input) => input === "a"),
    "",
    new EndOfFileFailure(),
  );

  testParserFailure(
    CondCharParser.new((input) => input === "a"),
    "b",
    new CondFailure<string>('(input) => input === "a"', "b", 1),
  );
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
