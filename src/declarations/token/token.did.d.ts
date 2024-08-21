import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalnce' : (arg_0: Principal) => Promise<bigint>,
  'faucet' : () => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
