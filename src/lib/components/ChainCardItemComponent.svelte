<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { Command } from '@tauri-apps/api/shell';
  import { homeDir } from '@tauri-apps/api/path';

  import { Buffer } from 'buffer';

  import { readDir, BaseDirectory, createDir } from '@tauri-apps/api/fs';

  import { onMount } from 'svelte';

  import { Body, fetch } from '@tauri-apps/api/http';

  export let title = '';
  export let description = '';
  export let other = '';
  export let disabled = true;

  let chain_running = false;

  async function launch() {
    try {
      const dir = await readDir('.switchboard2', { dir: BaseDirectory.Home, recursive: true });
    } catch (error) {
      console.log('.switchboard2 directory not found. Creating...');
      await createDir('.switchboard2/data/mainchain', { dir: BaseDirectory.Home, recursive: true });
    }

    const homeDirPath = await homeDir();

    const args = [
      `-regtest=1`,
      `-datadir=${homeDirPath}/.switchboard2/data/mainchain`,
      `-rpcport=18443`,
      `-rpcuser=user`,
      `-rpcpassword=password`,
      '-server=1'
    ];
    const command = Command.sidecar('binaries/drivechain-qt', args);
    console.log(command);
    const output = await command.spawn();

    while (!chain_running) {
      await new Promise((r) => setTimeout(r, 1000));
    }
    console.log(chain_running);
  }

  async function getblockcount() {
    var userInfo = 'user:password';
    var buf =
      Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from(userInfo) : new Buffer(userInfo);
    const res = await fetch('http://localhost:18443', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${buf.toString('base64')}`,
        'content-type': 'application/json'
      },
      body: Body.json({
        jsonrpc: '2.0',
        id: 'switchboard',
        method: 'getblockcount',
        params: []
      })
    });
    console.log(res.data);
  }

  async function update() {
    try {
      const res = await getblockcount();
      chain_running = true;
    } catch (error) {
      chain_running = false;
    }
  }

  onMount(async () => {
    setInterval(update, 3000);
  });
</script>

<div class="card-compact rounded-xl bg-base-100 {disabled ? 'opacity-25' : ''} shadow-offset-black">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p class="text-xs">{description}</p>
    <div class="card-actions justify-center pt-2">
      <button class="btn btn-secondary rounded-xl w-full" {disabled} on:click={launch}
        ><Fa icon={faPlay} class="pr-4" /> Launch</button
      >
    </div>
  </div>
</div>
