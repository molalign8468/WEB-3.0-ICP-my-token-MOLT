export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkBalnce' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'faucet' : IDL.Func([], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
