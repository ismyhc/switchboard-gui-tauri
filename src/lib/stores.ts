import { useWritable } from './use-shared-store';

export const useChainsState = () => useWritable('chainsState', new Map<string, ChainState>());
