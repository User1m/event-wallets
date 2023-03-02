import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation m1($input: CreateUserInput!) {
    _createUser(input: $input) {
      id
      orgId
      email
    }
  }
`

export const CREATE_WALLET = gql`
  mutation m2($input: UserWhereUniqueInput!) {
    _confirmUser(input: $input) {
      id
      orgId
      email
      accAddress
    }
  }
`

export const TRANSFER_AMOUNT = gql`
  mutation m3($input: TransferInput!) {
    _transfer(input: $input)
  }
`
