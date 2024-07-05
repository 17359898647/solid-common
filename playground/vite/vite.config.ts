import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import UnoCss from 'unocss/vite'
import { codeInspectorPlugin } from 'code-inspector-plugin'

export default defineConfig({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    solid(),
    UnoCss(),
  ],
})
