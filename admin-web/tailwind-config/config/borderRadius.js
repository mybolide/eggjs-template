const index = require('.')

function pxToVmin (variable) {
  if (index.env === 'minprogram') {
    return `${variable}rpx`
  }
  return `${variable / 7.5}vmin`
}

const borderRadius = {
  'none': '0',
  'sm': '0.125rem',
  DEFAULT: '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'full': '9999px',
  'large': '12px',
  'left-100': `0px ${pxToVmin(100)} ${pxToVmin(100)} 0px`,
  'left-top-right-bottom-6': `0px 0px ${pxToVmin(6)} ${pxToVmin(6)}`
}
for (let i = 0; i <= 2000; i++) {
  borderRadius[i] = pxToVmin(i < 0 ? -i : i)
  borderRadius[`${i}px`] = `${i}px`
  borderRadius[`${i}vh`] = `${i}vh`
}
module.exports = {
  ...borderRadius
}