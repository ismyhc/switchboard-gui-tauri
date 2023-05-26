<script lang="ts">
  import { onMount } from 'svelte';
  import ChainCardItemComponent from '$lib/components/ChainCardItemComponent.svelte';
  // Hack to prevent white screen before loading...
  // Not sure if there are side effects to do this quite yet...
  // https://github.com/tauri-apps/tauri/issues/5170
  onMount(async () => {
    const appWindow = (await import('@tauri-apps/api/window')).appWindow;
    appWindow.show();
  });
</script>

<div class="h-full w-full select-none">
  <div class="grid grid-cols-4 gap-2 justify-items-stretch p-2">
    <ChainCardItemComponent
      title="Mainchain"
      description="Bitcoin mainchain"
      other="Mode: regtest"
      disabled={false}
    />
  </div>
  <div class="divider text-xs uppercase text-secondary px-2">Sidechains</div>
  <div class="grid grid-cols-4 gap-2 justify-items-stretch p-2">
    <ChainCardItemComponent
      title="Testchain"
      description="Bitcoin testchain"
      other="Mode: regtest"
    />
    <ChainCardItemComponent
      title="Drivechain"
      description="Bitcoin testchain"
      other="Mode: regtest"
    />
    <ChainCardItemComponent
      title="Bitassets"
      description="Bitassets sidechain"
      other="Mode: regtest"
    />
    <ChainCardItemComponent
      title="BitNames"
      description="BitNames sidechain"
      other="Mode: regtest"
    />
    <ChainCardItemComponent
      title="Ethereum"
      description="Ethereum sidechain"
      other="Mode: regtest"
    />
    <ChainCardItemComponent title="Zcash" description="Zcash sidechain" other="Mode: regtest" />
  </div>
</div>
