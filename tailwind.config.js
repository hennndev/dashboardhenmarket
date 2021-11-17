module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
       'card': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      width: {
        'modal': '450px'
      },
      height: {
        'modal': '400px'
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'overlay': 'rgba(0,0,0,0.6)'
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
