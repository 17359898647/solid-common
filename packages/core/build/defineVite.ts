import { componentsFiles, utilsFiles } from './help'

function createComponentsEntry() {
  return componentsFiles.reduce<Record<string, string>>((acc, path) => {
    const componentName = path.split('/').pop()!.split('.').shift()!
    acc[componentName] = `${path}/index.tsx`
    return acc
  }, {})
}

export function createUtilsEntry() {
  return utilsFiles.reduce<Record<string, string>>((acc, path) => {
    const componentName = path.split('/').pop()!.split('.').shift()!
    acc[componentName] = path
    return acc
  }, {})
}

export function createEntry() {
  return {
    ...createComponentsEntry(),
    ...createUtilsEntry(),
  }
}
export const entry = createEntry()
export const input = Object.values(entry).slice(1)
