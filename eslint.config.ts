import cityssmConfig, {
  type ConfigObject,
  cspellWords,
  defineConfig
} from 'eslint-config-cityssm'

export const config: ConfigObject[] = defineConfig(cityssmConfig, {
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
