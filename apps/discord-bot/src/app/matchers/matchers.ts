import {
  Context,
  EitherContext,
  defaultContextMatchError,
  WithCommand,
  WithPrefix,
  ContextExceptionError,
  ContextError,
} from './context.types'
import { Message } from 'discord.js'
import {
  eChain,
  eFromPredicate,
  eMap,
  eMapLeft,
  eRight,
  fpPipe,
  iOf,
  oFold,
  oFromPredicate,
} from '@brawly/w-fp-ts'
import { rReplace, rStartsWith, rTrim } from '@brawly/w-ramda'
import { BrawlyCommands } from '../brawly-commands/commands-list'
import {
  isContextExceptionError,
  isContextMatchError,
} from './context.types.guards'
import { IO } from 'fp-ts/lib/IO'
import { createGetContextContentLens } from './context.types.lenses'

// Context INIT

export const createContext = <T>(data: T) => (
  message: Message
): EitherContext<T> =>
  eRight({
    message,
    content: message.content,
    data,
  })

// MATCHERS

export const excludeBot = (error: ContextError = defaultContextMatchError) => <
  T
>(
  context: EitherContext<T>
) =>
  fpPipe(
    context,
    eChain(
      eFromPredicate(
        ({ message }) => !message.author?.bot,
        () => error
      )
    )
  )

export const matchAuthor = (
  author: 'user' | 'bot',
  error: ContextError = defaultContextMatchError
) => <T>(context: EitherContext<T>) =>
  fpPipe(
    context,
    eChain(
      eFromPredicate(
        ({ message }) =>
          (author === 'bot' && !!message.author?.bot) ||
          (author === 'user' && !message.author?.bot),
        () => error
      )
    )
  )

export const matchOnce = (error: ContextError = defaultContextMatchError) => {
  let mutableMatched = false
  return <T>(context: EitherContext<T>) =>
    fpPipe(
      context,
      eChain(
        eFromPredicate(
          () => !mutableMatched,
          () => error
        )
      ),
      eMap(e => {
        mutableMatched = true
        return e
      })
    )
}

const contextContentStartsWith = (v: string) => <T>(context: Context<T>) =>
  fpPipe(context, createGetContextContentLens(), rStartsWith(v))

export const matchPrefix = (
  prefix: string,
  error: ContextError = defaultContextMatchError
) => <T>(context: EitherContext<T>): EitherContext<T & WithPrefix> =>
  fpPipe(
    context,
    eChain(eFromPredicate(contextContentStartsWith(prefix), () => error)),
    eMap(
      (ctx): Context<T & WithPrefix> => ({
        ...ctx,
        content: ctx.content.replace(prefix, ''),
        data: {
          ...ctx.data,
          prefix: prefix,
        },
      })
    )
  )

export const matchCommand = (command: BrawlyCommands) => <T>(
  context: EitherContext<T>,
  error: ContextError = defaultContextMatchError
): EitherContext<T & WithCommand> =>
  fpPipe(
    context,
    eChain(eFromPredicate(contextContentStartsWith(command), () => error)),
    eMap(
      (ctx): Context<T & WithCommand> => ({
        ...ctx,
        content: fpPipe(ctx.content, rReplace(command, ''), rTrim),
        data: {
          ...ctx.data,
          command: command,
        },
      })
    )
  )

export const transform = <T1, TR>(handler: (c: Context<T1>) => Context<TR>) => (
  context: EitherContext<T1>
) => fpPipe(context, eMap(handler))

export const use = <T1>(handler: (c: Context<T1>) => void) => (
  context: EitherContext<T1>
) =>
  fpPipe(
    context,
    eMap(c => {
      // TODO: don't do side effects inside a map function
      // eslint-disable-next-line functional/no-expression-statement
      handler(c)
      return c
    })
  )

export const onMatchError = <T>(handler: (err: ContextError) => IO<void>) => (
  context: EitherContext<T>
) =>
  fpPipe(
    context,
    // TODO: don't do side effects inside a map function
    eMapLeft(err => {
      const sEfExecuteHandler = fpPipe(
        err,
        oFromPredicate(isContextMatchError),
        oFold(() => iOf(void 0), handler)
      )
      sEfExecuteHandler()

      return err
    })
  )

export const onError = <T>(
  handler: (err: ContextExceptionError) => IO<void>
) => (context: EitherContext<T>) =>
  fpPipe(
    context,
    // TODO: don't do side effects inside a map function
    eMapLeft(err => {
      const sEfExecuteHandler = fpPipe(
        err,
        oFromPredicate(isContextExceptionError),
        oFold(() => iOf(void 0), handler)
      )
      sEfExecuteHandler()

      return err
    })
  )
