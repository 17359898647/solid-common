import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

import fg from 'fast-glob'
import fs from 'fs-extra'

import { DIR, rootDir } from './help.ts'

export async function createIndexFile() {
  const defaultFile
      = 'import \'@unocss/reset/tailwind-compat.css\'\n'
      + 'import \'virtual:uno.css\'\n'
  const list = DIR.map(path => `./${path}/**/*.ts?(x)`)

  const files = await fg(list, {
    onlyFiles: true,
    cwd: resolve(rootDir),
    ignore: ['**/*.test.ts?(x)', '**/__tests__/**'],
  })

  const importStatements = files.map((file) => {
    const importPath = file.replace(/\/?(?:index\.tsx?)?(?:\.tsx?)?$/, '')
    return `export * from '${importPath}'`
  })
  const result = defaultFile + importStatements.join('\n')
  const indexPath = resolve(rootDir, 'index.ts')
  await fs.writeFile(indexPath, result, 'utf-8')
  execSync(`npx eslint ${indexPath} --fix`, { stdio: 'inherit' })
}
