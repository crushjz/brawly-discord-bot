import { ApolloServer } from 'apollo-server'
import 'reflect-metadata' // Needed by type-graphql
import { buildSchema } from 'type-graphql'
import { UserResolver } from './app/user.tql/user.tql.resolvers'
import { createContext } from './app/context.tql'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  })

  const context = createContext()

  const server = new ApolloServer({
    schema,
    context,
  })

  return server
    .listen({
      port: 40001,
    })
    .then(({ url }) => console.log(`🚀 GraphQL API ready at ${url}`))
}

// eslint-disable-next-line functional/no-expression-statement
bootstrap()
