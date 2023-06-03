interface ChainData {
  id: string;
  name: string;
  desc: string;
  port: string;
  regtest: boolean;
  rpcuser: string;
  rpcpass: string;
  binName: string;
}

export { type ChainData };
