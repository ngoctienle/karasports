import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    '.': 'src/index.ts'
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
  external: ['react'],
  onSuccess: 'tsc --project tsconfig.declarations.json',
  dts: true
})
