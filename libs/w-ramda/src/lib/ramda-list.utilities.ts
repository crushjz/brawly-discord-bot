import {
  adjust,
  all,
  any,
  aperture,
  append,
  chain,
  concat,
  drop,
  dropLast,
  dropLastWhile,
  dropRepeats,
  dropRepeatsWith,
  dropWhile,
  endsWith,
  filter,
  find,
  findIndex,
  findLast,
  findLastIndex,
  flatten,
  forEach,
  fromPairs,
  groupBy,
  groupWith,
  // head,
  includes,
  indexBy,
  indexOf,
  init,
  insert,
  insertAll,
  intersperse,
  into,
  join,
  // last,
  lastIndexOf,
  length,
  map,
  mapAccum,
  mapAccumRight,
  mergeAll,
  move,
  none,
  nth,
  pair,
  partition,
  pluck,
  prepend,
  range,
  reduce,
  reduceBy,
  reduceRight,
  reduceWhile,
  reduced,
  reject,
  remove,
  repeat,
  reverse,
  scan,
  slice,
  sort,
  splitAt,
  splitEvery,
  splitWhen,
  startsWith,
  tail,
  take,
  takeLast,
  takeLastWhile,
  takeWhile,
  times,
  transduce,
  transpose,
  traverse,
  unfold,
  uniq,
  uniqBy,
  uniqWith,
  unnest,
  update,
  without,
  xprod,
  zip,
  zipObj,
  zipWith,
} from 'ramda'

/* eslint-disable functional/prefer-readonly-type */

export const rAdjust = adjust
export const rAll = all
export const rAny = any
export const rAperture = aperture
export const rAppend = append
export const rChain = chain
export const rConcat = concat
export const rDrop = drop
export const rDropLast = dropLast
export const rDropLastWhile = dropLastWhile
export const rDropRepeats = dropRepeats
export const rDropRepeatsWith = dropRepeatsWith
export const rDropWhile = dropWhile
export const rEndsWith = endsWith
export const rFilter = filter
export const rFind = find
export const rFindIndex = findIndex
export const rFindLast = findLast
export const rFindLastIndex = findLastIndex
export const rFlatten = flatten
export const rForEach = forEach
export const rFromPairs = fromPairs
export const rGroupBy = groupBy
export const rGroupWith = groupWith
export const rHead = <T>(list: Array<T>): T | undefined => list[0]
export const rIncludes = includes
export const rIndexBy = indexBy
export const rIndexOf = indexOf
// tslint:disable-next-line: no-unnecessary-callback-wrapper // Needed to infer the correct type
export const rInit = <T>(list: Array<T>): Array<T> => init(list)
export const rInsert = insert
export const rInsertAll = insertAll
export const rIntersperse = intersperse
export const rInto = into
export const rJoin = join
export const rLast = <T>(list: Array<T>): T | undefined => list[list.length - 1]
export const rLastIndexOf = lastIndexOf
export const rLength = length
export const rMap = map
export const rMapAccum = mapAccum
export const rMappAccumRight = mapAccumRight
export const rMergeAll = mergeAll
export const rMove = move
export const rNone = none
export const rNth = nth
export const rPair = pair
export const rPartition = partition
export const rPluck = pluck
export const rPrepend = prepend
export const rRange = range
export const rReduce = <T, TResult>(
  fn: (item: T) => (acc: TResult) => TResult,
  initAcc: TResult
) => (list: Array<T>): TResult => reduce((a, i) => fn(i)(a), initAcc, list)
export const rReduceBy = reduceBy
export const rReduced = reduced
export const rReduceRight = reduceRight
export const rReduceWhile = reduceWhile
export const rReject = reject
export const rRemove = remove
export const rRepeat = repeat
export const rReverse = reverse
export const rScan = scan
export const rSlice = slice
export const rSort = sort
export const rSplitAt = splitAt
export const rSplitEvery = splitEvery
export const rSplitWhen = splitWhen
export const rStartsWith = startsWith
export const rTail = tail
export const rTake = take
export const rTakeLast = takeLast
export const rTakeLastWhile = takeLastWhile
export const rTakeWhile = takeWhile
export const rTimes = times
export const rTransduce = transduce
export const rTranspose = transpose
export const rTraverse = traverse
export const rUnfold = unfold
export const rUniq = uniq
export const rUniqBy = uniqBy
export const rUniqWith = uniqWith
export const rUnnest = unnest
export const rUpdate = update
export const rWithout = without
export const rXprod = xprod
export const rZip = zip
export const rZipObj = zipObj
export const rZipWith = zipWith
