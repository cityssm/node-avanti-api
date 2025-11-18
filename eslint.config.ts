import cityssmConfig, {
  defineConfig
} from 'eslint-config-cityssm/eslint.packageConfig.js'
import { cspellWords } from 'eslint-config-cityssm/exports.js'

export const config = defineConfig(cityssmConfig, {
  files: ['**/*.ts'],
  rules: {
    '@cspell/spellchecker': [
      'warn',
      {
        cspell: {
          words: [...cspellWords, 'avanti', 'assp']
        }
      }
    ],
    '@typescript-eslint/no-magic-numbers': 'off'
  }
})

export default config
