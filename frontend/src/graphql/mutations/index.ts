import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    _login(input: $input) {
      access_token
    }
  }
`;
