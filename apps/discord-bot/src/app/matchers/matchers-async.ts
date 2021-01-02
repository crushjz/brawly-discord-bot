import {
  fpFlow,
  fpNot,
  fpPipe,
  teChain,
  teFromPredicate,
  teMap,
  teOf,
} from '@brawly/w-fp-ts'
import { Message } from 'discord.js'
import { BrawlyCommands } from '../brawly-commands/commands-list'
import { isMessageFromBot } from '../discord-utilities/author.utilities'
import { defaultContextMatchError } from './context.defaults'
import {
  Context,
  ContextError,
  TaskEitherContext,
  WithCommand,
  WithPrefix,
} from './context.types'
import { createGetContextMessageLens } from './context.types.lenses'
import {
  contextContentStartsWith,
  setContextCommand,
  setContextPrefix,
} from './matchers.utilities'

// Context INIT

export const createContextAsync = <T>(data: T) => (
  message: Message
): TaskEitherContext<T> =>
  teOf<ContextError, Context<T>>({
    message,
    content: message.content,
    data,
  })

// MATCHERS

export const excludeBotAsync = (
  error: ContextError = defaultContextMatchError
) => <T>(context: TaskEitherContext<T>) =>
  fpPipe(
    context,
    teChain(
      teFromPredicate(
        fpFlow(createGetContextMessageLens<T>(), fpNot(isMessageFromBot)),
        () => error
      )
    )
  )

export const matchOnceAsync = (
  error: ContextError = defaultContextMatchError
) => {
  let mutableMatched = false
  return <T>(context: TaskEitherContext<T>) =>
    fpPipe(
      context,
      teChain(
        teFromPredicate(
          () => !mutableMatched,
          () => error
        )
      ),
      teMap(e => {
        mutableMatched = true
        return e
      })
    )
}

export const matchPrefixAsync = (
  prefix: string,
  error: ContextError = defaultContextMatchError
) => <T>(context: TaskEitherContext<T>): TaskEitherContext<T & WithPrefix> =>
  fpPipe(
    context,
    teChain(teFromPredicate(contextContentStartsWith(prefix), () => error)),
    teMap(setContextPrefix(prefix))
  )

export const matchCommandAsync = (
  command: BrawlyCommands,
  error: ContextError = defaultContextMatchError
) => <T>(context: TaskEitherContext<T>): TaskEitherContext<T & WithCommand> =>
  fpPipe(
    context,
    teChain(teFromPredicate(contextContentStartsWith(command), () => error)),
    teMap(setContextCommand(command))
  )

export const useAsync = <T1, T2>(
  handler: (c: Context<T1>) => TaskEitherContext<T2>
) => (context: TaskEitherContext<T1>) => fpPipe(context, teChain(handler))
