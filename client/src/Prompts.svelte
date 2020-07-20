<script lang="ts">
  export let apiURL;
  export let name;

  const getprompts = 'query={prompts{id, name, text, tags, author}}'
  interface Prompt {
    id: string;
    name: string;
    text: string;
    tags: [string]; 
    author?: string;
    likes?: number;
  }

  let prompts:Array<Prompt> = [];
  async function getPrompts() {
    let resp = await fetch(apiURL + `?${getprompts}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
    let result = await resp.json();
    prompts = result.data.prompts;
  }
  getPrompts();
</script>

<h1>Hello {name}!</h1>
{#each prompts as prompt (prompt.id)}
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{prompt.name}</div>
      <p class="text-gray-700 text-base">
        {prompt.text}
      </p>
    </div>
    <div class="px-6 py-4">
      {#each prompt.tags as tag}
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag}</span>
      {/each}
    </div>
  </div>
{/each}

