const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}


const backgroundSize = {
  'auto': 'auto',
  'cover': 'cover',
  'contain': 'contain',
}
for (let i = -500; i <= 2000; i++) {
  backgroundSize[i] = pxToVmin(i < 0 ? -i : i)
  backgroundSize[`${i}px`] = `${i}px`
  backgroundSize[`${i}vh`] = `${i}vh`
}

module.exports = backgroundSize