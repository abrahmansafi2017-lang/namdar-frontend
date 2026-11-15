export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070C18',
        deep: '#0B1226',
        surface: '#101A33',
        surface2: '#16233F',
        line: '#24345A',
        parchment: '#EFE9DC',
        muted: '#A7B2CC',
        faint: '#6C7A9C',
        lapis: '#3B72FF',
        saffron: '#FFB020',
        pom: '#FF4D5E',
        pistachio: '#57D98A',
        turquoise: '#22C7C0',
        clay: '#D98A5B'
      },
      fontFamily: {
        display: ['Sora', 'Noto Naskh Arabic', 'sans-serif'],
        sans: ['Inter', 'Noto Naskh Arabic', 'sans-serif']
      }
    }
  },
  plugins: []
}