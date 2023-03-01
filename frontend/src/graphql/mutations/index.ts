import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation m($input: CreateUserInput!) {
    _createUser(input: $input) {
      id
      orgId
      email
    }
  }
`;
