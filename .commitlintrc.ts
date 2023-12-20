import type { UserConfig } from '@commitlint/types'

const commitlintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [1, 'always', 100]
  },
  ignores: [
    (commit) => commit.includes('Optimised images with calibre/image-actions')
  ]
}

module.exports = commitlintConfig
