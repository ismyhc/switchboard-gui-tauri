<script lang="ts">
  import '../app.css';
  import { appWindow } from '@tauri-apps/api/window';
  import Fa from 'svelte-fa';
  import { faBars } from '@fortawesome/free-solid-svg-icons';
  import { faClose } from '@fortawesome/free-solid-svg-icons';
  import { faTwitter } from '@fortawesome/free-brands-svg-icons';
  import { faYoutube } from '@fortawesome/free-brands-svg-icons';
  import { faTelegram } from '@fortawesome/free-brands-svg-icons';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { faRedditAlien } from '@fortawesome/free-brands-svg-icons';
  import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
  import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import { useChainsRunning } from '$lib/stores';
  import { rpcOpertation } from '$lib/utils';

  const chainsRunning = useChainsRunning();

  $: selectedId = 'overview';

  export let data: LayoutData;

  async function update() {
    for (const k in data.chainData) {
      const chainData = data.chainData[k];
      try {
        const res = await rpcOpertation('getblockcount', [], chainData);
        if (res.ok) {
          // set chain runnning
          //console.log(`${chainData.id} running...`);
          $chainsRunning.set(chainData.id, true);
          $chainsRunning = $chainsRunning;

          if (chainData.id === 'drivechain') {
            if ((res.data as any).result < 200) {
              for (const j in data.chainData) {
                const innerChainData = data.chainData[j];
                if (innerChainData.id !== 'drivechain') {
                  let r = await rpcOpertation(
                    'createsidechainproposal',
                    [innerChainData.slot, `${innerChainData.id}`],
                    chainData
                  );

                  console.log(r);
                }
              }
              await rpcOpertation('generate', [200], chainData);
            }
          }
        }
      } catch (error) {
        // set chain not running
        //console.log(`${chainData.id} Not running...`);
        $chainsRunning.set(chainData.id, false);
        $chainsRunning = $chainsRunning;
      }
    }
  }

  function selectChain(chainId: string) {
    if (chainId === 'overview' || $chainsRunning.get(chainId)) {
      selectedId = chainId;
    }
  }

  onMount(async () => {
    setInterval(update, 1000);
  });
</script>

<div
  class="drawer drawer-mobile bg-neutral rounded-3xl border-b-8 border-r-8 border-l-2 border-t-2 border-black"
>
  <input id="left-menu" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content flex flex-col items-center justify-center">
    <div data-tauri-drag-region class="navbar bg-base-100 sticky top-0 z-50">
      <div data-tauri-drag-region class="flex-1">
        <label
          data-tauri-drag-region
          class="btn btn-square btn-ghost drawer-button opacity-0"
          for="left-menu"
        >
          <Fa icon={faBars} />
        </label>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost" on:click={appWindow.minimize}>
          <Fa icon={faWindowMinimize} />
        </button>
        <button class="btn btn-square btn-ghost" on:click={appWindow.toggleMaximize}>
          <Fa icon={faWindowMaximize} />
        </button>
        <button class="btn btn-square btn-ghost" on:click={appWindow.close}>
          <Fa icon={faClose} />
        </button>
      </div>
    </div>

    <slot />
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <div class="items-center grid-flow-col text-xs">
        <p>Made with ❤️ by LayerTwo Labs, Inc</p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://twitter.com/layertwolabs" rel="external" target="_blank"
          ><Fa icon={faTwitter} size="1x" />
        </a>
        <a href="https://twitter.com/layertwolabs" rel="external" target="_blank"
          ><Fa icon={faYoutube} size="1x" />
        </a>
        <a href="https://twitter.com/layertwolabs" rel="external" target="_blank"
          ><Fa icon={faTelegram} size="1x" />
        </a>
        <a href="https://twitter.com/layertwolabs" rel="external" target="_blank"
          ><Fa icon={faGithub} size="1x" />
        </a>
        <a href="https://twitter.com/layertwolabs" rel="external" target="_blank"
          ><Fa icon={faRedditAlien} size="1x" />
        </a>
      </div>
    </footer>
  </div>
  <div class="drawer-side">
    <label for="left-menu" class="drawer-overlay" data-tauri-drag-region="" />
    <ul class="menu w-60 bg-base-100">
      <div data-tauri-drag-region class="flex justify-center pt-8">
        <img
          class="center-items"
          src="https://layertwolabs.com/logo.png"
          width="168"
          height="40"
          draggable="false"
          alt=""
        />
      </div>
      <!-- Sidebar content here -->
      <div class="divider text-xs uppercase text-secondary px-2" />

      <li class={selectedId === 'overview' ? 'bordered' : ''}>
        <a href={null} class="font-black" on:click={() => selectChain('overview')}>Overview</a>
      </li>
      <li
        class="{$chainsRunning.get('drivechain') ? '' : 'disabled'} {selectedId === 'drivechain'
          ? 'bordered'
          : ''}"
      >
        <a href={null} class="font-bold" on:click={() => selectChain('drivechain')}
          >{data.chainData[0].name}</a
        >
      </li>

      <div class="divider text-xs uppercase text-secondary px-2">Sidechains</div>
      {#each data.chainData as chainData, i}
        {#if i != 0}
          <li
            class="{selectedId === chainData.id ? 'bordered' : ''} {$chainsRunning.get(
              'drivechain'
            ) && $chainsRunning.get(chainData.id)
              ? ''
              : 'disabled'}"
          >
            <a href={null} class="font-bold" on:click={() => selectChain(chainData.id)}
              >{chainData.name}</a
            >
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</div>
