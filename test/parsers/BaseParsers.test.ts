import { describe, expect, it } from "@jest/globals";
import { assert, property, string } from "fast-check";

import {
  space,
  tab,
  newline,
  digit,
  letter,
} from "../../src/parsers/BaseParsers.ts";
import {
  CondFailure,
  EndOfFileFailure,
  Success,
} from "../../src/parsers/ParserResult.ts";

describe("BaseParsers Unit", () => {
  it("space should successfully parse matching input", () => {
    const result = space.parse(" ");
    expect(result).toBeInstanceOf(Success);
  });
  it("space should fail with EndOfFileFailure on empty input", () => {
    const result = space.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });
  it("space should fail with CondFailure on non-matching input", () => {
    const result = space.parse("a");
    expect(result).toBeInstanceOf(CondFailure);
    if (result instanceof CondFailure) {
      expect(result.actual).toBe("a");
      expect(result.pos).toBe(1);
    }
  });

  it("tab should successfully parse matching input", () => {
    const result = tab.parse("\t");
    expect(result).toBeInstanceOf(Success);
  });
  it("tab should fail with EndOfFileFailure on empty input", () => {
    const result = tab.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });
  it("tab should fail with CondFailure on non-matching input", () => {
    const result = tab.parse("a");
    expect(result).toBeInstanceOf(CondFailure);
    if (result instanceof CondFailure) {
      expect(result.actual).toBe("a");
      expect(result.pos).toBe(1);
    }
  });

  it("newline should successfully parse matching input", () => {
    const result = newline.parse("\n");
    expect(result).toBeInstanceOf(Success);
  });
  it("newline should fail with EndOfFileFailure on empty input", () => {
    const result = newline.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });
  it("newline should fail with CondFailure on non-matching input", () => {
    const result = newline.parse("a");
    expect(result).toBeInstanceOf(CondFailure);
    if (result instanceof CondFailure) {
      expect(result.actual).toBe("a");
      expect(result.pos).toBe(1);
    }
  });

  it("digit should successfully parse matching input", () => {
    const result = digit.parse("1");
    expect(result).toBeInstanceOf(Success);
  });
  it("digit should fail with EndOfFileFailure on empty input", () => {
    const result = digit.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });
  it("digit should fail with CondFailure on non-matching input", () => {
    const result = digit.parse("a");
    expect(result).toBeInstanceOf(CondFailure);
    if (result instanceof CondFailure) {
      expect(result.actual).toBe("a");
      expect(result.pos).toBe(1);
    }
  });

  it("letter should successfully parse matching input", () => {
    const result = letter.parse("a");
    expect(result).toBeInstanceOf(Success);
  });
  it("letter should fail with EndOfFileFailure on empty input", () => {
    const result = letter.parse("");
    expect(result).toBeInstanceOf(EndOfFileFailure);
  });
  it("letter should fail with CondFailure on non-matching input", () => {
    const result = letter.parse("1");
    expect(result).toBeInstanceOf(CondFailure);
    if (result instanceof CondFailure) {
      expect(result.actual).toBe("1");
      expect(result.pos).toBe(1);
    }
  });
});
