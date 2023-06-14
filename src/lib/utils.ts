import type { ChainData } from '../types';
import { readDir, BaseDirectory, createDir } from '@tauri-apps/api/fs';
import { Command, Child } from '@tauri-apps/api/shell';
import { homeDir } from '@tauri-apps/api/path';
import { Body, fetch } from '@tauri-apps/api/http';
import { Buffer } from 'buffer';

async function launchChain(chainData: ChainData) {
  await createDir(`.switchboard2/data/${chainData.id}`, {
    dir: BaseDirectory.Home,
    recursive: true
  });

  const homeDirPath = await homeDir();
  const args = [
    `-regtest=${chainData.regtest ? '1' : '0'}`,
    `-datadir=${homeDirPath}.switchboard2/data/${chainData.id}`,
    `-rpcport=${chainData.port}`,
    `-rpcuser=${chainData.rpcuser}`,
    `-rpcpassword=${chainData.rpcpass}`,
    '-server=1'
  ];
  const command = Command.sidecar(`binaries/${chainData.id}-qt`, args);
  const res = await command.spawn();
  return await res.pid;
}

async function killChain(chainState: ChainState) {
  console.log(chainState.pid)
  const child = new Child(chainState.pid);
  await child.kill();
}

async function rpcOpertation(op: string, params: any[], chainData: ChainData) {
  var userInfo = `${chainData.rpcuser}:${chainData.rpcpass}`;
  var buf =
    Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from(userInfo) : new Buffer(userInfo);
  return await fetch(`http://localhost:${chainData.port}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${buf.toString('base64')}`,
      'content-type': 'application/json'
    },
    body: Body.json({
      jsonrpc: '2.0',
      id: 'switchboard',
      method: `${op}`,
      params: params
    })
  });
}

async function mine(chainData: ChainData) {
  if (chainData.id === 'drivechain') {
    return rpcOpertation('generate', [1], chainData);
  }
}

async function refreshbmm(chainData: ChainData) {
  return rpcOpertation('refreshbmm', [0.0001], chainData);
}

export { launchChain, rpcOpertation, mine, refreshbmm, killChain };
