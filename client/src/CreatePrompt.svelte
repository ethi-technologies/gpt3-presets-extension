<script type='ts'>
  let title, prompt;
  
  let tag = "";
  let keyed = [];
  
  function addChip(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      addKeyedChip(tag);
      tag = "";
    }
  }

  function addKeyedChip(value) {
    if (keyed.length) {
      keyed.push({k: keyed[keyed.length - 1].k + 1, v: value});
      keyed = keyed;
    } else {
      keyed.push({k: 1, v: value});
      keyed = keyed;
    }
  }
</script>

<form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-title">
        Prompt Title
      </label>
      <input bind:value={title} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white {!!title ? "" : "border-red-500"}" id="grid-title" type="text" placeholder="Dystopian Fiction">
      {#if !title}
        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
      {/if}
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-author">
        Author
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-author" type="text" placeholder="John Doe">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-prompt">
        Prompt Text
      </label>
      <textarea bind:value={prompt} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-prompt" type="text" placeholder="My really awesome prompt here. Enter something, and the AI will respond with:" />
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full px-3 mb-6">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-tags">
        Tags
      </label>
        <div class="flex flex-wrap -mx-3">
          <input bind:value={tag} on:keypress={addChip} class="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-gray-200 rounded mb-2 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-tags" type="text" placeholder="Enter tag...">
          {#each keyed as tag (tag.k)}
            <span class='rounded p-2 bg-gray-200'>{tag.v}</span>
          {/each}
      </div>
    </div>
  </div>
</form>
