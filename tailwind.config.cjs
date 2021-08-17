module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['DM Serif Display'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
