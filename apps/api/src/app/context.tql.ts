import { PrismaClient } from '@brawly/database'

const prisma = new PrismaClient()

export interface Context {
  readonly prisma: PrismaClient
}

export function createContext(): Context {
  return { prisma }
}
