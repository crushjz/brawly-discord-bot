import { lFromProp, lGet, lSet } from '@brawly/w-monocle'
import { Context } from './context.types'

// Context<T> LENSES
export const createContextContentLens = <T>() =>
  lFromProp<Context<T>>()('content')
export const createGetContextContentLens = <T>() =>
  lGet(createContextContentLens<T>())
export const createSetContextContentLens = <T>() =>
  lSet(createContextContentLens<T>())
