import {
  contramap,
  eqBoolean,
  eqDate,
  eqNumber,
  eqString,
  strictEqual,
} from 'fp-ts/lib/Eq'

export const eqContramap = contramap
export const eqEqBoolean = eqBoolean
export const eqEqDate = eqDate
export const eqEqNumber = eqNumber
export const eqEqString = eqString
export const fpStrictEqual = strictEqual
