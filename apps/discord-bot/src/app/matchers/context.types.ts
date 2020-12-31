import { Message, PartialMessage } from 'discord.js'
import { Either } from 'fp-ts/lib/Either'
import { BrawlyCommands } from '../brawly-commands/commands-list'

export type Context<T> = {
  readonly message: Message | PartialMessage
  readonly content: string
  readonly data: T
}

export type WithPrefix = {
  readonly prefix: string
}

export type WithCommand = {
  readonly command: BrawlyCommands
}

export type ContextMatchError =
  | ContextMatchErrorCatch
  | ContextMatchErrorNoCatch

export type ContextMatchErrorCatch = {
  readonly catch: true
  readonly message: string
}
export type ContextMatchErrorNoCatch = {
  readonly catch: false
}

export const isContextMatchErrorCatch = (
  a: ContextMatchError
): a is ContextMatchErrorCatch => a.catch === true

export const isContextMatchErrorNoCatch = (
  a: ContextMatchError
): a is ContextMatchErrorNoCatch => a.catch === false

export const defaultContextMatchErrorNoCatch: ContextMatchErrorNoCatch = {
  catch: false,
}

export type EitherContext<T> = Either<ContextMatchError, Context<T>>
