import { codeInspectorPlugin } from 'code-inspector-plugin'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    solid(),
  ],
  build: {
    minify: false,
  },
})
