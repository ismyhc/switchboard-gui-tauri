<script lang="ts">
  import Fa from 'svelte-fa';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';

  export let title = '';
  export let description = '';
  export let other = '';
  export let disabled = true;
</script>

<div
  class="card-compact rounded-none bg-base-100 {disabled ? 'opacity-25' : ''} shadow-offset-black"
>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-center pt-2">
      <button class="btn btn-secondary rounded-none w-full" {disabled}
        ><Fa icon={faPlay} class="pr-4" /> Launch</button
      >
    </div>
  </div>
</div>
