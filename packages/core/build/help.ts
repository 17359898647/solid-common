import path, { resolve } from 'node:path'
import fg from 'fast-glob'

export const rootDir = path.resolve(__dirname, '..')
export const componentsDir = resolve(rootDir, 'src/components')
export const utilsDir = resolve(rootDir, 'src/utils')
export const componentsFiles = fg.sync(`${componentsDir}/*`, { onlyDirectories: true, cwd: __dirname })
export const utilsFiles = fg.sync(`${utilsDir}/**/*.ts`, { onlyFiles: true, cwd: __dirname })
