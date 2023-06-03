import type { ChainData } from '../types';
import { readDir, BaseDirectory, createDir } from '@tauri-apps/api/fs';
import { Command } from '@tauri-apps/api/shell';
import { homeDir } from '@tauri-apps/api/path';
import { Body, fetch } from '@tauri-apps/api/http';
import { Buffer } from 'buffer';

async function launchChain(chainData: ChainData) {
  try {
    const dir = await readDir('.switchboard2', { dir: BaseDirectory.Home, recursive: true });
  } catch (error) {
    console.log('.switchboard2 directory not found. Creating...');
    await createDir(`.switchboard2/data/${chainData.id}`, {
      dir: BaseDirectory.Home,
      recursive: true
    });
  }
  const homeDirPath = await homeDir();
  const args = [
    `-regtest=${chainData.regtest ? '1' : '0'}`,
    `-datadir=${homeDirPath}.switchboard2/data/${chainData.id}`,
    `-rpcport=${chainData.port}`,
    `-rpcuser=${chainData.rpcuser}`,
    `-rpcpassword=${chainData.rpcpass}`,
    '-server=1'
  ];
  const command = Command.sidecar(`binaries/${chainData.binName}`, args);
  return await command.spawn();
}

async function rpcOpertation(op: string, chainData: ChainData) {
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
      params: []
    })
  });
}

export { launchChain, rpcOpertation };
