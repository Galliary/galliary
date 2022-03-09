[![Galliary](https://github.com/Synqat/galliary/blob/main/.github/assets/banner_light.png?raw=true#gh-dark-mode-only)](https://galliary.com)
[![Galliary](https://github.com/Synqat/galliary/blob/main/.github/assets/banner_dark.png?raw=true#gh-light-mode-only)](https://galliary.com)

<h3>
  <p align="center">
    Proudly built with <a href="https://github.com/blitz-js/blitz">Blitz.js</a>
  </p>
</h3>

## Prerequisites
1. Install and get Docker running on your local machine (I suggest using [Docker Desktop](https://www.docker.com/products/docker-desktop))
   1. You will need to install WSL2 for Windows machines
2. Start a local instance of PostgreSQL using Docker
   1. You can run a simple setup by running `docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres` in a terminal that has Docker
   2. `POSTGRES_PASSWORD` will be used elsewhere and is required.

## Getting Started

### Configuration
You will need to set up a simple config file (`.env.local`) in the root of the project. This should not be pushed to the codebase and is ignored by `.gitignore` already.
Add the following key-value pairs using your own auth values:
(anything prefixed with `*` is optional)

`DATABASE_URL` - The PostgreSQL connection string.

`DISCORD_CLIENT_ID` - Client ID for authentication.

`DISCORD_CLIENT_SECRET` - Client Secret for authentication.

`*` `DISCORD_CALLBACK_URL` - The callback URL for where the user should be redirected back to the site (this has a default in `.env` and shouldn't be changed)

`*` `GOOGLE_CLIENT_ID` - Client ID for authentication.

`*` `GOOGLE_CLIENT_SECRET` - Client Secret for authentication.

`*` `GOOGLE_CALLBACK_URL` - The callback URL for where the user should be redirected back to the site (this has a default in `.env` and shouldn't be changed)

`*` `TWITTER_CONSUMER_KEY` - Consumer key for authentication.

`*` `TWITTER_CONSUMER_SECRET` - Consumer secret for authentication.

`*` `TWITTER_CALLBACK_URL` - The callback URL for where the user should be redirected back to the site (this has a default in `.env` and shouldn't be changed)

#### You will need to poke Synqat to get these values
`CDN_ACCOUNT_ID` - The CDN account ID for the Cloudflare CDN.

`CDN_API_KEY` - The CDN API key for the Cloudflare CDN.


### Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.
