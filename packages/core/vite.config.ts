import { resolve } from 'node:path'

import UnoCSS from 'unocss/vite'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import solid from 'vite-plugin-solid'

import { createIndexFile } from './build/createIndexFile.ts'

export default defineConfig(async () => {
  await createIndexFile()
  return {
    plugins: [
      UnoCSS(),
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
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
      },
    },
  } as UserConfig
})
