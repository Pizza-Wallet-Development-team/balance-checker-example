import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useWeb3React } from '@web3-react/core';
// import { Network } from '@web3-react/network';
// import { WalletConnect } from '@web3-react/walletconnect';
// import { getAddChainParameters } from '../constants/networks';

export function useGetTokenListToQuery() {
  // const { connector } = useWeb3React();
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    // axios call here to get tokens
    const fetchTokens = async () => {
      const tokenSource = 'https://tokens.coingecko.com/uniswap/all.json';
      const res = await axios.get(tokenSource);
      console.log();
      // set tokens in state
      setTokenList(res?.data.tokens);
    };

    fetchTokens();
  }, []);

  return tokenList;
}
