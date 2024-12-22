import {
  defineConfig,
  presetIcons,
  presetUno,
} from 'unocss'

const prefix = 'h--'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
  presets: [
    presetIcons({
      extraProperties: {
        cursor: 'pointer',
      },
      prefix: 'icon-',
      warn: true,
    }),
    presetUno({
      prefix,
    }),
  ],
})
