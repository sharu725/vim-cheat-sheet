// uno.config.ts
import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      /* options */
    }),
  ],
  safelist: [
    "i-fa6-solid:bold",
    "i-nonicons:vim-normal-mode-16",
    "i-nonicons:vim-insert-mode-16",
    "i-nonicons:vim-visual-mode-16",
    "i-nonicons:vim-replace-mode-16",
    "i-nonicons:vim-command-mode-16",
    "i-nonicons:vim-terminal-mode-16",
    "i-fa6-solid:e",
  ],
});
