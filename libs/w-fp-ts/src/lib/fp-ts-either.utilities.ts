import {
  alt,
  chain,
  filterOrElse,
  fold,
  fromNullable,
  fromOption,
  fromPredicate,
  getOrElse,
  isLeft,
  isRight,
  left,
  map,
  right,
} from 'fp-ts/lib/Either'

export const eAlt = alt
export const eChain = chain
export const eFilterOrElse = filterOrElse
export const eFold = fold
export const eFromNullable = fromNullable
export const eFromOption = fromOption
export const eFromPredicate = fromPredicate
export const eGetOrElse = getOrElse
export const eIsLeft = isLeft
export const eIsRight = isRight
export const eLeft = left
export const eMap = map
export const eRight = right
