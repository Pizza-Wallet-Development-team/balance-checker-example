import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useGetTokenListToQuery } from '../../hooks/useGetTokenListToQuery';
// import * as Ethers from 'ethers';
// import { getAddressesBalances } from 'eth-balance-checker/lib/ethers';
// import { useGetUserBalancesGraph } from './getBalanceMethods/useGetUserBalancesGraph';
import { getBalances } from './getBalanceMethods/getBalances';

function TokenList() {
  const [balances, setBalances] = useState([]);
  const [address, setAddress] = useState('');
  const { account } = useWeb3React();
  const tokenList: any = useGetTokenListToQuery();
  // call to graphql api below
  // const userBalances = useGetUserBalancesGraph();

  // call to eth balance checker below
  // useEffect(() => {
  //   if (account && tokenList) {
  //     // make batch api request here with web3
  //     // or make call with eth balance checker
  //     // getBalancesWithEthBalanceChecker();
  //     const balances = getBalances(account, tokenList);
  //     console.log('USERS BALANCES HERE? - ', balances);
  //   }
  // }, [tokenList, account]);

  const handleGetTokenBalances = async () => {
    if (account && tokenList && address) {
      console.log('address entered');
      // if address has been entered check that
      const balances = await getBalances(address, tokenList);
      const balancesAboveZero = balances.filter(
        (token: any) => token.amount !== '0'
      );
      setBalances(balancesAboveZero);
    } else if (account && tokenList) {
      // if no input address use users address (if logged in)
      const balances = await getBalances(account, tokenList);

      const balancesAboveZero = balances.filter(
        (token: any) => token.amount !== '0'
      );
      setBalances(balancesAboveZero);
    } else {
      console.log("You didn't provide an address or log in");
    }
  };

  const handleInputOnchange = (e: any) => {
    const address = e.target.value;
    setAddress(address);
  };

  // const getBalancesWithEthBalanceChecker = () => {
  //   const ethers = Ethers.getDefaultProvider();
  //   const addresses = [account!];
  //   // const tokens = ['0x0', '0x789...'];
  //   const tokens = tokenList.reduce((acc: string[], val: any) => {
  //     acc.push(val.address);
  //     return acc;
  //   }, []);
  //   console.log('tokens - ', tokens);
  //   getAddressesBalances(ethers, addresses, tokens).then((balances) => {
  //     console.log(balances);
  //     var size = Object.keys(balances[account!]).length;
  //     console.log('how many requests it processed out of 4850 - ', size);
  //   });
  // };

  console.log('tokenList to query - ', tokenList);

  if (!account) return null;

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>
        Token list
      </h1>
      <input onChange={handleInputOnchange} placeholder="enter address here" />
      <button onClick={handleGetTokenBalances}>Get token balances</button>
      {balances &&
        balances.map((token: any, i: number) => {
          return (
            <div style={{ marginTop: '10px' }} key={i}>
              <img src={token.logoURI}></img>
              <p style={{ display: 'inline-block', margin: '5px' }}>
                {token.name}
              </p>
              <p style={{ display: 'inline-block', margin: '5px' }}>
                {token.amount}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default TokenList;
