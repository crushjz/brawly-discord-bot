import { Message, PartialMessage } from 'discord.js'
import { fpFlow } from '@discord-tournaments-bot/w-fp-ts'
import { rNot } from '@discord-tournaments-bot/w-ramda'

export const isMessageFromBot = (m: Message | PartialMessage): boolean =>
  m.author.bot

export const isMessageFromUser = fpFlow(isMessageFromBot, rNot)

export const getMessageContent = (m: Message | PartialMessage): string =>
  m.content
