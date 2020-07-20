<script type='ts'>
  export let selected;
  export let text;

  $: isSelected = selected == text;
</script>

<li class="-mb-px {isSelected ? "mr-1":""}">
  {#if isSelected}
  <a
    class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-bold" href="#">
  {text}
  </a>
  {:else}
  <a
    on:click|preventDefault={() => selected = text }
    class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
  {text}
  </a>
  {/if}
</li>

