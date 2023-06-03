export const prerender = true;
export const ssr = false;

import type { ChainData } from '../types';
import type { LayoutData, LayoutLoad } from './$types';

export const load: LayoutLoad = (async () => {
  return {
    chainData: [
      {
        id: 'drivechain',
        name: 'MainChain',
        desc: 'Bitcoin Core + Bips 300/301',
        port: '18443',
        regtest: true,
        rpcuser: 'user',
        rpcpass: 'password',
        slot: -1
      } satisfies ChainData,
      {
        id: 'bitassets',
        name: 'BitAssets',
        desc: '',
        port: '19004',
        regtest: true,
        rpcuser: 'user',
        rpcpass: 'password',
        slot: 4
      } satisfies ChainData,
      {
        id: 'testchain',
        name: 'TestChain',
        desc: '',
        port: '1900',
        regtest: true,
        rpcuser: 'user',
        rpcpass: 'password',
        slot: 0
      } satisfies ChainData
    ]
  };
}) satisfies LayoutData;
