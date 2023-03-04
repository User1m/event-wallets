import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const uri = window.location.href.includes('https://')
  ? process.env.GRAPHQL_URL
  : process.env.DEV_GRAPHQL_URL

console.log('uri', uri)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: new HttpLink({ uri })
  link: new HttpLink({ uri: 'https://event-wallets-api.herokuapp.com/graphql' })
})

export default client
