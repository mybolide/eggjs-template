const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}


const lineHeight = {
}

for (let i = 0; i <= 200; i++) {
    lineHeight[i] = pxToVmin(i)
    lineHeight[`${i}px`] = `${i}px`
}

module.exports = {
    ...lineHeight
}