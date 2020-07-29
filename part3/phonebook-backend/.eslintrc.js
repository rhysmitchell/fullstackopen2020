// I know these defaults don't match those in the course..
// but because I'm developing on a Windows machine for example,
//it's easier to just to select CRLF line endings to save trouble later :)

module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true,
    'jest': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
  }
}
