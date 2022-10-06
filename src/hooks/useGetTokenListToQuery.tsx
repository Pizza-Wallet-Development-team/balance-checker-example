import { useEffect, useState } from 'react';
import axios from 'axios';

export function useGetTokenListToQuery() {
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
