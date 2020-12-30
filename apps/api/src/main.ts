import { ApolloServer } from 'apollo-server'
import 'reflect-metadata' // Needed by type-graphql
import { buildSchema } from 'type-graphql'
import { DiscordOAuth2Resolver } from './app/discord-oauth2.tql/discord-oauth2.tql.resolvers'
import { UserResolver } from './app/user.tql/user.tql.resolvers'
import { createContext } from './app/context.tql'
import { config } from 'dotenv'

/* eslint-disable functional/no-expression-statement */

// Load .env file in process.env
config()

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [DiscordOAuth2Resolver, UserResolver],
  })

  const context = createContext()

  const server = new ApolloServer({
    schema,
    context,
  })

  return server
    .listen({
      port: 4201,
    })
    .then(({ url }) => console.log(`🚀 GraphQL API ready at ${url}`))
}

bootstrap()
