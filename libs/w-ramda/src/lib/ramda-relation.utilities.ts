import {
  clamp,
  countBy,
  difference,
  differenceWith,
  eqBy,
  equals,
  gt,
  gte,
  identical,
  innerJoin,
  intersection,
  lt,
  lte,
  max,
  maxBy,
  min,
  minBy,
  pathEq,
  // propEq,
  sortBy,
  sortWith,
  symmetricDifference,
  symmetricDifferenceWith,
  union,
  unionWith,
} from 'ramda'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const rClamp = clamp
export const rCountBy = countBy
export const rDifference = difference
export const rDifferenceWith = differenceWith
export const rEqBy = eqBy
export const rEquals = equals
export const rGt = gt
export const rGte = gte
export const rIdentical = identical
export const rInnerJoin = innerJoin
export const rIntesection = intersection
export const rLt = lt
export const rLte = lte
export const rMax = max
export const rMaxBy = maxBy
export const rMin = min
export const rMinBy = minBy
export const rPathEq = pathEq
export const rPropEq = <TKey extends keyof any, TValue>(
  key: TKey,
  value: TValue
) => <TV extends TValue>(obj: { readonly [TK1 in TKey]: TV }) =>
  obj[key] === value
export const rSortBy = sortBy
export const rSortWith = sortWith
export const rSymmetricDifference = symmetricDifference
export const rSymmetricDifferenceWith = symmetricDifferenceWith
export const rUnion = union
export const rUnionWith = unionWith
