import {
  alt,
  chain,
  chainW,
  filterOrElse,
  fold,
  fromNullable,
  fromOption,
  fromPredicate,
  getOrElse,
  getValidation,
  isLeft,
  isRight,
  left,
  map,
  mapLeft,
  right,
} from 'fp-ts/Either'

export const eAlt = alt
export const eChain = chain
export const eChainW = chainW
export const eFilterOrElse = filterOrElse
export const eFold = fold
export const eFromNullable = fromNullable
export const eFromOption = fromOption
export const eFromPredicate = fromPredicate
export const eGetOrElse = getOrElse
export const eGetValidation = getValidation
export const eIsLeft = isLeft
export const eIsRight = isRight
export const eLeft = left
export const eMap = map
export const eMapLeft = mapLeft
export const eRight = right
