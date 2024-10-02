export interface ParserResult<t> {}

type Pos = number;

export class Success<t> implements ParserResult<t> {
  constructor(
    readonly value: t,
    readonly pos: Pos,
  ) {}
}

abstract class Failure<t> implements ParserResult<t> {}

export class EndOfFileFailure<t> extends Failure<t> {}

export class MatchFailure extends Failure<void> {
  constructor(
    readonly expected: string,
    readonly actual: string,
    readonly pos: Pos,
  ) {
    super();
  }
}

export class CondFailure<t> extends Failure<t> {
  constructor(
    readonly cond: string,
    readonly actual: string,
    readonly pos: Pos,
  ) {
    super();
  }
}
