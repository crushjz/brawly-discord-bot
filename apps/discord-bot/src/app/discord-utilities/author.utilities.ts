import { Message } from 'discord.js'
import { fpNot } from '@brawly/w-fp-ts'

export const isMessageFromBot = (m: Message): boolean => m.author.bot

export const isMessageFromUser = fpNot(isMessageFromBot)
