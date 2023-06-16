# Cosmos Wallet App

**! Warning !**

*this project is not to be used in production as it is vulnerable to leaking mnemonic and private keys. For testing and proof of concept purposes only*

## Description
Using `@cosmjs/stargate` this repo aims to allow users to create a blockchain account/address, store it locally in the browser and be able to recover the account with the unencrypted mmnemonic. This project does not send credentials to external servers or actually communicates with the blockchain.

Not implemented in this repo:
- clearing localstorage cache
- changing password
- Does not store password or email from user in local storage to avoid even greater security issues
- Creating account for chains that are not the main cosmos chain
- Does not connect to mainnet to check wallet balance / send crypto (mainnet blocks CORs so would need to use a third-party provider or custom rpc endpoint)

## Features

Within the Cosmos ecosystem:

#### Account Creation

- Users register with email and password which generates a valid address with mnemonic 
- Enables users to generate a new mnemonic with the correct email password combination
- Encrypted mnemonic stored encrypted locally in the browser
- Encryption keys are stored in memory only and do not persist across sessions

#### Sign-In

- With email and password, which decrypts the account if it is stored locally
- Recover the account using the account mnemonic

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

Playwright E2E test library - make sure to install the test browsers - we currently only test with Firefox, but this can be changed by editing `playwright.config.ts`

```
npx playwright install
```

```
npx playwright test --ui
```

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

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- @cosmjs packages
- crypto-js
- State Management with Zustand
- React Hook Form
- TailwindCSS for styling
- Playwright for E2E testing


## Known issues
- Error message `Prop className did not match` in console due to bug in nextjs as described here: https://github.com/vercel/next.js/issues/46605 