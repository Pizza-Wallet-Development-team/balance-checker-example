import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { abi } from '../../../constants/constants';
import { convertToNumber } from '../../../utils/formatters';
import { useGetTokenListToQuery } from '../../../hooks/useGetTokenListToQuery';

export function useGetUserBalancesGraph() {
  const { account } = useWeb3React();
  const [balances, setBalances] = useState([]);
  const tokenList: any = useGetTokenListToQuery();

  useEffect(() => {
    if (tokenList && account) {
      getUsersBalances();
    }
  }, [tokenList, account]);

  const convertIndexToAlphetString = (number: number) =>
    number
      .toString()
      .split('')
      .map((numberChar) => String.fromCharCode(65 + parseInt(numberChar)))
      .join('');

  const queryTemplate = (
    index: number,
    { address }: { address: string },
    callData: any
  ) => `
${convertIndexToAlphetString(
  index
)}: call(data: { to: "${address}", data: "${callData}" }) { data }`;

  const retrieveTokenBalanceViaGraphQL = (tokens: any) => {
    const walletAddress = account;
    const ethersInterface = new ethers.utils.Interface(abi);

    const callData = ethersInterface.encodeFunctionData('balanceOf', [
      walletAddress,
    ]);

    const query = tokens
      .map((token: any, index: number) => {
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
        userName: `${userName}`,
        password: `${password}`,
      },
      body: JSON.stringify({ query: `{ block { ${query} } }` }),
    }).then((data) => data.json());
  };

  const getUsersBalances = async () => {
    // TODO: We need a dedicated chainstack rpc node to do graphql queries
    // I need need to do a performance check here to calculate how much time passes

    const tokenBalances = await retrieveTokenBalanceViaGraphQL(tokenList).then(
      ({ data: { block: balances } }: { data: { block: [] } }) => {
        let output: any;
        Object.entries(balances).map(([, { data: hex }], index) => {
          const { name, decimals, symbol } = tokenList[index];
          output[name] = `${convertToNumber(hex, decimals)} ${symbol}`;
        });
        return output;
      }
    );
    console.log('returned token balances - ', tokenBalances);

    setBalances(tokenBalances);
  };

  return balances;
}
