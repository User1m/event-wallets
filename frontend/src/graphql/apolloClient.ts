import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const uri = window.location.href.includes('https;//')
  ? process.env.GRAPHQL_URL
  : process.env.DEV_GRAPHQL_URL

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri })
})

export default client
