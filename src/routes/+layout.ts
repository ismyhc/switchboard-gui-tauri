export const prerender = true;
export const ssr = false;

import type { ChainData } from '../types';
import type { LayoutData } from './$types';

export const load = (async () => {
  return {
    chainData: [
      {
        id: 'mainChain',
        name: 'MainChain',
        desc: 'Bitcoin Core + Bips 300/301',
        port: '18447',
        regtest: true,
        rpcuser: 'user',
        rpcpass: 'password',
        binName: 'drivechain-qt'
      } satisfies ChainData,
      {
        id: 'bitAssets',
        name: 'BitAssets',
        desc: '',
        port: '18448',
        regtest: true,
        rpcuser: 'user',
        rpcpass: 'password',
        binName: 'bitassets-qt'
      } satisfies ChainData
    ]
  };
}) satisfies LayoutData;
