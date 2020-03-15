import {
  alt,
  chain,
  exists,
  filter,
  flatten,
  fold,
  fromEither,
  fromNullable,
  fromPredicate,
  getEq,
  getOrElse,
  isNone,
  isSome,
  map,
  mapNullable,
  none,
  reduce,
  some,
  toNullable,
} from 'fp-ts/lib/Option'

export const oAlt = alt
export const oChain = chain
export const oExists = exists
export const oFilter = filter
export const oFlatten = flatten
export const oFold = fold
export const oFromEither = fromEither
export const oFromNullable = fromNullable
export const oFromPredicate = fromPredicate
export const oGetEq = getEq
export const oGetOrElse = getOrElse
export const oIsNone = isNone
export const oIsSome = isSome
export const oMap = map
export const oMapNullable = mapNullable
export const oNone = none
export const oReduce = reduce
export const oSome = some
export const oToNullable = toNullable
