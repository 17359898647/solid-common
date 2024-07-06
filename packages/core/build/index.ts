import * as path from 'node:path'
import { resolve } from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'

const rootDir = path.resolve(__dirname, '..')
const componentsDir = resolve(rootDir, 'src/components')
const utilsDir = resolve(rootDir, 'src/utils')
const packagePath = resolve(rootDir, 'package.json')
const componentsDirName = fg.sync(`${componentsDir}/*`, { onlyDirectories: true })
const utilsDirName = fg.sync(`${utilsDir}/*`)

type IExports = Record<string, {
  import: string
  types: string
}>
function getComponents() {
  return componentsDirName.reduce<Record<string, string>>((acc, file) => {
    const componentName = file.split('/').pop()
    acc[componentName!] = resolve(`${componentsDir}/`, `${componentName}/index.tsx`)
    return acc
  }, {})
}

function getUtils() {
  return utilsDirName.reduce<Record<string, string>>((acc, file) => {
    const componentPath = file.split('/').pop()
    const componentName = componentPath!.split('.').shift()!
    acc[componentName] = resolve(`${utilsDir}/`, `${componentPath}`)
    return acc
  }, {})
}

function createComponentsPackage() {
  return componentsDirName.reduce<IExports>((acc, file) => {
    const ComponentName = file.split('/').pop()!
    acc[`./${ComponentName!}`] = {
      import: `./${ComponentName}/index.js`,
      types: `./${ComponentName}/index.d.ts`,
    }
    return acc
  }, {})
}

function createUtilsPackage() {
  return utilsDirName.reduce<IExports>((acc, file) => {
    const UtilName = file.split('/').pop()!.split('.').shift()!
    acc[`./${UtilName!}`] = {
      import: `./${UtilName}.js`,
      types: `./${UtilName}.d.ts`,
    }
    return acc
  }, {})
}

// function createTypesVersions(toExports: IExports): Record<string, string[]> {
//   return Object.keys(toExports).reduce<Record<string, string[]>>((acc, key) => {
//     const newKey = key.slice(2)
//     const newValue = toExports[key].replace('.js', '.d.ts')
//     acc[newKey] = [newValue]
//     return acc
//   }, {})
// }

export async function WritePackageJson() {
  fs.readJSON(packagePath).then((packageJSON) => {
    const tsExports = { ...createComponentsPackage(), ...createUtilsPackage() }
    packageJSON.exports = {
      './style.css': './dist/style.css',
      ...tsExports,
    }
    // packageJSON.typesVersions = {
    //   '*': createTypesVersions(tsExports),
    // }
    fs.writeJSON(packagePath, packageJSON, { spaces: 2 })
  })
  const packageJSON = await fs.readJSON(packagePath)
  const tsExports = { ...createComponentsPackage(), ...createUtilsPackage() }
  packageJSON.exports = {
    './style.css': './dist/style.css',
    ...tsExports,
  }
  await fs.writeJSON(packagePath, packageJSON, { spaces: 2 })
}
export function build() {
  return {
    // index: resolve(`${componentsDir}/`, 'index.ts'),
    ...getComponents(),
    ...getUtils(),
  }
}
