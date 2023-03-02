## Description

Starter Frontend App

## Technologies
- Typescript
- Graphql
- React & [CRACO](https://github.com/dilanx/craco)

## Pre-requisites
- [Node](https://nodejs.org/en/download/)

## Installation

```bash
> yarn ci
```

## Running the app

```bash
RUN
> mv .env.sample .env
> export GRAPHQL_URL=https://event-wallets-api.herokuapp.com/graphql (or your gQL endpoint)
> yarn schema:gen:ci   
> yarn start 

export GRAPHQL_URL=https://event-wallets-api.herokuapp.com/graphql && yarn schema:gen:ci && yarn start 
```

## Test

```bash
# unit tests
> yarn test
# e2e tests
> yarn cypress:open
```

## Sample Data

```
https://event-wallets.herokuapp.com/bfb88629-0091-43fa-87f0-2d17a39d5b8c/u/b64c5f74-4b45-40f3-b36c-2c1e9663b5c2/wallet

0x4d4Fca8aBAe8d458005533AFa22609Ff20C409fC
0xDa95BAffEaC8B92d47E741E5661104232A972E60

0.00000100
```

## Guides

* [Configure a Path Alias in a React Typescript App](https://plusreturn.com/blog/how-to-configure-a-path-alias-in-a-react-typescript-app-for-cleaner-imports/)

* [Generate GraphQL Types with Apollo Codegen Tutorial](https://www.apollographql.com/blog/tooling/apollo-codegen/typescript-graphql-code-generator-generate-graphql-types/)

## Troubleshooting
 
* [Dotenv in Webpack](https://github.com/mrsteele/dotenv-webpack)


## Tools & Libraries
  * [React](https://reactjs.org/)
  * [Create React App Configuration Override](https://github.com/dilanx/craco)
  * [Apollo Client](https://www.apollographql.com/docs/react/)
  * [Typescript](https://www.typescriptlang.org/)
  * [Jest](https://jestjs.io/)
  * [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  * [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
  * [Tailwind CSS](https://tailwindcss.com/)
  * [Redux Toolkit](https://redux-toolkit.js.org/)
  * [React Icons](https://react-icons.github.io/react-icons/)
  * [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
  * [React Loader Spinner](https://www.npmjs.com/package/react-loader-spinner)
  * [Styled Components](https://styled-components.com/)
  * [yup](https://github.com/jquense/yup)
  * [formik](https://formik.org/docs/overview)

