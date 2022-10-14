# balance-checker-example

Get a list of tokens a user holds and show balances for each one.
Examples include a way to fetch user balances with graphQl, using the eth balance checker npm package and finally fetching token lists with api calls and then using the solidity multicall contract to get the "balanceOf" for each token and then filtering users balances > 0.

# getting started

copy url and git clone 

# Set environment variables

Create an Alchemy App
Go to Alchemy and create an app on the eth mainnet and the polygon mainnet
Click View Key and Copy the HTTPS URL
Add it to your .env.local file 

```sh
REACT_APP_RPC_PROVIDER="your mainnet http link here"
REACT_APP_RPC_PROVIDER_POLYGON="your polygon http link here"
```

Set react app multicall as below - 

```sh
REACT_APP_MULTICALL_ADDRESS="0xcA11bde05977b3631167028862bE2a173976CA11"
```

run yarn (to install dependencies)

yarn start 

navigate to - http://localhost:3000/

Then you can log in with metamask and enter wallet addresses or just click get token balances to get your own balances.
