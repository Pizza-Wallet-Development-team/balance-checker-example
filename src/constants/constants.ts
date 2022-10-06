const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const rpcEndpoint = process.env.REACT_APP_CHAINSTACK_NODE;
const bathEndpoint = `https://${process.env.REACT_APP_CHAINSTACK_USER}${process.env.REACT_APP_CHAINSTACK_PASSWORD}${process.env.REACT_APP_BATH_ENDPOINT}`;

export { abi, rpcEndpoint, bathEndpoint };
