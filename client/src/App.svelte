<script lang="ts">
  import Prompts from "./Prompts.svelte";
  import Navbar from "./Navbar.svelte";
  import CreatePromptForm from "./CreatePrompt.svelte";
  export let name: string;

  const apiURL = 'https://prompts.ew.r.appspot.com/graphql';
  const options: Array<string> = [
    "Browse", "Create"
  ]
  let selected = "Browse";
</script>

<Navbar {options} bind:selected />
<h1 class="bg-pink-600 text-white text-center text-3xl p-2">Prompts Library</h1>
<div class='container mx-auto py-2'>

{#if selected == "Browse"}
<Prompts {name} {apiURL} />
{/if}
{#if selected == "Create"}
<CreatePromptForm {apiURL} />
{/if}

</div>

<style>

</style>
