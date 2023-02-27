FROM node:14.17-alpine3.13

WORKDIR /workdir/app/

COPY package.json /workdir/app/
COPY yarn.lock /workdir/app/
COPY dist/ /workdir/app/dist/
# https://github.com/docker/build-push-action/issues/97
COPY prisma/ /workdir/app/prisma/
COPY tsconfig.json /workdir/app/

RUN yarn install --ignore-engines
RUN yarn db:gen

ENV NODE_ENV production
ENV PATH=/workdir/app/node_modules/.bin/:$PATH
ENV PORT 3000
EXPOSE 3000

CMD yarn start:prod
