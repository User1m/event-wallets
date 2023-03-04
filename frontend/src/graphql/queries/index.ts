import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {
  UserWhereInput,
  UserWhereUniqueInput
} from '../__generated__/globalTypes'

// export const LOGIN = gql`
//   mutation login($input: LoginInput!) {
//     _login(input: $input) {
//       access_token
//     }
//   }
// `;

export const WALLET_BALANCE = gql`
  query q1($input: UserWhereUniqueInput!) {
    _getWalletBalance(input: $input)
  }
`

export const getBalance = (input: UserWhereUniqueInput) => {
  const { data, error, loading } = useQuery(WALLET_BALANCE, {
    variables: {
      input
    }
  })

  // localStorage.setItem('token', data?._login?.access_token || '');

  return { data, error, loading }
}

export const GET_USER = gql`
  query q2($input: UserWhereInput) {
    findFirstUser(where: $input) {
      id
      orgId
      email
      accounts
    }
  }
`

export const getUser = (input: UserWhereInput) => {
  const { data, error, loading } = useQuery(GET_USER, {
    variables: {
      input
    }
  })

  // localStorage.setItem('token', data?._login?.access_token || '');

  return { data, error, loading }
}
