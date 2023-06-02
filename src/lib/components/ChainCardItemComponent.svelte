<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { Command } from '@tauri-apps/api/shell';
  import { homeDir } from '@tauri-apps/api/path';

  import { readDir, BaseDirectory, createDir } from '@tauri-apps/api/fs';

  export let title = '';
  export let description = '';
  export let other = '';
  export let disabled = true;

  async function launch() {
    try {
      const dir = await readDir('.switchboard2', { dir: BaseDirectory.Home, recursive: true });
    } catch (error) {
      console.log('.switchboard2 directory not found. Creating...');
      await createDir('.switchboard2/data/mainchain', { dir: BaseDirectory.Home, recursive: true });
    }

    const homeDirPath = await homeDir();

    const args = [
      `-regtest=true`,
      `-datadir=${homeDirPath}/.switchboard2/data/mainchain`,
      `-rpcport=18443`,
      `-rpcuser=user`,
      `-rpcpassword=password`,
      '-server=1'
    ];
    const command = Command.sidecar('binaries/drivechain-qt', args);
    const output = await command.execute();
    console.log(output);
  }
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
