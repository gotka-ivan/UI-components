const plugin = require('tailwindcss/plugin')

const customSpacing = {}

for (let i = 0; i <= 140; i++) {
  if (i % 2 === 0) customSpacing[`${i}px`] = `${i}px`
}

module.exports = {
  prefix: 'tw-',
  // important: '.tw',
  theme: {
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1700px'
    },
    extend: {
      width: {
        ...customSpacing,
        '800px':'800px',
        '3/8': '37.5%',
        '5/8': '62.5%',
        '49%': '49%'
      },
      height: {
        '808px':'808px',
        ...customSpacing
      },
      margin: {
        ...customSpacing,
        '5%': '5%'
      },
      fontSize: {
        ...customSpacing
      },
      zIndex: {
        10000: 10000
      },
      padding: {
        ...customSpacing
      },
      inset: {
        ...customSpacing
      },
      flexGrow: {
        '2': '2'
      }
    }
  },
  variants: {
    backgroundColor: [
      'hover',
      'responsive'
    ],
    justifyContent: ['responsive'],
    borderStyle: ['responsive'],
    borderColor: ['hover'],
    display: ['responsive'],
    fontSize: ['responsive'],
    fontWeight: ['responsive'],
    letterSpacing: ['responsive'],
    margin: ['responsive'],
    padding: ['responsive'],
    textColor: ['responsive', 'hover'],
    position: ['responsive'],
    width: ['responsive'],
    alignItems: ['responsive'],
    inset: ['responsive'],
    pointerEvents: ['responsive'],
    height: ['responsive'],
    borderWidth: ['responsive', 'hover', 'focus'],
    flexDirection: ['responsive'],
    textDecoration: ['responsive', 'hover'],
    textTransform: ['responsive'],
    boxShadow: ['responsive'],
    wordBreak: ['responsive'],
    overflow: ['responsive'],
    whitespace: ['responsive']
  },
  corePlugins: {
    float: false,
    container: false
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  exposeConfig: true
}
