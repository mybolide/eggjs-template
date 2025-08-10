const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}


module.exports = {
  DEFAULT: '1px',
  '0': '0',
  '1': pxToVmin(1),
  '2': pxToVmin(2),
  '3': '3px',
  '4': '4px',
  '6': '6px',
  '8': '8px',
}