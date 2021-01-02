import { fpFlow, given } from '@brawly/w-fp-ts'
import { Message } from 'discord.js'
import {
  createContext,
  excludeBot,
  matchCommand,
  matchPrefix,
  use,
} from '../matchers/matchers'
import { BrawlyCommands } from './commands-list'
import { brawlyCommandPrefix } from './constants'

export const brawlySignupCommandHandler = fpFlow(
  given<Message>(), // Given a discord message
  createContext({}),
  excludeBot(),
  matchPrefix(brawlyCommandPrefix),
  matchCommand(BrawlyCommands.Signup),
  use(({ content }) => {
    // TODO:
    // eslint-disable-next-line functional/no-expression-statement
    console.log('Singup COMMAND - content: ', content)
  })
)
