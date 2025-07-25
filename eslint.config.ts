import cityssmConfig, { cspellWords, tseslint } from 'eslint-config-cityssm'

export const config = tseslint.config(...cityssmConfig, {
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