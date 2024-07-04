import { resolve } from 'node:path'
import fg from 'fast-glob'

const componentsDir = resolve(__dirname, '../src/components')
export function entry() {
  const entry: Record<string, any> = {}
  const files = fg.sync(`${componentsDir}/*`, { onlyDirectories: true })
  files.forEach((file) => {
    const componentName = file.split('/').pop()
    entry[componentName!] = resolve(`${componentsDir}/`, `${componentName}/index.tsx`)
  })
  entry.index = resolve(`${componentsDir}/`, 'index.ts')
  return entry
}
