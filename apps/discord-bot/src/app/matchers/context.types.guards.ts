import {
  ContextError,
  ContextErrorType,
  ContextExceptionError,
} from './context.types'

export const isContextExceptionError = (
  a: ContextError
): a is ContextExceptionError => a.type === ContextErrorType.Exception

export const isContextMatchError = (a: ContextError): a is ContextError =>
  a.type === ContextErrorType.Match
