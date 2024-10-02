import { describe, it, expect } from "@jest/globals";
import { assert, property, string } from "fast-check";

import {
  Failure,
  Success,
  EndOfFileFailure,
  CondFailure,
  MatchFailure,
} from "../../src/parsers/ParserResult.ts";
import { Parser } from "../../src/parsers/Parser.ts";

export function testParserSuccess<t>(
  parser: Parser<t>,
  input: string,
  expectedValue: t,
  expectedPos: number,
) {
  const result = parser.parse(input);
  expect(result).toBeInstanceOf(Success);
  if (result instanceof Success) {
    expect(result.value).toBe(expectedValue);
    expect(result.pos).toBe(expectedPos);
  }
}

export function testParserFailure<t, f extends Failure<t>>(
  parser: Parser<t>,
  input: string,
  expectedFailure: f,
) {
  const result = parser.parse(input);
  expect(result).toBeInstanceOf(expectedFailure.constructor);
  if (result instanceof expectedFailure.constructor) {
    expect(result).toEqual(expectedFailure);
  }
}
