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
  return componentsDirName.reduce<Record<string, string>>((acc, file) => {
    const name = file.split('/').pop()
    acc[`./${name!}`] = `./dist/${name}/index.js`
    return acc
  }, {})
}

function createUtilsPackage() {
  return utilsDirName.reduce<Record<string, string>>((acc, file) => {
    const name = file.split('/').pop()
    acc[`./${name!}`] = `./dist/${name}`
    return acc
  }, {})
}

console.log(createUtilsPackage(), getUtils())

function WritePackage() {
  fs.readJSON(packagePath).then((packageJSON) => {
    packageJSON.exports = {
      './style.css': './dist/style.css',
      ...createComponentsPackage(),
      ...createUtilsPackage(),
    }
    fs.writeJSON(packagePath, packageJSON, { spaces: 2 })
  })
}
WritePackage()
export function build() {
  return {
    index: resolve(`${componentsDir}/`, 'index.ts'),
    ...getComponents(),
    ...getUtils(),
  }
}
