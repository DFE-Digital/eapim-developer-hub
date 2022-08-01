# eapim-developer-hub

DFE Developer Hub for external suppliers &amp; third party developers

## Required to run

- Node 16.13.0
- npm
- Yarn installed globally (npm i yarn -g)

## Env variables

Get dev env vars and populate .env file, these can be pulled from the release pipeline (do not commit this)

It's recommended to use NODE_ENV=production due to major differences between this and development mode

## runnning

npm i
npm run build
npm run start

## Linting

Commits are linted via lint-staged

npm run lint can be run to check before committing