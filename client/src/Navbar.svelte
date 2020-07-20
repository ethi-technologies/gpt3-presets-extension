<script type='ts'>
  import NavItem from './NavItem.svelte';
  export let options;
  export let selected;

</script>

<nav>
  <ul class="flex border-b">
    {#each options as option}
      <NavItem text={option} bind:selected />
    {/each}
  </ul>
</nav>


