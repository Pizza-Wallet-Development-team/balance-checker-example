import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useGetTokenListToQuery } from '../../hooks/useGetTokenListToQuery';
// import * as Ethers from 'ethers';
// import { getAddressesBalances } from 'eth-balance-checker/lib/ethers';
// import { useGetUserBalancesGraph } from './getBalanceMethods/useGetUserBalancesGraph';
import { getBalances } from './getBalanceMethods/getBalances';
import { Spin } from 'antd';
import List from './List';

interface BalancesState {
  ethereum: any;
  polygon: any;
}

function TokenList() {
  const [balances, setBalances] = useState<BalancesState>();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (account && tokenList && address) {
      console.log('address entered');
      // if address has been entered check that
      const balances = await getBalances(address, tokenList.ethereum);
      const balancesPolygon = await getBalances(address, tokenList.polygon);
      console.log('polygon balances - ', balancesPolygon);

      const balancesAboveZero = balances.filter(
        (token: any) => token.amount !== '0'
      );
      const balancesAboveZeroPolygon = balancesPolygon.filter(
        (token: any) => token.amount !== '0'
      );
      setBalances({
        ethereum: balancesAboveZero,
        polygon: balancesAboveZeroPolygon,
      });
    } else if (account && tokenList) {
      // if no input address use users address (if logged in)
      const balances = await getBalances(account, tokenList.ethereum);
      const balancesPolygon = await getBalances(account, tokenList.polygon);
      console.log('polygon balances - ', balancesPolygon);

      const balancesAboveZero = balances.filter(
        (token: any) => token.amount !== '0'
      );
      const balancesAboveZeroPolygon = balancesPolygon.filter(
        (token: any) => token.amount !== '0'
      );
      setBalances({
        ethereum: balancesAboveZero,
        polygon: balancesAboveZeroPolygon,
      });
    } else {
      console.log("You didn't provide an address or log in");
    }
    setLoading(false);
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

  if (!account) return null;

  if (loading) return <Spin size="large" />;

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>
        Token list
      </h1>
      <input onChange={handleInputOnchange} placeholder="enter address here" />
      <button style={{ cursor: 'pointer' }} onClick={handleGetTokenBalances}>
        Get token balances
      </button>
      <p style={{ fontSize: '25px', marginBottom: '10px', marginTop: '10px' }}>
        Ethereum
      </p>
      {balances && <List balances={balances.ethereum} />}
      <p style={{ fontSize: '25px', marginBottom: '10px', marginTop: '10px' }}>
        Polygon
      </p>
      {balances && <List balances={balances.polygon} />}
    </div>
  );
}

export default TokenList;
