import { codeInspectorPlugin } from 'code-inspector-plugin'
import UnoCss from 'unocss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    solid(),
    UnoCss(),
  ],
})
