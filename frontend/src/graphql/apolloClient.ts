import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// const uri =
//   window.location.href.includes('develop.') ||
//   window.location.href.includes('localhost')
//     ? process.env.DEV_GRAPHQL_URL
//     : window.location.href.includes('app.')
//       ? process.env.PROD_GRAPHQL_URL
//       : process.env.STAGING_GRAPHQL_URL;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: process.env.DEV_GRAPHQL_URL })
});

export default client;
