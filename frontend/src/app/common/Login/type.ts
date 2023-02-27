import { login } from 'src/graphql/queries/__generated__/login';

export interface ILogin {
  loading: boolean
  error: string
  data: login | null
}
