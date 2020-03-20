import {
  Context,
  ContextMatchError,
  EitherContext,
  defaultContextMatchErrorNoCatch,
  isContextMatchErrorCatch,
} from './context.types'
import { Message, PartialMessage } from 'discord.js'
import {
  eChain,
  eFromPredicate,
  eMap,
  eMapLeft,
  eRight,
  fpPipe,
} from '@discord-tournaments-bot/w-fp-ts'
import { lFromProp, lGet, lSet } from '@discord-tournaments-bot/w-monocle'
import { rStartsWith } from '@discord-tournaments-bot/w-ramda'

// TYPES

// Context<T> LENSES
export const createContextContentLens = <T>() =>
  lFromProp<Context<T>>()('content')
export const createGetContextContentLens = <T>() =>
  lGet(createContextContentLens<T>())
export const createSetContextContentLens = <T>() =>
  lSet(createContextContentLens<T>())

// Context INIT

export const createContext = <T = undefined>(data?: T) => (
  message: Message | PartialMessage
): EitherContext<T> =>
  eRight({
    message,
    content: message.content,
    data,
  })

// MATCHERS

export const excludeSelf = (
  error: ContextMatchError = defaultContextMatchErrorNoCatch
) => <T>(context: EitherContext<T>) =>
  fpPipe(
    context,
    eChain(
      eFromPredicate(
        ({ message }) => !message.author.bot,
        () => error
      )
    )
  )

// TODO
// export const matchAuthor = (author: 'bot' | 'user', errorMessage = '') => <T>(
//   context: Context<T>
// ) =>
//   fpPipe(
//     context
//     // context.message.author.
//   )

const contextContentStartsWith = (v: string) => <T>(context: Context<T>) =>
  fpPipe(context, createGetContextContentLens(), rStartsWith(v))

export const matchPrefix = (
  prefix: string,
  error: ContextMatchError = defaultContextMatchErrorNoCatch
) => <T>(context: EitherContext<T>): EitherContext<T> =>
  fpPipe(
    context,
    eChain(eFromPredicate(contextContentStartsWith(prefix), () => error)),
    eMap(ctx => ({
      ...ctx,
      content: ctx.content.replace(prefix, ''),
    }))
  )

// TODO
// export const matchAll = (
//   values: ReadonlyArray<string>,
//   error: ContextMatchError = defaultContextMatchErrorNoCatch
// ) => <T>(context: EitherContext<T>): EitherContext<T> =>
//   fpPipe(
//     context,
//     eChain(eFromPredicate(contextContentStartsWith(prefix), () => error)),
//     eMap(ctx => ({
//       ...ctx,
//       content: ctx.content.replace(prefix, ''),
//     }))
//   )

export const transform = <T1, TR>(handler: (c: Context<T1>) => Context<TR>) => (
  context: EitherContext<T1>
) => fpPipe(context, eMap(handler))

export const use = <T1>(handler: (c: Context<T1>) => void) => (
  context: EitherContext<T1>
) =>
  fpPipe(
    context,
    eMap(c => {
      // TODO don't do side effects inside a map function
      // eslint-disable-next-line functional/no-expression-statement
      handler(c)
      return c
    })
  )

export const onError = <T>(handler: (err: ContextMatchError) => void) => (
  context: EitherContext<T>
) =>
  fpPipe(
    context,
    eMapLeft(err => {
      // TODO No if
      // eslint-disable-next-line functional/no-conditional-statement
      if (isContextMatchErrorCatch(err)) {
        // TODO don't do side effects inside a map function
        // eslint-disable-next-line functional/no-expression-statement
        handler(err)
      }
      return err
    })
  )
