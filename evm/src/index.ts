export { NFTrout__factory as NFTroutFactory } from '../typechain-types/factories/contracts/NFTrout__factory';
export { NFTrout } from '../typechain-types/contracts/NFTrout';

import sapphireTestnet from '../deployments/sapphire-testnet/NFTrout.json';
import sapphire from '../deployments/sapphire/NFTrout.json';
import hyperspace from '../deployments/hyperspace/NFTrout.json';
import filecoin from '../deployments/filecoin/NFTrout.json';

export const DEPLOYMENTS: Record<number, { address: string, abi: any } | null>  = {
  0x5aff: sapphireTestnet,
  0x5afe: sapphire,
  314: filecoin,
  3141: hyperspace,
};
