<script>
  import { fly } from "svelte/transition";
  import { modes } from "$lib/constants";
  import { make_title } from "$lib/utils";

  export let data;

  let search_input = "";
  let dataSource = "basic";
  let search_results = Object.entries(data[dataSource]);
  let current_mode_title = modes[0].title;
  /**
   * @type {HTMLInputElement}
   */
  let search_input_element;

  let input_focussed = false;

  const updateDataSource = (
    /** @type {string} */ slug,
    /** @type {string} */ title
  ) => {
    dataSource = slug;
    search_results = Object.entries(data[dataSource]);
    current_mode_title = title;
  };

  const search_cheats = ({ key }) => {
    const search_input_array = search_input.trim().split(/ /);
    if (!search_input_array[0]?.length) {
      search_results = Object.entries(data[dataSource]);
      return;
    }
    try {
      const results = Object.entries(data["all"]).filter(
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
    } catch (error) {
      console.error(error);
    }
  };

  const keyPressed = (
    /** @type {{ preventDefault?: any; key?: any; }} */ event
  ) => {
    const { key } = event;
    let selected_mode = modes.find(({ slug }) => slug == "basic");

    if (input_focussed) {
      switch (key) {
        case "Escape":
          search_input_element.blur();
          break;
      }
    } else {
      switch (key) {
        case "/":
          event.preventDefault();
          search_input_element.focus();
          break;
        case "b":
          selected_mode =
            modes.find(({ slug }) => slug == "basic") ?? modes.at(-1);
          updateDataSource("basic", selected_mode?.title);
          break;
        case "n":
          selected_mode =
            modes.find(({ slug }) => slug == "normal") ?? modes.at(-1);
          updateDataSource("normal", selected_mode?.title);
          break;
        case "i":
          selected_mode =
            modes.find(({ slug }) => slug == "insert") ?? modes.at(-1);
          updateDataSource("insert", selected_mode?.title);
          break;
        case "v":
          selected_mode =
            modes.find(({ slug }) => slug == "visual") ?? modes.at(-1);
          updateDataSource("visual", selected_mode?.title);
          break;
        case "r":
          selected_mode =
            modes.find(({ slug }) => slug == "replace") ?? modes.at(-1);
          updateDataSource("replace", selected_mode?.title);
          break;
        case "c":
          selected_mode =
            modes.find(({ slug }) => slug == "command") ?? modes.at(-1);
          updateDataSource("command", selected_mode?.title);
          break;
        case "t":
          selected_mode =
            modes.find(({ slug }) => slug == "terminal") ?? modes.at(-1);
          updateDataSource("terminal", selected_mode?.title);
          break;
        case "e":
          selected_mode =
            modes.find(({ slug }) => slug == "all") ?? modes.at(-1);
          updateDataSource("all", selected_mode?.title);
          break;

        default:
          break;
      }
    }
  };
</script>

<div class="grid justify-items-center mt-10 w-full md:mt-30">
  <h2 class="font-bold text-blue-400 mb-2">{current_mode_title}</h2>
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
      placeholder={input_focussed ? "" : "Press / to start searching"}
      bind:this={search_input_element}
      bind:value={search_input}
      on:keyup={search_cheats}
      on:focus={() => (input_focussed = true)}
      on:blur={() => (input_focussed = false)}
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
<div class="fixed left-0 bottom-0">
  <div class="bg-blue-900 px-4">{make_title(dataSource)}</div>
</div>

<svelte:window on:keydown={keyPressed} />

<svelte:head>
  <title>Vim Cheat Sheet | Webjeda</title>
  <meta
    name="description"
    content="A vim cheat sheet created for my personal vim, nvim learning journey."
  />
</svelte:head>
