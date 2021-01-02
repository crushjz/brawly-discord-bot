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
import { Message } from 'discord.js'
import { IO } from 'fp-ts/IO'
import { BrawlyCommands } from '../brawly-commands/commands-list'
import {
  isMessageFromBot,
  isMessageFromUser,
} from '../discord-utilities/author.utilities'
import { defaultContextMatchError } from './context.defaults'
import {
  Context,
  ContextError,
  ContextExceptionError,
  EitherContext,
  WithCommand,
  WithPrefix,
} from './context.types'
import {
  isContextExceptionError,
  isContextMatchError,
} from './context.types.guards'
import {
  contextContentStartsWith,
  setContextCommand,
  setContextPrefix,
} from './matchers.utilities'

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
          (author === 'bot' && isMessageFromBot(message)) ||
          (author === 'user' && isMessageFromUser(message)),
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

export const matchPrefix = (
  prefix: string,
  error: ContextError = defaultContextMatchError
) => <T>(context: EitherContext<T>): EitherContext<T & WithPrefix> =>
  fpPipe(
    context,
    eChain(eFromPredicate(contextContentStartsWith(prefix), () => error)),
    eMap(setContextPrefix(prefix))
  )

export const matchWith = <T>(
  predicate: (context: Context<T>) => boolean,
  error: ContextError = defaultContextMatchError
) => (context: EitherContext<T>): EitherContext<T> =>
  fpPipe(context, eChain(eFromPredicate(predicate, () => error)))

export const matchCommand = (
  command: BrawlyCommands,
  error: ContextError = defaultContextMatchError
) => <T>(context: EitherContext<T>): EitherContext<T & WithCommand> =>
  fpPipe(
    context,
    eChain(eFromPredicate(contextContentStartsWith(command), () => error)),
    eMap(setContextCommand(command))
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
