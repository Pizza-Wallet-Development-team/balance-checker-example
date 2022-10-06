import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

export function getUserBalancesGraph() {
  const { account } = useWeb3React();

  const convertIndexToAlphetString = (number) =>
    number
      .toString()
      .split('')
      .map((numberChar) => String.fromCharCode(65 + parseInt(numberChar)))
      .join('');

  const queryTemplate = (index, { address }, callData) => `
${convertIndexToAlphetString(
  index
)}: call(data: { to: "${address}", data: "${callData}" }) { data }`;

  const retrieveTokenBalanceViaGraphQL = (tokens) => {
    const walletAddress = account;
    const ethersInterface = new ethers.utils.Interface(abi);
    console.log('ethersInterface - ', ethersInterface);
    console.log('wallet address - ', walletAddress);

    const callData = ethersInterface.encodeFunctionData('balanceOf', [
      walletAddress,
    ]);

    const query = tokens
      .map((token, index) => {
        return queryTemplate(index, token, callData);
      })
      .join('\n');

    const userName = process.env.REACT_APP_CHAINSTACK_USER;
    const password = process.env.REACT_APP_CHAINSTACK_PASSWORD;
    const bathEndpoint = process.env.REACT_APP_BATH_ENDPOINT;
    return fetch(`${bathEndpoint}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        userName: userName,
        password: password,
      },
      body: JSON.stringify({ query: `{ block { ${query} } }` }),
    }).then((data) => data.json());
  };

  const getUsersBalances = async () => {
    // TODO: We need a dedicated chainstack rpc node to do graphql queries
    // I need need to do a performance check here to calculate how much time passes

    const tokenBalances = await retrieveTokenBalanceViaGraphQL(tokenList).then(
      ({ data: { block: balances } }) => {
        const output = {};
        Object.entries(balances).map(([, { data: hex }], index) => {
          const { name, decimals, symbol } = tokenList[index];
          output[name] = `${convertToNumber(hex, decimals)} ${symbol}`;
        });
        return output;
      }
    );
    console.log(tokenBalances);

    return tokenBalances;
  };

  return getUsersBalances();
}
