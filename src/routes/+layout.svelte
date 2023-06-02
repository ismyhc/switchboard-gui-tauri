<script>
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
        />
      </div>
      <!-- Sidebar content here -->
      <div class="divider text-xs uppercase text-secondary px-2" />
      <li class="bordered"><a class="font-black">Overview</a></li>
      <li class="disabled"><a class="font-bold">Mainchain</a></li>
      <div class="divider text-xs uppercase text-secondary px-2">Sidechains</div>
      <li class="disabled"><a class="font-bold">Testchain</a></li>
      <li class="disabled"><a class="font-bold">Bitassets</a></li>
      <li class="disabled"><a class="font-bold">Bitnames</a></li>
      <li class="disabled"><a class="font-bold">Ethereum</a></li>
      <li class="disabled"><a class="font-bold">Zcash</a></li>
    </ul>
  </div>
</div>
