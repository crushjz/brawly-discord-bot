import { config } from 'dotenv'

import { Client } from 'discord.js'

config()

const discordToken = process.env.DISCORD_TOKEN

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.login(discordToken)
