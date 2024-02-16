<script>
  import { fly } from "svelte/transition";

  export let data;
  const { basic, all } = data;

  let search_input = "";
  let search_results = Object.entries(basic);

  const search_cheats = () => {
    if (!search_input) {
      search_results = Object.entries(basic);
      return;
    }
    const search_input_array = search_input.trim().split(/ /);
    const results = Object.entries(all).filter(
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

<div class="grid justify-items-center mt-10 w-full md:mt-40">
  <input
    class="px-4 py-3 rounded md:w-md"
    type="text"
    placeholder="insert..."
    bind:value={search_input}
    on:keyup={search_cheats}
    autofocus
  />
  {#if search_results?.length}
    {#key search_results}
      <ul
        in:fly={{ y: -30, duration: 600 }}
        class="search_results p-4 w-auto md:min-w-md shadow"
      >
        {#each search_results as [cheat, { description }]}
          <li class="flex flex-wrap items-center text-sm md:text-base">
            <code class="px-2 py-1 shrink-0">{cheat}</code>
            <p class="ml-2">{description}</p>
          </li>
        {/each}
      </ul>
    {/key}
  {/if}
</div>

<footer>
  <ul class="text-sm list-none">
    <li>
      <a href="https://github.com/sharu725/vim-cheat-sheet">Github</a>
    </li>
  </ul>
</footer>
