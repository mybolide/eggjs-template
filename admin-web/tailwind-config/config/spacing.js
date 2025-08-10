const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}


// viewport
const spacing = {
    '-50%': '-50%',
}
for (let i = -500; i <= 2000; i++) {
    spacing[i] = pxToVmin(i < 0 ? -i : i)
    spacing[`${i}px`] = `${i}px`
    spacing[`${i}vh`] = `${i}vh`
}
module.exports = {
    ...spacing
}
