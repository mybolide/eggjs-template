const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}

const fontSize = {
}
for (let i = 0; i <= 200; i++) {
    fontSize[i] = pxToVmin(i)
    fontSize[`${i}px`] = `${i}px`
}
module.exports = {
    ...fontSize
}