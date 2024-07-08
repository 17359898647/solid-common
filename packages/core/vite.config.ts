import { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import UnoCss from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import terser from '@rollup/plugin-terser'
import { createIndexFile } from './build/createIndexFile.ts'

export default defineConfig(async () => {
  await createIndexFile()
  return {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
      }),
      UnoCss(),
      solid(),
      dts({
        rollupTypes: true,
      }),
    ],
    build: {
      reportCompressedSize: false,
      outDir: 'dist',
      cssCodeSplit: false,
      lib: {
        entry: {
          index: resolve(__dirname, 'index.ts'),
        },
        formats: ['es'],
      },
      rollupOptions: {
        external: ['solid-js', 'solid-js/web', 'solid-js/store'],
        input: {
          index: resolve(__dirname, 'index.ts'),
        },
        output: {
          exports: 'named',
          format: 'es',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, '../..'),
        },
        plugins: [
          terser(),
        ],
      },
    },
  } as UserConfig
})
