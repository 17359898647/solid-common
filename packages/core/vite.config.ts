import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import UnoCss from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { entry } from './build/entry'

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
      entry: entry(),
      formats: ['es'],
    },
  },
} as UserConfig))
