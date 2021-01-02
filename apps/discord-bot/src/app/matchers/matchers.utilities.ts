import { fpPipe } from '@brawly/w-fp-ts'
import { rReplace, rStartsWith, rTrim } from '@brawly/w-ramda'
import { BrawlyCommands } from '../brawly-commands/commands-list'
import { Context, WithCommand, WithPrefix } from './context.types'
import { createGetContextContentLens } from './context.types.lenses'

export const contextContentStartsWith = (v: string) => <T>(
  context: Context<T>
) => fpPipe(context, createGetContextContentLens(), rStartsWith(v))

export const setContextPrefix = (prefix: string) => <T>(
  ctx: Context<T>
): Context<T & WithPrefix> => ({
  ...ctx,
  content: ctx.content.replace(prefix, ''),
  data: {
    ...ctx.data,
    prefix: prefix,
  },
})
export const setContextCommand = (command: BrawlyCommands) => <T>(
  ctx: Context<T>
): Context<T & WithCommand> => ({
  ...ctx,
  content: fpPipe(ctx.content, rReplace(command, ''), rTrim),
  data: {
    ...ctx.data,
    command: command,
  },
})
