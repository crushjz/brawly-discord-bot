import { Message } from 'discord.js'
import { Either } from 'fp-ts/lib/Either'
import { BrawlyCommands } from '../brawly-commands/commands-list'

export type Context<T> = {
  readonly message: Message
  readonly content: string
  readonly data: T
}

export type WithPrefix = {
  readonly prefix: string
}

export type WithCommand = {
  readonly command: BrawlyCommands
}

export type ContextError = ContextExceptionError | ContextMatchError

export const enum ContextErrorType {
  Match = 'match',
  Exception = 'exception',
}

export type ContextExceptionError = {
  readonly type: ContextErrorType.Exception
  readonly message: string
}
export type ContextMatchError = {
  readonly type: ContextErrorType.Match
}

export const defaultContextMatchError: ContextMatchError = {
  type: ContextErrorType.Match,
}

export type EitherContext<T> = Either<ContextError, Context<T>>
