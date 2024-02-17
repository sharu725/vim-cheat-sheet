<script>
  import { fly } from "svelte/transition";
  import { modes } from "$lib/constants";

  export let data;

  let search_input = "";
  let dataSource = "basic";
  let search_results = Object.entries(data[dataSource]);
  let currentModeTitle = modes[0].title;

  const updateDataSource = (slug, title) => {
    dataSource = slug;
    search_results = Object.entries(data[dataSource]);
    currentModeTitle = title;
  };

  const search_cheats = () => {
    const search_input_array = search_input.trim().split(/ /);
    const results = Object.entries(data[dataSource]).filter(
      ([key, { description, synonym }]) => {
        for (let i = 0; i < search_input_array.length; i++) {
          if (search_input_array[i].length < 3) {
            if (
              key.toLowerCase().includes(search_input_array[i].toLowerCase())
            ) {
              return true;
            }
          } else {
            if (
              description
                .toLowerCase()
                .includes(search_input_array[i].toLowerCase())
            ) {
              return true;
            }
            if (
              synonym &&
              synonym
                .toLowerCase()
                .includes(search_input_array[i].toLowerCase())
            ) {
              return true;
            }
          }
        }
      }
    );
    search_results = results;
  };
</script>

<div class="grid justify-items-center mt-10 w-full md:mt-30">
  <h2 class="font-bold text-blue-400 mb-2">{currentModeTitle}</h2>
  <div class="flex space-x-4 mb-2">
    {#each modes as { slug, title, icon }}
      <button
        class="text-2xl {icon}"
        class:text-gray-400={slug != dataSource}
        class:text-blue-400={slug == dataSource}
        {title}
        on:click={() => updateDataSource(slug, title)}
      ></button>
    {/each}
  </div>
  <div class="relative z-30">
    <input
      class="px-4 py-3 md:w-md"
      type="text"
      placeholder="insert..."
      bind:value={search_input}
      on:keyup={search_cheats}
      autofocus
    />
    <div
      class="i-skill-icons-vim-dark text-2xl opacity-40 absolute right-1 top-0 bottom-0 m-auto"
    ></div>
  </div>
  {#if search_results?.length}
    {#key search_results}
      <ul
        in:fly={{ y: -30, duration: 600 }}
        class="search_results p-4 w-auto md:min-w-md md:max-w-3xl"
      >
        {#each search_results as [cheat, { description }]}
          <li class="flex flex-wrap items-center text-sm md:text-base mb-2">
            <code class="px-2 py-1 shrink-0">{cheat}</code>
            <p class="ml-2">{description}</p>
          </li>
        {/each}
      </ul>
    {/key}
  {/if}
</div>

<svelte:head>
  <title>Vim Cheat Sheet | Webjeda</title>
  <meta
    name="description"
    content="A vim cheat sheet created for my personal vim, nvim learning journey."
  />
</svelte:head>
