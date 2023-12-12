# Volateq web app

The web application of Volateq. GUI for the customers

## Installation

Install using npm with Node version > 10.0.0

```sh
npm ci
```

## Recommended extensions

Prettier - Code formatter: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
Vetur: https://marketplace.visualstudio.com/items?itemName=octref.vetur

### Note for Node v17:

[`webpack`](https://github.com/webpack/webpack/issues/14532) and [the dev proxy](https://github.com/vitejs/vite/issues/4794) are currently having some issues with Node 17.  
As a workaround use [nvm](https://nvm.sh/) to temporary downgrade to Node 16 until these libraries get fixed:

```sh
nvm install 16
nvm use 16
```

## Development

```sh
npm run serve
```

## AWS CodeDeploy

To deploy run

```sh
npm run build
```

and push in master.  
Running the same will fail on the remote server, because it has only 512MB RAM...