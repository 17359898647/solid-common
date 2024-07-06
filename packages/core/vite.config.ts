import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import UnoCss from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import terser from '@rollup/plugin-terser'
import { WritePackageJson, build } from './build'

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
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: build(),
        formats: ['es'],
      },
      rollupOptions: {
        external: ['solid-js', 'solid-js/web', 'solid-js/store'],
        output: {
          preserveModules: true,
          exports: 'named',
          format: 'es',
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
        plugins: [terser()],
      },
    },
  } as UserConfig
})
