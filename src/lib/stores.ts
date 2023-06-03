import { useWritable } from './use-shared-store';

export const useChainsRunning = () => useWritable('chainsRunning', new Map<string, boolean>());
