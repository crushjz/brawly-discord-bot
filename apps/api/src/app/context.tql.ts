import { PrismaClient } from '@discord-tournaments-bot/database'

const prisma = new PrismaClient()

export interface Context {
  readonly prisma: PrismaClient
}

export function createContext(): Context {
  return { prisma }
}
