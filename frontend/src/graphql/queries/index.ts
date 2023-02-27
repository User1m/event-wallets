import gql from 'graphql-tag';
import {
  LoginInput,
} from '../__generated__/globalTypes';
import { useQuery } from '@apollo/client';

// export const LOGIN = gql`
//   mutation login($input: LoginInput!) {
//     _login(input: $input) {
//       access_token
//     }
//   }
// `;

// export const loginService = (input: LoginInput) => {
//   const { data, error, loading } = useQuery(LOGIN, {
//     variables: {
//       input
//     }
//   });
  
//   localStorage.setItem('token', data?._login?.access_token || '');

//   return { data, error, loading };
// };
