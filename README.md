# Cosmos Wallet App

**! Warning !**

*this project is not to be used in production as it is vulnerable to leaking mnemonic and private keys. For testing purposes only*

## Description
Using `@cosmjs/stargate` this repo aims to allow users to create a blockchain address, store it locally and be able to retrieve it locally. This project does not send credentials to external servers.

## Features

Within the Cosmos ecosystem:

#### Account Creation

- Users register with email and password which generates a valid mnemonic 
- Enables users to generate a new mnemonic with the correct email password combination
- Credentials and keys stored encrypted locally in the browser

#### Sign-In

- With email and password, which decrypts the private keys 
- Recover the account using the account mnemonic or email + password combination.


## Installation
Using npm

```
npm install
```

Using yarn
```
yarn
```

Using pnpm
```
pnpm
```

## Running in development mode

Using npm

```
npm run dev
```

Using yarn
```
yarn dev
```

Using pnpm
```
pnpm dev
```

## Running Tests

Using npm

```
npm run test
```

Using yarn
```
yarn test
```

Using pnpm
```
pnpm test
```

## Libraries
This project uses:

- NextJs
- @cosmjs packages
- crypto-js
