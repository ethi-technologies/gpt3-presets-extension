<script lang="ts">
  import Prompts from "./Prompts.svelte";
  export let name: string;
  const apiURL = 'https://prompts.ew.r.appspot.com/graphql';
</script>

<style>

</style>

<h1 class="bg-pink-600 text-white text-center text-3xl p-2">Prompts Library</h1>
<div class='container mx-auto py-2'>
  <Prompts {name} {apiURL} />
</div>
