const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}

module.exports = {
  bottom: 'bottom',
  center: 'center',
  left: 'left',
  'left-center': 'left center',
  'left-bottom': 'left bottom',
  'left-top': 'left top',
  right: 'right',
  'right-bottom': 'right bottom',
  'right-top': 'right top',
  top: 'top',
  '28-center': `${pxToVmin(28)} center`,
  '20px-center': `20px center`
}