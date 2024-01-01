import { formatFiles, generateFiles, names, Tree, readJson } from '@nx/devkit'
import * as path from 'path'
import { ReactlibGeneratorSchema } from './schema'

export async function reactlibGenerator(tree: Tree, options: ReactlibGeneratorSchema) {
  const scopeName = readJson(tree, 'package.json').name

  const resolvedOptions = {
    ...options,
    name: names(options.name).fileName,
    scope: scopeName
  }

  const projectRoot = `packages/${resolvedOptions.name}`
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions)
  await formatFiles(tree)
}

export default reactlibGenerator
