import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {
  UserWhereInput,
  UserWhereUniqueInput,
  UserNetworkInput
} from '../__generated__/globalTypes'

export const WALLET_BALANCE = gql`
  query q1($input: UserNetworkInput!) {
    _getWalletBalance(input: $input)
  }
`

export const getBalance = (input: UserNetworkInput) => {
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
      accounts {
        network
        address
      }
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
