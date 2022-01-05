# Volateq web app
The web application of Volateq. GUI for the customers

## Installation

Install using npm with Node version > 10.0.0

```
npm ci
```

### Note for Node v17:
[`webpack`](https://github.com/webpack/webpack/issues/14532) and [the dev proxy](https://github.com/vitejs/vite/issues/4794) are currently having some issues with Node 17.  
As a workaround use [nvm](https://nvm.sh/) to temporary downgrade to Node 16 until these libraries get fixed:
```
nvm install 16
nvm use 16
```


## Development
```
npm run serve
```

## AWS CodeDeploy

To deploy run `npm run build` and push in master. `npm run build` fails on the remote server, because it has only 512MB RAM...


