import { Client, Message } from 'discord.js'
import {
  createContext,
  excludeBot,
  matchOnce,
  matchPrefix,
  onError,
  use,
} from './app/matchers/matchers'
import { fpFlow, fpIdentity, fpLog } from '@brawly/w-fp-ts'
import { brawlyCommandPrefix } from './app/brawly-commands/constants'
import { config } from 'dotenv'
import { brawlySignupCommandHandler } from './app/brawly-commands/signup-command'

/* eslint-disable functional/no-expression-statement */

// Load .env file in process.env
config()

const discordToken = process.env.DISCORD_TOKEN

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

// Test command
const testBrawlyCommandHandler = fpFlow(
  fpIdentity<Message>(), // Given a discord message
  createContext({}),
  excludeBot(),
  matchPrefix(brawlyCommandPrefix),
  matchOnce(),
  use(({ content, message }) => {
    console.log('content: ', content)
    message.reply(`You said: ${message.content}`)
  }),
  onError(fpLog)
)

client.on('message', testBrawlyCommandHandler)
client.on('message', brawlySignupCommandHandler)

// Login
client.login(discordToken)
