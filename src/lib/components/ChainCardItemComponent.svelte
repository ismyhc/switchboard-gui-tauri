<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlay, faHammer } from '@fortawesome/free-solid-svg-icons';
  import { launchChain, mine } from '$lib/utils';
  import type { ChainData } from '../../types';

  export let chainData: ChainData;
  export let disabled: boolean;
  export let running: boolean;
</script>

<div class="card-compact rounded-xl bg-base-100 {disabled ? 'opacity-25' : ''} shadow-offset-black">
  <div class="card-body">
    <h2 class="card-title">{chainData.name}</h2>
    <p class="text-xs">{chainData.desc}</p>
    <div class="card-actions justify-center pt-2">
      {#if running}
        <button
          class="btn btn-secondary rounded-xl w-full"
          disabled={false}
          on:click={() => mine(chainData)}
          ><Fa icon={faHammer} class="pr-4" /> {running ? 'Mine' : 'Launch'}</button
        >
      {:else}
        <button
          class="btn btn-secondary rounded-xl w-full"
          disabled={disabled || running}
          on:click={() => launchChain(chainData)}><Fa icon={faPlay} class="pr-4" /> Launch</button
        >
      {/if}
    </div>
  </div>
</div>
