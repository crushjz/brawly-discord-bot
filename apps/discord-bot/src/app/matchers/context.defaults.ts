import {
  ContextErrorType,
  ContextExceptionError,
  ContextMatchError,
} from './context.types'

export const defaultContextMatchError: ContextMatchError = {
  type: ContextErrorType.Match,
}

export const createDefaultContextMatchError = (): ContextMatchError =>
  defaultContextMatchError

export const createDefaultContextExceptionError = (
  message: string
): ContextExceptionError => ({
  message,
  type: ContextErrorType.Exception,
})
