import {
  chain,
  chainW,
  fold,
  fromEither,
  fromIO,
  fromOption,
  fromPredicate,
  fromTask,
  map,
  mapLeft,
  of,
  tryCatch,
} from 'fp-ts/TaskEither'

export const teChain = chain
export const teChainW = chainW
export const teFold = fold
export const teFromEither = fromEither
export const teFromIO = fromIO
export const teFromOption = fromOption
export const teFromPredicate = fromPredicate
export const teFromTask = fromTask
export const teMap = map
export const teMapLeft = mapLeft
export const teOf = of
export const teTryCatch = tryCatch
