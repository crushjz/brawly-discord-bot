import {
  allPass,
  and,
  anyPass,
  both,
  complement,
  cond,
  defaultTo,
  either,
  // ifElse,
  isEmpty,
  not,
  or,
  pathSatisfies,
  propSatisfies,
  unless,
  until,
  // when,
} from 'ramda'

// export const rAllPass = <T>(
//   preds: Array<(value: T) => boolean>
// ): ((value: T) => boolean) => allPass(preds)
export const rAllPass = allPass
export const rAnd = and
export const rAnyPass = anyPass
export const rBoth = both
export const rComplement = complement
export const rCond = cond
export const rDefaultTo = defaultTo
export const rEither = either
export const rIfElse = <TParam, TRetTrue, TRetFalse>(
  fCond: (p: TParam) => boolean,
  fTrue: (p: TParam) => TRetTrue,
  fFalse: (p: TParam) => TRetFalse
) => (param: TParam) => (fCond(param) ? fTrue(param) : fFalse(param))
export const rIsEmpty = <T>(param: T) => isEmpty(param)
export const rNot = not
export const rOr = or
export const rPathSatisfies = pathSatisfies
export const rPropSatisfies = propSatisfies
export const rUnless = unless
export const rUntil = until
export const rWhen = <TParam, TRetTrue>(
  fCond: (p: TParam) => boolean,
  fTrue: (p: TParam) => TRetTrue
) => (param: TParam) => (fCond(param) ? fTrue(param) : param)
