import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import UnoCss from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { build } from './build'

export default defineConfig(() => ({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    UnoCss(),
    solid(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        ...build(),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web'],
    },
  },
} as UserConfig))
