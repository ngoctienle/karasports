import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts'
  },
  splitting: false,
  sourcemap: true,
  clean: false,
  banner: {
    js: "'use client'"
  },
  platform: 'browser',
  format: ['cjs', 'esm'],
  esbuildOptions(options) {
    options.keepNames = true
  },
  onSuccess: 'tsc --project tsconfig.declarations.json'
})
