// basic regex -- [whitespace](number)(rem)[whitespace or ;]
const REM_REGEX = /(\d*\.?\d+\s?)(rem)/ig
const PROCESSED = Symbol('processed')

module.exports = (opts = { }) => {
  // Work with options here
  const { transformMediaQuery = false } = opts;

  return {
    postcssPlugin: 'postcss-rem-to-em-plugin',
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    Declaration (decl) {
      // The faster way to find Declaration node
      if (!decl[PROCESSED]) {
        decl.value = decl.value.replace(REM_REGEX, '$1em')
        decl[PROCESSED] = true
      }
    },

    AtRule: {
      media: atRule => {
        if (!atRule[PROCESSED] && transformMediaQuery) {
          console.log('atrule pre', atRule.params)
          atRule.params = atRule.params.replace(REM_REGEX, '$1em')
          console.log('atrule post', atRule.params)
          atRule[PROCESSED] = true;
        }
      }
    }

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}

module.exports.postcss = true
