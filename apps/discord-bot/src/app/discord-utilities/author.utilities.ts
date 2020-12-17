import { Message, PartialMessage } from 'discord.js'
import { fpFlow } from '@brawly/w-fp-ts'
import { rNot } from '@brawly/w-ramda'

export const isMessageFromBot = (m: Message | PartialMessage): boolean =>
  m.author.bot

export const isMessageFromUser = fpFlow(isMessageFromBot, rNot)

export const getMessageContent = (m: Message | PartialMessage): string =>
  m.content
