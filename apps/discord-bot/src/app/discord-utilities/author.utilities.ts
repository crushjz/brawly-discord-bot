import { Message } from 'discord.js'
import { fpFlow } from '@brawly/w-fp-ts'
import { rNot } from '@brawly/w-ramda'

export const isMessageFromBot = (m: Message): boolean => m.author.bot

export const isMessageFromUser = fpFlow(isMessageFromBot, rNot)
