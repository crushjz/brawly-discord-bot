import {
  Context,
  ContextMatchError,
  EitherContext,
  defaultContextMatchErrorNoCatch,
  isContextMatchErrorCatch,
  WithCommand,
  WithPrefix,
} from './context.types'
import { Message } from 'discord.js'
import {
  eChain,
  eFromPredicate,
  eMap,
  eMapLeft,
  eRight,
  fpPipe,
} from '@brawly/w-fp-ts'
import { lFromProp, lGet, lSet } from '@brawly/w-monocle'
import { rReplace, rStartsWith, rTrim } from '@brawly/w-ramda'
import { BrawlyCommands } from '../brawly-commands/commands-list'

// TYPES

// Context<T> LENSES
export const createContextContentLens = <T>() =>
  lFromProp<Context<T>>()('content')
export const createGetContextContentLens = <T>() =>
  lGet(createContextContentLens<T>())
export const createSetContextContentLens = <T>() =>
  lSet(createContextContentLens<T>())

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

export const excludeBot = (
  error: ContextMatchError = defaultContextMatchErrorNoCatch
) => <T>(context: EitherContext<T>) =>
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
  error: ContextMatchError = defaultContextMatchErrorNoCatch
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

export const matchOnce = (
  error: ContextMatchError = defaultContextMatchErrorNoCatch
) => {
  // eslint-disable-next-line functional/no-let
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
        // eslint-disable-next-line functional/no-expression-statement
        mutableMatched = true
        return e
      })
    )
}

const contextContentStartsWith = (v: string) => <T>(context: Context<T>) =>
  fpPipe(context, createGetContextContentLens(), rStartsWith(v))

export const matchPrefix = (
  prefix: string,
  error: ContextMatchError = defaultContextMatchErrorNoCatch
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
  error: ContextMatchError = defaultContextMatchErrorNoCatch
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

export const onError = <T>(handler: (err: ContextMatchError) => void) => (
  context: EitherContext<T>
) =>
  fpPipe(
    context,
    eMapLeft(err => {
      // TODO: No if
      // eslint-disable-next-line functional/no-conditional-statement
      if (isContextMatchErrorCatch(err)) {
        // TODO: don't do side effects inside a map function
        // eslint-disable-next-line functional/no-expression-statement
        handler(err)
      }
      return err
    })
  )
