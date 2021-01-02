import {
  fpFlow,
  fpLog,
  fpPipe,
  given,
  teMap,
  teTryCatch,
} from '@brawly/w-fp-ts'
import { Client, Message } from 'discord.js'
import { config as sEfConfig } from 'dotenv'
import { BrawlyCommands } from './app/brawly-commands/commands-list'
import { brawlyCommandPrefix } from './app/brawly-commands/constants'
import { createDefaultContextExceptionError } from './app/matchers/context.defaults'
import { Context, TaskEitherContext } from './app/matchers/context.types'
import {
  createContext,
  excludeBot,
  matchPrefix,
  onError,
  use,
} from './app/matchers/matchers'
import {
  createContextAsync,
  matchCommandAsync,
  matchPrefixAsync,
  useAsync,
} from './app/matchers/matchers-async'

// Load .env file in process.env
sEfConfig()

const discordToken = process.env.DISCORD_TOKEN

const sEfClient = new Client()

sEfClient.on('ready', () => {
  // eslint-disable-next-line functional/no-expression-statement
  console.log(`Logged in as ${sEfClient.user?.tag}!`)
})

// Test command - SYNCHRONOUS
const testCommandSync = fpFlow(
  given<Message>(), // Given a discord message
  createContext({}),
  excludeBot(),
  matchPrefix(brawlyCommandPrefix),
  use(({ content, message: sEfMessage }) => {
    // eslint-disable-next-line functional/no-expression-statement
    console.log('content: ', content)

    sEfMessage.reply(
      `User  ${sEfMessage.author.username}(id:${sEfMessage.author.id}) said: ${sEfMessage.content}`
    )
  }),
  onError(fpLog)
)

const reactToMessage = (emoji: string) => <T>(
  ctx: Context<T>
): TaskEitherContext<T> => {
  const { message: sEfMessage } = ctx
  return fpPipe(
    teTryCatch(
      () => sEfMessage.react(emoji),
      () => createDefaultContextExceptionError(`Can't react to the message`)
    ),
    teMap(() => ctx)
  )
}

// Test command - ASYNCHRONOUS

const textCommandAsync = fpFlow(
  given<Message>(),
  createContextAsync({}),
  matchPrefixAsync(brawlyCommandPrefix),
  matchCommandAsync(BrawlyCommands.React),
  // matchOnceAsync(),
  useAsync(reactToMessage('👋')),
  useAsync(reactToMessage('🍕')),
  task => task() // execute Task
)

sEfClient.on('message', testCommandSync)
sEfClient.on('message', textCommandAsync)

// Login
sEfClient.login(discordToken)
