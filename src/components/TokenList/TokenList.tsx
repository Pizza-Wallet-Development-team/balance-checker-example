import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useGetTokenListToQuery } from '../../hooks/useGetTokenListToQuery';
import * as Ethers from 'ethers';
import { getAddressesBalances } from 'eth-balance-checker/lib/ethers';
// import { useGetUserBalancesGraph } from './getBalanceMethods/useGetUserBalancesGraph';

function TokenList() {
  const { account } = useWeb3React();
  const tokenList: any = useGetTokenListToQuery();
  // call to graphql api below
  // const userBalances = useGetUserBalancesGraph();

  useEffect(() => {
    if (account && tokenList) {
      // make batch api request here with web3
      // or make call with eth balance checker
      getBalancesWithEthBalanceChecker();
    }
  }, [tokenList, account]);

  const getBalancesWithEthBalanceChecker = () => {
    const ethers = Ethers.getDefaultProvider();
    const addresses = [account!];
    // const tokens = ['0x0', '0x789...'];
    const tokens = tokenList.reduce((acc: any, val: any) => {
      acc.push(val.address);
      return acc;
    }, []);
    console.log('tokens - ', tokens);
    getAddressesBalances(ethers, addresses, tokens).then((balances) => {
      console.log(balances);
      var size = Object.keys(balances[account!]).length;
      console.log('how many requests it processed out of 4850 - ', size);
    });
  };

  console.log('tokenList - ', tokenList);

  if (!account) return null;

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>
        Token list
      </h1>
    </div>
  );
}

export default TokenList;
