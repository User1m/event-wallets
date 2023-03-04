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
      accounts {
        network
        address
      }
    }
  }
`

export const TRANSFER_AMOUNT = gql`
  mutation m3($input: TransferInput!) {
    _transfer(input: $input)
  }
`

export const TRANSFER_OWNER = gql`
  mutation m4($input: TransferOwnerInput!) {
    _transferOwner(input: $input)
  }
`
