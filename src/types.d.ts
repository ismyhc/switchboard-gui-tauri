interface ChainData {
  id: string;
  name: string;
  desc: string;
  port: string;
  regtest: boolean;
  rpcuser: string;
  rpcpass: string;
  slot: number;
}

interface ChainState {
  id: string;
  running: boolean;
  pid: number;
  refreshbmm: boolean;
}

export { type ChainData, type ChainState };
