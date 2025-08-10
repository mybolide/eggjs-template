module.exports = {
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    fadeInDown: {
      from: {
        opacity: 0,
        transform: 'translate3d(0, -100%, 0)'
      },
      to: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      }
    },
    wiggle: {
      '0%, 100%': { transform: 'rotate(-3deg)' },
      '50%': { transform: 'rotate(3deg)' },
    }
  },
  animation: {
    fadeInDown: 'fadeInDown 800ms linear',
    fadeIn: 'fadeIn 1.5s linear',
    wiggle: 'wiggle 1s ease-in-out infinite',
  }
}