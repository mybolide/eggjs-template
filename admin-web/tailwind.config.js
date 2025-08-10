// const spacing = require('./tailwind-config/config/spacing')
// const fontSize = require('./tailwind-config/config/fontSize')
// const fontWeight = require('./tailwind-config/config/fontWeight')
// const lineHeight = require('./tailwind-config/config/lineHeight')
// const maxWidth = require('./tailwind-config/config/maxWidth')
// const colors = require('./tailwind-config/config/colors')
// const borderRadius = require('./tailwind-config/config/borderRadius')
// const borderWidth = require('./tailwind-config/config/borderWidth')
// const backgroundSize = require('./tailwind-config/config/backgroundSize')
// const backgroundPosition = require('./tailwind-config/config/backgroundPosition')
// const backgroundImage = require('./tailwind-config/config/backgroundImage')
// const animation = require('./tailwind-config/config/animation')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    // fontSize,
    // fontWeight,
    // spacing,
    // lineHeight,
    // borderRadius,
    // borderWidth,
    // backgroundSize,
    // backgroundPosition,
    // extend: {
    //   ...animation,
    //   fontSize,
    //   spacing,
    //   maxWidth,
    //   lineHeight,
    //   colors,
    //   backgroundImage
    // },
  },
  plugins: [
    require('tailwindcss-important')(),
    require('@tailwindcss/line-clamp'),
    require('preline/plugin'),
  ],
  corePlugins: {
    preflight: false,
  },
}
