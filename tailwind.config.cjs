module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: 'repeat(auto-fill, minmax(40px, 1fr))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
