import { ApolloClient, InMemoryCache } from '@apollo/client'

const SERVER_URL = '/graphiql'

export const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache()
})

window.__APOLLO_CLIENT__ = client
