<script lang="ts">
  import ChainCardItemComponent from '$lib/components/ChainCardItemComponent.svelte';
  import { useChainsRunning } from '$lib/stores';

  const chainsRunning = useChainsRunning();

  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<div class="h-full w-full select-none">
  <div class="grid grid-cols-4 gap-2 justify-items-stretch p-2">
    <ChainCardItemComponent
      chainData={data.chainData[0]}
      disabled={false}
      running={$chainsRunning.get(data.chainData[0].id) || false}
    />
  </div>
  <div class="divider text-xs uppercase text-secondary px-2">Sidechains</div>
  <div class="grid grid-cols-4 gap-2 justify-items-stretch p-2">
    {#each data.chainData as chainData, i}
      {#if i != 0}
        <ChainCardItemComponent
          {chainData}
          disabled={!$chainsRunning.get(data.chainData[0].id)}
          running={$chainsRunning.get(chainData.id) || false}
        />
      {/if}
    {/each}
  </div>
</div>
