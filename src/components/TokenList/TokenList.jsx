import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useGetTokenListToQuery } from '../../hooks/useGetTokenListToQuery';
import { abi, rpcEndpoint, bathEndpoint } from '../../constants/constants';
import { convertToNumber } from '../../utils/formatters';
import { ethers } from 'ethers';

function TokenList() {
  const tokenList = useGetTokenListToQuery();
  const { chainId, isActive, account } = useWeb3React();

  useEffect(() => {
    // console.log('token list in component - ', tokenList);
    // console.log('rpc endpoint - ', rpcEndpoint);
    // console.log('abi - ', abi);
    if (account) {
      // make batch api request here with web3
      // or make call with eth balance checker
      // or make call with graphql
    }
  }, [tokenList, account]);

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
