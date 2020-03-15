import {
  assoc,
  assocPath,
  clone,
  dissoc,
  dissocPath,
  eqProps,
  evolve,
  forEachObjIndexed,
  // has,
  hasIn,
  hasPath,
  invert,
  invertObj,
  // keys,
  keysIn,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  mapObjIndexed,
  mergeDeepLeft,
  mergeDeepRight,
  mergeDeepWith,
  mergeDeepWithKey,
  mergeLeft,
  mergeRight,
  mergeWith,
  mergeWithKey,
  objOf,
  omit,
  over,
  path,
  pathOr,
  pick,
  pickAll,
  // pickBy,
  // prop,
  project,
  // props,
  propOr,
  set,
  toPairs,
  toPairsIn,
  values,
  valuesIn,
  view,
  where,
  whereEq,
} from 'ramda'

export { Lens as Rlens } from 'ramda'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable functional/prefer-readonly-type */

export const rAssoc = assoc

export const rAssocPath = assocPath
export const rClone = clone
export const rDissoc = dissoc
export const rDissocPath = dissocPath
export const rEqProps = eqProps
export const rEvolve = evolve
export const rForEachObjIndexed = forEachObjIndexed
export const rHas = <TKey extends keyof any>(key: TKey) => <TValue>(
  obj: { [TK in TKey]?: TValue }
): obj is { [TK in TKey]: TValue } => obj.hasOwnProperty(key)
export const rHasIn = hasIn
export const rHasPath = hasPath
export const rInvert = invert
export const rInvertObj = invertObj
export const rKeys = <TObj>(obj: TObj): Array<keyof TObj> =>
  Object.keys(obj) as Array<keyof TObj>
export const rKeysIn = keysIn
export const rLens = lens
export const rLensIndex = lensIndex
export const rLensPath = lensPath
export const rLensProp = lensProp
export const rMapObjIndexed = mapObjIndexed
export const rMergeDeepLeft = mergeDeepLeft
export const rMergeDeepRight = mergeDeepRight
export const rMergeDeepWith = mergeDeepWith
export const rMergeDeepWithKey = mergeDeepWithKey
export const rMergeLeft = mergeLeft
export const rMergeRight = mergeRight
export const rMergeWith = mergeWith
export const rMergeWithKey = mergeWithKey
export const rObjOf = objOf
export const rOmit = omit
export const rOver = over
export const rPath = path
export const rPathOr = pathOr
export const rPick = pick
export const rPickAll = pickAll
export const rPickBy = <TObj>(
  pred: (v: TObj[keyof TObj], k: keyof TObj) => boolean
) => (obj: TObj): Partial<TObj> =>
  rKeys(obj).reduce(
    (acc, k) => ({
      ...acc,
      ...(pred(obj[k], k) && { [k]: obj[k] }),
    }),
    {}
  )

export const rProject = project
export const rProp = <TKey extends keyof any>(key: TKey) => <
  TValue,
  TObj extends { [TK in TKey]?: TValue }
>(
  obj: TObj
) => obj[key]
export const rProps = <TKey extends keyof any>(ks: ReadonlyArray<TKey>) => <
  TValue
>(
  obj: { [TK in TKey]: TValue }
) => ks.map(k => obj[k])
export const rPropOr = propOr
export const rSet = set
export const rToPairs = toPairs
export const rToPairsIn = toPairsIn
export const rValues = values
export const rValuesIn = valuesIn
export const rView = view
export const rWhere = where
export const rWhereEq = whereEq
