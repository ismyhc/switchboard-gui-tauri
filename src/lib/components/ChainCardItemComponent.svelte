<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlay, faHammer, faRunning, faStop } from '@fortawesome/free-solid-svg-icons';
  import { killChain, launchChain, mine } from '$lib/utils';
  import type { ChainData, ChainState } from '../../types';

  export let chainData: ChainData;
  export let disabled: boolean;

  import { useChainsState } from '$lib/stores';
  const chainsState = useChainsState();

  function toggleRefreshBmm() {
    const state: ChainState = $chainsState.get(chainData.id);
    if (state) {
      state.refreshbmm = !state.refreshbmm;
      $chainsState.set(chainData.id, state);
      $chainsState = $chainsState;
    }
  }

  async function launchAndSavePid() {
    const pid = await launchChain(chainData);
    const state: ChainState = $chainsState.get(chainData.id);
    if (state) {
      state.pid = pid;
      $chainsState.set(chainData.id, state);
      $chainsState = $chainsState;
    } else {
      $chainsState.set(chainData.id, {
        id: chainData.id,
        running: false,
        refreshbmm: true,
        pid: pid
      });
      $chainsState = $chainsState;
    }
  }
  async function stopChain() {
    const state: ChainState = $chainsState.get(chainData.id);
    await killChain(state);
  }
</script>

<div
  class="card-compact rounded-xl bg-base-100 {disabled && !$chainsState.get(chainData.id)?.running
    ? 'opacity-25'
    : ''} shadow-offset-black"
>
  <div class="card-body">
    <h2 class="card-title">{chainData.name}</h2>
    <p class="text-xs">{chainData.desc}</p>
    <div class="card-actions justify-center pt-2">
      <div class="flex flex-row w-full py-1">
        {#if chainData.id !== 'drivechain'}
          <input
            type="checkbox"
            class="checkbox"
            disabled={!$chainsState.get(chainData.id)?.running}
            on:change={toggleRefreshBmm}
            checked={$chainsState.get(chainData.id)?.refreshbmm || true}
          />
          <span class="px-2 {!$chainsState.get(chainData.id)?.running ? 'opacity-30' : ''}"
            >Mine</span
          >
        {/if}
      </div>
      {#if chainData.id === 'drivechain'}
        {#if $chainsState.get(chainData.id)?.running}
          <button
            class="btn btn-success rounded-xl w-full"
            on:click={() => {
              mine(chainData);
            }}
            {disabled}><Fa icon={faHammer} class="pr-4" /> Mine</button
          >
          <button class="btn rounded-xl w-full" on:click={stopChain} {disabled}
            ><Fa icon={faStop} class="pr-4" /> Stop</button
          >
        {:else}
          <button
            class="btn btn-secondary rounded-xl w-full"
            disabled={disabled || $chainsState.get(chainData.id)?.running}
            on:click={launchAndSavePid}><Fa icon={faPlay} class="pr-4" /> Launch</button
          >
        {/if}
      {:else if $chainsState.get(chainData.id)?.running}
        <button
          class="btn rounded-xl w-full"
          on:click={stopChain}
          disabled={disabled && !$chainsState.get(chainData.id)?.running}
          ><Fa icon={faStop} class="pr-4" /> Stop</button
        >
      {:else}
        <button class="btn btn-secondary rounded-xl w-full" {disabled} on:click={launchAndSavePid}
          ><Fa icon={faPlay} class="pr-4" /> Launch</button
        >
      {/if}
    </div>
  </div>
</div>
