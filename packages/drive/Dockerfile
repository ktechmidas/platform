# syntax = docker/dockerfile:1.2
FROM node:14-alpine as node_modules

RUN apk update && \
    apk --no-cache upgrade && \
    apk add --no-cache linux-headers \
                       git \
                       openssh-client \
                       python3 \
                       alpine-sdk \
                       zeromq-dev

# Enable node-gyp cache
# and replacing github url https://github.com/actions/setup-node/issues/214
RUN npm install -g node-gyp-cache@0.2.1 && \
    npm config set node_gyp node-gyp-cache && \
    git config --global url."https://github.com/".insteadOf ssh://git@github.com/

RUN npm install -g npm

# Install npm modules
ENV npm_config_zmq_external=true

WORKDIR /platform

COPY package.json package-lock.json /platform/

COPY packages/ /platform/packages/

RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.cache npm ci -w packages/drive --production

FROM node:14-alpine

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

LABEL maintainer="Dash Developers <dev@dash.org>"
LABEL description="Drive Node.JS"

RUN apk update && apk add --no-cache zeromq-dev

# Copy NPM modules and linked packages
COPY --from=node_modules /platform/packages/ /packages
COPY --from=node_modules /platform/node_modules/ /node_modules
COPY --from=node_modules /platform/package.json /package.json
COPY --from=node_modules /platform/package-lock.json /package-lock.json

ENV PATH /node_modules/.bin:$PATH

# Copy project files
WORKDIR /usr/src/app

COPY packages/drive/ .

COPY --from=node_modules /platform/packages/drive/node_modules/ ./node_modules

RUN cp .env.example .env

EXPOSE 26658
