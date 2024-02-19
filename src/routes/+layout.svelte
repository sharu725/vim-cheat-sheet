<script>
  import "@unocss/reset/tailwind.css";
  import "virtual:uno.css";
  import "$lib/css/custom.css";
</script>

<div class="page flex flex-col min-h-screen">
  <slot />
  <footer class="ml-auto mt-auto">
    <ul class="text-sm list-none">
      <li>
        <a href="https://github.com/sharu725/vim-cheat-sheet">Github</a>
      </li>
    </ul>
  </footer>
</div>
