import { Client, Message, PartialMessage } from 'discord.js'
import {
  createContext,
  excludeSelf,
  matchPrefix,
  onError,
  use,
} from './app/matchers/matcher'
import { fpFlow, fpIdentity } from '@discord-tournaments-bot/w-fp-ts'
import { brawlyCommandPrefix } from './app/brawly-commands/constants'
import { config } from 'dotenv'

/* eslint-disable functional/no-expression-statement */

// Load .env file in process.env
config()

const discordToken = process.env.DISCORD_TOKEN

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const matchBrawlyCommand = fpFlow(
  fpIdentity<Message | PartialMessage>(), // Given a discord message
  createContext(),
  excludeSelf(),
  matchPrefix(brawlyCommandPrefix),
  use(({ content, message }) => {
    console.log('content: ', content)
    message.reply(`You said: ${message.content}`)
  }),
  onError(err => {
    console.log('Error: ', err)
  })
)

client.on('message', matchBrawlyCommand)

// Login
client.login(discordToken)
