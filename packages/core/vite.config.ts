import { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import UnoCss from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import terser from '@rollup/plugin-terser'
import { WritePackageJson } from './build'
import { entry } from './build/defineVite.ts'

export default defineConfig(async () => {
  await WritePackageJson()
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
      outDir: 'dist',
      lib: {
        entry,
        formats: ['es'],
      },
      rollupOptions: {
        external: ['solid-js', 'solid-js/web', 'solid-js/store'],
        output: {
          exports: 'auto',
          format: 'es',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname),
        },
        plugins: [
          terser(),
        ],
      },
    },
  } as UserConfig
})
