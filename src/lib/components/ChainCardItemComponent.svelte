<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { launchChain } from '$lib/utils';
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
      <button
        class="btn btn-secondary rounded-xl w-full"
        disabled={disabled || running}
        on:click={() => launchChain(chainData)}
        ><Fa icon={faPlay} class="pr-4" /> {running ? 'Running' : 'Launch'}</button
      >
    </div>
  </div>
</div>
