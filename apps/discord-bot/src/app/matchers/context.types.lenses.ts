import { lFromProp, lGet, lSet } from '@brawly/w-monocle'
import { Context } from './context.types'

// Context<T> LENSES
export const createContextContentLens = <T>() =>
  lFromProp<Context<T>>()('content')
export const createGetContextContentLens = <T>() =>
  lGet(createContextContentLens<T>())
export const createSetContextContentLens = <T>() =>
  lSet(createContextContentLens<T>())

export const createContextMessageLens = <T>() =>
  lFromProp<Context<T>>()('message')
export const createGetContextMessageLens = <T>() =>
  lGet(createContextMessageLens<T>())
export const createSetContextMessageLens = <T>() =>
  lSet(createContextMessageLens<T>())

export const createContextDataLens = <T>() => lFromProp<Context<T>>()('data')
export const createGetContextDataLens = <T>() =>
  lGet(createContextDataLens<T>())
export const createSetContextDataLens = <T>() =>
  lSet(createContextDataLens<T>())
