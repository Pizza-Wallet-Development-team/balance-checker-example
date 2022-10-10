interface IList {
  balances: any;
}
function List({ balances }: IList) {
  return (
    <div>
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

export default List;
