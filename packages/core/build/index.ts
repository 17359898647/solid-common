import * as path from 'node:path'
import { resolve } from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'

const rootDir = path.resolve(__dirname, '..')
const componentsDir = resolve(rootDir, 'src/components')
const packagePath = resolve(rootDir, 'package.json')
export const componentsDirName = fg.sync(`${componentsDir}/*`, { onlyDirectories: true })
function getComponents() {
  const components: Record<string, any> = {
    index: resolve(`${componentsDir}/`, 'index.ts'),
  }
  componentsDirName.forEach((file) => {
    const componentName = file.split('/').pop()
    components[componentName!] = resolve(`${componentsDir}/`, `${componentName}/index.tsx`)
  })
  return components
}

function getComponentsPackageName() {
  const componentsPackage: Record<string, string> = {
    './style.css': './dist/style.css',
  }
  componentsDirName.forEach((file) => {
    const name = file.split('/').pop()
    componentsPackage[`./${name!}`] = `./dist/${name}/index.js`
  })
  return componentsPackage
}

function WritePackage() {
  fs.readJSON(packagePath).then((packageJSON) => {
    packageJSON.exports = {
      ...getComponentsPackageName(),
    }
    fs.writeJSON(packagePath, packageJSON, { spaces: 2 })
  })
}
WritePackage()
export function build() {
  return {
    ...getComponents(),
  }
}
